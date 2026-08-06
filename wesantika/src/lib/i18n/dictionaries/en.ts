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

  /**
   * Newsroom — no Figma artboard exists for this page.
   * The entries below are SAMPLE CONTENT so the layout renders meaningfully.
   * Replace them (or swap NEWSROOM_ITEMS for a CMS) before launch.
   */
  newsroom: {
    metaTitle: "Newsroom",
    metaDescription:
      "Announcements, milestones and partnership news from Wesantika.",
    heroTitle: "Newsroom",
    heroBody:
      "Announcements, milestones and partnership news from the team building AI-powered software, cloud platforms and digital systems.",
    featuredLabel: "Latest",
    allCategories: "All",
    readMore: "Read the announcement",
    back: "Back to Newsroom",
    empty: "No announcements in this category yet.",
    categories: {
      company: "Company",
      product: "Product",
      partnership: "Partnership",
    },
    items: {
      "tokyo-office": {
        title: "Wesantika opens an engineering office in Tokyo",
        excerpt:
          "The new office puts delivery leads in the same timezone as our Japanese clients, with the engineering team continuing to work as one distributed group.",
        body: [
          "Wesantika has opened an engineering office in Tokyo. The team there will focus on delivery leadership and client partnership for our growing base of Japanese enterprises, working alongside the wider engineering group rather than as a separate unit.",
          "The move follows two years of steady work with clients in the region. What consistently mattered most to them was not headcount but overlap — being able to reach the people making technical decisions during their own working day. Placing delivery leads in Tokyo closes that gap without fragmenting the engineering organisation.",
          "Our operating model is unchanged. Every project still runs as a single dedicated team with shared standards, shared tooling and one definition of done, wherever the individual engineers happen to sit.",
        ],
      },
      "cloud-partnership": {
        title: "Wesantika becomes a certified cloud delivery partner",
        excerpt:
          "Certification covers architecture review, migration and managed operations, and gives our clients a documented path for enterprise cloud workloads.",
        body: [
          "Wesantika has completed certification as a cloud delivery partner. The programme covers architecture review, migration planning and managed operations, and required our engineers to demonstrate production experience across each area rather than pass an exam.",
          "For clients this changes two practical things. Architecture decisions can now be validated against a published reference framework instead of being argued from first principles on every engagement, and migrations come with a documented operational handover rather than an informal one.",
          "The certification applies to the whole engineering group. It is not a badge held by a specialist team that gets parachuted in at review time.",
        ],
      },
      "ai-platform-ga": {
        title: "Our AI delivery platform reaches general availability",
        excerpt:
          "The internal platform we use to build and operate AI features for clients — evaluation harnesses, prompt versioning and cost tracing — is now available on every engagement.",
        body: [
          "The internal platform our teams use to build and operate AI features has reached general availability and is now part of every AI engagement by default.",
          "It exists because the hard part of shipping AI is rarely the model. It is knowing whether a change made things better, catching a regression before a client does, and being able to explain where the cost went. The platform covers evaluation harnesses, prompt and model versioning, structured tracing and per-feature cost attribution.",
          "None of it is proprietary lock-in. Everything it produces — evaluation sets, traces, configuration — is exportable, and clients keep it whether or not they continue working with us.",
        ],
      },
      "iso-27001": {
        title: "Wesantika achieves ISO/IEC 27001 certification",
        excerpt:
          "Independent certification of our information security management system, covering engineering, delivery and client data handling.",
        body: [
          "Wesantika has been certified against ISO/IEC 27001, the international standard for information security management. The scope covers our engineering practice, delivery operations and the handling of client data.",
          "Certification formalises controls most of our clients had already audited us on individually: access management, secure development lifecycle, incident response and supplier assurance. Having it independently assessed means enterprise procurement can move faster, and smaller clients get the same standard without having to ask for it.",
          "The certification is maintained through annual surveillance audits rather than being a one-time exercise.",
        ],
      },
      "engineering-team-growth": {
        title: "Our engineering team has doubled in twelve months",
        excerpt:
          "Growth has been deliberately slow relative to demand, with every hire joining an existing delivery team rather than forming a new one.",
        body: [
          "Our engineering team has doubled over the past twelve months. That is slower than demand would have allowed, and the pace was deliberate.",
          "Every engineer joined an existing delivery team rather than forming a new one. It is the least efficient way to grow on paper and the only way we have found to keep standards from drifting. New engineers inherit the working habits of a team that already has them, instead of a written process nobody has practised.",
          "The specialisms that grew fastest reflect what clients are asking for: applied AI, data engineering, and platform work supporting both.",
        ],
      },
    },
  },

  /**
   * Blog — no Figma artboard exists for this page either.
   * SAMPLE CONTENT, same caveat as the newsroom.
   */
  blog: {
    metaTitle: "Blog",
    metaDescription:
      "Field notes on AI engineering, cloud platforms and building software with distributed teams.",
    heroTitle: "Blog",
    heroBody:
      "Field notes from our engineers on applied AI, cloud platforms, and what actually happens when distributed teams build software together.",
    featuredLabel: "Featured",
    allCategories: "All",
    readMore: "Read article",
    back: "Back to Blog",
    empty: "No articles in this category yet.",
    /** {minutes} is replaced at render time. */
    readTime: "{minutes} min read",
    categories: {
      engineering: "Engineering",
      ai: "AI",
      design: "Design",
      business: "Business",
    },
    items: {
      "prototype-in-24-hours": {
        title: "How we turn an RFP into a working prototype in 24 hours",
        excerpt:
          "Not a mockup and not a demo script — a clickable prototype running on real architecture. Here is what makes the deadline possible, and what we deliberately leave out.",
        body: [
          "We offer to turn a full brief into a working prototype in a single day. People assume this means a clickable mockup with hardcoded data. It does not, and the difference is the whole point.",
          "What makes the deadline possible is narrowing scope to one flow. We pick the single user journey that carries the most risk — usually the one nobody can describe precisely — and build that end to end on real architecture. Everything else is deliberately left as a stub. A prototype that covers ten flows shallowly teaches you nothing; one flow built properly surfaces every assumption that was wrong.",
          "The second thing that makes it possible is that we do not start from zero. Authentication, deployment, observability and the project skeleton are already solved. The day is spent on the part that is specific to the client, not on scaffolding.",
          "What we leave out is equally deliberate: no design polish beyond the system defaults, no edge cases, no performance work. Judging us on the build means judging the architecture and the thinking, not the pixels.",
        ],
      },
      "llmops-in-production": {
        title: "LLMOps in production: what breaks after the demo",
        excerpt:
          "The demo works. Then the prompt changes, the model version moves, costs triple, and nobody can say which change caused what. The fixes are unglamorous.",
        body: [
          "Almost every AI feature demos well. The interesting failures happen in the weeks afterwards, and they are remarkably consistent across projects.",
          "The first is that nobody can tell whether a change helped. Someone edits a prompt, the output looks better on the three examples they tried, and it ships. Two weeks later a different case has regressed and there is no way to know when. The fix is an evaluation set built from real traffic before the first prompt change, not after the first incident.",
          "The second is silent model drift. A provider updates a model behind the same name and behaviour shifts underneath you. Pinning versions explicitly and treating a version bump as a deployment — with the same evaluation gate as a code change — removes an entire class of mystery.",
          "The third is cost. Costs are almost never distributed the way teams assume: a small number of code paths usually account for most of the spend, and they are rarely the ones anyone was watching. Per-feature attribution turns a scary aggregate number into a short list of things to fix.",
          "None of this is sophisticated. It is versioning, measurement and tracing — the same disciplines that made ordinary software deployable, applied to a component that happens to be non-deterministic.",
        ],
      },
      "legacy-without-freezing": {
        title: "Modernising legacy systems without freezing the roadmap",
        excerpt:
          "The big-bang rewrite fails for reasons that have nothing to do with technology. Incremental migration is slower on paper and faster in practice.",
        body: [
          "Legacy modernisation projects fail in a recognisable pattern. A rewrite is scoped, the roadmap freezes so the two systems do not diverge, the rewrite takes longer than planned, and the business spends a year unable to ship anything while competitors do.",
          "The technology is rarely the reason. The reason is that the plan required the organisation to stop, and organisations cannot stop for a year.",
          "Incremental migration inverts this. New capability is built in the new architecture, existing capability moves across a slice at a time, and the two run side by side behind a routing layer for as long as necessary. Each slice is independently shippable and independently reversible. The roadmap never freezes because there is never a moment where the system is half-migrated and unusable.",
          "It is genuinely slower measured in total engineering hours, and considerably faster measured in time-to-value. It also fails safely: if priorities change midway, you are left with a partially modernised system that works, rather than an abandoned rewrite that does not.",
        ],
      },
      "designing-for-five-locales": {
        title: "Designing one interface for five locales",
        excerpt:
          "German is long, Thai has no spaces, and Inter has no CJK glyphs at all. The constraints show up in the layout long before they show up in the translation file.",
        body: [
          "Supporting multiple languages is usually treated as a translation task. Most of the work is actually layout, and it needs to happen before any copy is written.",
          "Text length is the obvious constraint and the easiest to handle: give every string room to grow, never size a container to its English content, and avoid fixed-width buttons. The failure mode is not ugly wrapping, it is clipped text that nobody notices because nobody on the team reads that language.",
          "Typography is the constraint teams miss. A single webfont almost never covers a multi-script product. Inter is excellent for Latin and covers Vietnamese, but it has no Japanese, Chinese or Thai glyphs whatsoever — the browser silently falls back to whatever the operating system offers, and the design falls apart on exactly the locales nobody tests. Loading a script-appropriate font per locale is not a refinement; it is the difference between a working page and a broken one.",
          "Line breaking is the third. Thai has no spaces between words, and CJK breaks on characters rather than word boundaries. Layouts that depend on predictable wrapping — a two-line heading, a label that must not wrap — need explicit line control rather than a hope that the browser guesses well.",
        ],
      },
      "offshore-teams-mistakes": {
        title: "What most companies get wrong about offshore teams",
        excerpt:
          "The problem is almost never skill or timezone. It is treating the team as a supplier receiving specifications rather than as engineers who own outcomes.",
        body: [
          "When an offshore engagement disappoints, the explanation offered is usually timezone or skill. In our experience it is almost always neither.",
          "The failure is structural: the team is set up to receive specifications rather than to own outcomes. Work arrives as tickets stripped of context, questions travel through an account manager, and engineers are measured on throughput. Under those conditions even excellent engineers produce mediocre software, because the information needed to make good decisions never reaches the people making them.",
          "The teams that work are set up the opposite way. They join the same standups, see the same customer feedback, and are expected to push back on requirements they think are wrong. The relationship looks less like a vendor arrangement and more like a team that happens to be in another building.",
          "Timezone overlap matters, but far less than people expect — four hours is plenty when the team has enough context to make decisions without asking. It matters enormously when they do not.",
        ],
      },
      "retrieval-that-works": {
        title: "Retrieval that actually works: notes from enterprise search",
        excerpt:
          "Vector search over chunked documents is where most enterprise RAG projects start and stall. The gap between demo and useful is mostly unglamorous data work.",
        body: [
          "Enterprise search projects tend to follow the same arc. Documents are chunked, embedded and indexed, the demo answers three prepared questions impressively, and then real users arrive and find it unreliable.",
          "The most common cause is that the chunks are wrong. Fixed-size splitting cuts tables in half, separates headings from the content they describe, and produces fragments that are individually meaningless. Chunking along the document's actual structure — sections, tables, list items — usually improves results more than any change to the model.",
          "The second cause is that pure vector similarity is a poor match for how people search internally. Employees search for exact identifiers: a part number, a policy code, a customer name. Embeddings are bad at exact matches by design. Hybrid retrieval — keyword and vector together — fixes a category of failure that no amount of embedding tuning will.",
          "The third is that permissions are usually retrofitted, which is both a security problem and a quality one. Filtering results after retrieval means the ranking was computed over documents the user cannot see, so the results they do get are worse than they should be.",
          "None of this is about model choice. It is data modelling, and it is where the time goes.",
        ],
      },
    },
  },

  rail: {
    email: "Email",
    telegram: "Telegram",
    whatsapp: "WhatsApp",
    line: "LINE",
  },
} as const;
