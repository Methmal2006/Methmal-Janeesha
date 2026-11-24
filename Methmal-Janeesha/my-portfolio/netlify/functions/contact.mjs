/**
 * Netlify Serverless Function: contact.mjs
 * Handles Portfolio Website Contact Form submissions and delivers them
 * directly to Discord via Discord Webhook.
 * 
 * Endpoint: /.netlify/functions/contact
 * Method: POST
 * Environment Variable: DISCORD_WEBHOOK_URL
 * 
 * Security & Reliability Features:
 * - Webhook URL is kept 100% server-side in Netlify environment variables
 * - Complete input validation for Name, Email, Subject, and Message
 * - Anti-spam Honeypot protection
 * - Sanitization to prevent Discord mass-mention abuse (@everyone / @here)
 * - Safe message chunking to respect Discord's 1024-character field limit
 * - Error handling for Discord API and network failures
 */

export default async (req, context) => {
  // CORS Preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      }
    });
  }

  // 1. Ensure method is POST
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed. Use POST.' }), {
      status: 405,
      headers: {
        'Content-Type': 'application/json',
        'Allow': 'POST'
      }
    });
  }

  // 2. Read Discord Webhook URL from Netlify Environment Variables
  const webhookUrl = (typeof Netlify !== 'undefined' && Netlify.env?.get?.('DISCORD_WEBHOOK_URL'))
    || process.env.DISCORD_WEBHOOK_URL;

  if (!webhookUrl || typeof webhookUrl !== 'string' || !webhookUrl.startsWith('https://')) {
    console.error('[Contact Error] DISCORD_WEBHOOK_URL environment variable is missing or invalid.');
    return new Response(JSON.stringify({
      error: 'Server configuration error: Contact notification service is not configured. Please contact Methmal Janeesha directly.'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // 3. Parse and validate JSON request body
  let payload;
  try {
    payload = await req.json();
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Invalid JSON request format.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  if (!payload || typeof payload !== 'object') {
    return new Response(JSON.stringify({ error: 'Empty or invalid request body.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // 4. Anti-spam Honeypot check
  // If the hidden honeypot field has a value, silently drop spam submission
  if (payload._gotcha_honey || payload.honeypot) {
    console.warn('[Contact Spam] Honeypot triggered. Silently dropping spam submission.');
    return new Response(JSON.stringify({
      success: true,
      message: 'Message sent successfully! Thank you for contacting me.'
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // 5. Extract and sanitize input fields
  const rawName = typeof payload.name === 'string' ? payload.name.trim() : '';
  const rawEmail = typeof payload.email === 'string' ? payload.email.trim() : '';
  const rawSubject = typeof (payload.subject || payload.title) === 'string'
    ? (payload.subject || payload.title).trim()
    : '';
  const rawMessage = typeof payload.message === 'string' ? payload.message.trim() : '';

  // 6. Strict server-side field validation & length checks
  if (!rawName || rawName.length < 2) {
    return new Response(JSON.stringify({ error: 'Please enter your name (at least 2 characters).' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  if (rawName.length > 100) {
    return new Response(JSON.stringify({ error: 'Name is too long (maximum 100 characters).' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!rawEmail || !emailRegex.test(rawEmail)) {
    return new Response(JSON.stringify({ error: 'Please provide a valid email address.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  if (rawEmail.length > 150) {
    return new Response(JSON.stringify({ error: 'Email address is too long (maximum 150 characters).' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  if (!rawSubject || rawSubject.length < 2) {
    return new Response(JSON.stringify({ error: 'Please enter a project subject (at least 2 characters).' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  if (rawSubject.length > 200) {
    return new Response(JSON.stringify({ error: 'Subject is too long (maximum 200 characters).' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  if (!rawMessage || rawMessage.length < 5) {
    return new Response(JSON.stringify({ error: 'Please enter your message (at least 5 characters).' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  if (rawMessage.length > 3000) {
    return new Response(JSON.stringify({ error: 'Message exceeds maximum allowed length of 3000 characters.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // Prevent Discord mass-mention abuse (@everyone / @here)
  const sanitizeMentions = (str) => str.replace(/@/g, '@\u200b');
  const cleanName = sanitizeMentions(rawName);
  const cleanSubject = sanitizeMentions(rawSubject);
  const cleanMessage = sanitizeMentions(rawMessage);

  // Submission Date and Time (UTC and human-readable)
  const now = new Date();
  const isoTimestamp = now.toISOString();
  const formattedDate = now.toUTCString();

  // 7. Format Discord Embed Fields
  // Fields match exact requirement:
  // 👤 Name, 📧 Email, 📌 Subject, 💬 Message, 🕒 Date
  const fields = [
    {
      name: '👤 Name',
      value: cleanName,
      inline: true
    },
    {
      name: '📧 Email',
      value: `[${rawEmail}](mailto:${rawEmail})`,
      inline: true
    },
    {
      name: '📌 Subject',
      value: cleanSubject,
      inline: false
    }
  ];

  // Handle message chunking if message exceeds 1000 characters (Discord 1024-char limit)
  if (cleanMessage.length <= 1000) {
    fields.push({
      name: '💬 Message',
      value: cleanMessage,
      inline: false
    });
  } else {
    for (let i = 0; i < cleanMessage.length; i += 1000) {
      const chunk = cleanMessage.substring(i, i + 1000);
      const partNum = Math.floor(i / 1000) + 1;
      fields.push({
        name: partNum === 1 ? '💬 Message' : `💬 Message (Part ${partNum})`,
        value: chunk,
        inline: false
      });
    }
  }

  fields.push({
    name: '🕒 Date',
    value: formattedDate,
    inline: false
  });

  // 8. Construct Discord Webhook Payload
  // Color: 0x8b5cf6 (9133302) - Vibrant Purple Neon
  const discordBody = {
    username: 'Portfolio Inquiry Bot',
    avatar_url: 'https://methmal-janeesha.netlify.app/assets/images/profile/my-photo.jpg',
    allowed_mentions: { parse: [] }, // Never allow user/role mentions
    embeds: [
      {
        title: '📩 NEW PORTFOLIO MESSAGE',
        url: 'https://methmal-janeesha.netlify.app/#contact',
        color: 9133302, // 0x8b5cf6 Neon Purple
        author: {
          name: 'METHMAL JANEESHA — Creative Designer & Digital Creator',
          url: 'https://methmal-janeesha.netlify.app/',
          icon_url: 'https://methmal-janeesha.netlify.app/assets/images/profile/my-photo.jpg'
        },
        fields: fields,
        footer: {
          text: 'METHMAL JANEESHA | PORTFOLIO'
        },
        timestamp: isoTimestamp
      }
    ]
  };

  // 9. Send payload to Discord Webhook
  try {
    const discordResponse = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(discordBody)
    });

    if (discordResponse.ok || discordResponse.status === 204) {
      return new Response(JSON.stringify({
        success: true,
        message: 'Message sent successfully! Thank you for contacting me.'
      }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }

    const errorDetails = await discordResponse.text().catch(() => '');
    console.error(`[Discord API Error] Status: ${discordResponse.status}`, errorDetails);

    return new Response(JSON.stringify({
      error: 'Failed to deliver notification to Discord. Please reach out directly to methmaljaneesha27@gmail.com.'
    }), {
      status: 502,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  } catch (networkError) {
    console.error('[Network Error] Failed to connect to Discord webhook:', networkError);
    return new Response(JSON.stringify({
      error: 'Network connection error while sending inquiry. Please check your connection or email directly.'
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }
};
