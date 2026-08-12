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
    technologies: "Technologies",
    contact: "Contact Us",
    openMenu: "Toggle navigation",
    languageLabel: "Change language",
    comingSoon: "Coming soon",
  },

  hero: {
    title: "Software that works on its worst day.",
    subtitle:
      "AI, cloud and custom software engineering for teams who need a production system, not a prototype. Every engagement starts with the constraints — then we design backwards from them.",
  },

  services: {
    heading: "Our Full-Range Services",
      /** Rendered in the brand colour; must be a substring of heading. */
      headingAccent: "Services",
    cta: "See Service Details",
    categories: {
      custom: "Custom Software Development",
      offshore: "Offshore & Outsourcing",
      ai: "AI Development",
      qa: "QA Testing",
      infrastructure: "Infrastructure",
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
      outsourcing: {
        title: "Software Development Outsourcing",
        body: "We have five outsourcing models. By outsourcing software development in Vietnam, you can focus on your core business while accelerating time-to-market.",
      },
      offshoreTeams: {
        title: "Offshore Development Solutions",
        body: "Interview elite developers today. Our team offers high-quality offshore software in Vietnam at a reasonable cost.",
      },
      aiDevelopment: {
        title: "AI Development Services",
        body: "By combining cutting-edge AI with machine learning, we can create smart software that can streamline business operations and enhance decision-making. Let us transform your business into a realm of efficiency and innovation.",
      },
      generativeAi: {
        title: "Generative AI Integration Services",
        body: "Integrate generative AI into your products to automate workflows. We personalize experiences, reduce costs, and scale securely with enterprise compliance.",
      },
      qaTesting: {
        title: "Software QA Testing Services",
        body: "Get manual and automated QA with Selenium, Cypress, and CI/CD. The tests cover functional, security, and performance, ensuring faster releases and reduced risk.",
      },
      itServices: {
        title: "IT Services",
        body: "We operate as your fully outsourced IT partner or an expert extension of your team, reducing downtime, optimizing performance, and delivering measurable business outcomes.",
      },
      devops: {
        title: "DevOps Development Services",
        body: "By combining cutting-edge AI with machine learning, we can create smart software that can streamline business operations and enhance decision-making. Let us transform your business into a realm of efficiency and innovation.",
      },
      cloudMigration: {
        title: "Cloud Migration Services",
        body: "Migrate workloads to AWS, Azure, and GCP using rehost, replatform, and refactor strategies. We ensure minimal downtime, compliance, cost efficiency, and scalability.",
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

  contact: {
    metaTitle: "Contact Us",
    metaDescription:
      "Tell us what you are building. Send a message, open a direct channel, or submit an RFP - and we will come back with a real answer, not a brochure.",
    heroTitle: "Let's talk about what you're building",
    heroBody:
      "Whether you have a signed-off specification or a problem you cannot yet name, the first conversation is the same: what needs to be true for this to work?",
    paths: {
      heading: "Two ways in",
      message: {
        title: "Send a message",
        body: "Best for early conversations - scoping, feasibility, or a question you want a straight answer to.",
        cta: "Write to us",
      },
      rfp: {
        title: "Submit an RFP",
        body: "Best when requirements, timeline and budget are already defined. Attach the document and we will respond against it.",
        cta: "Send your RFP",
      },
    },
    form: {
      heading: "Send us a message",
      body: "The more you can tell us about the problem, the more useful our first reply will be.",
    },
    channels: {
      heading: "Or reach us directly",
      body: "We answer on whichever channel you start on.",
    },
    office: {
      heading: "Head office",
      mapLink: "Open in Google Maps",
    },
    next: {
      heading: "What happens next",
      steps: {
        reply: {
          title: "A human reads it",
          body: "Your message goes to an engineer, not a queue. Expect a reply within one business day.",
        },
        call: {
          title: "A short scoping call",
          body: "Thirty minutes to understand the problem, the constraints, and whether we are the right people for it.",
        },
        proposal: {
          title: "A written proposal",
          body: "Scope, approach, team shape and cost - in writing, so you can compare it against anyone else's.",
        },
      },
    },
    global: {
      heading: "We work across time zones",
      body: "Our engineers sit in multiple markets and overlap with European, Asian and North American working hours. Tell us where you are and we will meet you inside your day, not ours.",
    },
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
    /** Footer link-column headings. */
    navHeading: "Explore",
    servicesHeading: "Services",
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
    detailLabel: "DETAIL",
    metaTitle: "Software Development Services",
    metaDescription:
      "Wesantika delivers full-cycle software development services. Our custom solutions will meet your unique business needs.",
    hero: {
      // Figma 405:1998 reads "At Saigon Technology…" — a competitor's name left
      // in the copy. Corrected here; it still needs fixing in the source file.
      title: "Software Development Services",
      body: "At Wesantika, we specialize in transforming ideas into top-notch software products.",
      /** The rest of the original paragraph, rendered under the hero. */
      bodyMore: "We offer software development solutions tailored to your needs, leveraging competitive pricing strategies to drive cost savings. With our dedication and experience, our approach accelerates your time-to-market and sets you apart from the competition.",
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
          body: "We tailor software development to your business needs, developing back-end, front-end, and custom integrations. Our solutions give your business an edge, helping you stay ahead in a fast-changing market.",
        },
        web: {
          title: "Web Application Development",
          body: "Define your business objectives, and we will craft a web application to achieve them. Our web development, agile project management, and web trend skills guarantee a high-ROI app that users will value. Our dedicated team ensures your web apps are equipped with modern, secure, and scalable solutions.",
        },
        mobile: {
          title: "Mobile App Development",
          body: "We conduct in-depth market research to create user-focused designs that help you stand out in a dynamic market. We build native and cross-platform applications designed for stable performance. Our strategy accelerates app launches, enhancing your competitive edge and fostering business growth.",
        },
        ai: {
          title: "AI Development Services",
          body: "The AI industry is still emerging, which makes in-house experts hard to find. We offer AI-integrated solutions to help you solve business challenges, automate tasks, and improve decision-making. Our support starts with a PoC or MVP to test ideas. This approach reduces risks and ensures success in the market.",
        },
        product: {
          title: "Software Product Development",
          body: "Our dedication to innovation and enhancement steers the process from concept to launch. The journey includes user-focused design and detailed features. Our process ensures your software is reliable. Support and maintenance continue after the launch, keeping your project running well.",
        },
        enterprise: {
          title: "Enterprise Software Development",
          body: "Enterprise software development must enhance how your business operates. Tailored solutions that boost efficiency and help your team work better are essential. Our focus is on aligning your software with your business goals, leading to improved operations and a stronger business.",
        },
        saas: {
          title: "SaaS Application Development",
          body: "Experienced vendors are essential for successfully delivering long-term and complex SaaS projects. Wesantika's seasoned engineers provide expert help, backed by over 12 years of experience. We create robust, intuitive SaaS solutions that empower modern businesses and drive the business forward with high-quality apps.",
        },
        hire: {
          title: "Hire Software Developers",
          body: "Our developers bring extensive experience from outsourcing environments, having participated in many global projects across various industries. Our team is adept at navigating challenges in any sector. Strong English skills and cultural knowledge help us interact with clients worldwide.",
        },
        qa: {
          title: "Software QA Testing Services",
          body: "Our QA team thoroughly tests every feature and function using a combination of automated and manual techniques. The team conducts stability checks during UAT before the release. Our QA engineers ensure high-quality software delivery on time, meeting global standards.",
        },
        integration: {
          title: "Software Integration Services",
          body: "Connect your apps, data, and devices with secure, scalable integrations - APIs, ERP/CRM, and cloud. Eliminate silos, automate workflows, and speed delivery.",
        },
        mvp: {
          title: "MVP Software Development",
          body: "MVP development helps you test your ideas quickly. We build only the most essential features. This lets you gather user feedback early. It saves time and helps refine your product without wasting resources.",
        },
        poc: {
          title: "PoC Development Services",
          body: "Our software development services deliver PoC development that proves your ideas' viability. We help you check before full development begins. This reduces risks and helps you decide the best path forward.",
        },
        devops: {
          title: "DevOps Development Services",
          body: "DevOps services connect development and operations. Our DevOps team accelerates software delivery and automates tasks to streamline workflows. By incorporating cutting-edge security tools, we greatly boost both efficiency and speed.",
        },
        cloud: {
          title: "Cloud Migration Services",
          body: "Moving your data and applications to the cloud is vital for modern software development. Cloud migration services help make this process smooth. Your data is secure, and your applications are ready for the cloud.",
        },
        backend: {
          title: "Back-end Development Services",
          body: "A robust back-end is crucial for your software. We focus on building strong server-side logic, incorporating advanced programming techniques to create efficient and reliable back-end systems. Database management gives your applications a solid foundation.",
        },
        frontend: {
          title: "Front-End Development Services",
          body: "We create user-friendly interfaces that excel in both aesthetics and functionality, designing eye-catching websites and responsive apps with a great UI. These interfaces keep users engaged and improve their experience.",
        },
        maintenance: {
          title: "Software Maintenance and Support",
          body: "Keeping your software up to date is essential. Our custom software development includes maintenance and support. Your applications stay in top shape so they can keep up with your changing business needs.",
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
  serviceDetails: {
    ai: {
      metaTitle: "AI Development Services",
      metaDescription: "Our end-to-end menu of AI development services, from discovery and data engineering through LLM applications, MLOps and integration.",
      eyebrow: "Services",
      title: "Our AI Development Services",
      intro: [
        "Below is our end-to-end menu of artificial intelligence development services. Each service is structured to help decision-makers de-risk implementation while enabling fast delivery. If you need a full-cycle AI software development company for **PoC** → **MVP** → **production**, this is the typical engagement path.",
      ],
      cards: [
        {
          title: "AI Discovery & Feasibility",
          body: "Our AI project discovery phase turns ideas into a buildable plan. We run use-case selection, ROI modeling, and data readiness assessment, then define acceptance criteria. Deliverables include requirements, KPI baselines, architecture, and a risk register that covers compliance, model risk, and integration dependencies.",
        },
        {
          title: "Data Engineering for AI",
          body: "Strong AI starts with reliable data pipelines. We handle data acquisition & preparation, training data preprocessing, governance, and feature pipelines, often including data audit and data quality validation checks. Deliverables include a data model, lineage documentation, validation rules, and scalable processing for ETL pipelines and big data workloads.",
        },
        {
          title: "Custom ML Model Development",
          body: "We build and validate machine learning models for forecasting, classification, recommendations, and anomaly detection. You receive transparent model performance reporting, training and validation artifacts, and explainability planning (XAI or white-box AI models when required). Deliverables include metrics, documentation, and deployment-ready model packages.",
        },
        {
          title: "LLM Application Development",
          body: "Our AI application development services focus on LLM products that work in real workflows: retrieval augmented generation (RAG), copilots, summarization, and content intelligence. We implement guardrails, prompt/version control, and evaluation harnesses for accuracy and hallucination control. Deliverables include test suites, security controls, and production app architecture.",
        },
        {
          title: "Agentic Workflows (when appropriate)",
          body: "Agentic AI development enables multi-step automation with tool use, approvals, and audit trails. We design agentic workflows with human-in-the-loop checkpoints, access controls, and rollback paths. Deliverables include workflow maps, permissions design, safety constraints, and operational runbooks for reliable execution.",
        },
        {
          title: "MLOps / LLMOps & Productionization",
          body: "We productionize with CI/CD, monitoring, drift detection, and model retraining and updates. This includes AIOps patterns and cloud and MLOps ecosystems such as MLflow and Kubeflow when appropriate. Deliverables include dashboards, alerting, runbooks, and operational support options so the system remains reliable and cost-controlled.",
        },
        {
          title: "Integration & Modernization",
          body: "AI fails when it's isolated. We integrate AI with your apps and data stack through APIs, event-driven workflows, and enterprise AI platforms. Deliverables include integration specifications, security controls (data encryption, identity), test plans, and change management support for teams adopting AI-powered business solutions.",
        },
      ],
      cta: "Reach Out to Our Specialists",
    },
    custom: {
      metaTitle: "Full-Stack Custom Software Development Services",
      metaDescription: "From discovery and architecture through production support, our custom software development services cover the full lifecycle.",
      eyebrow: "Services",
      title: "Full-Stack Custom Software Development Services",
      intro: [
        "From discovery and architecture through production support, our custom software development services cover the full lifecycle. Each service below is a live capability staffed by senior engineers and tech leads, not a marketing line item.",
        "Most clients start with one service and expand into custom software development solutions that span multiple disciplines - an AI feature delivered on top of an existing SaaS platform, or a legacy modernization paired with a new mobile front-end. We staff the right mix of seniors, mid-levels, and specialists for each phase, and we don't bill for ramp-up time we can't justify.",
      ],
      cards: [
        {
          title: "End-to-End Software Development",
          body: "Requirements, **ui/ux design**, build, test, deploy, and maintain, with senior architects on every project.",
        },
        {
          title: "AI Development Services",
          body: "**Computer vision**, NLP, and machine learning and deep learning systems trained on your data and deployed to your cloud.",
        },
        {
          title: "Generative AI Integration Services",
          body: "LLM-powered features (chat, search, summarization) and **agentic AI** workflows with cost controls and prompt versioning.",
        },
        {
          title: "Enterprise Custom Software Development",
          body: "ERP, CRM, and back-office systems that integrate with your existing stack and business processes.",
        },
        {
          title: "Web Application Development",
          body: "React, Angular, and Vue web apps with WCAG 2.1 accessibility and performance budgets defined per project.",
        },
        {
          title: "Mobile App Development",
          body: "Native iOS/Android plus React Native and Flutter cross-platform apps.",
        },
        {
          title: "MVP / PoC Development",
          body: "Validate market fit through **software prototyping** and **product ideation** in 8-12 weeks, without burning runway on the wrong tech stack.",
        },
        {
          title: "SaaS Application Development",
          body: "Multi-tenant **cloud-based designs** on AWS, Azure, or GCP with usage-based billing built in.",
        },
        {
          title: "Legacy Application Modernization",
          body: "Incremental migration of **legacy systems** to cloud-native infrastructure. No big-bang rewrites, no frozen roadmaps.",
        },
        {
          title: "API Development and Integration Services",
          body: "REST, GraphQL, and gRPC APIs with rate limiting, versioning, and OpenAPI documentation.",
        },
        {
          title: "Software Integration Services",
          body: "API, ESB, and event-driven integrations across ERP, CRM, data warehouses, and identity providers.",
        },
        {
          title: "Front-End Development",
          body: "Accessible, responsive interfaces in React, Angular, or Vue with design-system handoff.",
        },
        {
          title: "DevOps & Cloud Services",
          body: "CI/CD pipelines, IaC, **cloud and multicloud** environments, and **post-deployment maintenance** for fast, reliable releases.",
        },
        {
          title: "Software Maintenance and Support",
          body: "24/7 monitoring, SLA-backed bug fixing, and update services on a fixed monthly fee.",
        },
      ],
      cta: "Discuss Your Unique Needs",
    },

    web: {
      metaTitle: "Web Application Development Services",
      metaDescription:
        "Secure, scalable web applications built with React, Angular and Vue on .NET, Java, Python and Node back ends.",
      eyebrow: "Services",
      title: "Our Web Application Development Services",
      intro: [
        "We build web applications that hold up under real load and real users - not demos that fall over the first time traffic arrives. Every engagement starts by agreeing what the application must do on its worst day, then designing backwards from that.",
        "Front end and back end are staffed as one team. That sounds obvious and is unusually rare: most delays we inherit come from a contract boundary drawn between the two, where each side is technically finished and the product still does not work.",
      ],
      cards: [
        {
          title: "Custom Web Application Development",
          body: "Line-of-business applications built to your workflow rather than bent around a product's assumptions. **React, Angular or Vue** on the front, **.NET, Java, Python or Node** behind it.",
        },
        {
          title: "Web Portals & Self-Service",
          body: "Customer, partner and employee portals with **role-based access**, audit trails and SSO. The permission model is designed first, because retrofitting one is a rewrite.",
        },
        {
          title: "Progressive Web Apps",
          body: "**Installable, offline-capable** web apps for teams working in warehouses, clinics and vehicles where the network is not a given.",
        },
        {
          title: "Responsive & Accessible Front Ends",
          body: "Interfaces that work on the devices your users actually carry, built to **WCAG AA** and verified by measurement rather than assumed.",
        },
        {
          title: "API Design & Integration",
          body: "**REST, GraphQL and event-driven** interfaces, plus the connections to the ERP, CRM and payment systems the application has to live alongside.",
        },
        {
          title: "Performance & Load Engineering",
          body: "Profiling, caching strategy, query tuning and **load baselines** established before launch, so capacity is a number rather than a hope.",
        },
      ],
      cta: "Discuss Your Web Application",
    },

    mobile: {
      metaTitle: "Mobile App Development Services",
      metaDescription:
        "Native and cross-platform iOS and Android apps in Swift, Kotlin, React Native and Flutter, from prototype to store release.",
      eyebrow: "Services",
      title: "Our Mobile App Development Services",
      intro: [
        "Native or cross-platform is a decision with consequences, not a preference. We make it with you early, against your performance needs, device features and how many releases a year you intend to ship - and we will say when cross-platform is the wrong answer.",
        "Store release is treated as part of the build, not a task that appears after it. Review guidelines, entitlements, privacy manifests and staged rollout are planned in the first sprint, which is where most first-time submissions are actually lost.",
      ],
      cards: [
        {
          title: "iOS & Android Native",
          body: "**Swift and Kotlin** where platform APIs, performance or hardware access make native the honest choice.",
        },
        {
          title: "Cross-Platform Development",
          body: "**React Native and Flutter** for products where a shared codebase genuinely pays - typically content, commerce and workflow apps.",
        },
        {
          title: "Mobile UX & Prototyping",
          body: "Journey mapping and **clickable prototypes** tested with real users before a line of production code is written.",
        },
        {
          title: "Offline-First & Sync",
          body: "**Local-first data with conflict resolution** for field teams, logistics and clinical settings where connectivity drops.",
        },
        {
          title: "AI & IoT-Connected Apps",
          body: "On-device and cloud inference, plus **BLE and MQTT** device connectivity for products where the phone is a controller, not just a screen.",
        },
        {
          title: "Release & Post-Launch Support",
          body: "Store submission, **staged rollout, crash analytics** and the OS-version maintenance that keeps an app shippable for years.",
        },
      ],
      cta: "Discuss Your Mobile Product",
    },

    product: {
      metaTitle: "Software Product Development Services",
      metaDescription:
        "End-to-end product development from idea validation and architecture through launch, iteration and long-term ownership.",
      eyebrow: "Services",
      title: "Our Software Product Development Services",
      intro: [
        "Product development is different from project delivery. There is no fixed scope to sign off against - only a hypothesis, a market, and a series of decisions that get cheaper the earlier you make them. We staff for that: senior engineers who can argue about scope, not only implement it.",
        "We work in the open. You see the same board, the same metrics and the same problems we do, because a product team that hides its uncertainty from its client makes worse decisions than one that does not.",
      ],
      cards: [
        {
          title: "Product Discovery & Feasibility",
          body: "Stakeholder interviews, **feature prioritisation** and a scoped roadmap that says what you are not building as clearly as what you are.",
        },
        {
          title: "Architecture & Technical Strategy",
          body: "Stack selection, **data model and integration boundaries** chosen for where the product is going, not only where it starts.",
        },
        {
          title: "UX & Interface Design",
          body: "Research-led design and a **component system** the engineering team can actually build against, in your brand.",
        },
        {
          title: "Agile Delivery",
          body: "Two-week increments with working software at the end of each. **In-sprint QA**, so 'done' means shippable.",
        },
        {
          title: "Product Modernisation",
          body: "Bringing an existing product back to a state where features can ship again - **incrementally, without freezing the roadmap**.",
        },
        {
          title: "Scale & Long-Term Ownership",
          body: "Capacity planning, observability and the **SLA-backed support** that keeps a maturing product stable while it keeps changing.",
        },
      ],
      cta: "Discuss Your Product",
    },

    enterprise: {
      metaTitle: "Enterprise Software Development Services",
      metaDescription:
        "Enterprise platforms built for compliance, integration and scale, with the governance large organisations require.",
      eyebrow: "Services",
      title: "Our Enterprise Software Development Services",
      intro: [
        "Enterprise software is rarely hard because the features are hard. It is hard because of everything the system must respect: existing data, existing processes, existing obligations, and a change-control regime that does not bend for a delivery date.",
        "We plan around those constraints from the first week rather than discovering them at UAT. That means security review, integration contracts and data ownership are on the schedule alongside the features.",
      ],
      cards: [
        {
          title: "Enterprise Platform Development",
          body: "Multi-tenant, **role-aware platforms** with the audit trails and configurability that large organisations need to operate them.",
        },
        {
          title: "ERP & CRM Extension",
          body: "Building on top of **SAP, Dynamics and Salesforce** where the standard product stops short, without forking it beyond upgrade.",
        },
        {
          title: "Legacy Modernisation",
          body: "Moving aging systems to **cloud-native architecture a slice at a time** - no big-bang migration, no frozen roadmap, no production outage.",
        },
        {
          title: "Security & Compliance Engineering",
          body: "**Threat modelling, access control and evidence trails** designed for the standard you actually report against.",
        },
        {
          title: "Data Platforms & Reporting",
          body: "Warehousing, **ETL/ELT pipelines** and reporting layers that give one answer to a question instead of four.",
        },
        {
          title: "Governance & Handover",
          body: "Architecture decision records, runbooks and **structured knowledge transfer** so your team can own what we built.",
        },
      ],
      cta: "Discuss Your Enterprise Programme",
    },

    saas: {
      metaTitle: "SaaS Application Development Services",
      metaDescription:
        "Multi-tenant SaaS platforms with billing, provisioning and compliance built in from the first release.",
      eyebrow: "Services",
      title: "Our SaaS Application Development Services",
      intro: [
        "The parts of a SaaS product that decide whether it can scale are rarely the parts that get demoed. Tenancy model, billing, provisioning and permissions are structural: cheap to design early and expensive to change once customers are on the platform.",
        "So we design those first, then build features on top of them. It is a slower first month and a considerably faster second year.",
      ],
      cards: [
        {
          title: "SaaS Architecture & Tenancy",
          body: "Choosing and building the **isolation model** - shared, siloed or hybrid - against your compliance needs and unit economics.",
        },
        {
          title: "Billing & Subscription Management",
          body: "Plans, metering, trials, proration and dunning, with **revenue events** you can actually reconcile.",
        },
        {
          title: "Onboarding & Provisioning",
          body: "**Self-service signup, tenant provisioning and SSO** so sales does not depend on an engineer being available.",
        },
        {
          title: "Third-Party Integrations",
          body: "The connectors customers ask about in procurement, plus a **webhook and API surface** partners can build on.",
        },
        {
          title: "Reliability & Observability",
          body: "**AWS, Azure and Kubernetes** deployments with the monitoring and error budgets behind a credible uptime commitment.",
        },
        {
          title: "Ongoing Support & Iteration",
          body: "Release trains, **feature flags** and staged rollout, so shipping to a live customer base stops being an event.",
        },
      ],
      cta: "Discuss Your SaaS Platform",
    },

    hire: {
      metaTitle: "Hire Dedicated Developers",
      metaDescription:
        "Senior engineers who join your team, your standards and your standups - not a black box behind an account manager.",
      eyebrow: "Services",
      title: "Hire Dedicated Developers",
      intro: [
        "Most disappointing offshore engagements fail structurally, not technically. The team is set up to receive specifications rather than own outcomes, context arrives stripped from tickets, and questions travel through an account manager. Good engineers produce mediocre software under those conditions.",
        "We staff the opposite way. Our engineers join your standups, see your customer feedback, and are expected to push back on requirements they think are wrong.",
      ],
      cards: [
        {
          title: "Dedicated Development Teams",
          body: "A standing team with its own tech lead, working your backlog under **your definition of done**.",
        },
        {
          title: "Team Augmentation",
          body: "Individual engineers embedded into your existing team, **reporting to your leads** rather than around them.",
        },
        {
          title: "Specialist Roles",
          body: "AI/ML engineers, data engineers, DevOps, QA automation and **solution architects** for the gaps that are hardest to hire for.",
        },
        {
          title: "Timezone Overlap",
          body: "Working hours arranged for **real overlap with your team** - four hours is plenty when the team has enough context to decide without asking.",
        },
        {
          title: "Vetting & Onboarding",
          body: "Every engineer holds a degree in IT or engineering and is **technically assessed by our own seniors** before being proposed.",
        },
        {
          title: "Scaling Up & Down",
          body: "Adding or releasing capacity on a **defined notice period**, without renegotiating the whole engagement.",
        },
      ],
      cta: "Talk to Us About Your Team",
    },

    qa: {
      metaTitle: "QA & Software Testing Services",
      metaDescription:
        "Manual and automated testing, performance and security validation, embedded in delivery rather than bolted on at the end.",
      eyebrow: "Services",
      title: "Our QA & Testing Services",
      intro: [
        "Testing at the end of a project finds the cheapest bugs late and the expensive ones never. We put QA inside the sprint, where a defect costs an afternoon instead of a release.",
        "What we automate is a deliberate choice, not a target. Automating an unstable interface produces a suite nobody trusts, and a suite nobody trusts is worse than no suite at all.",
      ],
      cards: [
        {
          title: "Test Strategy & Planning",
          body: "Risk-based coverage that puts effort where **failure actually costs something**, with entry and exit criteria agreed up front.",
        },
        {
          title: "Manual & Exploratory Testing",
          body: "Structured exploration by testers who understand the domain - **the only reliable way to find what nobody specified**.",
        },
        {
          title: "Test Automation",
          body: "**Selenium, Playwright and Cypress** suites built at the layer that stays stable, integrated into CI so results arrive with the pull request.",
        },
        {
          title: "API & Integration Testing",
          body: "Contract and end-to-end validation across services with **Postman and REST Assured**, including the failure paths.",
        },
        {
          title: "Performance & Load Testing",
          body: "**Baselines, soak tests and capacity limits** measured before launch, so scaling decisions are informed by numbers.",
        },
        {
          title: "Security Testing",
          body: "**OWASP-aligned** vulnerability assessment and dependency scanning as part of the pipeline, not an annual event.",
        },
      ],
      cta: "Discuss Your QA Needs",
    },

    integration: {
      metaTitle: "Software Integration Services",
      metaDescription:
        "Connecting ERP, CRM, cloud and legacy systems with APIs, event streams and middleware that survive change.",
      eyebrow: "Services",
      title: "Our Software Integration Services",
      intro: [
        "Integration work is where undocumented assumptions surface. Two systems each behave correctly on their own and disagree about what a customer is, when a day ends, or whether a cancelled order still counts. Most of the effort is resolving that, not moving data.",
        "We design integrations to fail safely and visibly. A silent integration is worse than a broken one, because nobody finds out until the numbers have been wrong for a quarter.",
      ],
      cards: [
        {
          title: "API Development & Integration",
          body: "**REST, GraphQL and gRPC** interfaces with versioning and contracts, so a change on one side does not break the other.",
        },
        {
          title: "Enterprise Application Integration",
          body: "Connecting **ERP, CRM and HR systems** into a coherent flow, with one agreed source of truth per entity.",
        },
        {
          title: "Legacy System Integration",
          body: "Bringing **SOAP, file-drop and database-level** interfaces into a modern architecture without rewriting the system behind them.",
        },
        {
          title: "Event-Driven & Real-Time",
          body: "**Kafka and message queues** for the cases where data has to move as it happens, with replay and idempotency designed in.",
        },
        {
          title: "Data Integration & Migration",
          body: "**ETL/ELT pipelines**, reconciliation and cutover planning, including how you verify nothing was lost.",
        },
        {
          title: "Regulated Interfaces",
          body: "**HL7/FHIR, EDI and payment** integrations built to the standard and the audit expectations that come with it.",
        },
      ],
      cta: "Discuss Your Integration",
    },

    mvp: {
      metaTitle: "MVP Development Services",
      metaDescription:
        "A working first version built to test the riskiest assumption, on architecture that survives if the answer is yes.",
      eyebrow: "Services",
      title: "Our MVP Development Services",
      intro: [
        "An MVP is an experiment with a budget. Its job is to answer one question that cannot be answered by discussion - usually whether anyone will actually use the thing. Everything not serving that question is deferred, deliberately and on the record.",
        "We build MVPs on architecture that can survive success. Throwaway prototypes are cheaper right up until the moment the experiment works and the team has to start again.",
      ],
      cards: [
        {
          title: "Scope & Hypothesis Definition",
          body: "Naming the **riskiest assumption** and agreeing the evidence that would settle it, before deciding what to build.",
        },
        {
          title: "Feature Prioritisation",
          body: "**MoSCoW and Kano** applied honestly, with an explicit not-now list so deferred scope is deferred rather than forgotten.",
        },
        {
          title: "Prototype & Validation",
          body: "**Clickable prototypes** tested with real users, which regularly kills features before they cost anything.",
        },
        {
          title: "Web & Mobile MVP Build",
          body: "A working product in **weeks, not quarters** - real architecture, real data, real deployment.",
        },
        {
          title: "AI-Enabled MVP",
          body: "Validating **LLM and ML features** with cost controls and evaluation in place, so the demo and production behave the same.",
        },
        {
          title: "Measure, Iterate, Scale",
          body: "Instrumentation from day one, then **hardening the parts that earned it** rather than everything at once.",
        },
      ],
      cta: "Discuss Your MVP",
    },

    poc: {
      metaTitle: "Proof of Concept Development Services",
      metaDescription:
        "Short, focused builds that answer a technical feasibility question with evidence instead of opinion.",
      eyebrow: "Services",
      title: "Our Proof of Concept Services",
      intro: [
        "A PoC exists to retire risk. It answers one technical question - can this integrate, will it perform, is the data good enough - and it is finished the moment the question is answered, not when it looks presentable.",
        "We keep them to two to eight weeks and end with a written decision pack: what we tried, what happened, and what we would do differently at full scale. A PoC that produces only a working demo has wasted half its value.",
      ],
      cards: [
        {
          title: "Technical Feasibility PoC",
          body: "Building **the riskiest path first** to find out whether the approach holds, while it is still cheap to change.",
        },
        {
          title: "AI & Data Feasibility",
          body: "Testing whether your **data is actually sufficient** for the model you have in mind - the question that decides most AI projects.",
        },
        {
          title: "Integration Spikes",
          body: "Proving a connection to a **third-party or legacy system** end to end before it becomes a dependency in a plan.",
        },
        {
          title: "Performance Baselines",
          body: "**Measured throughput and latency** under representative load, so capacity assumptions stop being guesses.",
        },
        {
          title: "Compliance & Data-Handling Proofs",
          body: "Demonstrating that a design can meet **residency, retention and access** obligations before it is built on.",
        },
        {
          title: "Decision Pack & Handover",
          body: "Findings, risks and a **recommended path to MVP** - written up so the decision survives the people who made it.",
        },
      ],
      cta: "Discuss Your Proof of Concept",
    },

    devops: {
      metaTitle: "DevOps Services",
      metaDescription:
        "CI/CD, infrastructure as code and observability that make releases routine instead of an event.",
      eyebrow: "Services",
      title: "Our DevOps Services",
      intro: [
        "The measure of a DevOps engagement is not how many tools are running. It is whether an engineer can ship a small change on a Friday without a meeting - and whether you would know within minutes if it went wrong.",
        "We work towards that on your existing stack. Replacing a pipeline that people understand with a better one they do not is a common and expensive mistake.",
      ],
      cards: [
        {
          title: "CI/CD Pipelines",
          body: "**Jenkins, GitHub Actions and GitLab CI** pipelines with real quality gates, so merging is the risky step rather than deploying.",
        },
        {
          title: "Infrastructure as Code",
          body: "**Terraform and CloudFormation** so environments are reproducible and drift is visible instead of discovered.",
        },
        {
          title: "Containers & Orchestration",
          body: "**Docker and Kubernetes** sized to what you actually run - including advising against Kubernetes when it is not warranted.",
        },
        {
          title: "Observability",
          body: "**Metrics, structured logs and tracing** wired to alerts that correspond to user-visible problems, not to CPU graphs.",
        },
        {
          title: "Release Engineering",
          body: "**Blue-green and canary rollout**, feature flags and a rollback that has been rehearsed rather than assumed.",
        },
        {
          title: "Security in the Pipeline",
          body: "**Secrets management, dependency and image scanning** as pipeline stages, so problems surface at commit time.",
        },
      ],
      cta: "Discuss Your Delivery Pipeline",
    },

    cloud: {
      metaTitle: "Cloud Migration Services",
      metaDescription:
        "Assessment, migration and optimisation across AWS, Azure and Google Cloud, planned around continuity.",
      eyebrow: "Services",
      title: "Our Cloud Migration Services",
      intro: [
        "Most cloud migrations disappoint for the same reason: the workload moved but nothing about it changed, so the bill went up and the architecture stayed brittle. Lift-and-shift is sometimes the right first step - it is rarely the right last one.",
        "We plan migrations around continuity. Every wave has a rollback, a validation step, and a defined answer to what happens if the cutover window closes with work unfinished.",
      ],
      cards: [
        {
          title: "Assessment & Migration Strategy",
          body: "Application inventory, dependency mapping and a **wave plan** with a business case per workload rather than one for the programme.",
        },
        {
          title: "Application Migration",
          body: "Rehost, replatform or refactor, **chosen per workload** on cost, risk and how much life the application has left.",
        },
        {
          title: "Database Migration",
          body: "**Schema conversion, replication and cutover** with reconciliation, including the read-only window and how you shorten it.",
        },
        {
          title: "Cloud-Native Rearchitecture",
          body: "Managed services, **autoscaling and event-driven** patterns for the workloads where the economics justify the change.",
        },
        {
          title: "Cost Optimisation",
          body: "Rightsizing, commitment planning and **per-service cost attribution**, so spend is attached to something you can act on.",
        },
        {
          title: "Post-Migration Operations",
          body: "**Monitoring, backup, DR testing** and the runbooks your team needs to operate the platform after we step back.",
        },
      ],
      cta: "Discuss Your Migration",
    },

    backend: {
      metaTitle: "Back-End Development Services",
      metaDescription:
        "APIs, data models and services built for correctness under load, in .NET, Java, Python and Node.",
      eyebrow: "Services",
      title: "Our Back-End Development Services",
      intro: [
        "Back-end work is where correctness is decided. A front end can be redesigned in a sprint; a data model that got the domain wrong is felt for years, in every feature built on top of it.",
        "So we spend disproportionate time on the model and the contracts before writing services against them - and we would rather have that argument in week one than in year two.",
      ],
      cards: [
        {
          title: "API & Service Development",
          body: "**REST, GraphQL and gRPC** services with versioning, pagination and error semantics that clients can rely on.",
        },
        {
          title: "Data Modelling & Databases",
          body: "**PostgreSQL, SQL Server, MySQL and MongoDB** schemas designed around real access patterns, with indexing and migrations planned.",
        },
        {
          title: "Mobile & Web Back Ends",
          body: "**Auth, sync, push and offline reconciliation** for the client applications the service exists to support.",
        },
        {
          title: "Distributed & Event-Driven Systems",
          body: "**Kafka and RabbitMQ** architectures with idempotency, retries and dead-letter handling designed rather than discovered.",
        },
        {
          title: "Cloud Back Ends",
          body: "**Serverless and containerised** services on AWS, Azure and Google Cloud, sized to your traffic profile.",
        },
        {
          title: "Back-End Testing & Hardening",
          body: "Contract tests, load tests and **OWASP-aligned** security review, run in the pipeline.",
        },
      ],
      cta: "Discuss Your Back End",
    },

    frontend: {
      metaTitle: "Front-End Development Services",
      metaDescription:
        "Fast, accessible interfaces in React, Angular and Vue, built on a design system your team can extend.",
      eyebrow: "Services",
      title: "Our Front-End Development Services",
      intro: [
        "Front-end quality is measured by users, not by frameworks: how quickly the page becomes usable, whether it works with a keyboard, whether it holds together at the sizes people actually browse at.",
        "We build against those measures. Accessibility and performance budgets are set at the start and checked in CI, because both are nearly impossible to retrofit once a component library has spread through a product.",
      ],
      cards: [
        {
          title: "React, Angular & Vue Development",
          body: "Production front ends in the framework your team can maintain - **including keeping the one you already have**.",
        },
        {
          title: "Design Systems & Components",
          body: "A documented **component library with tokens**, so the tenth screen costs a fraction of the first.",
        },
        {
          title: "Accessibility Engineering",
          body: "**WCAG AA** built in and verified - contrast measured rather than eyeballed, keyboard paths tested, semantics checked.",
        },
        {
          title: "Performance Engineering",
          body: "**Core Web Vitals budgets**, bundle discipline, image strategy and rendering choices made against measurement.",
        },
        {
          title: "SSR, SSG & Progressive Enhancement",
          body: "**Next.js and Nuxt** rendering strategies chosen per route for SEO, speed and resilience when scripts fail.",
        },
        {
          title: "Front-End Modernisation",
          body: "Migrating aging front ends **incrementally**, running old and new side by side rather than stopping feature work.",
        },
      ],
      cta: "Discuss Your Front End",
    },

    maintenance: {
      metaTitle: "Software Maintenance & Support Services",
      metaDescription:
        "Senior-led ownership of software already in production - stable, secure and still shippable as it ages.",
      eyebrow: "Services",
      title: "Our Software Maintenance & Support Services",
      intro: [
        "Maintenance is usually staffed as the least interesting work and then handed the highest-consequence system. We staff it the other way around: taking over a codebase you did not write and keeping it shippable is senior work.",
        "The goal is not only uptime. It is that the system is still changeable in three years - which means paying down technical debt continuously rather than declaring bankruptcy on it later.",
      ],
      cards: [
        {
          title: "Corrective Maintenance",
          body: "**SLA-backed defect resolution** with root-cause analysis, so the same incident does not return under a new ticket.",
        },
        {
          title: "Adaptive Maintenance",
          body: "Keeping pace with **OS, browser, API and dependency changes** before they become outages.",
        },
        {
          title: "Perfective Maintenance",
          body: "**Performance, usability and cost improvements** driven by what production telemetry actually shows.",
        },
        {
          title: "Preventive Maintenance",
          body: "**Technical debt reduction, test coverage and dependency upgrades** on a schedule rather than in a crisis.",
        },
        {
          title: "24/7 Monitoring & Incident Response",
          body: "**Alerting, on-call and post-incident review**, with the runbooks kept current by the people who use them.",
        },
        {
          title: "Takeover & Knowledge Transfer",
          body: "Structured handover of an unfamiliar codebase - **architecture mapping, risk register and documentation** produced as we go.",
        },
      ],
      cta: "Discuss Your Support Needs",
    },
  },


  /** Technologies page — Figma 508:66 */
  technologies: {
    metaTitle: "Software Development Technologies",
    metaDescription:
      "Our technology stacks across AI, back-end, front-end, app development, DevOps and cloud — the tools we use to build intelligent, scalable systems.",
    hero: {
      /** Authored as two explicit lines (423:2389). */
      title: "Software Development Technologies",
      body: "With extensive experience in software development, Wesantika has built strong technological expertise through collaboration with multinational teams, startups, and enterprises across diverse markets.",
      /** The rest of the original paragraph, rendered under the hero. */
      bodyMore: "We continuously embrace the latest advancements in AI and modern software engineering, combining global perspectives with deep technical capabilities to develop intelligent, scalable, and high-quality solutions that meet demanding business and industry requirements.",
      cta: "Let's discuss your needs",
    },
    stacksHeading:
      "Top software development technology stacks to cater the needs of any business",
    /** Four checked paragraphs — 421:2386 with the ei:check instances. */
    capabilities: [
      "Our strong passion for modern technology trends, AI innovation, and industry best practices drives us to deliver top-notch, high-quality, and cost-effective software outsourcing solutions for startups and enterprises worldwide. We possess comprehensive expertise across back-end, front-end, DevOps, cloud, and AI technologies, enabling us to build intelligent, scalable, and production-ready digital solutions.",
      "Wesantika works with growing startups and enterprises across multiple countries and industries. We have developed hundreds of web and mobile applications for clients worldwide, while increasingly helping businesses leverage AI to automate operations, improve decision-making, and create smarter digital products. Through this experience, we have developed extensive expertise and strong technological capabilities to take on projects of any scale and scope.",
      "In fact, we love large-scale and complex projects. Our multinational team of highly talented technical architects, senior software engineers, and AI specialists brings diverse technical perspectives and international experience to every project. From AI-powered applications and intelligent automation to enterprise platforms and cloud-native systems, we work closely with clients across different markets and time zones to deliver reliable, scalable solutions.",
      "All our software engineers hold at least a bachelor's or engineering degree in IT or a related field and have years of practical experience in custom software development. Combined with our strong AI and modern technology capabilities, this allows us to provide reliable engineering teams that can seamlessly support businesses from initial concept through to production and long-term growth.",
    ],
    sections: {
      ai: "Core Technologies Powering AI Development",
      backend: "Key Back-end technologies",
      frontend: "Key Front-end technologies",
      app: "App development",
      devops: "DevOps",
      cloud: "Cloud Computing",
    },
    /** This page carries its own variant of the RFP card — 507:131/507:132. */
    rfp: {
      heading: "Pick Your Stack. See It Built in 24 Hours.",
      body: "An AI-accelerated path from your full brief to a working prototype, reviewed by engineers fluent in .NET, Java, Python, Node, React, and more.",
    },
  },

  /**
   * Our Work — the case-study browser pasted into Figma as seven paginated
   * pages. Case-study titles are proper nouns and live in
   * `src/lib/our-work.ts`, shared across all locales.
   */
  work: {
    metaTitle: "Our Work",
    metaDescription:
      "Case studies across AI, blockchain, cloud, custom software, ERP and mobile — projects delivered with our partners.",
    heroTitle: "Our Work",
    heroBody:
      "Projects delivered with our partner companies across AI, blockchain, cloud, ERP and mobile — from first prototype through to production.",
    searchPlaceholder: "Search keywords...",
    searchLabel: "Search case studies",
    all: "All",
    servicesLabel: "Filter by service",
    industriesLabel: "Filter by industry",
    empty: "No projects match those filters yet.",
    resultCount: "{count} projects",
    pagination: "Pagination",
    previous: "Previous",
    next: "Next",
  },

  /** RFP modal — Figma 572:98 */
  rfpModal: {
    open: "Send Your RFP",
    close: "Close",
    // 572:321 reads "expertsin" — a missing space in the source. Corrected.
    heading: {
      lead: "Your RFP, reviewed by experts in",
      emphasis: "24 hours",
      trail: "",
    },
    body: "AI-accelerated path from brief to working prototype. Engineers, not sales.",
    checklist: [
      "Clickable prototype of your core user flow",
      "Workflow visualization mapping the full system",
      "Architecture direction covering stack, integrations, and scale",
      "Technical recommendation call with our engineering team",
    ],
    fields: {
      name: "Name*",
      phone: "Business Phone*",
      company: "Company Name*",
      email: "Email*",
      brief: "Project Brief*",
    },
    chooseFile: "Choose file",
    noFileChosen: "No file chosen",
    submit: "Send RFP",
    submitting: "Sending…",
    sent: "Thanks — your RFP is on its way. We'll come back to you within 24 hours.",
    previewLink: "View the delivered email",
    errors: {
      generic: "Something went wrong. Please try again.",
      network: "Could not reach the server. Please check your connection.",
      captchaMissing: "Please complete the verification below.",
      captchaFailed: "Verification failed. Please try again.",
      fileTooLarge: "That file is over the 10 MB limit.",
      fileType: "That file type is not accepted.",
    },
  },

  a11y: {
    skipToContent: "Skip to content",
  },

  notFound: {
    metaTitle: "Page not found",
    title: "This page does not exist",
    body: "The link may be out of date, or the page may have moved. These are the places worth trying.",
    home: "Back to home",
  },

  rail: {
    email: "Email",
    telegram: "Telegram",
    whatsapp: "WhatsApp",
    line: "LINE",
  },
} as const;
