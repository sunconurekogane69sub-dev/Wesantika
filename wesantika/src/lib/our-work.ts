/**
 * Our Work — the case-study browser from Figma (the pasted 554:855 / 554:1457 /
 * 554:1467 / 554:1746 / 555:2084 / 556:2395 / 556:2714 pages).
 *
 * Extracted from the artboards rather than transcribed: 83 cards across seven
 * paginated pages, each with its image, service tags and title.
 *
 * Partner product brands are unified under Wesantika per the client's decision:
 * SotaVision -> Wesantika Vision, Sotabox -> Wesantika Box, SotaAgents ->
 * Wesantika Agents, SOTA Finance -> Wesantika Finance, Wesang -> Wesantika.
 * Client and partner company names are left as authored.
 *
 * `industries` is empty on every card: the artboard defines an industry filter
 * row but none of the cards carry an industry tag. Fill them in here and those
 * filters light up on their own — the UI derives which chips are live from the
 * data, so nothing dead-ends.
 */

export type CaseStudy = {
  id: string;
  title: string;
  /**
   * Written from the card's title and service tags — the only source material
   * these carry. English only, like the titles: see the note at the top of the
   * file. Nothing here asserts a fact the title or tags do not already state.
   */
  description: string;
  /** service categories — drive the first filter row */
  tags: readonly string[];
  /** industry categories — drive the second filter row */
  industries: readonly string[];
  image: string;
};

/** Card geometry from the artboard: Article 409x333, image band 407x220. */
export const WORK_CARD = { width: 409, imageHeight: 220 } as const;

/** 12 per page, matching the "1 2 3 … 7" pagination in the design. */
export const WORK_PAGE_SIZE = 12;

export const WORK_SERVICES = [
  "AI & ML",
  "Blockchain",
  "Cloud-based",
  "Custom Software",
  "ERP - CRM",
  "Game",
  "Infrastructure Managed Services",
  "IoT",
  "Mobile-app",
  "SAP",
  "Smart Factory",
  "Web-app",
] as const;

export const WORK_INDUSTRIES = [
  "E-commerce",
  "Education",
  "Energy",
  "Entertainment",
  "Finance",
  "Fintech",
  "Health-care",
  "Hospitality",
  "Human Resource",
  "Manufacturing",
  "Real-estate",
  "Retail",
  "Technology",
  "Transportation",
] as const;

