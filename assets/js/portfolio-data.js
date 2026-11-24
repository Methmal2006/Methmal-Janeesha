/**
 * =========================================================================
 * PORTFOLIO DATA CONFIGURATION
 * =========================================================================
 * Phase 1 Placeholder Data.
 * All your personal information, projects, skills, and services can be
 * easily customized here without modifying the HTML structure.
 * =========================================================================
 */

const PORTFOLIO_DATA = {
  // Personal & Brand Information
  personal: {
    name: "Methmal Janeesha",
    firstName: "Methmal",
    roleBrand: "Creative Designer & Digital Creator",
    brandLogo: "Methmal Janeesha",
    greeting: "HELLO WORLD, I'M",
    tagline: "Creating stunning digital experiences through Graphic Design, Web Design, Website Development, Video Editing, Thumbnail Design, and AI Image Editing. Bringing creative ideas to life with modern design and innovation.",
    titles: [
      "Graphic Designer",
      "Web Designer",
      "Web Developer",
      "Video Editor",
      "Thumbnail Designer",
      "AI Image Editor"
    ],
    profileImage: "assets/images/profile/my-photo.jpg",
    availability: "Available for new projects & opportunities",
    location: "Global / Remote & Hybrid",
    email: "contact@alexvance.dev",
    phone: "+1 (555) 234-5678",
    resumeUrl: "assets/files/Methmal_Janeesha_CV.pdf",
    socials: [
      { name: "YouTube", icon: "youtube", url: "https://www.youtube.com/@MJC_Gaming12" },
      { name: "Facebook", icon: "facebook", url: "https://www.facebook.com/profile.php?id=61561445493585" },
      { name: "Instagram", icon: "instagram", url: "https://www.instagram.com/methmaljaneesha/" },
      { name: "TikTok", icon: "tiktok", url: "https://www.tiktok.com/@methmal.janeesha" },
      { name: "LinkedIn", icon: "linkedin", url: "https://www.linkedin.com/in/methmal-janeesha-185315336/" }
    ],
    stats: [
      { value: 3, suffix: "+", label: "Years of Creative Journey" },
      { value: 50, suffix: "+", label: "Projects Completed" }
    ]
  },

  // About Section Details
  about: {
    badge: "ABOUT ME",
    mainTitle: "Turning Creative Ideas Into Digital Experiences.",
    subtitle: "Creativity meets technology. Every project is an opportunity to create something meaningful.",
    storyHeading: "Creative Designer & Digital Creator",
    manifest: {
      varName: "creator",
      name: "Methmal Janeesha",
      role: "Creative Designer & Digital Creator",
      passion: "Design, Technology & Innovation",
      status: "Always Learning & Creating"
    },
    paragraphs: [
      "I am a passionate freelance creative designer and digital creator with a strong interest in visual storytelling, design, and technology. Since 2023, I have been creating digital designs and helping bring ideas to life through creative solutions.",
      "My work includes Graphic Design, Web Design, Website Development, Video Editing, Thumbnail Design, and AI-powered Image Editing. I work with tools such as Adobe Photoshop, CapCut, Adobe Premiere Pro, and emerging AI technologies to explore new creative possibilities.",
      "With 50+ projects completed, I focus on understanding each client's vision, paying attention to detail, and delivering work that meets their expectations.",
      "My goal is to connect with international clients, build lasting professional relationships, continuously improve my skills, and deliver meaningful value through every project I take on."
    ],
    // Backward compatibility for direct property access
    description1: "I am a passionate freelance creative designer and digital creator with a strong interest in visual storytelling, design, and technology. Since 2023, I have been creating digital designs and helping bring ideas to life through creative solutions.",
    description2: "My work includes Graphic Design, Web Design, Website Development, Video Editing, Thumbnail Design, and AI-powered Image Editing. I work with tools such as Adobe Photoshop, CapCut, Adobe Premiere Pro, and emerging AI technologies to explore new creative possibilities.",
    attributes: [
      { label: "Core Focus", value: "Creative Design & Digital Experiences" },
      { label: "Experience", value: "Graphic Design Since 2023" },
      { label: "Education", value: "IT, Web Design, Computer Hardware & HRM" },
      { label: "Work Style", value: "Independent Freelancer Â· Worldwide" }
    ],
    qualifications: [
      "GCE Advanced Level (A/L)",
      "Diploma in Information Technology",
      "Diploma in Web Design",
      "Diploma in Computer Hardware",
      "English Certificate",
      "HRM Qualification"
    ]
  },

  // Services Offered
  services: [
    {
      id: "graphic-design",
      number: "01",
      category: "design",
      categoryName: "Design",
      icon: "graphic-design",
      title: "Graphic Design",
      description: "Creative and professional designs for your brand and ideas.",
      features: ["Logo Design", "Branding", "Posters", "Banners"],
      modalDetails: "Complete visual identity and brand design tailored to help your project stand out. From conceptual logo marks and color schemes to marketing collateral, promotional print assets, and high-impact digital graphics."
    },
    {
      id: "video-editing",
      number: "02",
      category: "video-motion",
      categoryName: "Video & Motion",
      icon: "video-editing",
      title: "Video Editing",
      description: "High-quality video editing for YouTube, social media and more.",
      features: ["YouTube Videos", "Shorts", "Reels", "Promotional Videos"],
      modalDetails: "Cinematic, retention-focused video post-production tailored for content creators and businesses. Includes rhythmic cuts, color grading, sound design, engaging dynamic captions, and motion graphics designed to keep audiences hooked."
    },
    {
      id: "thumbnail-design",
      number: "03",
      category: "design",
      categoryName: "Design",
      icon: "thumbnail-design",
      title: "Thumbnail Design",
      description: "Eye-catching thumbnails designed to boost clicks and engagement.",
      features: ["Gaming Thumbnails", "YouTube Thumbnails", "Custom Covers"],
      modalDetails: "High-CTR, algorithm-optimized thumbnails engineered to maximize impressions into clicks. Featuring focal contrast, expressive cutouts, 3D typography, and custom color grading crafted specifically for YouTube and gaming channels."
    },
    {
      id: "ai-image-editing",
      number: "04",
      category: "ai-creative",
      categoryName: "AI & Creative",
      icon: "ai-creative",
      title: "AI Image Editing",
      description: "Enhance, edit and transform images using creative AI tools.",
      features: ["AI Photo Editing", "Image Enhancement", "Creative Image Generation"],
      modalDetails: "Cutting-edge AI-assisted image manipulation and generative artwork workflows. Advanced background replacements, neural upscaling, intelligent retouching, object removal, and custom AI concept art creation."
    },
    {
      id: "social-media-design",
      number: "05",
      category: "design",
      categoryName: "Design",
      icon: "social-media",
      title: "Social Media Design",
      description: "Stunning visual content for social media platforms.",
      features: ["Social Media Posts", "Cover Designs", "Promotional Graphics"],
      modalDetails: "Scroll-stopping visual assets designed to elevate your social media presence across Instagram, Facebook, TikTok, YouTube, and X. Cohesive design templates, banners, carousel designs, and story graphics that boost brand credibility."
    },
    {
      id: "fullstack-web-engineering",
      number: "06",
      category: "development",
      categoryName: "Development",
      icon: "web-dev",
      title: "Full-Stack Web Engineering",
      description: "Modern, responsive and scalable websites for your digital presence.",
      features: ["Portfolio Websites", "Responsive Design", "Web Applications"],
      modalDetails: "Bespoke, high-performance web development built with modern web technologies. Fast-loading, fully responsive layouts, smooth interactive animations, dark mode aesthetics, and clean maintainable code architectures."
    }
  ],

  // Skills & Tech Stack
  skills: {
    categories: [
      {
        id: "graphic-design",
        number: "01",
        badge: "Visual Design",
        title: "Graphic Design",
        description: "Creating visually engaging designs and professional digital graphics.",
        tools: ["Adobe Photoshop"],
        skills: ["Graphic Design", "Thumbnail Design", "Branding", "Visual Content Creation"]
      },
      {
        id: "video-editing",
        number: "02",
        badge: "Motion & Post-Production",
        title: "Video Editing",
        description: "Producing engaging videos and creative digital content.",
        tools: ["Adobe Premiere Pro", "CapCut PC"],
        skills: ["Video Editing", "YouTube Video Production", "Short-form Video Editing", "Social Media Content"]
      },
      {
        id: "ai-creative",
        number: "03",
        badge: "Generative Tech",
        title: "AI & Creative Technology",
        description: "Exploring AI-powered tools to create and transform digital visuals.",
        tools: ["AI Image Tools"],
        skills: ["AI Image Editing", "Image Enhancement", "Creative AI Image Generation"]
      },
      {
        id: "web-development",
        number: "04",
        badge: "Frontend Engineering",
        title: "Web Development",
        description: "Building modern and responsive websites using web technologies.",
        tools: ["HTML5", "CSS3", "JavaScript"],
        skills: ["Frontend Development", "Responsive Web Design", "Interactive Web Experiences"]
      }
    ],
    toolkit: [
      { name: "Adobe Photoshop", category: "Graphic Design", icon: "photoshop" },
      { name: "Adobe Premiere Pro", category: "Video Editing", icon: "premiere" },
      { name: "CapCut PC", category: "Video Editing", icon: "capcut" },
      { name: "AI Image Tools", category: "AI & Creative", icon: "ai-tools" },
      { name: "HTML5", category: "Web Development", icon: "html5" },
      { name: "CSS3", category: "Web Development", icon: "css3" },
      { name: "JavaScript", category: "Web Development", icon: "javascript" }
    ]
  },

  // Featured Projects
  projects: [
    {
      id: "project-1",
      title: "NeuralFlow AI Analytics",
      category: "web",
      categoryName: "Web Application",
      description: "Real-time AI telemetry and inference monitoring dashboard built with ultra-responsive data visualizations, edge caching, and dark glassmorphic UI.",
      image: "assets/images/portfolio/project-1.svg",
      gallery: ["assets/images/portfolio/project-1.svg"],
      tech: ["Vanilla JS", "GSAP", "SVG Visualizer", "CSS Grid"],
      demoUrl: "https://example.com/demo1",
      githubUrl: "https://github.com/example/neuralflow"
    },
    {
      id: "project-2",
      title: "VaultX DeFi Protocol",
      category: "web",
      categoryName: "Web3 Platform",
      description: "High-security decentralized liquidity aggregation suite featuring instant token swaps, real-time smart contract health audits, and sleek dark cards.",
      image: "assets/images/portfolio/project-2.svg",
      gallery: ["assets/images/portfolio/project-2.svg"],
      tech: ["JavaScript", "Smart Contracts", "CSS Modules", "Web3 APIs"],
      demoUrl: "https://example.com/demo2",
      githubUrl: "https://github.com/example/vaultx"
    },
    {
      id: "project-3",
      title: "Atelier 3D Spatial Studio",
      category: "creative",
      categoryName: "Creative / 3D",
      description: "Immersive WebGL brand experience showcasing generative shaders, interactive spatial meshes, dynamic lighting, and cinematic scroll storytelling.",
      image: "assets/images/portfolio/project-3.svg",
      gallery: ["assets/images/portfolio/project-3.svg"],
      tech: ["Three.js", "WebGL", "GSAP ScrollTrigger", "GLSL Shaders"],
      demoUrl: "https://example.com/demo3",
      githubUrl: "https://github.com/example/atelier-3d"
    },
    {
      id: "project-4",
      title: "Pulse Cloud Orchestrator",
      category: "cloud",
      categoryName: "DevOps & Cloud",
      description: "Distributed infrastructure monitoring console with live topology rendering, live terminal stream simulator, and zero-latency health reporting.",
      image: "assets/images/portfolio/project-4.svg",
      gallery: ["assets/images/portfolio/project-4.svg"],
      tech: ["WebSocket Architecture", "Vanilla JS", "Bash / CLI", "Docker"],
      demoUrl: "https://example.com/demo4",
      githubUrl: "https://github.com/example/pulse-cloud"
    },
    {
      id: "project-5",
      title: "LumiÃ¨re Noir High-End Audio",
      category: "creative",
      categoryName: "E-Commerce",
      description: "Luxury audiophile hardware showcase engineered with minimal typography, interactive acoustic frequency graphs, and seamless checkout flows.",
      image: "assets/images/portfolio/project-5.svg",
      gallery: ["assets/images/portfolio/project-5.svg"],
      tech: ["HTML5", "Modern CSS", "GSAP Motion", "Responsive Layout"],
      demoUrl: "https://example.com/demo5",
      githubUrl: "https://github.com/example/lumiere-noir"
    },
    {
      id: "project-6",
      title: "Canvas Infinite Collab Suite",
      category: "web",
      categoryName: "Productivity",
      description: "Infinite collaborative workspace featuring live multi-user cursor tracking, vector artboards, design token inspection, and zero-lag dragging.",
      image: "assets/images/portfolio/project-6.svg",
      gallery: ["assets/images/portfolio/project-6.svg"],
      tech: ["HTML5 Canvas", "Realtime Sync", "Vanilla JS", "Micro-Interactions"],
      demoUrl: "https://example.com/demo6",
      githubUrl: "https://github.com/example/canvas-collab"
    }
  ],

  // Contact Information & Discord Webhook Integration
  contact: {
    badge: "GET IN TOUCH",
    title: "Let's build something memorable",
    subtitle: "Have an exciting idea or looking for a creative designer & digital creator? My inbox is always open.",
    heading: "Let's talk about your project",
    description: "I'm open to freelance projects, creative collaborations and new opportunities. Let's bring your ideas to life.",
    ownerName: "Methmal Janeesha",
    introduction: "Creative Designer & Digital Creator. Turning ideas into creative digital experiences.",
    email: "methmaljaneesha27@gmail.com",
    location: "Sri Lanka / Remote Worldwide",
    status: "Available for freelance projects"
  }
};
