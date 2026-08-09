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
    tags: ["Custom Software", "Mobile-app"],
    industries: [],
    image: "/work/work-diabetes-app.png",
  },
  {
    id: "wellness-super-app",
    title: "Wellness Super App",
    tags: ["AI & ML", "Blockchain", "Custom Software"],
    industries: [],
    image: "/work/work-wellness-super-app.png",
  },
  {
    id: "cloud-migration",
    title: "Cloud Migration",
    tags: ["Cloud-based"],
    industries: [],
    image: "/work/work-cloud-migration.png",
  },
  {
    id: "sleep-tracking-app",
    title: "Sleep Tracking App",
    tags: ["AI & ML", "Custom Software"],
    industries: [],
    image: "/work/work-sleep-tracking-app.png",
  },
  {
    id: "partners-week-a-blockchain-powered-platform-for-professional",
    title: "PARTNERS WEEK®: A blockchain-powered platform for professional partner certifications",
    tags: ["Blockchain", "Custom Software"],
    industries: [],
    image: "/work/work-partners-week-a-blockchain-powered-platform-for-professiona.png",
  },
  {
    id: "chartx-an-ai-assistant-for-healthcare",
    title: "ChartX - An AI Assistant for Healthcare",
    tags: ["AI & ML", "Custom Software"],
    industries: [],
    image: "/work/work-chartx-an-ai-assistant-for-healthcare.png",
  },
  {
    id: "healthcare-ocr-solution",
    title: "Healthcare OCR solution",
    tags: ["Custom Software"],
    industries: [],
    image: "/work/work-healthcare-ocr-solution.png",
  },
  {
    id: "pacs-solution-for-public-healthcare-center",
    title: "PACS Solution for Public Healthcare Center",
    tags: ["AI & ML", "Custom Software"],
    industries: [],
    image: "/work/work-pacs-solution-for-public-healthcare-center.png",
  },
  {
    id: "wesantika-vision-deployment-for-lg-innotek-hai-phong",
    title: "Wesantika Vision Deployment for LG Innotek Hai Phong",
    tags: ["Custom Software"],
    industries: [],
    image: "/work/work-wesantika-vision-deployment-for-lg-innotek-hai-phong.png",
  },
  {
    id: "decathlon-esop-platform",
    title: "Decathlon ESOP Platform",
    tags: ["Custom Software"],
    industries: [],
    image: "/work/work-decathlon-esop-platform.png",
  },
  {
    id: "process-alignment-and-ecommerce-platform-modernization",
    title: "Process Alignment and eCommerce Platform Modernization",
    tags: ["Custom Software"],
    industries: [],
    image: "/work/work-process-alignment-and-ecommerce-platform-modernization.png",
  },
  {
    id: "in-app-communication-platform-for-digital-entertainment-corp",
    title: "In-app Communication Platform for Digital Entertainment Corporation",
    tags: ["Custom Software", "Game"],
    industries: [],
    image: "/work/work-in-app-communication-platform-for-digital-entertainment-cor.png",
  },
  {
    id: "smart-learn-ai-integrating-technology-into-education",
    title: "Smart Learn AI: Integrating technology into Education",
    tags: ["AI & ML", "Custom Software"],
    industries: [],
    image: "/work/work-smart-learn-ai-integrating-technology-into-education.png",
  },
  {
    id: "terrafuse-driving-efficiency-with-scalable-ev-charging-solut",
    title: "TerraFuse: Driving Efficiency with Scalable EV Charging Solutions",
    tags: ["Mobile-app", "Web-app"],
    industries: [],
    image: "/work/work-terrafuse-driving-efficiency-with-scalable-ev-charging-solu.png",
  },
  {
    id: "a-serverless-transformation-for-a-carbon-offset-platform",
    title: "A Serverless Transformation for A Carbon Offset Platform",
    tags: ["Custom Software"],
    industries: [],
    image: "/work/work-a-serverless-transformation-for-a-carbon-offset-platform.png",
  },
  {
    id: "elevating-insurance-tech-with-aqa-solutions",
    title: "Elevating Insurance Tech with AQA Solutions",
    tags: ["Custom Software"],
    industries: [],
    image: "/work/work-elevating-insurance-tech-with-aqa-solutions.png",
  },
  {
    id: "wesantika-box-intelligent-internal-knowledge-base-platform",
    title: "Wesantika Box – Intelligent Internal Knowledge Base Platform",
    tags: ["AI & ML"],
    industries: [],
    image: "/work/work-wesantika-box-intelligent-internal-knowledge-base-platform.png",
  },
  {
    id: "wesantika-agents-genai-agents-product",
    title: "Wesantika Agents – GenAI Agents Product",
    tags: ["AI & ML"],
    industries: [],
    image: "/work/work-wesantika-agents-genai-agents-product.png",
  },
  {
    id: "empowering-thai-bank-with-digital-solutions",
    title: "Empowering Thai Bank with Digital Solutions",
    tags: ["Custom Software", "Mobile-app"],
    industries: [],
    image: "/work/work-empowering-thai-bank-with-digital-solutions.png",
  },
  {
    id: "scaling-a-fintech-platform-with-custom-software",
    title: "Scaling a Fintech Platform with Custom Software",
    tags: ["Cloud-based", "Custom Software", "Web-app"],
    industries: [],
    image: "/work/work-scaling-a-fintech-platform-with-custom-software.png",
  },
  {
    id: "smart-factory-transformation-at-mitac",
    title: "Smart Factory Transformation at MiTAC",
    tags: ["Custom Software", "Smart Factory"],
    industries: [],
    image: "/work/work-smart-factory-transformation-at-mitac.png",
  },
  {
    id: "voy-travel-web3-solutions-for-travel-services",
    title: "Voy Travel: Web3 Solutions for Travel Services",
    tags: ["Blockchain", "Cloud-based"],
    industries: [],
    image: "/work/work-voy-travel-web3-solutions-for-travel-services.png",
  },
  {
    id: "optimizing-blood-health-insights-with-cloud-solutions",
    title: "Optimizing Blood Health Insights with Cloud Solutions",
    tags: ["Cloud-based"],
    industries: [],
    image: "/work/work-optimizing-blood-health-insights-with-cloud-solutions.png",
  },
  {
    id: "fast-and-accurate-real-estate-valuation-with-ai",
    title: "Fast and Accurate Real Estate Valuation with AI",
    tags: ["AI & ML"],
    industries: [],
    image: "/work/work-fast-and-accurate-real-estate-valuation-with-ai.png",
  },
  {
    id: "expanding-youtube-reach-with-sub-tube",
    title: "Expanding YouTube Reach with Sub-tube",
    tags: ["Web-app"],
    industries: [],
    image: "/work/work-expanding-youtube-reach-with-sub-tube.png",
  },
  {
    id: "ai-tools-for-smart-note-management",
    title: "AI Tools for Smart Note Management",
    tags: ["AI & ML"],
    industries: [],
    image: "/work/work-ai-tools-for-smart-note-management.png",
  },
  {
    id: "wesantika-elevating-food-delivery-through-managed-services",
    title: "Wesantika: Elevating Food Delivery Through Managed Services",
    tags: ["Infrastructure Managed Services"],
    industries: [],
    image: "/work/work-wesantika-elevating-food-delivery-through-managed-services.png",
  },
  {
    id: "strengthening-ubet-sport-s-platform-with-infrastructure",
    title: "Strengthening UBet Sport's Platform with Infrastructure",
    tags: ["Infrastructure Managed Services"],
    industries: [],
    image: "/work/work-strengthening-ubet-sport-s-platform-with-infrastructure.png",
  },
  {
    id: "reliable-infrastructure-support-for-invtai-growth",
    title: "Reliable Infrastructure Support for InvtAI Growth",
    tags: ["Infrastructure Managed Services"],
    industries: [],
    image: "/work/work-reliable-infrastructure-support-for-invtai-growth.png",
  },
  {
    id: "infrastructure-management-for-camera-ai",
    title: "Infrastructure Management for Camera AI",
    tags: ["Infrastructure Managed Services"],
    industries: [],
    image: "/work/work-infrastructure-management-for-camera-ai.png",
  },
  {
    id: "mlops-pipeline-for-dopikai",
    title: "MLOps pipeline for DopikAI",
    tags: ["Cloud-based"],
    industries: [],
    image: "/work/work-mlops-pipeline-for-dopikai.png",
  },
  {
    id: "cloud-based-material-resource-planning",
    title: "Cloud-Based Material Resource Planning",
    tags: ["Cloud-based", "ERP - CRM"],
    industries: [],
    image: "/work/work-cloud-based-material-resource-planning.png",
  },
  {
    id: "erp-system-for-warehouse-management",
    title: "ERP System for Warehouse Management",
    tags: ["ERP - CRM"],
    industries: [],
    image: "/work/work-erp-system-for-warehouse-management.png",
  },
  {
    id: "salesforce-commercial-cloud-integration",
    title: "Salesforce Commercial Cloud Integration",
    tags: ["Cloud-based", "ERP - CRM"],
    industries: [],
    image: "/work/work-salesforce-commercial-cloud-integration.png",
  },
  {
    id: "cloud-based-sales-management-crm-transformation",
    title: "Cloud-Based Sales Management CRM Transformation",
    tags: ["Cloud-based", "ERP - CRM"],
    industries: [],
    image: "/work/work-cloud-based-sales-management-crm-transformation.png",
  },
  {
    id: "voicy-azure-to-aws-cloud-migration",
    title: "Voicy: Azure to AWS Cloud Migration",
    tags: ["Cloud-based"],
    industries: [],
    image: "/work/work-voicy-azure-to-aws-cloud-migration.png",
  },
  {
    id: "smart-kitchen",
    title: "Smart Kitchen",
    tags: ["Custom Software", "IoT"],
    industries: [],
    image: "/work/work-smart-kitchen.png",
  },
  {
    id: "sap-system-for-real-estate",
    title: "SAP System for Real Estate",
    tags: ["Custom Software", "SAP"],
    industries: [],
    image: "/work/work-sap-system-for-real-estate.png",
  },
  {
    id: "sap-system-for-bank",
    title: "SAP System for Bank",
    tags: ["Custom Software", "SAP"],
    industries: [],
    image: "/work/work-sap-system-for-bank.png",
  },
  {
    id: "sap-system-for-administration",
    title: "SAP System for Administration",
    tags: ["Custom Software", "SAP"],
    industries: [],
    image: "/work/work-sap-system-for-administration.png",
  },
  {
    id: "smart-house-and-building",
    title: "Smart house and building",
    tags: ["IoT", "Mobile-app", "Web-app"],
    industries: [],
    image: "/work/work-smart-house-and-building.png",
  },
  {
    id: "employee-management-portal",
    title: "Employee Management Portal",
    tags: ["ERP - CRM"],
    industries: [],
    image: "/work/work-employee-management-portal.png",
  },
  {
    id: "telehealth-platform",
    title: "Telehealth Platform",
    tags: ["Custom Software", "Web-app"],
    industries: [],
    image: "/work/work-telehealth-platform.png",
  },
  {
    id: "online-bookstore-development",
    title: "Online Bookstore Development",
    tags: ["Custom Software", "Web-app"],
    industries: [],
    image: "/work/work-online-bookstore-development.png",
  },
  {
    id: "q-cells-ecommerce-web-platform",
    title: "Q CELLS eCommerce Web Platform",
    tags: ["Web-app"],
    industries: [],
    image: "/work/work-q-cells-ecommerce-web-platform.png",
  },
  {
    id: "ai-healthcare-platform",
    title: "AI Healthcare Platform",
    tags: ["AI & ML", "Web-app"],
    industries: [],
    image: "/work/work-ai-healthcare-platform.png",
  },
  {
    id: "crm-platform-for-manufacturing-industry",
    title: "CRM Platform For Manufacturing Industry",
    tags: ["ERP - CRM", "Web-app"],
    industries: [],
    image: "/work/work-crm-platform-for-manufacturing-industry.png",
  },
  {
    id: "crm-platform-for-retail-industry",
    title: "CRM Platform for Retail Industry",
    tags: ["ERP - CRM", "Web-app"],
    industries: [],
    image: "/work/work-crm-platform-for-retail-industry.png",
  },
  {
    id: "open-source-crm-software",
    title: "Open Source CRM Software",
    tags: ["ERP - CRM", "Web-app"],
    industries: [],
    image: "/work/work-open-source-crm-software.png",
  },
  {
    id: "g-connect-salesforce-crm-system",
    title: "G-Connect Salesforce CRM System",
    tags: ["ERP - CRM", "Web-app"],
    industries: [],
    image: "/work/work-g-connect-salesforce-crm-system.png",
  },
  {
    id: "ecommerce-platform-development",
    title: "eCommerce Platform Development",
    tags: ["Custom Software", "Web-app"],
    industries: [],
    image: "/work/work-ecommerce-platform-development.png",
  },
  {
    id: "zoidpay-digital-wallet",
    title: "ZoidPay Digital Wallet",
    tags: ["Blockchain", "Mobile-app"],
    industries: [],
    image: "/work/work-zoidpay-digital-wallet.png",
  },
  {
    id: "token-stand",
    title: "Token Stand",
    tags: ["Blockchain", "Web-app"],
    industries: [],
    image: "/work/work-token-stand.png",
  },
  {
    id: "tenset-wallet-app",
    title: "TENSET WALLET APP",
    tags: ["Blockchain", "Mobile-app"],
    industries: [],
    image: "/work/work-tenset-wallet-app.png",
  },
  {
    id: "oat-wallet",
    title: "OAT Wallet",
    tags: ["Blockchain", "Mobile-app"],
    industries: [],
    image: "/work/work-oat-wallet.png",
  },
  {
    id: "hodooi-multi-chain-nft-marketplace",
    title: "HODOOI MULTI-CHAIN NFT MARKETPLACE",
    tags: ["Blockchain", "Web-app"],
    industries: [],
    image: "/work/work-hodooi-multi-chain-nft-marketplace.png",
  },
  {
    id: "moneylion",
    title: "Moneylion",
    tags: ["Custom Software", "Mobile-app"],
    industries: [],
    image: "/work/work-moneylion.png",
  },
  {
    id: "viewty",
    title: "Viewty",
    tags: ["AI & ML", "Mobile-app", "Web-app"],
    industries: [],
    image: "/work/work-viewty.png",
  },
  {
    id: "ez-wallet",
    title: "EZ Wallet",
    tags: ["Blockchain", "Mobile-app"],
    industries: [],
    image: "/work/work-ez-wallet.png",
  },
  {
    id: "pace-art-nft",
    title: "Pace Art NFT",
    tags: ["Blockchain", "Web-app"],
    industries: [],
    image: "/work/work-pace-art-nft.png",
  },
  {
    id: "matchingood-matching-website-employers-and-candidates",
    title: "MatchinGood - Matching website Employers and Candidates",
    tags: ["Cloud-based", "Mobile-app", "Web-app"],
    industries: [],
    image: "/work/work-matchingood-matching-website-employers-and-candidates.png",
  },
  {
    id: "super-app-for-drivers",
    title: "Super App for Drivers",
    tags: ["Custom Software", "Mobile-app", "Web-app"],
    industries: [],
    image: "/work/work-super-app-for-drivers.png",
  },
  {
    id: "medicount",
    title: "Medicount",
    tags: ["ERP - CRM", "Mobile-app", "Web-app"],
    industries: [],
    image: "/work/work-medicount.png",
  },
  {
    id: "asset-genius",
    title: "Asset Genius",
    tags: ["Custom Software", "Mobile-app", "Web-app"],
    industries: [],
    image: "/work/work-asset-genius.png",
  },
  {
    id: "i-his-hospital-management-windows-software",
    title: "i-HIS Hospital Management Windows Software",
    tags: ["Custom Software", "ERP - CRM"],
    industries: [],
    image: "/work/work-i-his-hospital-management-windows-software.png",
  },
  {
    id: "whole-earth-world-map-blockchain",
    title: "Whole Earth World Map & Blockchain",
    tags: ["Blockchain", "Mobile-app", "Web-app"],
    industries: [],
    image: "/work/work-whole-earth-world-map-blockchain.png",
  },
  {
    id: "bondlingo",
    title: "BondLingo",
    tags: ["Custom Software", "Mobile-app", "Web-app"],
    industries: [],
    image: "/work/work-bondlingo.png",
  },
  {
    id: "yjs-social-live-streaming-platform",
    title: "YJS Social Live Streaming Platform",
    tags: ["Cloud-based", "Mobile-app", "Web-app"],
    industries: [],
    image: "/work/work-yjs-social-live-streaming-platform.png",
  },
  {
    id: "travala",
    title: "Travala",
    tags: ["Blockchain", "Mobile-app", "Web-app"],
    industries: [],
    image: "/work/work-travala.png",
  },
  {
    id: "wesantika-finance",
    title: "Wesantika Finance",
    tags: ["Blockchain", "Mobile-app", "Web-app"],
    industries: [],
    image: "/work/work-wesantika-finance.png",
  },
];