export const CASE_STUDIES: readonly CaseStudy[] = [
  {
    id: "diabetes-app",
    title: "Diabetes App",
    description:
      "Designed and developed a mobile application for day-to-day diabetes self-management, bringing readings, medication and history into a single record. Delivered as custom software rather than a configured health tracker, so the data model follows how the log is actually kept — which matters when the record is something a clinician may later be asked to read.",
    tags: ["Custom Software", "Mobile-app"],
    industries: [],
    image: "/work/work-diabetes-app.png",
  },
  {
    id: "wellness-super-app",
    title: "Wellness Super App",
    description:
      "Architected a consolidated wellness platform that puts several health services behind one account, with machine learning and on-chain components alongside. The engineering weight sits in integration: a super app is many products sharing identity, data and navigation, and the work is keeping those boundaries intact as features are added rather than letting each reach into the others.",
    tags: ["AI & ML", "Blockchain", "Custom Software"],
    industries: [],
    image: "/work/work-wellness-super-app.png",
  },
  {
    id: "cloud-migration",
    title: "Cloud Migration",
    description:
      "Migrated a production workload to cloud infrastructure. Scope was set by the constraint that defines this work — deciding what can move unchanged, what has to be reworked before it moves at all, and in what order — so the service stays available through the cutover and there is a way back if it does not.",
    tags: ["Cloud-based"],
    industries: [],
    image: "/work/work-cloud-migration.png",
  },
  {
    id: "sleep-tracking-app",
    title: "Sleep Tracking App",
    description:
      "Developed a sleep tracking application built around signal interpretation rather than raw logging. The value is in turning a night of continuous data into something the user can act on in the morning, so the model work and the application were built together instead of one being fitted to the other afterwards.",
    tags: ["AI & ML", "Custom Software"],
    industries: [],
    image: "/work/work-sleep-tracking-app.png",
  },
  {
    id: "partners-week-a-blockchain-powered-platform-for-professional",
    title: "PARTNERS WEEK®: A blockchain-powered platform for professional partner certifications",
    description:
      "Delivered a certification platform for professional partner programmes, with credentials recorded on-chain. The problem it addresses is verification: a certificate is worth only what a third party can independently check, and placing the record where anyone can confirm it removes the issuer from the loop every time a credential needs to be trusted.",
    tags: ["Blockchain", "Custom Software"],
    industries: [],
    image: "/work/work-partners-week-a-blockchain-powered-platform-for-professiona.png",
  },
  {
    id: "chartx-an-ai-assistant-for-healthcare",
    title: "ChartX - An AI Assistant for Healthcare",
    description:
      "Engineered an assistant for clinical staff that applies machine learning to the records and charts they already work in. Built as custom software because the useful version of this is not a general chatbot: it has to sit inside an existing clinical workflow, respect who may see what, and be answerable for anything it surfaces.",
    tags: ["AI & ML", "Custom Software"],
    industries: [],
    image: "/work/work-chartx-an-ai-assistant-for-healthcare.png",
  },
  {
    id: "healthcare-ocr-solution",
    title: "Healthcare OCR solution",
    description:
      "Implemented document recognition for healthcare paperwork, converting scanned forms into structured records. What separates this from general OCR is the cost of a single wrong character — a misread identifier or dosage is not a formatting defect — so as much of the engineering sits in validation and confidence handling as in extraction itself.",
    tags: ["Custom Software"],
    industries: [],
    image: "/work/work-healthcare-ocr-solution.png",
  },
  {
    id: "pacs-solution-for-public-healthcare-center",
    title: "PACS Solution for Public Healthcare Center",
    description:
      "Delivered a picture archiving and communication system for a public healthcare centre, covering medical imaging storage, retrieval and distribution, with machine learning applied across the image set. PACS work is dominated by interoperability and volume: standards-conformant exchange with hospital systems that cannot be altered, and studies measured in gigabytes rather than megabytes.",
    tags: ["AI & ML", "Custom Software"],
    industries: [],
    image: "/work/work-pacs-solution-for-public-healthcare-center.png",
  },
  {
    id: "wesantika-vision-deployment-for-lg-innotek-hai-phong",
    title: "Wesantika Vision Deployment for LG Innotek Hai Phong",
    description:
      "Deployed the Wesantika Vision platform at LG Innotek's Hai Phong plant. Manufacturing deployments are integration and configuration work far more than installation: the system has to meet the production line as it already runs, on the plant's own network and around its existing equipment, rather than the line being reshaped to suit the software.",
    tags: ["Custom Software"],
    industries: [],
    image: "/work/work-wesantika-vision-deployment-for-lg-innotek-hai-phong.png",
  },
  {
    id: "decathlon-esop-platform",
    title: "Decathlon ESOP Platform",
    description:
      "Developed an employee share ownership platform for Decathlon. ESOP systems are unforgiving — allocations, vesting schedules and tax treatment differ by country, and every figure an employee sees has to reconcile against the underlying grant. Custom software was the right call because that reconciliation, not the interface, is where the difficulty lies.",
    tags: ["Custom Software"],
    industries: [],
    image: "/work/work-decathlon-esop-platform.png",
  },
  {
    id: "process-alignment-and-ecommerce-platform-modernization",
    title: "Process Alignment and eCommerce Platform Modernization",
    description:
      "Modernized an eCommerce platform alongside the business processes running on it. The two were addressed together deliberately: replatforming around processes that no longer fit only relocates the problem, so working out what to align before rebuilding — and what to rebuild in order to make alignment possible — was the substance of the engagement.",
    tags: ["Custom Software"],
    industries: [],
    image: "/work/work-process-alignment-and-ecommerce-platform-modernization.png",
  },
  {
    id: "in-app-communication-platform-for-digital-entertainment-corp",
    title: "In-app Communication Platform for Digital Entertainment Corporation",
    description:
      "Integrated a real-time communication layer into a digital entertainment company's game client, rather than bolting a chat product alongside it. Messaging inside a game runs on a tight budget: it competes with the render loop for frame time and with the game's own traffic for bandwidth, so the transport and threading model came first.",
    tags: ["Custom Software", "Game"],
    industries: [],
    image: "/work/work-in-app-communication-platform-for-digital-entertainment-cor.png",
  },
  {
    id: "smart-learn-ai-integrating-technology-into-education",
    title: "Smart Learn AI: Integrating technology into Education",
    description:
      "Designed an education platform that applies machine learning to how material is sequenced and assessed. The model and the teaching workflow were shaped together as custom software — an adaptive system is only useful if a teacher can see what it decided and overrule it, which is a product requirement before it is a technical one.",
    tags: ["AI & ML", "Custom Software"],
    industries: [],
    image: "/work/work-smart-learn-ai-integrating-technology-into-education.png",
  },
  {
    id: "terrafuse-driving-efficiency-with-scalable-ev-charging-solut",
    title: "TerraFuse: Driving Efficiency with Scalable EV Charging Solutions",
    description:
      "Delivered web and mobile applications for TerraFuse's EV charging operation, covering both the driver-facing side and the operator's view of the network. Charging software is a coordination problem: sessions, availability and billing all describe hardware standing in the field, and the software is worth exactly as much as its picture of that state is accurate.",
    tags: ["Mobile-app", "Web-app"],
    industries: [],
    image: "/work/work-terrafuse-driving-efficiency-with-scalable-ev-charging-solu.png",
  },
  {
    id: "a-serverless-transformation-for-a-carbon-offset-platform",
    title: "A Serverless Transformation for A Carbon Offset Platform",
    description:
      "Re-architected a carbon offset platform onto serverless infrastructure — a genuine fit, since these workloads are bursty and event-driven and paying for idle capacity was the wrong shape entirely. The work was in decomposing a running system into functions without losing transactional integrity along the seams that decomposition creates.",
    tags: ["Custom Software"],
    industries: [],
    image: "/work/work-a-serverless-transformation-for-a-carbon-offset-platform.png",
  },
  {
    id: "elevating-insurance-tech-with-aqa-solutions",
    title: "Elevating Insurance Tech with AQA Solutions",
    description:
      "Automated quality assurance for an insurance technology platform. Insurance software carries rules that vary by product, region and regulation, and regression risk compounds with every one of them — which is what makes test automation here an engineering investment rather than an overhead, and why coverage was designed around the rules most likely to change.",
    tags: ["Custom Software"],
    industries: [],
    image: "/work/work-elevating-insurance-tech-with-aqa-solutions.png",
  },
  {
    id: "wesantika-box-intelligent-internal-knowledge-base-platform",
    title: "Wesantika Box – Intelligent Internal Knowledge Base Platform",
    description:
      "Built and maintained as a Wesantika product: an internal knowledge base that answers questions against a company's own documents. The engineering problem is retrieval rather than generation — an answer is only as good as what was found — and enterprise content is inconsistent, duplicated and bound by permissions the answer must respect.",
    tags: ["AI & ML"],
    industries: [],
    image: "/work/work-wesantika-box-intelligent-internal-knowledge-base-platform.png",
  },
  {
    id: "wesantika-agents-genai-agents-product",
    title: "Wesantika Agents – GenAI Agents Product",
    description:
      "Operate a Wesantika product for creating and running generative AI agents. Agents are straightforward to demonstrate and hard to run: tool access, failure handling, and cost that scales with every retry are what separate something worth showing from something a business can depend on day after day.",
    tags: ["AI & ML"],
    industries: [],
    image: "/work/work-wesantika-agents-genai-agents-product.png",
  },
  {
    id: "empowering-thai-bank-with-digital-solutions",
    title: "Empowering Thai Bank with Digital Solutions",
    description:
      "Built digital banking software for a Thai bank, including the customer-facing mobile application. Banking work is defined by its constraints rather than its features: regulatory approval, integration with core systems that cannot be modified, and a release process in which a defect is not an incident but a public event.",
    tags: ["Custom Software", "Mobile-app"],
    industries: [],
    image: "/work/work-empowering-thai-bank-with-digital-solutions.png",
  },
  {
    id: "scaling-a-fintech-platform-with-custom-software",
    title: "Scaling a Fintech Platform with Custom Software",
    description:
      "Rebuilt the core of a fintech platform whose growth had outrun its original architecture. Scaling a financial system is not primarily a throughput exercise — correctness under concurrency matters more than raw speed, because a double-counted transaction cannot be fixed by adding capacity — so the data model and the cloud infrastructure were reworked together.",
    tags: ["Cloud-based", "Custom Software", "Web-app"],
    industries: [],
    image: "/work/work-scaling-a-fintech-platform-with-custom-software.png",
  },
  {
    id: "smart-factory-transformation-at-mitac",
    title: "Smart Factory Transformation at MiTAC",
    description:
      "Engineered smart factory systems for MiTAC, connecting production equipment to the software that plans and monitors it. Factory floors run mixed generations of machinery with no common interface, so most of the work sits in the translation layer between what each machine is able to report and what the plant actually needs to know.",
    tags: ["Custom Software", "Smart Factory"],
    industries: [],
    image: "/work/work-smart-factory-transformation-at-mitac.png",
  },
  {
    id: "voy-travel-web3-solutions-for-travel-services",
    title: "Voy Travel: Web3 Solutions for Travel Services",
    description:
      "Built Web3 components for Voy Travel's booking services, with cloud infrastructure behind them. Travel is a settlement-heavy business — many parties to a single itinerary, deferred payment, disputes long after the fact — and that reconciliation problem is the part on-chain records are genuinely suited to solving.",
    tags: ["Blockchain", "Cloud-based"],
    industries: [],
    image: "/work/work-voy-travel-web3-solutions-for-travel-services.png",
  },
  {
    id: "optimizing-blood-health-insights-with-cloud-solutions",
    title: "Optimizing Blood Health Insights with Cloud Solutions",
    description:
      "Provisioned cloud infrastructure for a blood health analytics service. Diagnostic workloads arrive in batches and have to clear a turnaround commitment regardless of when they land, so the work centred on capacity that follows demand rather than a fixed fleet sized for a peak that lasts a few hours a day.",
    tags: ["Cloud-based"],
    industries: [],
    image: "/work/work-optimizing-blood-health-insights-with-cloud-solutions.png",
  },
  {
    id: "fast-and-accurate-real-estate-valuation-with-ai",
    title: "Fast and Accurate Real Estate Valuation with AI",
    description:
      "Developed an automated property valuation model. Two requirements pull against each other here: speed and defensibility. A valuation nobody can explain is not usable in a transaction however quickly it arrives, so the model was built to show the comparable evidence behind each figure alongside the figure itself.",
    tags: ["AI & ML"],
    industries: [],
    image: "/work/work-fast-and-accurate-real-estate-valuation-with-ai.png",
  },
  {
    id: "expanding-youtube-reach-with-sub-tube",
    title: "Expanding YouTube Reach with Sub-tube",
    description:
      "Built Sub-tube, a web application for growing reach on YouTube. Working against a third-party platform's API sets the engineering terms: quota limits that cap throughput, endpoints that change without notice, and behaviour that has to stay inside the platform's own rules for the product to remain viable at all.",
    tags: ["Web-app"],
    industries: [],
    image: "/work/work-expanding-youtube-reach-with-sub-tube.png",
  },
  {
    id: "ai-tools-for-smart-note-management",
    title: "AI Tools for Smart Note Management",
    description:
      "Applied machine learning to personal note management — organising, connecting and retrieving material the user has already captured. The useful version of this is unobtrusive: it has to improve retrieval without asking anyone to tag, file or restructure how they write, because the moment it does, people stop using it.",
    tags: ["AI & ML"],
    industries: [],
    image: "/work/work-ai-tools-for-smart-note-management.png",
  },
  {
    id: "wesantika-elevating-food-delivery-through-managed-services",
    title: "Managed Services for a Food Delivery Platform",
    description:
      "Took on managed infrastructure for a food delivery platform. Delivery traffic peaks sharply around meal times and an outage during a peak is revenue that does not come back later, so the engagement is built around headroom and response time rather than the average load an annual figure would suggest.",
    tags: ["Infrastructure Managed Services"],
    industries: [],
    image: "/work/work-wesantika-elevating-food-delivery-through-managed-services.png",
  },
  {
    id: "strengthening-ubet-sport-s-platform-with-infrastructure",
    title: "Strengthening UBet Sport's Platform with Infrastructure",
    description:
      "Rebuilt and now manage the infrastructure behind UBet Sport's platform. Sports platforms carry load that is entirely predictable in timing and severe in magnitude, which turns capacity planning into a scheduling exercise — provisioning against a fixture list rather than against a trend line.",
    tags: ["Infrastructure Managed Services"],
    industries: [],
    image: "/work/work-strengthening-ubet-sport-s-platform-with-infrastructure.png",
  },
  {
    id: "reliable-infrastructure-support-for-invtai-growth",
    title: "Reliable Infrastructure Support for InvtAI Growth",
    description:
      "Instrumented and now support InvtAI's infrastructure through a period of growth. The work of an engagement like this is keeping a platform stable while it changes underneath you: capacity, monitoring and release support moving alongside the product rather than catching up with it after each launch.",
    tags: ["Infrastructure Managed Services"],
    industries: [],
    image: "/work/work-reliable-infrastructure-support-for-invtai-growth.png",
  },
  {
    id: "infrastructure-management-for-camera-ai",
    title: "Infrastructure Management for Camera AI",
    description:
      "Operate the infrastructure behind a camera AI service. Continuous video inference behaves unlike request-response workloads: cost and latency are set by where inference runs rather than how the code is written, and the pipeline has to keep pace with a stream that will not wait for it to recover.",
    tags: ["Infrastructure Managed Services"],
    industries: [],
    image: "/work/work-infrastructure-management-for-camera-ai.png",
  },
  {
    id: "mlops-pipeline-for-dopikai",
    title: "MLOps pipeline for DopikAI",
    description:
      "Established an MLOps pipeline for DopikAI, covering the path from training through to a deployed and monitored model. This is the part of machine learning work that decides whether a model stays useful: versioning, reproducibility, and a route back when a new deployment turns out to be worse than the one it replaced.",
    tags: ["Cloud-based"],
    industries: [],
    image: "/work/work-mlops-pipeline-for-dopikai.png",
  },
  {
    id: "cloud-based-material-resource-planning",
    title: "Cloud-Based Material Resource Planning",
    description:
      "Built a cloud-hosted material resource planning system. MRP is a scheduling engine long before it is a screen — quantities, lead times and dependencies have to resolve into a plan the plant can act on, and the whole calculation has to run again the moment any single input moves.",
    tags: ["Cloud-based", "ERP - CRM"],
    industries: [],
    image: "/work/work-cloud-based-material-resource-planning.png",
  },
  {
    id: "erp-system-for-warehouse-management",
    title: "ERP System for Warehouse Management",
    description:
      "Implemented an ERP system for warehouse operations, covering receiving, locations, picking and stock accuracy. Warehouse software is judged on one thing: whether the record matches the shelf. So the design question was where discrepancies get caught and corrected, not how many features the system could be made to offer.",
    tags: ["ERP - CRM"],
    industries: [],
    image: "/work/work-erp-system-for-warehouse-management.png",
  },
  {
    id: "salesforce-commercial-cloud-integration",
    title: "Salesforce Commerce Cloud Integration",
    description:
      "Integrated Salesforce Commerce Cloud with the systems around it. Platform integration is largely a reconciliation problem: two systems each hold their own version of the customer and the order, and the engineering is in agreeing which is authoritative, when, and what happens to the difference in the meantime.",
    tags: ["Cloud-based", "ERP - CRM"],
    industries: [],
    image: "/work/work-salesforce-commercial-cloud-integration.png",
  },
  {
    id: "cloud-based-sales-management-crm-transformation",
    title: "Cloud-Based Sales Management CRM Transformation",
    description:
      "Replaced a sales management CRM with a cloud-based system. CRM projects fail on adoption rather than function, so migrating live pipeline data without loss and getting the day-to-day workflow to match how the team already sells carried more weight in this work than the platform choice itself.",
    tags: ["Cloud-based", "ERP - CRM"],
    industries: [],
    image: "/work/work-cloud-based-sales-management-crm-transformation.png",
  },
  {
    id: "voicy-azure-to-aws-cloud-migration",
    title: "Voicy: Azure to AWS Cloud Migration",
    description:
      "Migrated Voicy from Azure to AWS. Cross-provider moves are not lift-and-shift, because managed services do not map one to one: each dependency was matched, replaced or rebuilt on its merits, and the sequence was planned so the service kept running throughout rather than around a maintenance window.",
    tags: ["Cloud-based"],
    industries: [],
    image: "/work/work-voicy-azure-to-aws-cloud-migration.png",
  },
  {
    id: "smart-kitchen",
    title: "Smart Kitchen",
    description:
      "Built connected kitchen systems, joining appliances and sensors to the software that controls and monitors them. IoT in a kitchen has to tolerate unreliable networks and appliances that will outlive several generations of software, which is why the device contract was designed before the interface that sits on top of it.",
    tags: ["Custom Software", "IoT"],
    industries: [],
    image: "/work/work-smart-kitchen.png",
  },
  {
    id: "sap-system-for-real-estate",
    title: "SAP System for Real Estate",
    description:
      "Implemented SAP for a real estate business, extended with custom development where the standard modules did not fit. Property portfolios carry long-lived contracts and irregular revenue recognition, and the judgement in this work is knowing what to configure and what to build — the wrong answer either way is expensive to keep.",
    tags: ["Custom Software", "SAP"],
    industries: [],
    image: "/work/work-sap-system-for-real-estate.png",
  },
  {
    id: "sap-system-for-bank",
    title: "SAP System for Bank",
    description:
      "Implemented SAP for a bank, with custom development alongside it. Financial institutions bring reporting obligations and audit requirements the standard configuration does not cover on its own, so the boundary between what was configured and what was built was drawn deliberately and documented rather than allowed to drift.",
    tags: ["Custom Software", "SAP"],
    industries: [],
    image: "/work/work-sap-system-for-bank.png",
  },
  {
    id: "sap-system-for-administration",
    title: "SAP System for Administration",
    description:
      "Implemented SAP for administrative operations, with custom development where required. The value in work like this is fitting a general platform to one organisation's processes closely enough to be worth using, without forking it so far that it can no longer take an upgrade.",
    tags: ["Custom Software", "SAP"],
    industries: [],
    image: "/work/work-sap-system-for-administration.png",
  },
  {
    id: "smart-house-and-building",
    title: "Smart Home and Building Automation",
    description:
      "Built building automation across web and mobile, with connected devices underneath. A building is a long-lived installation running a short-lived app: the software has to keep working as devices are added, replaced and discontinued over years, which puts the design effort into the device layer rather than the interface.",
    tags: ["IoT", "Mobile-app", "Web-app"],
    industries: [],
    image: "/work/work-smart-house-and-building.png",
  },
  {
    id: "employee-management-portal",
    title: "Employee Management Portal",
    description:
      "Developed a portal for employee records, organisational structure and HR processes. Systems holding personal data live under access rules that change as people move roles and teams reorganise, so permissions were treated as a first-order part of the data model rather than a configuration screen added at the end.",
    tags: ["ERP - CRM"],
    industries: [],
    image: "/work/work-employee-management-portal.png",
  },
  {
    id: "telehealth-platform",
    title: "Telehealth Platform",
    description:
      "Built a telehealth platform for remote consultation. Two things decide whether one gets used: a call that connects reliably on the connections patients actually have, and clinical records that stay consistent with the practice's existing system. Both were treated as engineering problems rather than integrations to be arranged later.",
    tags: ["Custom Software", "Web-app"],
    industries: [],
    image: "/work/work-telehealth-platform.png",
  },
  {
    id: "online-bookstore-development",
    title: "Online Bookstore Development",
    description:
      "Developed an online bookstore covering catalogue, search and checkout. Retail catalogues of this size are search problems before they are commerce problems — a title nobody can find is not for sale — so indexing and query behaviour took priority over the storefront around them.",
    tags: ["Custom Software", "Web-app"],
    industries: [],
    image: "/work/work-online-bookstore-development.png",
  },
  {
    id: "q-cells-ecommerce-web-platform",
    title: "Q CELLS eCommerce Web Platform",
    description:
      "Built an eCommerce platform for Q CELLS. Selling equipment rather than consumer goods changes the requirements throughout: specification-led product data, pricing that depends on configuration, and buyers who arrive already knowing what they need and want the specification confirmed rather than the product sold to them.",
    tags: ["Web-app"],
    industries: [],
    image: "/work/work-q-cells-ecommerce-web-platform.png",
  },
  {
    id: "ai-healthcare-platform",
    title: "AI Healthcare Platform",
    description:
      "Architected a healthcare platform with machine learning at its centre, delivered as a web application. Clinical software sets the terms: a model has to be explainable to the person acting on its output, and it has to fit a workflow that cannot be redesigned around it however much easier that would make the engineering.",
    tags: ["AI & ML", "Web-app"],
    industries: [],
    image: "/work/work-ai-healthcare-platform.png",
  },
  {
    id: "crm-platform-for-manufacturing-industry",
    title: "CRM Platform For Manufacturing Industry",
    description:
      "Engineered a CRM for manufacturing sales, where the cycle is long, quoting is specification-driven, and the customer is often a distributor rather than the end user. General CRM tools model none of that well, which is why this was built rather than configured — the object model itself is different.",
    tags: ["ERP - CRM", "Web-app"],
    industries: [],
    image: "/work/work-crm-platform-for-manufacturing-industry.png",
  },
  {
    id: "crm-platform-for-retail-industry",
    title: "CRM Platform for Retail Industry",
    description:
      "Delivered a CRM for retail, designed around transaction volume rather than deal pipelines. Retail relationships are many, short and repeated, so the system was built for aggregate behaviour and segmentation rather than the individual opportunity tracking that a B2B pipeline tool is organised around.",
    tags: ["ERP - CRM", "Web-app"],
    industries: [],
    image: "/work/work-crm-platform-for-retail-industry.png",
  },
  {
    id: "open-source-crm-software",
    title: "Open Source CRM Software",
    description:
      "Extended an open source CRM into a working product. The discipline this approach demands is restraint: adding what the business needs while keeping every change on the right side of a line that still allows upstream updates to be taken — a judgement made repeatedly rather than once at the start.",
    tags: ["ERP - CRM", "Web-app"],
    industries: [],
    image: "/work/work-open-source-crm-software.png",
  },
  {
    id: "g-connect-salesforce-crm-system",
    title: "G-Connect Salesforce CRM System",
    description:
      "Delivered G-Connect, a CRM system built on Salesforce. Platform work is a series of judgements about where to stay inside the platform's own model and where to step outside it. The second is faster to build and considerably more expensive to keep, so each of those decisions was made explicitly.",
    tags: ["ERP - CRM", "Web-app"],
    industries: [],
    image: "/work/work-g-connect-salesforce-crm-system.png",
  },
  {
    id: "ecommerce-platform-development",
    title: "eCommerce Platform Development",
    description:
      "Developed a custom eCommerce platform, built rather than configured because the requirement was a commerce model the standard products do not express. That is the only defensible reason to build one, and it sets the scope: the parts that are ordinary should still behave the way buyers already expect.",
    tags: ["Custom Software", "Web-app"],
    industries: [],
    image: "/work/work-ecommerce-platform-development.png",
  },
  {
    id: "zoidpay-digital-wallet",
    title: "ZoidPay Digital Wallet",
    description:
      "Built a mobile digital wallet for ZoidPay. Wallet engineering is dominated by key handling: the software holds something that cannot be reset or reissued, so recovery, device security and what happens when a phone is lost shape the architecture before any feature is considered.",
    tags: ["Blockchain", "Mobile-app"],
    industries: [],
    image: "/work/work-zoidpay-digital-wallet.png",
  },
  {
    id: "token-stand",
    title: "Token Stand",
    description:
      "Developed the Token Stand web application, with on-chain integration built alongside the interface rather than added to a finished product afterwards. Doing the two together is what keeps transaction state and what the user is shown from drifting apart.",
    tags: ["Blockchain", "Web-app"],
    industries: [],
    image: "/work/work-token-stand.png",
  },
  {
    id: "tenset-wallet-app",
    title: "TENSET Wallet App",
    description:
      "Shipped the TENSET mobile wallet. As with any wallet, the security model came before the feature set: what is held on the device, what can be recovered and how, and what the user is being asked to take responsibility for — because those answers are difficult to change later.",
    tags: ["Blockchain", "Mobile-app"],
    industries: [],
    image: "/work/work-tenset-wallet-app.png",
  },
  {
    id: "oat-wallet",
    title: "OAT Wallet",
    description:
      "Delivered the OAT mobile wallet, covering key storage, transaction signing and the on-chain integration behind them. In a wallet those three are one problem rather than three features — the signing path is only as trustworthy as the storage underneath it.",
    tags: ["Blockchain", "Mobile-app"],
    industries: [],
    image: "/work/work-oat-wallet.png",
  },
  {
    id: "hodooi-multi-chain-nft-marketplace",
    title: "HODOOI Multi-Chain NFT Marketplace",
    description:
      "Built a marketplace operating across several chains. Multi-chain is where the engineering sits: each chain has its own finality, fee behaviour and tooling, and presenting them as a single catalogue means absorbing those differences internally rather than passing them on to the person trying to buy something.",
    tags: ["Blockchain", "Web-app"],
    industries: [],
    image: "/work/work-hodooi-multi-chain-nft-marketplace.png",
  },
  {
    id: "moneylion",
    title: "Moneylion",
    description:
      "Developed custom software and a mobile application for Moneylion, delivered as a native mobile product with the supporting services built alongside it. Doing both sides together keeps the API shaped by what the application actually needs rather than what was convenient to expose.",
    tags: ["Custom Software", "Mobile-app"],
    industries: [],
    image: "/work/work-moneylion.png",
  },
  {
    id: "viewty",
    title: "Viewty",
    description:
      "Developed Viewty across web and mobile with machine learning built into the product rather than added to it, delivered as one system on shared services instead of two applications kept in step.",
    tags: ["AI & ML", "Mobile-app", "Web-app"],
    industries: [],
    image: "/work/work-viewty.png",
  },
  {
    id: "ez-wallet",
    title: "EZ Wallet",
    description:
      "Developed the EZ Wallet mobile application, covering on-chain integration and the key handling any self-custody product has to get right first. Self-custody removes the operator's ability to correct a user's mistake, so recovery has to be designed before features are.",
    tags: ["Blockchain", "Mobile-app"],
    industries: [],
    image: "/work/work-ez-wallet.png",
  },
  {
    id: "pace-art-nft",
    title: "Pace Art NFT",
    description:
      "Delivered the web platform for Pace Art's NFT programme, covering the interface together with the contract integration and asset handling behind it. Digital artwork is heavy and permanent, which makes storage and addressing decisions expensive to revisit once they are live.",
    tags: ["Blockchain", "Web-app"],
    industries: [],
    image: "/work/work-pace-art-nft.png",
  },
  {
    id: "matchingood-matching-website-employers-and-candidates",
    title: "MatchinGood: Matching Employers with Candidates",
    description:
      "Built MatchinGood, a platform matching employers with candidates across web and mobile. Matching is the product rather than a feature of it: both sides have to see results worth coming back for, and the quality of that ranking is what decides whether either side stays long enough for the other to benefit.",
    tags: ["Cloud-based", "Mobile-app", "Web-app"],
    industries: [],
    image: "/work/work-matchingood-matching-website-employers-and-candidates.png",
  },
  {
    id: "super-app-for-drivers",
    title: "Super App for Drivers",
    description:
      "Consolidated several driver-facing services behind a single account, with a web application for the operations side. Software used while working has different requirements from software used at a desk: readable at a glance, usable one-handed, and tolerant of the connectivity a moving vehicle actually has.",
    tags: ["Custom Software", "Mobile-app", "Web-app"],
    industries: [],
    image: "/work/work-super-app-for-drivers.png",
  },
  {
    id: "medicount",
    title: "Medicount",
    description:
      "Delivered Medicount across web and mobile with ERP and CRM functionality behind it, designed so operational records and customer-facing activity work from the same data rather than two systems kept aligned by hand.",
    tags: ["ERP - CRM", "Mobile-app", "Web-app"],
    industries: [],
    image: "/work/work-medicount.png",
  },
  {
    id: "asset-genius",
    title: "Asset Genius",
    description:
      "Delivered Asset Genius, an asset management product spanning web and mobile. Asset systems live or die on whether the register reflects reality, so the work concentrated on how records get created and corrected in the field — where the asset is, rather than where the database is.",
    tags: ["Custom Software", "Mobile-app", "Web-app"],
    industries: [],
    image: "/work/work-asset-genius.png",
  },
  {
    id: "i-his-hospital-management-windows-software",
    title: "i-HIS Hospital Management Windows Software",
    description:
      "Developed i-HIS, a hospital management system delivered as a Windows desktop application. Desktop remains the right choice in clinical settings where workstations are fixed, connectivity is internal, and staff need software that behaves identically on every shift regardless of what a browser has decided to update overnight.",
    tags: ["Custom Software", "ERP - CRM"],
    industries: [],
    image: "/work/work-i-his-hospital-management-windows-software.png",
  },
  {
    id: "whole-earth-world-map-blockchain",
    title: "Whole Earth World Map & Blockchain",
    description:
      "Engineered a mapping platform with on-chain components, delivered across web and mobile. Map products are a rendering and data-volume problem before they are anything else: the interface has to stay responsive over a dataset far larger than the device can hold, which decides the architecture early.",
    tags: ["Blockchain", "Mobile-app", "Web-app"],
    industries: [],
    image: "/work/work-whole-earth-world-map-blockchain.png",
  },
  {
    id: "bondlingo",
    title: "BondLingo",
    description:
      "Delivered BondLingo as custom software across web and mobile, treated as a single product on shared services rather than two applications maintained separately. That costs more at the start and considerably less across the life of the product.",
    tags: ["Custom Software", "Mobile-app", "Web-app"],
    industries: [],
    image: "/work/work-bondlingo.png",
  },
  {
    id: "yjs-social-live-streaming-platform",
    title: "YJS Social Live Streaming Platform",
    description:
      "Delivered YJS, a social live streaming platform on web and mobile with cloud infrastructure behind it. Live video sets the hardest constraints in consumer software: latency, concurrency and cost all move together, and a stream that buffers has already lost the audience it was trying to hold.",
    tags: ["Cloud-based", "Mobile-app", "Web-app"],
    industries: [],
    image: "/work/work-yjs-social-live-streaming-platform.png",
  },
  {
    id: "travala",
    title: "Travala",
    description:
      "Developed Travala across web and mobile with on-chain integration, delivered from a shared service layer rather than as two products that happen to look alike.",
    tags: ["Blockchain", "Mobile-app", "Web-app"],
    industries: [],
    image: "/work/work-travala.png",
  },
  {
    id: "wesantika-finance",
    title: "Wesantika Finance",
    description:
      "Build and maintain Wesantika Finance in-house, delivered across web and mobile with on-chain components. Running a product rather than a project changes the engineering: the roadmap and the upkeep are both ours, so decisions are made on a longer horizon.",
    tags: ["Blockchain", "Mobile-app", "Web-app"],
    industries: [],
    image: "/work/work-wesantika-finance.png",
  },
];
