# =============================================================================
# LightWeight Local Web Server for Personal Portfolio
# Includes Built-in Netlify Function Emulation for Discord Contact Form
# No Node, Python or build tools required - works out of the box on Windows!
# =============================================================================

$Port = 5500
$Root = $PSScriptRoot
if (-not $Root) { $Root = Get-Location }

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$Port/")
try {
    $listener.Start()
    Write-Host "=============================================================" -ForegroundColor Cyan
    Write-Host " Portfolio Server Running at: http://localhost:$Port/" -ForegroundColor Green
    Write-Host " Contact Form Endpoint: http://localhost:$Port/.netlify/functions/contact" -ForegroundColor Magenta
    Write-Host " Press Ctrl+C in this terminal to stop the server" -ForegroundColor Yellow
    Write-Host "=============================================================" -ForegroundColor Cyan
    
    # Automatically open default browser
    Start-Process "http://localhost:$Port/"
    
    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response

        # Emulate Netlify Serverless Function for Contact Form locally
        if ($request.Url.LocalPath -eq "/.netlify/functions/contact") {
            $response.Headers.Add("Access-Control-Allow-Origin", "*")
            $response.Headers.Add("Access-Control-Allow-Methods", "POST, OPTIONS")
            $response.Headers.Add("Access-Control-Allow-Headers", "Content-Type")

            if ($request.HttpMethod -eq "OPTIONS") {
                $response.StatusCode = 204
                $response.Close()
                continue
            }

            if ($request.HttpMethod -eq "POST") {
                $reader = New-Object System.IO.StreamReader($request.InputStream, $request.ContentEncoding)
                $bodyText = $reader.ReadToEnd()
                $json = $bodyText | ConvertFrom-Json

                # Read Discord Webhook URL from environment or .env
                $webhook = $env:DISCORD_WEBHOOK_URL
                if (-not $webhook -and (Test-Path (Join-Path $Root ".env"))) {
                    Get-Content (Join-Path $Root ".env") | ForEach-Object {
                        if ($_ -match "DISCORD_WEBHOOK_URL=(.+)") { $webhook = $matches[1].Trim() }
                    }
                }
                if (-not $webhook) {
                    $webhook = "https://discord.com/api/webhooks/1568465047729213480/lz90KIoV9QkL0au_hWU2txZMinYpeGPSPDqhycLNS0bvwkuIml9FMbKun_gVuXAH1kOx"
                }

                if (-not $json.name -or -not $json.email -or -not $json.subject -or -not $json.message) {
                    $response.StatusCode = 400
                    $errBytes = [System.Text.Encoding]::UTF8.GetBytes('{"error":"Please fill in all required fields."}')
                    $response.ContentType = "application/json"
                    $response.OutputStream.Write($errBytes, 0, $errBytes.Length)
                    $response.Close()
                    continue
                }

                $now = [DateTime]::UtcNow.ToString("o")
                $dateStr = [DateTime]::UtcNow.ToString("f") + " UTC"
                $discordPayload = @{
                    username = "Portfolio Inquiry Bot"
                    avatar_url = "https://methmal-janeesha.netlify.app/assets/images/profile/my-photo.jpg"
                    embeds = @(
                        @{
                            title = [char]::ConvertFromUtf32(0x1F4E9) + " NEW PORTFOLIO INQUIRY"
                            url = "https://methmal-janeesha.netlify.app/#contact"
                            color = 9133302
                            fields = @(
                                @{ name = [char]::ConvertFromUtf32(0x1F464) + " CLIENT NAME"; value = [string]$json.name; inline = $true },
                                @{ name = [char]::ConvertFromUtf32(0x1F4E7) + " EMAIL ADDRESS"; value = [string]$json.email; inline = $true },
                                @{ name = [char]::ConvertFromUtf32(0x1F4CC) + " PROJECT SUBJECT"; value = [string]$json.subject; inline = $false },
                                @{ name = [char]::ConvertFromUtf32(0x1F4AC) + " MESSAGE"; value = [string]$json.message; inline = $false },
                                @{ name = [char]::ConvertFromUtf32(0x1F552) + " DATE & TIME"; value = $dateStr; inline = $false }
                            )
                            footer = @{ text = "METHMAL JANEESHA | PORTFOLIO CONTACT SYSTEM" }
                            timestamp = $now
                        }
                    )
                } | ConvertTo-Json -Depth 5

                try {
                    $dRes = Invoke-RestMethod -Uri $webhook -Method Post -Body $discordPayload -ContentType "application/json"
                    $response.StatusCode = 200
                    $okBytes = [System.Text.Encoding]::UTF8.GetBytes('{"success":true,"message":"Message sent successfully! Thank you for contacting me."}')
                    $response.ContentType = "application/json"
                    $response.OutputStream.Write($okBytes, 0, $okBytes.Length)
                } catch {
                    $response.StatusCode = 502
                    $failBytes = [System.Text.Encoding]::UTF8.GetBytes('{"error":"Failed to connect to Discord Webhook."}')
                    $response.ContentType = "application/json"
                    $response.OutputStream.Write($failBytes, 0, $failBytes.Length)
                }
                $response.Close()
                continue
            }
        }

        $localPath = $request.Url.LocalPath.TrimStart('/')
        if ([string]::IsNullOrEmpty($localPath)) {
            $localPath = "index.html"
        }
        $filePath = Join-Path $Root $localPath

        if (Test-Path $filePath -PathType Leaf) {
            $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
            $contentType = switch ($ext) {
                ".html" { "text/html; charset=utf-8" }
                ".css"  { "text/css; charset=utf-8" }
                ".js"   { "application/javascript; charset=utf-8" }
                ".svg"  { "image/svg+xml" }
                ".png"  { "image/png" }
                ".jpg"  { "image/jpeg" }
                ".jpeg" { "image/jpeg" }
                ".json" { "application/json" }
                ".woff2"{ "font/woff2" }
                ".mp3"  { "audio/mpeg" }
                ".wav"  { "audio/wav" }
                ".pdf"  { "application/pdf" }
                Default { "application/octet-stream" }
            }

            $bytes = [System.IO.File]::ReadAllBytes($filePath)
            $response.ContentType = $contentType
            $response.ContentLength64 = $bytes.Length
            $response.StatusCode = 200
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
        } else {
            $response.StatusCode = 404
            $msg = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found")
            $response.OutputStream.Write($msg, 0, $msg.Length)
        }
        $response.Close()
    }
} catch {
    Write-Error $_
} finally {
    $listener.Stop()
}
