/**
 * English long-form service write-ups — one entry per SERVICE_DETAIL_TOPICS row.
 *
 * Split out of `en.ts` purely for size: fourteen write-ups with six sections
 * each is most of the catalogue by volume, and burying them in the middle of
 * the file made everything else hard to find. `en.ts` re-exports this under
 * `serviceDetails`, so the shape of `Dictionary` is unchanged.
 *
 * Every topic carries the SAME section list, because the page renders them
 * unconditionally and TypeScript resolves `serviceDetails[id]` against the
 * union of all fourteen. Adding a section means adding it everywhere.
 *
 * Sources: the structure and the generic capability / process / benefit / FAQ
 * copy follow the reference service pages supplied for this build. Anything
 * specific to the original publisher — headcounts, project counts, Clutch
 * scores, ISO certifications, hourly rates, named staff, named clients and
 * their testimonials — is deliberately absent. Those are claims about a
 * different company and Wesantika cannot make them. Add real figures here once
 * they exist; do not port the reference numbers across.
 *
 * `**…**` runs are rendered by <Emphasis>; the call site supplies the class.
 */
export const serviceDetailsEn = {
  /* ---------------------------------------------------------------- custom */
  custom: {
    metaTitle: "Full-Stack Custom Software Development Services",
    metaDescription:
      "From discovery and architecture through production support, our custom software development services cover the full lifecycle.",
    eyebrow: "Services",
    title: "Full-Stack Custom Software Development Services",
    intro: [
      "From discovery and architecture through production support, our custom software development services cover the full lifecycle. Each service below is a live capability staffed by senior engineers and tech leads, not a marketing line item.",
      "Most clients start with one service and expand into custom software development solutions that span multiple disciplines - an AI feature delivered on top of an existing SaaS platform, or a legacy modernization paired with a new mobile front-end. We staff the right mix of seniors, mid-levels, and specialists for each phase, and we don't bill for ramp-up time we can't justify.",
    ],
    cardsHeading: "What we build",
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
        body: "Monitoring, SLA-backed bug fixing, and update services on a fixed monthly fee.",
      },
    ],
    whyHeading: "Why engineering leaders choose Wesantika",
    why: [
      {
        title: "Senior-led teams",
        body: "A senior engineer paired with modern AI-assisted tooling produces more working software, with less rework, than a junior-heavy team of the same cost. We staff for outcomes rather than headcount.",
      },
      {
        title: "Architecture advice from day one",
        body: "A tech lead and solution architect are on the engagement before the first sprint, so the stack, the integration boundaries, and the scaling story are decided deliberately rather than discovered late.",
      },
      {
        title: "Multinational delivery",
        body: "Our teams work across markets and time zones and are used to written decisions, clean handoffs, and daily overlap with client teams rather than a once-a-week status call.",
      },
      {
        title: "Security and IP protection built in",
        body: "NDAs before the brief, work-for-hire IP assignment, client-controlled repositories, role-based access, and audit trails. You own the source code and the deliverables.",
      },
      {
        title: "Flexible engagement models",
        body: "Dedicated team, staff augmentation, offshore development centre, or fixed-price delivery — chosen to match how your team already works, and changeable as the project moves through phases.",
      },
      {
        title: "Transparent scope and estimates",
        body: "Written problem statements, itemized estimates, and a risk register you can read. No opaque \"let us scope it\" quotes that turn into surprise change orders.",
      },
    ],
    processHeading: "How we run a custom software engagement",
    process: [
      {
        title: "Demand analysis",
        body: "A business analyst and tech lead review your brief, market context, and end-user requirements. Output: a written problem statement and proposal options.",
      },
      {
        title: "Terms and scope",
        body: "We finalize project scope, engagement model, pricing, and compliance terms — NDA, IP assignment, audit rights. Output: signed agreement and statement of work.",
      },
      {
        title: "Conception and preparation",
        body: "A dedicated PM, tech lead, and software architect map the project, allocate the team, fix the tech stack, and draft a risk management strategy. Output: project charter, architecture diagram, sprint plan.",
      },
      {
        title: "Kick-off",
        body: "A joint kickoff with your team aligns goals, responsibilities, communication cadence, and the first sprint. Output: shared roadmap and an agreed Definition of Done.",
      },
      {
        title: "Development",
        body: "Agile sprints with AI-assisted code generation, protected repositories, tech-lead code review, and feature prioritization through your product backlog. Output: working software you can use at the end of every sprint.",
      },
      {
        title: "Quality assurance and testing",
        body: "Manual and automated testing through CI/CD — functional, regression, security, performance, and accessibility. Output: test reports and defect leakage metrics.",
      },
      {
        title: "Deployment",
        body: "Production rollout to your cloud or on-premise environment with documented rollback plans. Output: a live system, a runbook, and monitoring dashboards.",
      },
      {
        title: "Launch and maintenance",
        body: "SLA-backed support, compliance updates, performance tuning, and continued feature delivery. Output: a system that keeps shipping value after the build phase ends.",
      },
    ],
    benefitsHeading: "When custom software beats off-the-shelf",
    benefits: [
      {
        title: "Functionality tailored to your workflows",
        body: "Build what your team actually does, rather than forcing a generic process through someone else's product roadmap.",
      },
      {
        title: "Lower total cost over five years",
        body: "Custom software costs more upfront than a subscription, but across a five-year horizon ownership removes per-seat fees and licence escalation.",
      },
      {
        title: "An unbounded innovation surface",
        body: "Generative AI, agentic AI, IoT device integration, AR/VR experiences, digital twins, and autonomous systems are all available to you rather than gated behind a vendor's backlog.",
      },
      {
        title: "Security and compliance by design",
        body: "Domain-specific regulatory requirements are embedded at the architecture level instead of bolted on once the system is already live.",
      },
      {
        title: "Seamless integration with your stack",
        body: "Your ERP, CRM, data warehouse, identity provider, and analytics tools were chosen for reasons. Custom software wraps around what you already own.",
      },
      {
        title: "Modularity, scalability, ownership",
        body: "Modularity at the service level means individual features can be replaced without rebuilding the system, and the code is yours to take anywhere.",
      },
    ],
    faqHeading: "Frequently asked questions",
    faq: [
      {
        q: "What are custom software development services?",
        a: "Custom software development services are end-to-end engineering engagements that design, build, test, deploy, and maintain software tailored to one company's workflows — rather than configuring an off-the-shelf product.",
      },
      {
        q: "How long does a custom software project take?",
        a: "An MVP typically takes 8-12 weeks. The first production release of an enterprise-scale platform usually lands between 6 and 12 months, and a long-running dedicated-team engagement continues for as long as the roadmap does.",
      },
      {
        q: "What is the difference between custom software and off-the-shelf?",
        a: "Custom software is built around your specific workflows, data model, integrations, and compliance requirements. Off-the-shelf software is a pre-built product you buy and configure, which is faster to start with and harder to bend to an unusual process.",
      },
      {
        q: "How do you protect our IP and source code?",
        a: "We sign an NDA before the brief, assign IP to you on a work-for-hire basis in the master agreement, work in repositories you control with multi-factor authentication, and manage access on a least-privilege basis.",
      },
      {
        q: "Can you integrate with our existing ERP, CRM, or data stack?",
        a: "Yes. Integration is a core part of most engagements — ERP and CRM platforms, data warehouses, identity providers, payment systems, and vertical-specific systems, connected through APIs, middleware, or event-driven messaging.",
      },
      {
        q: "How do you ensure quality and security?",
        a: "Mandatory code review, automated CI/CD with build, test, and static-analysis gates, secure development practices across the lifecycle, and functional, regression, security, performance, and accessibility testing before each release.",
      },
    ],
    cta: "Discuss Your Unique Needs",
  },

  /* ------------------------------------------------------------------- web */
  web: {
    metaTitle: "Web Application Development Services",
    metaDescription:
      "Secure, scalable web applications built mobile-first with React, Angular and Vue — from discovery and architecture through launch and support.",
    eyebrow: "Services",
    title: "Web Application Development Services",
    intro: [
      "Define your business objectives and we will build the web application that achieves them. We work in **short sprints** with a mobile-first approach, so what you see at the end of each one is running software rather than a status report.",
      "Whether you need an MVP to test a business idea or a full production platform, the same team carries it from requirements through launch and into maintenance — with accessibility, performance budgets, and security standards agreed before the first line of code.",
    ],
    cardsHeading: "Our web application development services",
    cards: [
      {
        title: "Custom Web App Development",
        body: "Applications built around your specific needs, with **flexibility, scalability, and user experience** as the design constraints. From idea generation to deployment, one team stays with the project.",
      },
      {
        title: "Back-End Development",
        body: "Scalable, secure, reliable server-side systems using Node.js, .NET, Java, and Python, with SQL and NoSQL data models designed for the business logic they actually carry.",
      },
      {
        title: "Front-End Development",
        body: "Intuitive, accessible interfaces built in React, Angular, or Vue.js, turning complex requirements into applications people can use without training.",
      },
      {
        title: "SaaS Application Development",
        body: "Cloud-native, multi-tenant platforms that scale with your growth and keep infrastructure spend proportional to usage rather than to peak capacity.",
      },
      {
        title: "Web Portal Development",
        body: "Portals that bring your online services together in one place — real-time dashboards, tracking, role-based access, and advanced reporting.",
      },
      {
        title: "Progressive Web Apps",
        body: "PWAs that blend web reach with app behaviour: fast first paint, offline support, and installability, so a slow network degrades the experience instead of ending it.",
      },
      {
        title: "Mobile-Responsive Web Apps",
        body: "Fluid grids, media queries, and touch-first interaction, so the application behaves like a native app on a phone and like a desktop tool on a large screen.",
      },
      {
        title: "Integration and Testing",
        body: "Third-party tools, APIs, and external devices connected cleanly, with unit, integration, and user-acceptance testing against recognised web security standards.",
      },
      {
        title: "Maintenance and Support",
        body: "We don't deploy and disappear. Real-time monitoring, prompt bug fixes, and compatibility updates for new operating systems and browsers.",
      },
    ],
    whyHeading: "Why choose Wesantika for web development",
    why: [
      {
        title: "Mobile-first by default",
        body: "The majority of first visits arrive on a phone. We design for the small screen first and expand upward, rather than shrinking a desktop layout and hoping it holds.",
      },
      {
        title: "Performance treated as a requirement",
        body: "Performance budgets are set per project and measured in CI, so page weight and interaction latency are caught before release rather than reported by users.",
      },
      {
        title: "Accessibility built in",
        body: "Interfaces are built to WCAG 2.1 AA: keyboard operability, sufficient contrast, and semantic structure, verified as part of QA rather than retrofitted after an audit.",
      },
      {
        title: "Broad technical proficiency",
        body: "Microsoft stack, Java, .NET, Python, Angular, React, Node.js, Vue.js, PHP, GraphQL, and progressive web technologies — chosen to fit the problem, not the team's comfort zone.",
      },
      {
        title: "Test-driven delivery",
        body: "Automated tests run on every commit through a CI/CD pipeline, so regressions surface in minutes and releases stop being events to be feared.",
      },
      {
        title: "Agile with real transparency",
        body: "Detailed proposals and architecture prototypes at the outset, then sprint demos you attend. Scope changes are priced and agreed rather than absorbed silently.",
      },
    ],
    processHeading: "Our web application development process",
    process: [
      {
        title: "Discovery and demand analysis",
        body: "Business analysts work with you to understand objectives, users, and constraints. This is where the expensive misunderstandings get found, while they are still cheap.",
      },
      {
        title: "Project planning",
        body: "A roadmap with timelines, resources, and milestones, plus the acceptance criteria that define success at each stage.",
      },
      {
        title: "Architecture, UX and UI design",
        body: "Wireframes and user-flow mapping from an information architect, and an architecture prototype that establishes the technical foundation before feature work starts.",
      },
      {
        title: "MVP or PoC, on request",
        body: "Where the idea needs validating first, we build a proof of concept or a minimum viable product so core functionality can be tested before full development is funded.",
      },
      {
        title: "Development",
        body: "Short sprints, each with planning, development, testing, and release. Code is flexible and scalable because it is reviewed by a tech lead before it merges.",
      },
      {
        title: "Testing and QA",
        body: "Manual and automated testing through a CI/CD pipeline, catching defects early and keeping the release candidate always close to shippable.",
      },
      {
        title: "Deployment",
        body: "DevOps engineers deploy components, data, and code to production, and validate that the application behaves under real-world conditions as it did in staging.",
      },
      {
        title: "Maintenance and support",
        body: "Regular updates, performance monitoring, and dependency currency, so the application keeps working as browsers and platforms move underneath it.",
      },
    ],
    benefitsHeading: "Benefits of web application development",
    benefits: [
      {
        title: "Accessible across every device",
        body: "Anyone with a browser and a connection can use it. No install, no app-store gatekeeping, and a much shorter path to reaching a wider audience.",
      },
      {
        title: "Lower cost to build and maintain",
        body: "Updates ship server-side, which removes app-store submission cycles and the long tail of users stranded on old versions.",
      },
      {
        title: "Operational efficiency",
        body: "Automation removes manual work, and faster interactions improve the experience for customers and staff at the same time.",
      },
      {
        title: "Scalability and growth",
        body: "Modern runtimes and cloud infrastructure let you scale server processing and database capacity with demand instead of provisioning for the worst day of the year.",
      },
      {
        title: "Enhanced security",
        body: "Encrypted transport, robust authentication, and recognised security standards applied consistently, so user data is protected by design.",
      },
      {
        title: "Seamless integration",
        body: "CRMs, payment gateways, and analytics tools connect through documented APIs, giving you one coherent system rather than several that disagree.",
      },
    ],
    faqHeading: "Frequently asked questions",
    faq: [
      {
        q: "What is the difference between application development and web application development?",
        a: "Application development generally means software for desktops or mobile devices, installed on the machine. A web application runs on a server and is reached through a browser, so the platform and the deployment model are the difference.",
      },
      {
        q: "How much does it cost to build a web app?",
        a: "It varies widely with complexity, technology stack, team composition, architecture, and the seniority of the engineers involved. We give an itemized estimate after discovery rather than a headline number before it.",
      },
      {
        q: "How do I choose a web application development company?",
        a: "Look at technical skills, project management practice, communication, references, and what maintenance looks like after launch. Pick a partner whose way of working fits your own, because that is what you will live with daily.",
      },
      {
        q: "What are the three types of web developer?",
        a: "Back-end developers handle server-side logic, databases, and integrations. Front-end developers build the interface. Full-stack developers cover both, which is useful on smaller teams and in early phases.",
      },
      {
        q: "How do you ensure quality and security?",
        a: "Thorough manual and automated testing, recognised security standards, secure coding practices, dependency scanning, and an NDA covering your data from the first conversation.",
      },
    ],
    cta: "Start Your Web Project",
  },

  /* ---------------------------------------------------------------- mobile */
  mobile: {
    metaTitle: "Mobile App Development Services",
    metaDescription:
      "Native iOS and Android apps plus React Native and Flutter cross-platform builds, delivered with Agile and DevOps practice and full source-code ownership.",
    eyebrow: "Services",
    title: "Mobile App Development Services",
    intro: [
      "Outdated apps, missed deadlines, rising costs, and architectures that stop scaling are the four ways mobile projects usually fail. Our mobile app development services are structured to remove those risks — planning, design, architecture, and ongoing support handled by one team.",
      "We build native iOS and Android applications as well as cross-platform apps in React Native and Flutter, and you own **100% of the source code** at the end of it.",
    ],
    cardsHeading: "Our mobile app development services",
    cards: [
      {
        title: "iOS App Development",
        body: "Native Swift development with a secure, scalable architecture, App Store optimization and deployment, and clean integration with the wider Apple ecosystem.",
      },
      {
        title: "Android App Development",
        body: "Modern Kotlin development, Google Play deployment and compliance support, and testing across the range of devices your users actually carry.",
      },
      {
        title: "Cross-Platform App Development",
        body: "A shared codebase for iOS and Android in React Native or Flutter — lower cost and shorter timelines, with platform-specific performance tuning where it matters.",
      },
      {
        title: "UI/UX Design for Mobile",
        body: "Clear wireframes, clickable prototypes, and conversion-focused interface systems, validated through usability testing before development begins.",
      },
      {
        title: "MVP App Development",
        body: "Rapid prototyping and hard feature prioritization, so the first release validates the market at a fraction of the upfront investment.",
      },
      {
        title: "App Maintenance and Support",
        body: "Ongoing performance monitoring, feature enhancements, security patches, and the OS-version compliance work that keeps an app in the stores.",
      },
    ],
    whyHeading: "Why choose Wesantika for mobile",
    why: [
      {
        title: "Full-cycle ownership",
        body: "Project management, milestone-based delivery, and source-code ownership. One team is accountable from the first workshop to the store listing and beyond.",
      },
      {
        title: "The right approach per project",
        body: "Native where platform depth and performance decide the outcome, cross-platform where reach and budget do. We make the recommendation on evidence, not on what we prefer to build.",
      },
      {
        title: "Modern technology expertise",
        body: "AI-enabled features, cloud-native back ends, and API-first architecture, so the app is a client of a well-designed system rather than the system itself.",
      },
      {
        title: "Agile and DevOps practice",
        body: "Agile Scrum with DevOps pipelines and real-time reporting shortens the distance between a decision and a build you can install on a device.",
      },
      {
        title: "Security and compliance",
        body: "Secure storage, certificate pinning, robust authentication, and readiness for the privacy and payment-security requirements of your market.",
      },
      {
        title: "Support that continues after launch",
        body: "Mobile platforms move every year. We keep the app current with OS releases, device form factors, and store policy rather than leaving it to age out.",
      },
    ],
    processHeading: "Our mobile app development process",
    process: [
      {
        title: "Discovery and planning",
        body: "We establish objectives, target audience, and product vision, then define feature priorities, technical architecture, scope, and timeline.",
      },
      {
        title: "Agreement and kick-off",
        body: "The engagement is formalized with milestones and phased delivery planning, and the team moves onto a structured Agile cadence.",
      },
      {
        title: "UX and UI design",
        body: "User-centred interfaces built as wireframes and interactive prototypes, tested with real users before a single screen is coded.",
      },
      {
        title: "Development",
        body: "Agile sprints producing scalable, high-performance applications, with a PoC or MVP first where the concept needs proving.",
      },
      {
        title: "QA and testing",
        body: "Functional, performance, and security testing, including regression and penetration testing across the device matrix.",
      },
      {
        title: "Deployment and launch",
        body: "We manage the full release process for the App Store and Google Play, including store assets, review responses, and staged rollout.",
      },
      {
        title: "Post-launch support",
        body: "Performance monitoring and iterative updates driven by user feedback and analytics rather than by guesswork.",
      },
    ],
    benefitsHeading: "What a well-built mobile app delivers",
    benefits: [
      {
        title: "Revenue and scalable growth",
        body: "Subscriptions, in-app purchases, and well-timed upsells turn an app from a cost centre into a revenue channel.",
      },
      {
        title: "Engagement and retention",
        body: "A home-screen icon keeps your brand within reach, and personalization and loyalty features give people a reason to come back.",
      },
      {
        title: "Stronger brand positioning",
        body: "A fast, well-designed app positions the business as modern and credible in a way a mobile website rarely manages.",
      },
      {
        title: "Operational efficiency",
        body: "Internal apps streamline processes and automate manual tasks, delivering efficiency that shows up in measurable time saved.",
      },
      {
        title: "Future-ready foundations",
        body: "Cross-platform frameworks and straightforward third-party integration mean the next feature is an addition rather than a rewrite.",
      },
      {
        title: "Reach on every platform",
        body: "iOS and Android from one engagement, with a consistent experience and one back end serving both.",
      },
    ],
    faqHeading: "Frequently asked questions",
    faq: [
      {
        q: "How long does it take to develop a mobile app?",
        a: "Simple apps typically take two to four months, medium-complexity apps four to seven, and complex or enterprise apps seven to twelve months or more, covering planning, design, development, testing, and deployment.",
      },
      {
        q: "Do I own the source code?",
        a: "Yes. You receive full ownership of the source code, along with architecture documentation so a future team can pick it up without archaeology.",
      },
      {
        q: "Do you sign NDAs?",
        a: "Always, and before any detailed discussion — your idea, business data, and security requirements are covered from the first call.",
      },
      {
        q: "Can you upgrade my existing app?",
        a: "Yes. We take on existing codebases to improve performance, modernize the interface, and upgrade the architecture, then continue with maintenance and support.",
      },
      {
        q: "Do you build for both platforms?",
        a: "Yes — native iOS and Android, plus cross-platform builds in Flutter and React Native where a shared codebase is the better trade.",
      },
      {
        q: "Native or cross-platform — which should we choose?",
        a: "Native suits apps that lean hard on platform capabilities or need maximum performance. Cross-platform suits apps where breadth of reach and speed to market matter more. We recommend based on your feature set, not a house preference.",
      },
    ],
    cta: "Build Your App With Us",
  },

  /* -------------------------------------------------------------------- ai */
  ai: {
    metaTitle: "AI Development Services",
    metaDescription:
      "Our end-to-end menu of AI development services, from discovery and data engineering through LLM applications, MLOps and integration.",
    eyebrow: "Services",
    title: "Our AI Development Services",
    intro: [
      "Below is our end-to-end menu of artificial intelligence development services. Each service is structured to help decision-makers de-risk implementation while enabling fast delivery. If you need a full-cycle AI software development company for **PoC** → **MVP** → **production**, this is the typical engagement path.",
      "We build secure, compliant AI systems from discovery through to production, so you can automate workflows, get value out of the data you already hold, and deploy LLM and machine-learning capabilities with measurable business impact rather than a demo that never ships.",
    ],
    cardsHeading: "Our AI development services",
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
        body: "AI fails when it's isolated. We integrate AI with your apps and data stack through APIs, event-driven workflows, and AI platforms. Deliverables include integration specifications, security controls (data encryption, identity), test plans, and change management support for teams adopting AI-powered business solutions.",
      },
    ],
    whyHeading: "Why choose Wesantika for AI development",
    why: [
      {
        title: "Cross-functional AI teams",
        body: "AI/ML engineers, data scientists, and MLOps specialists working together, with practical experience in Python, PyTorch and TensorFlow, and the MLflow and Kubeflow ecosystems.",
      },
      {
        title: "Validate before you scale",
        body: "AI value is proven, not assumed. We recommend starting with a PoC or MVP that tests business outcomes, data feasibility, and user adoption before a large budget is committed.",
      },
      {
        title: "Data quality and integrity first",
        body: "We prioritise data readiness — collection, enrichment, preprocessing, and bias checks — because model quality is bounded by the data underneath it.",
      },
      {
        title: "Designed to scale",
        body: "Architectures that support high daily transaction volumes, with monitoring, cost controls, and controlled retraining rather than unbounded inference spend.",
      },
      {
        title: "Security and data protection",
        body: "Least-privilege access, encryption at rest and in transit, audit logs, and role-based permissions across every environment the data touches.",
      },
      {
        title: "Responsible AI and governance",
        body: "Bias testing, explainability, model transparency, incident response planning, and drift monitoring, aligned to recognised AI risk management frameworks.",
      },
    ],
    processHeading: "How we deliver",
    process: [
      {
        title: "Discovery",
        body: "We clarify objectives and KPIs, success metrics, constraints, and data reality. Outputs typically include use-case scoring, an AI readiness assessment, architecture direction, and a delivery plan with risks and mitigations.",
      },
      {
        title: "Prototype",
        body: "We build a proof of concept with an evaluation plan attached. For LLM work this includes prompt baselines, retrieval configuration, and early guardrails.",
      },
      {
        title: "Build MVP",
        body: "Production-grade solution design: application workflows, integration, access controls, and monitoring — the parts that separate a system from a demo.",
      },
      {
        title: "Deploy",
        body: "Deployment into your environment, whether cloud, private network, or on-premise, with security review, observability, and runbooks.",
      },
      {
        title: "Optimize",
        body: "Ongoing monitoring and improvement: KPI review, A/B testing where appropriate, retraining and model updates, cost control, and roadmap planning.",
      },
    ],
    benefitsHeading: "What AI delivers when it is done properly",
    benefits: [
      {
        title: "Automation of real workflows",
        body: "Multi-step processes that used to need a person at every hop run end to end, with human review at the points where judgement actually matters.",
      },
      {
        title: "Value from data you already hold",
        body: "Documents, logs, transactions, and support history become searchable, summarizable, and predictive rather than merely stored.",
      },
      {
        title: "Faster, more consistent decisions",
        body: "Forecasting, classification, and anomaly detection reduce both the time to a decision and the variance between decision-makers.",
      },
      {
        title: "Measurable accuracy",
        body: "Evaluation harnesses and KPI baselines mean model quality is a number you can track over time, not an impression.",
      },
      {
        title: "Controlled cost",
        body: "Model choice, caching, and routing are designed for the workload, so inference spend scales with value rather than with traffic.",
      },
      {
        title: "A production path, not a demo",
        body: "Monitoring, drift detection, retraining, and runbooks are part of the build, which is why the system is still working six months later.",
      },
    ],
    faqHeading: "Frequently asked questions",
    faq: [
      {
        q: "What is the typical timeline for an AI MVP?",
        a: "Most AI MVPs land in a six to sixteen week range, depending on data readiness, integrations, and compliance requirements. An MVP should include evaluation, monitoring, and a deployment path — without those it is closer to a demo than a business system.",
      },
      {
        q: "What data do you need to start?",
        a: "We can start with what you have, but we run a data audit first to confirm accessibility, quality, and governance. For retrieval-based work we need documents plus a permission model. For machine learning we need historical data with reliable labels and a clear definition of the prediction target.",
      },
      {
        q: "Do you build with open-source, proprietary, or hybrid models?",
        a: "All three. The right answer depends on compliance needs, cost constraints, latency targets, and your IP strategy. A hybrid approach is often the most practical.",
      },
      {
        q: "How do you evaluate LLM quality and control hallucinations?",
        a: "We define task-specific metrics and build an evaluation harness: curated test sets, retrieval quality checks, safety tests covering prompt injection and sensitive data leakage, and human review for edge cases.",
      },
      {
        q: "How do you handle data residency and privacy regulation?",
        a: "We design for compliance by default — permission-aware retrieval, encryption, audit logs, and least-privilege access — and can deploy in the region you require, whether cloud, private network, or on-premise.",
      },
      {
        q: "Who owns the IP and the trained models?",
        a: "You own the deliverables created for your project, subject to the contract terms and any third-party model licensing that applies.",
      },
      {
        q: "How do you monitor drift and performance after launch?",
        a: "We implement monitoring for data drift, model drift, and KPI regression. For machine learning this can trigger retraining workflows; for LLM applications we monitor retrieval quality, user feedback signals, error categories, and cost.",
      },
    ],
    cta: "Reach Out to Our Specialists",
  },

  /* --------------------------------------------------------------- product */
  product: {
    metaTitle: "Software Product Development Services",
    metaDescription:
      "From concept and consulting through UI/UX, MVP, QA and modernization — full-cycle software product development with support that continues after launch.",
    eyebrow: "Services",
    title: "Software Product Development Company",
    intro: [
      "Building a software product is not the same as building a project. A product has to survive its own success — more users, more data, more edge cases, and a roadmap that keeps moving after the first release. That is what we plan for from the start.",
      "Our dedication to innovation and improvement steers the process **from concept to launch**: user-focused design, carefully specified features, and a build that is reliable enough to hand to real customers. Support and maintenance continue after launch, so the product keeps running well as it grows.",
    ],
    cardsHeading: "Our software product development services",
    cards: [
      {
        title: "Product Consulting",
        body: "Market context, feasibility, and a technical strategy that matches the business case, so the first big decision is made with evidence rather than optimism.",
      },
      {
        title: "UI/UX Design",
        body: "Research, wireframes, and clickable prototypes tested with real users, producing an interface that reduces support load instead of generating it.",
      },
      {
        title: "MVP Development",
        body: "The smallest version of the product that still delivers value, built to gather genuine user feedback and prove the concept before the full roadmap is funded.",
      },
      {
        title: "Full Product Build",
        body: "End-to-end engineering of the production product — architecture, back end, front end, integrations, and the operational tooling around it.",
      },
      {
        title: "Quality Assurance and Testing",
        body: "Manual and automated testing running inside each sprint, covering functionality, integration, security, and performance before a release candidate exists.",
      },
      {
        title: "Product Modernization",
        body: "Aging products brought onto current platforms incrementally — new capability alongside the old system, rather than a rewrite that freezes the roadmap for a year.",
      },
      {
        title: "Support and Maintenance",
        body: "Monitoring, defect resolution, dependency currency, and continued feature delivery once the product is live and earning.",
      },
    ],
    whyHeading: "Why choose Wesantika as your product partner",
    why: [
      {
        title: "Product thinking, not ticket-taking",
        body: "We ask what the feature is for before we estimate it. If the cheaper thing achieves the goal, we will say so — that is the difference between a partner and a vendor.",
      },
      {
        title: "Guaranteed product quality",
        body: "Quality gates are defined at kick-off and enforced in the pipeline. A release either meets them or it does not ship, which keeps standards from eroding under deadline pressure.",
      },
      {
        title: "Transparent, predictable cost",
        body: "Itemized estimates, agreed change control, and clear reporting on where effort went. Price transparency is the point of working with an external team.",
      },
      {
        title: "Responsive throughout",
        body: "Daily overlap with your working hours, decisions written down, and a team you can reach — not a queue you file tickets into.",
      },
      {
        title: "Current technology, deliberately chosen",
        body: "We track where platforms and AI tooling are heading and adopt what earns its place in a production product, rather than what is merely new.",
      },
      {
        title: "Continuity after launch",
        body: "The same engineers who built the product maintain it, so the knowledge you paid for stays with the system instead of leaving at handover.",
      },
    ],
    processHeading: "Our software product development process",
    process: [
      {
        title: "Ideation and feasibility",
        body: "Almost every product starts as a client idea. From business context, user behaviour, and market research, we analyse the idea together and identify the solution that actually fits the need.",
      },
      {
        title: "Product architecture",
        body: "The foundation of the whole system: key components, data model, storage, integration points, and the development environments the team will work in.",
      },
      {
        title: "Development",
        body: "Requirements are broken into detailed items so timelines can be predicted and progress tracked honestly. Work proceeds in sprints with a demo at the end of each.",
      },
      {
        title: "Testing and quality measurement",
        body: "Installation testing, system testing, defect resolution, and user acceptance testing. Quality is the difference between a product that sells and one that gets refunded.",
      },
      {
        title: "Launch and handover",
        body: "Production rollout plus training for the teams who will operate the product — your engineers, your support staff, and your internal owners.",
      },
      {
        title: "Iterate and grow",
        body: "Usage data and user feedback set the next quarter's priorities, and the product keeps improving instead of freezing at version one.",
      },
    ],
    benefitsHeading: "What full-cycle product development gives you",
    benefits: [
      {
        title: "One accountable team",
        body: "Design, engineering, QA, and operations under one engagement, which removes the finger-pointing that occurs when a product spans three vendors.",
      },
      {
        title: "Faster route to a real release",
        body: "Starting from an MVP means real users are exercising the product months before a big-bang launch would have shipped.",
      },
      {
        title: "Lower cost of change",
        body: "Modular architecture and test coverage mean the second year of the roadmap does not cost three times the first.",
      },
      {
        title: "Evidence-led roadmap",
        body: "Analytics and user research replace internal debate about what to build next.",
      },
      {
        title: "Reliability customers notice",
        body: "Testing and monitoring built into delivery keep the incident rate low enough that the product earns trust rather than spending it.",
      },
      {
        title: "A product you can hand over",
        body: "Documentation, runbooks, and clean architecture mean the product is transferable — to your own team, or to whoever comes next.",
      },
    ],
    faqHeading: "Frequently asked questions",
    faq: [
      {
        q: "What are the key stages in software product development?",
        a: "Requirement analysis to establish what the product must achieve; design covering structure, layout, and features; development; testing against quality standards; deployment; and ongoing maintenance driven by user feedback.",
      },
      {
        q: "How is product development different from project development?",
        a: "A project ends at delivery. A product continues — it gains users, accrues data, and needs a roadmap, support, and an architecture that can absorb change over years rather than months.",
      },
      {
        q: "Should we start with an MVP?",
        a: "Usually, yes. An MVP puts the core value proposition in front of real users quickly and turns roadmap arguments into evidence. It is also the cheapest way to discover that an assumption was wrong.",
      },
      {
        q: "Can you take over an existing product?",
        a: "Yes. We run a structured knowledge transfer first — dependency map, defect and risk register, and deployment runbooks — before taking responsibility for a codebase we did not write.",
      },
      {
        q: "Who owns the product and the code?",
        a: "You do. IP is assigned to you, the repositories are yours, and the documentation is written so another team could pick the product up.",
      },
    ],
    cta: "Discuss Your Product",
  },

  /* ------------------------------------------------------------------ saas */
  saas: {
    metaTitle: "SaaS Application Development Services",
    metaDescription:
      "Multi-tenant, cloud-native SaaS platforms — consulting, design, build, third-party integration, and the ongoing support a subscription product needs.",
    eyebrow: "Services",
    title: "SaaS Application Development",
    intro: [
      "SaaS development means creating and operating applications delivered over the internet, hosted in the cloud rather than installed and maintained on individual machines. That shift changes the engineering problem: **multi-tenancy**, **subscription billing**, and **continuous delivery** become architectural concerns from day one.",
      "Long-running, complex SaaS projects reward experience. We build robust, intuitive platforms that hold up as tenant count grows and the feature set widens, and we design the commercial model into the system rather than bolting it on later.",
    ],
    cardsHeading: "Our SaaS development services",
    cards: [
      {
        title: "SaaS Consulting",
        body: "Choosing a tenancy model, a cloud platform, and a pricing structure is daunting given the number of options and how expensive it is to change them later. We work through those decisions with you before code exists.",
      },
      {
        title: "Design and Prototyping",
        body: "A compelling SaaS platform needs innovative design, user-centred functionality, and a robust architecture underneath. We take you from abstract ideas to concrete, testable prototypes.",
      },
      {
        title: "SaaS Application Development",
        body: "Our core service: powerful, scalable, efficient multi-tenant applications built to your requirements, with tenant isolation, role models, and usage metering designed in.",
      },
      {
        title: "Subscription and Billing",
        body: "Usage-based, seat-based, or tiered billing wired into the product, with the reporting your finance team needs and the self-service your customers expect.",
      },
      {
        title: "Third-Party Integrations",
        body: "Seamless integration is not optional for SaaS. We fold external tools and platforms into your application so it becomes a coherent ecosystem rather than an island.",
      },
      {
        title: "Ongoing Support and Maintenance",
        body: "The landscape keeps moving and standing still is not an option. We keep the platform current with technology and with the shifting demands of your business and its users.",
      },
    ],
    whyHeading: "Why choose Wesantika for SaaS",
    why: [
      {
        title: "Multi-tenancy done deliberately",
        body: "Shared-schema, separate-schema, or separate-database isolation is a decision with cost, compliance, and performance consequences. We make it explicitly, and document why.",
      },
      {
        title: "Cloud-native from the start",
        body: "Built for AWS, Azure, or GCP with managed services, autoscaling, and infrastructure as code, so the platform scales without a re-architecture at the first growth spike.",
      },
      {
        title: "Security and tenant isolation",
        body: "Access control, data segregation, encryption, and audit logging designed so one tenant's data can never surface in another's session.",
      },
      {
        title: "Continuous delivery",
        body: "SaaS customers expect improvements continuously, not annually. CI/CD, feature flags, and staged rollout make frequent releases safe.",
      },
      {
        title: "Cost proportional to usage",
        body: "Infrastructure and inference costs are modelled per tenant, so unit economics are visible before a pricing page is published.",
      },
      {
        title: "Built to be operated",
        body: "Monitoring, alerting, tenant-level observability, and runbooks, because a SaaS platform is something you run rather than something you ship.",
      },
    ],
    processHeading: "Our SaaS development journey",
    process: [
      {
        title: "Kick-off",
        body: "A collaborative session to understand your objectives and align the team's view with yours, plus an initial read on feasibility.",
      },
      {
        title: "Requirements analysis",
        body: "A business analyst and project manager work through your software requirements in depth, and turn them into something engineers can estimate.",
      },
      {
        title: "Roadmap agreement",
        body: "Stakeholders on both sides — project manager, tech lead, solution architect, business analyst, developers, designers — define the roadmap together.",
      },
      {
        title: "Conception and preparation",
        body: "The right people are assigned, and the technologies and tools are selected against your specific needs rather than a default stack.",
      },
      {
        title: "PoC or MVP, on request",
        body: "We define the optimal functional scope, prioritise features by expected value to end users, and build the first version against the agreed strategy.",
      },
      {
        title: "Development",
        body: "Clean, efficient, reliable code written to the established design, with tenant isolation and billing exercised from early sprints rather than at the end.",
      },
      {
        title: "Testing and QA",
        body: "Every feature evaluated for correct behaviour and clean integration, with manual and automated testing running throughout development.",
      },
      {
        title: "Deployment",
        body: "DevOps engineers deploy into the chosen environment, handling data migration and system setup for a smooth transition to live operation.",
      },
      {
        title: "Maintenance and support",
        body: "Ongoing work to keep the platform current and aligned with evolving business needs — the part of SaaS that never actually ends.",
      },
    ],
    benefitsHeading: "Benefits of a SaaS model",
    benefits: [
      {
        title: "Lower barrier for your customers",
        body: "No installation, no local maintenance, and a subscription instead of a capital purchase — which shortens sales cycles considerably.",
      },
      {
        title: "Predictable recurring revenue",
        body: "Subscription billing turns lumpy licence sales into recurring revenue you can forecast and finance against.",
      },
      {
        title: "Flexibility",
        body: "Cloud infrastructure lets the business pivot quickly as market demands change, without a hardware procurement cycle in the way.",
      },
      {
        title: "Automatic updates",
        body: "Every customer runs the current version, which removes the support burden of maintaining several releases simultaneously.",
      },
      {
        title: "High scalability",
        body: "Capacity follows demand, so onboarding a large customer is a configuration change rather than a project.",
      },
      {
        title: "Usage insight",
        body: "Because you operate the platform, you can see what customers actually use — the most reliable input a product roadmap can have.",
      },
    ],
    faqHeading: "Frequently asked questions",
    faq: [
      {
        q: "What are SaaS application development services?",
        a: "Specialised services to create, maintain, and optimise cloud-based applications that customers reach over the internet without installing anything locally.",
      },
      {
        q: "How does SaaS development differ from traditional software development?",
        a: "Traditional development targets applications installed on individual devices. SaaS is cloud-based and multi-tenant, which brings easier updates, elastic scalability, and subscription pricing — and makes tenant isolation and operability first-class engineering concerns.",
      },
      {
        q: "Can you migrate our existing application to a SaaS model?",
        a: "Yes. We handle the transition from a single-tenant or installed product to a multi-tenant cloud platform, including the data model changes tenancy requires, while keeping the existing product running.",
      },
      {
        q: "Do we need ongoing support after development?",
        a: "SaaS is operated, not just delivered. Continuous maintenance, updates, and optimisation are what keep the platform secure, current, and competitive.",
      },
      {
        q: "How do you handle multi-tenancy and data isolation?",
        a: "We choose the isolation model against your compliance and cost requirements — shared schema with row-level security, schema per tenant, or database per tenant — and enforce it in the application layer as well as the data layer.",
      },
    ],
    cta: "Build Your SaaS Platform",
  },

  /* ----------------------------------------------------------- integration */
  integration: {
    metaTitle: "Software Integration Services",
    metaDescription:
      "Connect applications, data, APIs and legacy systems into one reliable, secure ecosystem — API, middleware, ETL, cloud and event-driven integration.",
    eyebrow: "Services",
    title: "Software Integration Services",
    intro: [
      "Software integration services **connect** separate applications, data sources, and systems so they exchange information and **work as one**. Done well, the result is a single ecosystem; done badly, it is a web of brittle point-to-point links nobody wants to touch.",
      "We connect your apps, data, APIs, and legacy systems into one reliable, secure ecosystem — built for business outcomes rather than for headcount.",
    ],
    cardsHeading: "Our software integration services",
    cards: [
      {
        title: "API Integration & Development",
        body: "We build, integrate, and customize application programming interfaces so your applications share data in real time, with versioning, rate limiting, and documentation as standard.",
      },
      {
        title: "Enterprise Application Integration",
        body: "Connecting mission-critical platforms — **ERP, CRM, and HRM systems** — so they exchange data without manual handovers and without a spreadsheet in the middle.",
      },
      {
        title: "Data Integration & Migration",
        body: "We unify data from many sources using ETL and ELT processes, database replication, and data warehouses, while protecting data integrity throughout the move.",
      },
      {
        title: "Cloud Integration",
        body: "Applications synchronized across **cloud platforms**, on-premise systems, and hybrid setups, so where a system runs stops dictating what it can talk to.",
      },
      {
        title: "Legacy System Integration",
        body: "Older systems rarely need to be replaced — they need to be connected. We wrap them in modern interfaces so they participate in current workflows.",
      },
      {
        title: "Generative AI Integration",
        body: "We embed AI and large language models into your existing stack through **AI platform integration**, with the access controls and audit trails that make it safe to do so.",
      },
      {
        title: "Middleware & iPaaS Integration",
        body: "Middleware solutions that bridge diverse systems using enterprise service buses and integration platforms, replacing point-to-point sprawl with something maintainable.",
      },
      {
        title: "Real-Time & Event-Driven Integration",
        body: "With event-driven integration, an action in one system instantly triggers a response in another — no nightly batch, no window where the two disagree.",
      },
    ],
    whyHeading: "Why choose Wesantika as your integration partner",
    why: [
      {
        title: "Senior-led integration engineering",
        body: "Integration failures are expensive and quiet. Senior engineers designing the contracts and the failure behaviour produce less rework than a large team discovering edge cases in production.",
      },
      {
        title: "Domain-aware data modelling",
        body: "Our engineers understand the data models and regulatory constraints of the domains they work in, which is what separates a working integration from a mapping that loses meaning.",
      },
      {
        title: "Architecture advice from day one",
        body: "We design approaches that protect data integrity and allow long-term scaling, rather than adding one more direct connection to an already tangled estate.",
      },
      {
        title: "Standards-based by default",
        body: "REST, GraphQL, and SOAP APIs, healthcare and payment data standards where they apply, and modern identity and single sign-on across connected systems.",
      },
      {
        title: "Observability included",
        body: "Every integration ships with monitoring, retry and dead-letter handling, and alerting, so a broken feed is noticed by us rather than reported by your customers.",
      },
      {
        title: "Documented handover",
        body: "Data flow diagrams, contract specifications, and runbooks, because integrations outlive the people who build them.",
      },
    ],
    processHeading: "Our software integration process",
    process: [
      {
        title: "Discovery and integration audit",
        body: "We identify stakeholders, review current systems, and run feasibility checks to confirm scope and technical fit before committing to an approach.",
      },
      {
        title: "Architecture and design",
        body: "We define the integration architecture, choose the right method — API, middleware, ETL, or event-driven — map the data flows, and produce a roadmap.",
      },
      {
        title: "Agile development",
        body: "Engineers implement the chosen approach: building APIs, configuring integration tooling, and writing the custom logic the mapping requires.",
      },
      {
        title: "Implementation and testing",
        body: "Unit, integration, and end-to-end testing confirm that every system communicates correctly and that data flows as intended, including the failure paths.",
      },
      {
        title: "Rollout and optimization",
        body: "We launch, gather feedback, and refine configuration under real load rather than assuming staging behaviour will hold.",
      },
      {
        title: "Continuous support",
        body: "Monitoring, updates, and fixes to keep the integrations reliable as the systems on both ends keep changing.",
      },
    ],
    benefitsHeading: "Benefits of software integration",
    benefits: [
      {
        title: "Eliminate data silos",
        body: "When ERP, CRM, and in-house applications exchange data automatically, every team works from the same numbers instead of arguing about whose export is current.",
      },
      {
        title: "Automate manual handovers",
        body: "Data moves from one application to the next without copy-paste, which removes both the delay and the transcription errors.",
      },
      {
        title: "Accelerate delivery",
        body: "Previously disconnected applications can trigger and complete processes end to end, shortening cycle times across the business.",
      },
      {
        title: "Improve analytics accuracy",
        body: "Connected systems feed analytics with clean, aligned data in real time instead of stale manual exports.",
      },
      {
        title: "Reduce operational cost",
        body: "Removing duplicate data entry and simplifying the estate cuts both the labour and the number of systems that need maintaining.",
      },
      {
        title: "Strengthen security",
        body: "Encryption, single sign-on, and role-based access applied consistently across every connected system, rather than differently in each one.",
      },
    ],
    faqHeading: "Frequently asked questions",
    faq: [
      {
        q: "What is software integration?",
        a: "The process of connecting separate applications and systems so they share data and work together, using APIs, middleware, ETL pipelines, and event-driven messaging to remove silos and automate workflows.",
      },
      {
        q: "What does a software integration company do?",
        a: "It designs the integration architecture, builds APIs and middleware, migrates and synchronizes data, tests interoperability, and provides ongoing support once the connections are live.",
      },
      {
        q: "How long does an integration project take?",
        a: "A simple point-to-point or API integration can take a few weeks. Enterprise integration spanning ERP, CRM, and legacy systems typically runs to several months.",
      },
      {
        q: "Should we build integrations in-house or outsource them?",
        a: "Outsource when you need senior integration engineers, faster delivery, and specific domain or compliance expertise without carrying the long-term hiring overhead.",
      },
      {
        q: "What integration methods do you use?",
        a: "API integration, middleware and enterprise service buses, ETL and ELT data integration, point-to-point integration where it genuinely fits, and event-driven integration.",
      },
      {
        q: "How do you protect data in transit between systems?",
        a: "Encryption in transit and at rest, authenticated and authorized service-to-service calls, least-privilege access to each endpoint, and audit logging of every exchange.",
      },
    ],
    cta: "Connect Your Systems",
  },

  /* ------------------------------------------------------------------- mvp */
  mvp: {
    metaTitle: "MVP Development Services",
    metaDescription:
      "From a clickable MVP to a production-ready system — strategy, prototyping, agile build and post-launch scale, built for validated learning.",
    eyebrow: "Services",
    title: "MVP Development Services",
    intro: [
      "An MVP is the simplest version of your product that still delivers real value. It exists to replace guesswork with behavioural data, so you validate before you invest rather than after.",
      "It is worth being precise about the distinction: a **proof of concept** only tests whether an idea is technically possible, while an **MVP** is a real, deployable product built to test whether anyone wants it.",
    ],
    cardsHeading: "Our MVP development services",
    cards: [
      {
        title: "MVP Strategy & Discovery",
        body: "Feature prioritization frameworks separate the must-haves from the nice-to-haves, so the first release is genuinely minimal and still genuinely viable.",
      },
      {
        title: "Prototyping & UX/UI Design",
        body: "User testing on a clickable prototype catches usability problems while they are still cheap to fix — before they are encoded in a codebase.",
      },
      {
        title: "Web Application MVP",
        body: "Responsive, secure web products built on a modular architecture that is ready to grow, rather than a throwaway that has to be rebuilt on success.",
      },
      {
        title: "Mobile App MVP",
        body: "iOS, Android, and cross-platform builds in React Native or Flutter, with offline-first options where connectivity cannot be assumed.",
      },
      {
        title: "AI & Generative-AI MVP",
        body: "Validate an AI concept — chatbots, semantic search, prediction — with clear acceptance criteria and cost controls attached from the beginning.",
      },
      {
        title: "Quality Assurance and Testing",
        body: "QA runs inside every sprint rather than as a bolt-on at the end, which is what allows an MVP to be shipped to real users rather than demoed internally.",
      },
      {
        title: "Post-MVP Scale & Maintenance",
        body: "Feature rollouts, architecture refactoring, cloud migration, and ongoing maintenance for the version that follows a successful validation.",
      },
    ],
    whyHeading: "Why choose Wesantika for your MVP",
    why: [
      {
        title: "Senior engineers on a small team",
        body: "A small senior team paired with AI-assisted tooling ships more usable product per week than a larger junior one, and produces far less that has to be rewritten later.",
      },
      {
        title: "Architecture advice from day one",
        body: "Business and engineering alignment plus real solution architecture, so the MVP is a foundation rather than a dead end you pay to demolish.",
      },
      {
        title: "Ruthless about scope",
        body: "We push back on features that do not test a hypothesis. Protecting your runway is part of the job, not an inconvenience to the statement of work.",
      },
      {
        title: "Built for regulated products too",
        body: "Where the product touches healthcare or financial data, the MVP is built with the security and compliance posture that domain requires from the first commit.",
      },
      {
        title: "IP protection built in",
        body: "Strict NDAs, legal safeguards, role-based access, and full ownership transfer of everything produced.",
      },
      {
        title: "A path beyond the MVP",
        body: "The same team can carry the product into scale, so a successful validation does not trigger a costly handover at the worst possible moment.",
      },
    ],
    processHeading: "Our MVP development process",
    process: [
      {
        title: "Discovery and consulting",
        body: "Market research, stakeholder interviews, and user personas define the core hypotheses the MVP exists to test.",
      },
      {
        title: "Feature prioritization",
        body: "Structured prioritization separates the essential from the aspirational, and the result is written down so it can be defended later.",
      },
      {
        title: "UX and prototype design",
        body: "User journey mapping, wireframes, and a clickable prototype that can be put in front of users before engineering begins.",
      },
      {
        title: "Agile build",
        body: "Development in sprints with QA in the loop and CI/CD underneath, producing a deployable increment every iteration.",
      },
      {
        title: "Launch and measure",
        body: "A beta launch to a targeted user group, instrumented with analytics so the hypotheses get an actual answer.",
      },
      {
        title: "Iterate and scale",
        body: "Feedback loops and behavioural data shape the next sprint, and the architecture is ready for the growth that follows validation.",
      },
    ],
    benefitsHeading: "Benefits of MVP development",
    benefits: [
      {
        title: "Validate before you scale",
        body: "Test with real users and confirm product-market fit before committing the budget that a full build requires.",
      },
      {
        title: "Faster time to market",
        body: "Shipping the core first means being in market — and learning — months earlier than a complete first release would allow.",
      },
      {
        title: "Leaner spend",
        body: "A large share of software features are rarely or never used. An MVP is the cheapest way to find out which ones yours are.",
      },
      {
        title: "Investor-ready traction",
        body: "A working product with real users is stronger evidence than any deck, and it changes the conversation in a funding round.",
      },
      {
        title: "A data-driven roadmap",
        body: "Product analytics, user interviews, and success metrics decide what comes next, rather than the loudest voice in the room.",
      },
      {
        title: "Built to grow",
        body: "A scalable architecture from the first commit means success is a scaling exercise, not a rewrite.",
      },
    ],
    faqHeading: "Frequently asked questions",
    faq: [
      {
        q: "What are MVP development services?",
        a: "Building the smallest functional version of a product — its core features only — so you can launch quickly, gather real user feedback, and validate product-market fit before full investment.",
      },
      {
        q: "How long does it take to build an MVP?",
        a: "Most MVPs take around three to six months, depending on the domain, the integrations involved, and how much compliance work the product carries.",
      },
      {
        q: "Should I build my MVP in-house or outsource it?",
        a: "Outsourcing is usually faster and cheaper for an early-stage product, because you get an assembled senior team immediately instead of spending the first quarter hiring one.",
      },
      {
        q: "What is the difference between a PoC and an MVP?",
        a: "A proof of concept tests technical possibility and is often thrown away. An MVP is a real, deployable product built to test demand, and it is meant to survive into version two.",
      },
      {
        q: "Will my MVP scale into a full product?",
        a: "Yes, when it is built for it. That is an architectural decision made at the start — which is why we make it deliberately rather than defaulting to whatever ships fastest.",
      },
      {
        q: "What happens after the MVP launches?",
        a: "Analytics and user feedback set the next priorities. From there we either scale the product with the same team, hand it over with documentation, or stop — and stopping early on a disproven idea is a successful outcome.",
      },
    ],
    cta: "Validate Your Idea",
  },

  /* ------------------------------------------------------------------- poc */
  poc: {
    metaTitle: "PoC Development Services",
    metaDescription:
      "Time-boxed proof-of-concept engineering that takes your riskiest assumption to a clear go/no-go decision in weeks, not quarters.",
    eyebrow: "Services",
    title: "PoC Development Services",
    intro: [
      "A proof of concept is a focused, time-boxed build that answers one question: **can this actually be done?** It tests the riskiest assumption before full development is funded, which is a far cheaper place to discover a problem than halfway through delivery.",
      "It is distinct from the neighbouring things it gets confused with. A prototype shows what something will look like. An MVP proves that people want it. A PoC proves that it can be built at all.",
    ],
    cardsHeading: "Our PoC development services",
    cards: [
      {
        title: "Technical Feasibility PoC",
        body: "We build the hardest part against real endpoints and mock everything peripheral, so the answer we get is about the actual risk rather than the scaffolding around it.",
      },
      {
        title: "AI & Data Feasibility PoC",
        body: "Models tested on your real data, measuring quality, coverage, and failure modes before anyone promises a capability to a customer.",
      },
      {
        title: "Integration & Architecture Spikes",
        body: "Real connections to the critical systems, so architectural options are settled by evidence instead of by whoever argues most confidently.",
      },
      {
        title: "Performance & Load Baselines",
        body: "Measured behaviour under realistic conditions, producing numbers you can design against rather than estimates you have to defend.",
      },
      {
        title: "Clickable Validation Prototypes",
        body: "Wireframes that test whether end users behave the way the business case assumes they will.",
      },
      {
        title: "Compliance & Data-Handling Proofs",
        body: "Concrete evidence that regulated data can move the way the design requires, produced before the architecture depends on it.",
      },
    ],
    whyHeading: "Why choose Wesantika for proof-of-concept work",
    why: [
      {
        title: "We build the risky part first",
        body: "A PoC that starts with the easy work tells you nothing. We go straight at the assumption most likely to be wrong, because that is the whole point of the exercise.",
      },
      {
        title: "No PoC that cannot fail",
        body: "Acceptance criteria are agreed before the build starts. A proof of concept that was never able to return \"no\" was theatre, not engineering.",
      },
      {
        title: "Senior engineers, small team",
        body: "Feasibility work rewards judgement over volume. A small senior team reaches a defensible answer faster and for less than a large one.",
      },
      {
        title: "Time-boxed by design",
        body: "A fixed window forces the question to be answered rather than explored indefinitely, which is what keeps a PoC from quietly becoming a project.",
      },
      {
        title: "Evidence-based architecture",
        body: "What the PoC proves becomes the delivery baseline, so the decisions carried into the build have measurements behind them.",
      },
      {
        title: "A real handover path",
        body: "Validated patterns, integration stubs, and effort estimates flow into the next phase instead of being discarded with the throwaway code.",
      },
    ],
    processHeading: "Our PoC development process",
    process: [
      {
        title: "Discovery and framing",
        body: "A workshop turns the idea into written hypotheses and explicit success criteria, so everyone agrees in advance what a positive result looks like.",
      },
      {
        title: "Solution and architecture design",
        body: "Wireframes, technical sketches, and stack selection — just enough design to make the build meaningful, and no more.",
      },
      {
        title: "Build the riskiest path",
        body: "The uncertain parts are built for real. Everything peripheral is mocked, because effort spent there proves nothing.",
      },
      {
        title: "Test and measure",
        body: "Evidence gathered against the acceptance criteria agreed at the start, rather than against a standard adjusted to fit the result.",
      },
      {
        title: "Decision pack",
        body: "A risk register, the measured outcomes, effort estimates for the full build, and a clear go/no-go recommendation you can take to a board.",
      },
      {
        title: "PoC to MVP handover",
        body: "Where the answer is go, the validated architecture and the integration work flow directly into the next phase.",
      },
    ],
    benefitsHeading: "Benefits of PoC development",
    benefits: [
      {
        title: "De-risk before major spend",
        body: "Weeks of focused work protect against months of building on an assumption that was never going to hold.",
      },
      {
        title: "A real go/no-go decision",
        body: "The output is a decision with evidence behind it, which is a very different artefact from a report full of qualified opinions.",
      },
      {
        title: "Stakeholder and investor buy-in",
        body: "A working demonstration of the hardest part moves internal and external conversations further than any amount of specification.",
      },
      {
        title: "A faster, cheaper path to MVP",
        body: "The unknowns are resolved before delivery starts, so the MVP estimate is a plan rather than a hope.",
      },
      {
        title: "Better architecture decisions",
        body: "Competing options are settled by measurement, which removes the most expensive kind of technical debt — the kind chosen on a hunch.",
      },
      {
        title: "Permission to stop",
        body: "A no is a successful outcome. Learning it in six weeks rather than nine months is the return on the whole exercise.",
      },
    ],
    faqHeading: "Frequently asked questions",
    faq: [
      {
        q: "What is PoC development?",
        a: "Building a small, time-boxed proof of concept to test whether an idea is technically feasible, before committing to full development.",
      },
      {
        q: "How long does a PoC take?",
        a: "Most proofs of concept complete within two to eight weeks. The time box is agreed at the start and is part of what makes the exercise useful.",
      },
      {
        q: "What is the difference between a PoC, a prototype, and an MVP?",
        a: "A PoC proves technical feasibility. A prototype proves the experience. An MVP proves market demand. They answer different questions and are usually run in that order.",
      },
      {
        q: "What is AI PoC development?",
        a: "Testing an AI or machine-learning concept against real data, measuring quality, coverage, and failure modes before a capability is promised to customers.",
      },
      {
        q: "What happens after the PoC?",
        a: "Validated patterns become the delivery baseline, integration stubs convert into production work, and the whole thing is handed over with user stories and effort estimates attached.",
      },
      {
        q: "What do we actually receive?",
        a: "Working code for the risky path, measured results against the agreed criteria, a risk register, effort estimates for the full build, and a written go/no-go recommendation.",
      },
    ],
    cta: "Prove Your Concept",
  },

  /* ---------------------------------------------------------------- devops */
  devops: {
    metaTitle: "DevOps Development Services",
    metaDescription:
      "DevOps consulting and implementation — CI/CD, infrastructure as code, containerization, monitoring and cloud adoption for faster, safer releases.",
    eyebrow: "Services",
    title: "DevOps Development Services",
    intro: [
      "DevOps brings development and operations together so that high-quality software can be delivered more quickly and more safely. In practice it means **toolchain pipelines**, **monitoring**, **automation**, and **cloud adoption** working as one system rather than as separate initiatives.",
      "We provide DevOps consulting and implementation for startups and established engineering organisations alike — whether you need a pipeline built from nothing or an existing one rescued from the state it has drifted into.",
    ],
    cardsHeading: "Our DevOps services",
    cards: [
      {
        title: "DevOps Consulting and Assessment",
        body: "We review your current delivery cycle, IT resources, and existing infrastructure, then map the gap between where releases are today and where they need to be.",
      },
      {
        title: "CI/CD Pipeline Engineering",
        body: "Build, test, and deployment pipelines that turn a merge into a verified release candidate automatically, with quality gates that actually block bad builds.",
      },
      {
        title: "Infrastructure as Code",
        body: "Environments defined in code so they can be created, reproduced, and destroyed reliably — which ends the class of incident that begins \"it works in staging\".",
      },
      {
        title: "Containerization and Orchestration",
        body: "Application modules containerized and orchestrated so that deployment, scaling, and rollback are routine operations rather than events requiring a maintenance window.",
      },
      {
        title: "Monitoring and Observability",
        body: "Automated monitoring, alerting, and dashboards, so problems announce themselves rather than waiting to be reported by a customer.",
      },
      {
        title: "Cloud and Platform Adoption",
        body: "Migration onto cloud infrastructure with the security controls, cost visibility, and automation needed to operate it responsibly afterwards.",
      },
    ],
    whyHeading: "Why partner with Wesantika for DevOps",
    why: [
      {
        title: "Faster rollout of new software",
        body: "Supervision, quality assessment, and corrective action are integrated and automated across the toolchain, which compresses the distance between merge and production.",
      },
      {
        title: "Higher software quality",
        body: "Release validation happens at every stage rather than once at the end, so defects are caught while they are still cheap to fix.",
      },
      {
        title: "Less downtime",
        body: "Automatic detection and elimination of errors, combined with reliable rollback, keeps outages short and rare.",
      },
      {
        title: "Cost control",
        body: "Automation removes manual toil, and infrastructure defined in code makes cloud spend visible and attributable rather than mysterious.",
      },
      {
        title: "Focus returned to the product",
        body: "When releases stop being a project in themselves, your engineers go back to building features instead of shepherding deployments.",
      },
      {
        title: "Security integrated into delivery",
        body: "Dependency scanning, secret management, and access control run inside the pipeline, so security is a gate rather than an annual audit.",
      },
    ],
    processHeading: "How a DevOps engagement runs",
    process: [
      {
        title: "Assess the current state",
        body: "We investigate the existing development cycle, the available IT resources, and the infrastructure already in place, and document what we find.",
      },
      {
        title: "Map goals and gaps",
        body: "Business objectives are mapped against the delivery capability that exists today, identifying the strong points and the weak ones honestly.",
      },
      {
        title: "Plan the adoption",
        body: "A sequenced plan for what changes first, chosen so that early steps deliver visible improvement rather than a long invisible foundation phase.",
      },
      {
        title: "Containers and environments",
        body: "A containerization strategy and infrastructure-as-code definitions that make environments reproducible from the repository.",
      },
      {
        title: "Build the CI/CD pipeline",
        body: "Toolchain selection, pipeline configuration, and test automation, so builds, tests, and deployments run without manual intervention.",
      },
      {
        title: "Monitoring and self-healing",
        body: "Automated monitoring, alerting, and where appropriate self-healing behaviour, so the system responds to common failures without a human.",
      },
      {
        title: "Operate and improve",
        body: "Ongoing tuning, capacity management, and workload distribution to keep the platform running smoothly as usage grows.",
      },
    ],
    benefitsHeading: "What DevOps changes",
    benefits: [
      {
        title: "Release frequency",
        body: "Deployments move from occasional, high-anxiety events to a routine operation that happens whenever the work is ready.",
      },
      {
        title: "Recovery time",
        body: "Automated rollback and reproducible environments turn a bad release from an outage into an inconvenience.",
      },
      {
        title: "Consistency across environments",
        body: "Infrastructure as code removes the configuration drift that makes staging a poor predictor of production.",
      },
      {
        title: "Visibility",
        body: "Dashboards and alerting give engineering and business stakeholders the same picture of system health at the same time.",
      },
      {
        title: "Scalability on demand",
        body: "Orchestrated workloads scale with traffic instead of being provisioned for a peak that occurs twice a year.",
      },
      {
        title: "Developer experience",
        body: "Fast, trustworthy pipelines are one of the strongest retention factors an engineering team has.",
      },
    ],
    faqHeading: "Frequently asked questions",
    faq: [
      {
        q: "What does DevOps look like in practice?",
        a: "An eCommerce site using CI/CD to ship feature updates daily; a SaaS company defining its infrastructure as code; a financial platform integrating security scanning into its pipeline; a games company relying on automated testing and monitoring to update safely.",
      },
      {
        q: "Do we need DevOps if we already deploy to the cloud?",
        a: "Cloud hosting and DevOps practice are different things. Running on managed infrastructure while deploying manually from a laptop leaves most of the benefit on the table.",
      },
      {
        q: "How long does it take to see results?",
        a: "The first meaningful improvement — usually an automated build and test pipeline — typically lands within weeks. Full infrastructure-as-code coverage and mature observability take longer and are best sequenced rather than attempted at once.",
      },
      {
        q: "Can you work with our existing toolchain?",
        a: "Yes. Replacing tooling wholesale is rarely the right first move. We generally improve what exists and replace only the parts that genuinely block progress.",
      },
      {
        q: "What is the difference between DevOps and DevSecOps?",
        a: "DevSecOps is DevOps with security controls integrated directly into the pipeline — dependency scanning, secret detection, and policy checks running on every build rather than as a separate review.",
      },
    ],
    cta: "Improve Your Delivery Pipeline",
  },

  /* ----------------------------------------------------------------- cloud */
  cloud: {
    metaTitle: "Cloud Migration Services",
    metaDescription:
      "Assessment, planning and execution of cloud migration — rehost, replatform or refactor — with minimal downtime, protected data and controlled cost.",
    eyebrow: "Services",
    title: "Cloud Migration Services",
    intro: [
      "Cloud migration is the relocation of documents, data, workloads, and processes from your own data centre onto cloud infrastructure. It is a data-integrity and continuity problem as much as an infrastructure one, which is why it rewards planning far more than speed.",
      "We assess what you have, recommend the migration strategy that fits each workload — **rehost**, **replatform**, or **refactor** — and execute it with minimal interruption to the business running on top.",
    ],
    cardsHeading: "Our cloud migration services",
    cards: [
      {
        title: "Migration Strategy and Planning",
        body: "We evaluate your business needs, recommend the most effective strategy per workload, and produce a comprehensive plan for moving what exists today.",
      },
      {
        title: "Workload Migration",
        body: "Applications and services moved onto cloud infrastructure using automated tooling wherever it is safe to, with a transformation plan covering the parts that need hands.",
      },
      {
        title: "Database Migration",
        body: "Data moved to the cloud or onto new platforms with minimal downtime, maintained integrity, and performance tuned for the destination rather than the origin.",
      },
      {
        title: "Cloud Architecture and Landing Zone",
        body: "Network topology, identity, access control, and cost boundaries established before workloads arrive, so governance is designed rather than retrofitted.",
      },
      {
        title: "Security and Compliance Setup",
        body: "Encryption, key management, logging, and the compliance controls your sector requires, configured as part of the migration rather than after it.",
      },
      {
        title: "Support and Optimization",
        body: "Monitoring, issue resolution, and continuous improvement — including the cost tuning that turns a working cloud estate into an efficient one.",
      },
    ],
    whyHeading: "Why choose Wesantika for cloud migration",
    why: [
      {
        title: "Strategy chosen per workload",
        body: "Not everything should be refactored, and not everything should be lifted and shifted. We assess each workload on its own merits and say which is which.",
      },
      {
        title: "Continuity protected",
        body: "Cutover plans, rollback paths, and data validation are prepared before anything moves, because a migration that cannot be reversed is a gamble.",
      },
      {
        title: "Cost modelled up front",
        body: "Cloud bills surprise people who migrate first and model later. We estimate running cost per workload before the move, then verify against reality afterwards.",
      },
      {
        title: "Security carried across",
        body: "Access control, encryption, and audit logging are re-established in the destination to at least the standard of the source, and usually better.",
      },
      {
        title: "Experienced engineering across major platforms",
        body: "AWS, Azure, and Google Cloud, with practical knowledge of the managed services that make a migration worth doing rather than merely a change of address.",
      },
      {
        title: "Support after the cutover",
        body: "The weeks following a migration are when the real behaviour appears. We stay for them, tuning performance and cost against actual production load.",
      },
    ],
    processHeading: "How we run a migration",
    process: [
      {
        title: "Evaluate",
        body: "We capture the current architecture, understand the business requirements, prioritise applications, and assess the cost and risk profile of each workload.",
      },
      {
        title: "Plan",
        body: "Security objectives and compliance requirements are defined, the target platform is selected, and a migration plan and sequence are agreed.",
      },
      {
        title: "Build",
        body: "We design and build the destination environment — a minimal viable cloud footprint to operate against — and implement the security controls before any data lands.",
      },
      {
        title: "Migrate",
        body: "Workloads and data move in the agreed sequence, with validation at each step and a rollback path available throughout.",
      },
      {
        title: "Validate and hand over",
        body: "Performance and integrity are verified against pre-migration baselines, and your team is trained on operating the new environment.",
      },
      {
        title: "Optimize",
        body: "Once real load is on the platform, we tune capacity, storage tiers, and scaling policy so the running cost reflects actual usage.",
      },
    ],
    benefitsHeading: "Benefits of cloud migration",
    benefits: [
      {
        title: "Cost aligned to usage",
        body: "You pay for the capacity you use rather than provisioning for a peak, and idle infrastructure stops being a fixed cost.",
      },
      {
        title: "Scalability without procurement",
        body: "Physical constraints stop being the limit on growth, and capacity changes become a configuration decision rather than a purchase order.",
      },
      {
        title: "Stronger security posture",
        body: "Major cloud platforms apply security updates continuously and provide controls that are expensive to replicate in a private data centre.",
      },
      {
        title: "Disaster recovery and continuity",
        body: "Built-in backup, replication, and multi-region options give recovery times that are difficult to achieve on owned hardware.",
      },
      {
        title: "Faster innovation",
        body: "Managed services for data, analytics, and AI are available immediately, so new capability does not start with an infrastructure project.",
      },
      {
        title: "Remote access and collaboration",
        body: "Systems reachable securely from anywhere, which supports distributed teams without a VPN estate to maintain.",
      },
    ],
    faqHeading: "Frequently asked questions",
    faq: [
      {
        q: "What are the main goals of cloud migration?",
        a: "Improved scalability, lower and more predictable cost, greater flexibility, stronger security and compliance posture, better disaster recovery, and faster adoption of new capability.",
      },
      {
        q: "How much downtime should we expect?",
        a: "That depends on the workload and the strategy. Many migrations can be executed with little or no user-visible downtime using replication and staged cutover; where a window is unavoidable, it is planned and agreed in advance.",
      },
      {
        q: "What is the difference between rehost, replatform and refactor?",
        a: "Rehost moves the workload as-is and is fastest. Replatform makes targeted changes to use managed services. Refactor rewrites for cloud-native architecture and delivers the most benefit for the most effort.",
      },
      {
        q: "Will our costs actually go down?",
        a: "Not automatically. A lift-and-shift with no optimisation frequently costs more than the data centre it replaced. Savings come from right-sizing, scaling policy, and using managed services — which is why we model cost before migrating.",
      },
      {
        q: "Can you migrate only part of our estate?",
        a: "Yes, and hybrid is a legitimate destination rather than a halfway failure. Some workloads have good reasons to stay where they are.",
      },
    ],
    cta: "Plan Your Migration",
  },

  /* --------------------------------------------------------------- backend */
  backend: {
    metaTitle: "Back-end Development Services",
    metaDescription:
      "Scalable, secure server-side systems — custom back ends, APIs, cloud services and database design for web, mobile, desktop and IoT applications.",
    eyebrow: "Services",
    title: "Back-end Development Services",
    intro: [
      "The back end is the part of the system nobody sees and everybody depends on: data storage, business logic, and the server-side behaviour that determines whether the application stays up under load. A robust back end is what makes everything above it feel fast.",
      "We build adaptable server-side systems that evolve with your business, on-premise and in the cloud, for mobile, web, desktop, and IoT clients alike.",
    ],
    cardsHeading: "Our back-end development services",
    cards: [
      {
        title: "Custom Back-End Development",
        body: "The functional core of your software — server architecture, business logic, data model, and the integration surface the rest of the system builds on.",
      },
      {
        title: "API Development and Integration",
        body: "REST, GraphQL, and gRPC APIs with versioning, rate limiting, and documentation, plus the third-party integrations your product depends on.",
      },
      {
        title: "Database Design and Optimization",
        body: "Schema design, indexing, query tuning, and replication strategy, so data access stays fast as volume grows rather than degrading quietly.",
      },
      {
        title: "Mobile App Back Ends",
        body: "Business logic, application servers, push infrastructure, and data synchronization across platforms and intermittent connectivity.",
      },
      {
        title: "Cloud Back-End Solutions",
        body: "Cloud-native services that give you accessibility, elasticity, and adaptability, built alongside your front-end team rather than thrown over a wall to them.",
      },
      {
        title: "Back-End Testing",
        body: "Manual and automated testing to confirm efficient data handling and correct coordination between components, including load and failure-mode testing.",
      },
    ],
    whyHeading: "Why choose Wesantika for back-end development",
    why: [
      {
        title: "Architecture before code",
        body: "Database schema, server topology, and data-flow design are decided deliberately at the start, because these are the decisions that are most expensive to revisit.",
      },
      {
        title: "Deep domain experience",
        body: "Our engineers have built back ends across many domains and know where the load, the compliance, and the correctness risks usually sit in each.",
      },
      {
        title: "Tech lead support throughout",
        body: "A tech lead reviews the design and the code across the whole lifecycle, which is how consistency survives a growing team.",
      },
      {
        title: "Security as a design constraint",
        body: "Authentication, authorization, encryption, input validation, and audit logging are designed in, not appended after a penetration test.",
      },
      {
        title: "Built for scale",
        body: "Systems designed so growth is a capacity exercise rather than a rewrite, with caching, queuing, and horizontal scaling planned from the outset.",
      },
      {
        title: "Quality-first practice",
        body: "Code review, automated testing, and static analysis on every change, because back-end defects tend to be discovered late and cost the most.",
      },
    ],
    processHeading: "Our back-end development process",
    process: [
      {
        title: "Collecting requirements",
        body: "Detailed discussion of your needs, goals, and expectations, including the kind of application the back end has to serve and the load it must carry.",
      },
      {
        title: "Planning",
        body: "A detailed plan covering timeline, resources, and stages, so progress can be measured against something rather than estimated by feel.",
      },
      {
        title: "System architecture design",
        body: "Database schema, server setup, and data-flow mechanisms decided against your actual requirements, with the technology chosen to match.",
      },
      {
        title: "Environment setup",
        body: "A development environment tailored to the project — the frameworks, libraries, and pipelines the team will work in from day one.",
      },
      {
        title: "Development",
        body: "Engineers build the back end against the agreed design, in sprints, with tech-lead review before anything merges.",
      },
      {
        title: "Testing",
        body: "Functional, integration, performance, and security testing to confirm the back end behaves as specified under realistic conditions.",
      },
      {
        title: "Deployment",
        body: "Release to production with clean integration into the front end and the surrounding systems, plus monitoring from the first day.",
      },
      {
        title: "Maintenance and support",
        body: "Ongoing tuning, dependency currency, and capacity management, because a back end degrades if nobody is watching it.",
      },
    ],
    benefitsHeading: "Advantages of a well-built back end",
    benefits: [
      {
        title: "Efficient data management",
        body: "Data is organised so the application can handle large volumes without trading away speed, and so queries stay predictable as tables grow.",
      },
      {
        title: "Seamless integration",
        body: "Front end, back end, and external systems work together cleanly, with contracts that are documented and versioned rather than assumed.",
      },
      {
        title: "Scalability",
        body: "Capacity expands with demand, so a successful launch is something the system absorbs rather than something it fails under.",
      },
      {
        title: "Security",
        body: "The back end is where the sensitive data lives, so it is where the strongest protections belong — and where they have the most effect.",
      },
      {
        title: "Centralized business logic",
        body: "Rules live in one place and are applied consistently across web, mobile, and any other client, instead of drifting between them.",
      },
      {
        title: "Customization",
        body: "The system is tailored to your business requirements rather than shaped by the limitations of an off-the-shelf platform.",
      },
    ],
    faqHeading: "Frequently asked questions",
    faq: [
      {
        q: "Is an API a back-end service?",
        a: "Yes. An API is a back-end service that lets software applications interact, defining the methods and data formats used for the exchange.",
      },
      {
        q: "What are the different types of back-end service?",
        a: "Databases, APIs, data processing services, message queues, background job runners, and server-side application logic — together handling data management, server configuration, and business rules.",
      },
      {
        q: "What skills do back-end developers need?",
        a: "Strong command of a server-side language such as Java, C#, Python, Go, or Node.js, plus database design, API design, security practice, and a working understanding of the infrastructure the code runs on.",
      },
      {
        q: "Which is the best back-end language?",
        a: "There is no single answer — the choice depends on the project. Python, Java, .NET, Go, and Node.js are all common and all appropriate in different situations, and existing team skills legitimately influence the decision.",
      },
      {
        q: "Can you work on our existing back end?",
        a: "Yes. We take over existing systems regularly, starting with a structured review that produces a dependency map, a documented defect list, and deployment runbooks before we change anything.",
      },
    ],
    cta: "Strengthen Your Back End",
  },

  /* -------------------------------------------------------------- frontend */
  frontend: {
    metaTitle: "Front-End Development Services",
    metaDescription:
      "Accessible, responsive interfaces in React, Angular and Vue — UI/UX design, single-page and progressive web applications, and performance optimization.",
    eyebrow: "Services",
    title: "Front-End Development Services",
    intro: [
      "The front end is where your software is judged. Our front-end engineers are not simply writing markup — they are building the interface that decides whether people find the product effortless or exhausting.",
      "We build **responsive**, **accessible** interfaces that hold up across browsers and devices, with the quality, speed, and stability that make an application feel finished rather than merely functional.",
    ],
    cardsHeading: "Our front-end development services",
    cards: [
      {
        title: "UI/UX Design",
        body: "We work through your requirements and research the market to produce designs that are distinctive without sacrificing usability.",
      },
      {
        title: "React Development",
        body: "Component architecture, state management, and performance discipline in React, built to stay maintainable as the application and the team grow.",
      },
      {
        title: "Angular Development",
        body: "Angular for applications that benefit from a strongly structured framework, with typed contracts and a consistent architecture across a large codebase.",
      },
      {
        title: "Vue.js Development",
        body: "Vue for interfaces that need to be productive to build and straightforward to hand over, without giving up on structure.",
      },
      {
        title: "Responsive Web Design",
        body: "Interfaces that look right and work properly on every screen size, built with fluid layouts rather than a handful of fixed breakpoints.",
      },
      {
        title: "Single-Page Applications",
        body: "SPAs that deliver a fast, fluid experience, with routing, code splitting, and state handled so the first load stays quick.",
      },
      {
        title: "Progressive Web Applications",
        body: "PWAs combining web reach with app behaviour — installable, offline-capable, and fast even on an unreliable connection.",
      },
      {
        title: "Design System Implementation",
        body: "Reusable component libraries with documented usage, so the interface stays consistent as more people contribute to it.",
      },
    ],
    whyHeading: "Why choose Wesantika for front-end work",
    why: [
      {
        title: "Accessibility as a requirement",
        body: "Keyboard operability, sufficient contrast, and semantic structure are part of the definition of done, not a remediation project after an audit.",
      },
      {
        title: "Performance measured, not assumed",
        body: "Bundle size and interaction latency are tracked in CI against an agreed budget, so the interface does not get slower one commit at a time.",
      },
      {
        title: "Cross-browser and cross-device rigour",
        body: "Comprehensive testing across the browsers and devices your users actually have, rather than the one the developer happens to run.",
      },
      {
        title: "Design-to-code fidelity",
        body: "We work from design files and design systems directly, so what ships matches what was approved instead of approximating it.",
      },
      {
        title: "Maintainable architecture",
        body: "Component structure, state management, and styling conventions chosen so the codebase is still workable after two years of feature additions.",
      },
      {
        title: "Close collaboration with the back end",
        body: "Front-end and back-end engineers work to agreed contracts from the start, which removes most of the integration friction that appears late in projects.",
      },
    ],
    processHeading: "Our front-end development process",
    process: [
      {
        title: "Wireframing and design",
        body: "We start with wireframes and visual design, establishing structure and interaction before any component is built.",
      },
      {
        title: "Pipeline setup",
        body: "A CI/CD pipeline is configured early, so every change is built, tested, and previewable from the first week rather than the last.",
      },
      {
        title: "UI development",
        body: "The design becomes a working interface — components, states, and responsive behaviour, built against the design system.",
      },
      {
        title: "Back-end integration",
        body: "The interface is connected to server-side services against agreed API contracts, including the loading and error states real systems produce.",
      },
      {
        title: "Performance optimization",
        body: "Bundle analysis, code splitting, asset optimization, and rendering work to bring the application within its performance budget.",
      },
      {
        title: "Cross-browser and device testing",
        body: "Comprehensive testing across browsers, screen sizes, and input methods, including assistive technology.",
      },
      {
        title: "Release",
        body: "Once tested and optimized, the application ships — with monitoring in place to catch what testing did not.",
      },
      {
        title: "Monitoring and maintenance",
        body: "Post-release we track real-user performance and errors, and keep the interface current as browsers and dependencies move.",
      },
    ],
    benefitsHeading: "Advantages of strong front-end development",
    benefits: [
      {
        title: "Better user experience",
        body: "An interactive, responsive interface is the difference between a product people adopt and one they tolerate until an alternative appears.",
      },
      {
        title: "Cross-browser compatibility",
        body: "The application behaves consistently across browsers, so support tickets stop being about which one the user opened.",
      },
      {
        title: "Mobile responsiveness",
        body: "Layouts adapt to screen size properly, which matters because most first visits now arrive on a phone.",
      },
      {
        title: "Faster load times",
        body: "Modern tooling and disciplined asset handling produce applications that load quickly, which measurably affects conversion and retention.",
      },
      {
        title: "SEO benefits",
        body: "Semantic markup, correct rendering strategy, and fast pages are all inputs to search visibility for public-facing applications.",
      },
      {
        title: "Scalable interfaces",
        body: "Component-based architecture means the interface can grow with the product without the codebase becoming unmanageable.",
      },
    ],
    faqHeading: "Frequently asked questions",
    faq: [
      {
        q: "What is the difference between front-end and UI development?",
        a: "UI development is part of front-end development. Front-end covers everything running in the browser — interface, state, data fetching, routing, and performance — while UI development focuses specifically on building the visual interface.",
      },
      {
        q: "What is needed for front-end development?",
        a: "Command of HTML, CSS, and JavaScript, a modern framework such as React, Angular, or Vue, and working knowledge of accessibility, performance, and build tooling.",
      },
      {
        q: "Is front-end or back-end more important?",
        a: "Neither works without the other. The front end determines whether people can use the product; the back end determines whether it is correct and stays up. A weakness in either is visible to users.",
      },
      {
        q: "Can you work from our existing designs?",
        a: "Yes. We work from design files and existing design systems, and will flag anything that will not translate cleanly to code before development starts rather than after.",
      },
      {
        q: "Do you handle accessibility compliance?",
        a: "Yes. We build to WCAG 2.1 AA as standard and verify it during QA — keyboard navigation, contrast, semantic structure, and assistive technology testing.",
      },
    ],
    cta: "Build Your Interface",
  },

  /* ----------------------------------------------------------- maintenance */
  maintenance: {
    metaTitle: "Software Maintenance and Support Services",
    metaDescription:
      "Senior-led teams that take ownership of software already in production — corrective, adaptive, perfective and preventive maintenance with agreed SLAs.",
    eyebrow: "Services",
    title: "Software Maintenance and Support Services",
    intro: [
      "Most engineering teams lose their roadmap not for lack of ideas, but to the lifecycle of the software they already run: patches, dependency upgrades, incident triage, and defects. We take ownership of that work so your senior engineers can stay on the product.",
      "The distinction matters. **Maintenance** is planned and proactive — scheduled fixes, dependency updates, refactoring. **Support** is reactive — incidents and user-reported problems that threaten stability. The cost of owning a system rises fastest when planned work is deferred until it becomes an emergency.",
    ],
    cardsHeading: "Our software maintenance services",
    cards: [
      {
        title: "Corrective Maintenance",
        body: "Fixing what is broken: root-cause analysis on recurring incidents, log investigation across application, database and infrastructure, regression testing before release, and documented permanent fixes rather than repeated patches.",
      },
      {
        title: "Perfective Maintenance",
        body: "Making a working system better: query tuning, caching, profiling, cloud resource optimization, and interface and workflow refinements based on how the system is actually used.",
      },
      {
        title: "Adaptive Maintenance",
        body: "Keeping pace with everything you do not control: operating system, runtime and framework upgrades, third-party API contract changes, platform deprecations, and compliance-driven changes.",
      },
      {
        title: "Preventive Maintenance",
        body: "Reducing tomorrow's incidents: targeted refactoring of fragile, high-change modules, technical debt paydown prioritized by change frequency, dependency scanning, and test coverage where there is none.",
      },
      {
        title: "Monitoring and Incident Response",
        body: "Proactive alerting, defined severity levels, agreed escalation paths, and a documented incident lead for every critical outage.",
      },
      {
        title: "Reporting and Improvement",
        body: "Monthly reporting on SLA attainment, incident volume and trend, root-cause patterns, and preventive fixes shipped — used to set the next quarter's priorities.",
      },
    ],
    whyHeading: "Why choose Wesantika for maintenance and support",
    why: [
      {
        title: "We inherit codebases we did not write",
        body: "Taking over unfamiliar software is a specific discipline, not a smaller version of building it. Onboarding produces component and dependency maps, a documented defect list, and runbooks before we take responsibility.",
      },
      {
        title: "Knowledge lives in the team, not one head",
        body: "Everything we learn lands in a shared knowledge base rather than in an individual's memory, so a person leaving is not an outage waiting to happen.",
      },
      {
        title: "The same engineers, year after year",
        body: "Churn on a vendor's side means paying twice for knowledge you already bought. Continuity is something we plan for deliberately.",
      },
      {
        title: "Security posture built for standing access",
        body: "Maintenance means ongoing production access. That calls for role-based access control, NDAs, audit trails, and a secure development lifecycle rather than a trust-based arrangement.",
      },
      {
        title: "Engagement models that flex",
        body: "Retainer, dedicated team, staff augmentation, or a full offshore centre — and the ability to scale coverage up or down without renegotiating everything.",
      },
      {
        title: "SLAs that are measured",
        body: "Response and resolution targets are agreed per severity during onboarding and reported against monthly, so compliance is a measurement rather than an assertion.",
      },
    ],
    processHeading: "Our maintenance and support process",
    process: [
      {
        title: "Discovery and requirements",
        body: "We map what needs supporting, technically and commercially: interviews with your leads, and an application health audit covering codebase size, system age, architecture, known defects, and compliance demands. A written baseline is delivered before anything changes.",
      },
      {
        title: "Knowledge transfer",
        body: "Architecture and data-flow diagrams, deployment and rollback procedures, environment configuration, and access to code, pipelines, and dashboards — captured in a shared knowledge base with runbooks.",
      },
      {
        title: "Stabilize",
        body: "We clear the known-defect backlog, close security gaps, and establish regression coverage, identifying failure points and testing against load spikes and dependency failures.",
      },
      {
        title: "Maintain and monitor",
        body: "Steady state: monitoring and alerting, patch currency, incident handling against agreed SLAs, and disciplined release management, with support workflows defined per severity.",
      },
      {
        title: "Improve and report",
        body: "Monthly reporting on SLA attainment, incident volume and trends, root-cause patterns, preventive fixes delivered, and change throughput — feeding directly into the next quarter's priorities.",
      },
    ],
    benefitsHeading: "What ongoing maintenance protects",
    benefits: [
      {
        title: "Lower total cost of ownership",
        body: "Planned work is cheaper than emergency work, every time. Deferring maintenance does not avoid the cost, it increases it and moves it to a worse moment.",
      },
      {
        title: "System stability",
        body: "Fewer unplanned outages, and fewer repeat incidents once root-cause analysis replaces symptom patching.",
      },
      {
        title: "Security and compliance currency",
        body: "Dependencies patched and standards tracked as they change, rather than discovered to be years out of date during an audit.",
      },
      {
        title: "Extended system life",
        body: "Well-maintained software stays useful for far longer, which defers the cost and disruption of replacement.",
      },
      {
        title: "Engineering capacity returned",
        body: "Your senior people stop being a help desk and go back to the roadmap they were hired to deliver.",
      },
      {
        title: "Better decisions about change",
        body: "Business analysis means change requests are evaluated against value before they consume a sprint.",
      },
    ],
    faqHeading: "Frequently asked questions",
    faq: [
      {
        q: "What are the four types of software maintenance?",
        a: "Corrective fixes defects. Adaptive adjusts the software to changes in operating systems, APIs, and infrastructure. Perfective improves performance and adds features. Preventive reduces future failures through refactoring and debt reduction. Most engagements need all four.",
      },
      {
        q: "What is the difference between maintenance and support?",
        a: "Maintenance is proactive and planned — scheduled improvements, upgrades, and refactoring. Support is reactive, resolving urgent incidents that disrupt operation. Maintenance protects the system's future; support protects today's users. A complete agreement covers both.",
      },
      {
        q: "How do you classify and prioritize incidents?",
        a: "By business impact: a critical outage where the system is down or unusable; a major failure where a key feature is broken and operations are affected; a minor defect with a workaround; and cosmetic issues or improvement requests.",
      },
      {
        q: "Can you maintain software our team did not build?",
        a: "Yes — most maintenance engagements start that way. We run a structured knowledge transfer producing a dependency map, a documented defect and risk register, and deployment runbooks before taking responsibility.",
      },
      {
        q: "Should we keep maintenance in-house or outsource it?",
        a: "In-house gives maximum control but requires hiring for legacy and niche skills and carries fixed cost through quiet periods. Outsourced maintenance ramps faster and scales both directions. Many organisations keep management in-house and outsource the resourcing.",
      },
      {
        q: "What reporting will we receive?",
        a: "SLA attainment, incident volume and trends, root-cause patterns, preventive fixes delivered, and change throughput — reported monthly and used to agree the next period's priorities.",
      },
    ],
    cta: "Talk to Us About Support",
  },
} as const;
