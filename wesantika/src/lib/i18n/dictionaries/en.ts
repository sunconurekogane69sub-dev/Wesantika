/**
 * English — the source catalogue. Its shape defines the `Dictionary` type, and
 * every other locale is deep-merged over it, so a missing key falls back here
 * rather than rendering blank.
 *
 * Strings are transcribed verbatim from the Figma file.
 */
export const en = {
  meta: {
    siteTitle: "Wesantika — Modern Software. Real Business Growth.",
    siteDescription:
      "We design and build AI-powered software, cloud platforms, and digital systems that help businesses innovate, operate efficiently, and scale with confidence.",
    aboutTitle: "About Us",
    aboutDescription:
      "We help organizations transform ideas into scalable digital solutions through AI, cloud technologies, and expert software engineering.",
  },

  nav: {
    top: "Top",
    solution: "Solution",
    about: "About Us",
    work: "Our Work",
    newsroom: "Newsroom",
    blog: "Blog",
    contact: "Contact Us",
    openMenu: "Toggle navigation",
    languageLabel: "Change language",
    comingSoon: "Coming soon",
  },

  hero: {
    title: "Modern Software. Real Business Growth.",
    subtitle:
      "We design and build AI-powered software, cloud platforms, and digital systems that help businesses innovate, operate efficiently, and scale with confidence.",
  },

  services: {
    heading: "Our Full-Range Services",
    cta: "See Service Details",
    categories: {
      custom: "Custom Software Development",
      offshore: "Offshore & Outsourcing",
      ai: "AI Development",
      qa: "QA Testing",
      infrastructure: "Infrastructure",
      hire: "Hire Developers",
    },
    cards: {
      custom: {
        title: "Custom Software Development",
        body: "Our end-to-end software solution delivers tailored features, scalable performance, and full personalization. You will get the competitive advantage you deserve.",
      },
      web: {
        title: "Web Application Development",
        body: "We use Agile, mobile-first designs to build secure, scalable web apps. Our expertise ensures faster time-to-market and measurable business results.",
      },
      mobile: {
        title: "Mobile App Development",
        body: "Develop iOS and Android apps for native and cross-platform. Technologies like Swift, Kotlin, Flutter, and React Native ensure high performance and user engagement.",
      },
      mvp: {
        title: "MVP Software Development",
        body: "Build MVPs and PoCs with Agile prints. We use Figma, React, and Firebase to reduce risks, validate markets, and accelerate funding.",
      },
      legacy: {
        title: "Legacy Application Modernization",
        body: "Cut legacy maintenance costs by up to 40% and ship features 3x faster. We modernize aging applications into cloud-native infrastructure incrementally - no big-bang migrations, no frozen roadmaps, no production outages.",
      },
      saas: {
        title: "SaaS Application Development",
        body: "Create secure, multi-tenant SaaS platforms using AWS, Azure, and Kubernetes. Agile and DevOps ensure scalability, compliance, and faster time-to-market.",
      },
      enterprise: {
        title: "Enterprise Software Development",
        body: "Our enterprise software development services are founded on a comprehensive grasp of industry intricacies and the most recent technological advancements.",
      },
      backend: {
        title: "Back-end Development",
        body: "Build secure back-end systems with Node.js, .NET, and Java. We cover API integration, cloud infrastructure, and database optimization with enterprise-grade performance.",
      },
      frontend: {
        title: "Front-End Development",
        body: "Craft responsive, WCAG-compliant interfaces with React, Angular, and Vue. We deliver fast, accessible user experiences that boost engagement and conversions.",
      },
      integration: {
        title: "Software Integration Services",
        body: "Accelerate growth with secure connections across ERP, CRM, and cloud apps. Eliminate data silos, automate workflows, and gain real-time visibility with scalable APIs and 24/7 support.",
      },
      maintenance: {
        title: "Software Maintenance and Support",
        body: "Enjoy 24/7 monitoring, proactive maintenance, and feature upgrades. Our solutions ensure strict SLAs for system stability, security, and long-term performance.",
      },
    },
  },

  ai: {
    heading: "AI Innovation Partner for Real Business Impact",
    subtitle:
      "From AI strategy to cloud deployment, we help enterprises build secure, intelligent, and future-ready digital systems.",
    /** Each label is an explicit list of lines — see AI_LABELS in content.ts. */
    labels: {
      nlp: ["NLP & Enterprise", "Search"],
      cv: ["Computer Vision"],
      genai: ["GenAI & LLM", "Engineering"],
      data: ["Data", "Engineering"],
      agentic: ["Agentic AI", "Systems"],
      erp: ["AI for ERP & SAP"],
      predictive: ["Predictive Analytics &", "ML Models"],
      advanced: ["Advanced AI", "Engineering"],
      mlops: ["MLOps & LLMOps"],
    },
  },

  rfp: {
    heading: "Send Your RFP. See It Built in 24 Hours.",
    body: "Skip the sales deck. Our engineers turn your full brief into a working prototype in a single day, so you judge us on a build, not a pitch.",
    cta: "Send Your RFP",
    checklist: [
      "Clickable prototype of your core user flow",
      "Workflow visualization mapping the full system end to end",
      "Architecture direction covering stack, integrations, and scale",
      "Technical recommendation call with our senior engineering team",
    ],
  },

  footer: {
    heading: "Ready to Supercharge Your Team's Software Development Journey?",
    subtitle:
      "Unlock your potential and achieve more with Wesantika. Start your journey today!",
    fields: {
      name: "Name*",
      email: "Email*",
      phone: "Phone number",
      company: "Company*",
      message: "How can we help you?*",
    },
    submit: "Send Message",
    submitting: "Sending…",
    sentMessage: "Thanks — your message has been sent. We'll be in touch shortly.",
    previewLink: "View the delivered email",
    errorGeneric: "Something went wrong. Please try again.",
    errorNetwork: "Could not reach the server. Please check your connection.",
    copyright: "© 2026 Wesantika. All Rights Reserved.",
    privacy: "Privacy Policy",
  },

  about: {
    heroLead:
      "We help organizations transform ideas into scalable digital solutions through AI, cloud technologies, and expert software engineering. We believe lasting success is built through innovation, trusted partnerships, and engineering excellence.",
    title: "About Us",
    blocks: {
      tomorrow: {
        heading: "Engineering Tomorrow. Empowering Businesses Today.",
        body: [
          "Technology evolves every day. But technology alone has never transformed a business. People do. Ideas do.",
          "The courage to innovate does.",
          "At Wesantika, we combine artificial intelligence, cloud technologies, and modern software engineering to help businesses solve meaningful challenges—not simply build software.",
          "Because real innovation isn't measured by the technologies you use.",
          "It's measured by the value you create.",
        ],
        pullQuote: "",
      },
      confidence: {
        heading: "We Don't Just Build Software. We Build Confidence.",
        body: [
          "Every product we develop is designed to help organizations move faster, make smarter decisions, and create new opportunities.",
          "Whether modernizing legacy systems, developing AI-powered platforms, or building entirely new digital products, our mission remains the same:",
        ],
        pullQuote: "To turn ambitious ideas into lasting business impact.",
      },
      purpose: {
        heading: "Technology With Purpose.",
        body: [
          "We believe technology should never exist for its own sake.",
          "Every line of code should solve a problem.",
          "Every AI model should improve human capability.",
          "Every cloud architecture should enable future growth.",
          "Innovation only matters when it creates measurable value for people and businesses.",
          "That belief shapes everything we build.",
        ],
        pullQuote: "",
      },
      partnership: {
        heading: "Partnership Beyond Projects.",
        body: [
          "Great products are never created by a single company.",
          "They are built through trust.",
          "Through collaboration.",
          "Through shared ambition.",
          "We work alongside our clients as long-term technology partners, combining our expertise with their vision to create solutions that continue delivering value long after launch.",
          "Because successful software isn't finished when it's deployed.",
          "It's just getting started.",
        ],
        pullQuote: "",
      },
      talent: {
        heading: "Powered by Global Talent.",
        body: [
          "Innovation has no borders.",
          "We proudly collaborate with talented engineers, designers, researchers, and specialists from around the world, bringing together diverse perspectives to solve complex challenges.",
          "Different experiences.",
          "Different ideas.",
          "One shared commitment to excellence.",
        ],
        pullQuote: "",
      },
    },
    vision: {
      label: "Our Vision",
      statement:
        "To become the technology partner businesses trust when innovation matters most.",
      body: [
        "Not because we use the newest technologies.",
        "But because we know how to transform technology into lasting business success.",
      ],
    },
  },

  /** Services page — Figma 405:2302 */
  servicesPage: {
    metaTitle: "Software Development Services",
    metaDescription:
      "Wesantika delivers full-cycle software development services. Our custom solutions will meet your unique business needs.",
    hero: {
      // Figma 405:1998 reads "At Saigon Technology…" — a competitor's name left
      // in the copy. Corrected here; it still needs fixing in the source file.
      title: "Software Development Services",
      body: "At Wesantika, we specialize in transforming ideas into top-notch software products. We offer software development solutions tailored to your needs, leveraging competitive pricing strategies to drive cost savings. With our dedication and experience, our approach accelerates your time-to-market and sets you apart from the competition.",
      cta: "Let's discuss your needs",
    },
    accelerate: {
      heading: "Accelerate Your Software Development Journey with Wesantika",
      highlights: {
        ai: "AI Development Services",
        custom: "Custom Software Development",
      },
    },
    offer: {
      heading: "Software Development Services We Offer",
      subtitle:
        "Wesantika delivers full-cycle software development services. Our custom solutions will meet your unique business needs.",
      cards: {
        custom: {
          title: "Custom Software Development",
          body: "Our end-to-end software solution delivers tailored features, scalable performance, and full personalization. You will get the competitive advantage you deserve.",
        },
      },
    },
    global: {
      heading: "Global Engineering Teams That Feel Like Your Own",
      intro:
        "Our offshore development model goes beyond providing resources. We build dedicated teams that integrate seamlessly with your workflow, share your goals, and are committed to your long-term success.",
      requiresLead: "Building great software requires more than technical expertise.",
      requiresLabel: "It requires :",
      points: {
        people: "The right people",
        communication: "Clear Communication",
        // Figma 405:2292 reads "Colloboration" — corrected here.
        collaboration: "Seamless Collaboration",
      },
      outro:
        "Our global engineering teams integrate directly into your workflow, helping you accelerate development while maintaining the quality and transparency of an in-house team.",
    },
    why: {
      heading: "Why Choose Wesantika?",
      cta: "Get in Touch with Our Experts",
      items: [
        "Cost-Effective Development",
        "Quick Team Expansion",
        "Skilled Engineers",
        "Clear Communication",
        "Long-Term Partnership",
        "Flexible Collaboration",
        "Modern Technology",
        "Reliable Quality & Security",
      ],
    },
  },

  rail: {
    email: "Email",
    telegram: "Telegram",
    whatsapp: "WhatsApp",
    line: "LINE",
  },
} as const;
