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
    detailLabel: "DETAIL",
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
  },

  /**
   * Blog — no Figma artboard exists for this page.
   * The entries below are SAMPLE CONTENT so the layout renders meaningfully.
   * Replace them (or swap BLOG_POSTS for a CMS) before launch.
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

  /** Technologies page — Figma 508:66 */
  technologies: {
    metaTitle: "Software Development Technologies",
    metaDescription:
      "Our technology stacks across AI, back-end, front-end, app development, DevOps and cloud — the tools we use to build intelligent, scalable systems.",
    hero: {
      /** Authored as two explicit lines (423:2389). */
      titleLines: ["Software Development", "Technologies"],
      body: "With extensive experience in software development, Wesantika has built strong technological expertise through collaboration with multinational teams, startups, and enterprises across diverse markets. We continuously embrace the latest advancements in AI and modern software engineering, combining global perspectives with deep technical capabilities to develop intelligent, scalable, and high-quality solutions that meet demanding business and industry requirements.",
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
    bodyLines: [
      "AI-accelerated path from brief to working",
      "prototype. Engineers, not sales.",
    ],
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

  rail: {
    email: "Email",
    telegram: "Telegram",
    whatsapp: "WhatsApp",
    line: "LINE",
  },
} as const;
