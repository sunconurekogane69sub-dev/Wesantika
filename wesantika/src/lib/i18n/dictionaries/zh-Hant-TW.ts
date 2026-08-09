import type { PartialDictionary } from "../types";

/**
 * Chinese (Traditional, Taiwan).
 *
 * Complete except for `about.blocks` — the five long-form narrative sections on
 * the About Us page. Those fall back to English on purpose: they are the copy
 * that most needs a human transcreation rather than a translation. Drop the
 * strings into `about.blocks` here and they take effect immediately.
 */
export const zhHantTW: PartialDictionary = {
  meta: {
    siteTitle: "Wesantika — 現代化軟體，實質的業務成長。",
    siteDescription:
      "我們設計並打造 AI 驅動的軟體、雲端平台與數位系統，協助企業創新、提升營運效率，並穩健擴展規模。",
    aboutTitle: "關於我們",
    aboutDescription:
      "我們透過 AI、雲端技術與專業的軟體工程，協助組織將想法轉化為可擴展的數位解決方案。",
  },

  nav: {
    top: "首頁",
    solution: "解決方案",
    about: "關於我們",
    work: "服務案例",
    technologies: "技術",
    blog: "部落格",
    contact: "聯絡我們",
    openMenu: "開啟選單",
    languageLabel: "切換語言",
    comingSoon: "即將推出",
  },

  hero: {
    title: "現代化軟體，實質的業務成長。",
    subtitle:
      "我們設計並打造 AI 驅動的軟體、雲端平台與數位系統，協助企業創新、提升營運效率，並穩健擴展規模。",
  },

  services: {
    heading: "完整服務範圍",
    cta: "查看服務詳情",
    categories: {
      custom: "客製化軟體開發",
      offshore: "委外與離岸開發",
      ai: "AI 開發",
      qa: "QA 測試",
      infrastructure: "基礎架構",
    },
    cards: {
      custom: {
        title: "客製化軟體開發",
        body: "我們的端到端軟體方案提供量身打造的功能、可擴展的效能與完整的客製化，讓您取得應有的競爭優勢。",
      },
      web: {
        title: "網頁應用程式開發",
        body: "我們以敏捷方法與行動優先設計，打造安全且可擴展的網頁應用程式，縮短上市時間並帶來可衡量的業務成果。",
      },
      mobile: {
        title: "行動應用程式開發",
        body: "開發原生與跨平台的 iOS 與 Android 應用程式。運用 Swift、Kotlin、Flutter 與 React Native 等技術，確保高效能與使用者黏著度。",
      },
      mvp: {
        title: "MVP 軟體開發",
        body: "以敏捷衝刺打造 MVP 與 PoC。我們運用 Figma、React 與 Firebase 降低風險、驗證市場並加速募資。",
      },
      legacy: {
        title: "舊有系統現代化",
        body: "將舊系統的維護成本降低最多 40%，並讓功能交付快上三倍。我們以漸進方式將老化的應用程式轉型為雲端原生架構——不做一次性大遷移、不凍結產品藍圖、不中斷正式環境。",
      },
      saas: {
        title: "SaaS 應用程式開發",
        body: "運用 AWS、Azure 與 Kubernetes 打造安全的多租戶 SaaS 平台。敏捷與 DevOps 確保擴展性、法規遵循與更快的上市速度。",
      },
      enterprise: {
        title: "企業級軟體開發",
        body: "我們的企業軟體開發服務，建立在對產業複雜性的全面理解與最新技術進展之上。",
      },
      backend: {
        title: "後端開發",
        body: "以 Node.js、.NET 與 Java 建置安全的後端系統。涵蓋 API 整合、雲端基礎架構與資料庫最佳化，具備企業級效能。",
      },
      frontend: {
        title: "前端開發",
        body: "以 React、Angular 與 Vue 打造響應式且符合 WCAG 的介面。提供快速、無障礙的使用體驗，提升參與度與轉換率。",
      },
      integration: {
        title: "系統整合服務",
        body: "透過 ERP、CRM 與雲端應用之間的安全連結加速成長。消除資料孤島、自動化流程，並以可擴展的 API 與全天候支援取得即時可視性。",
      },
      maintenance: {
        title: "軟體維運與支援",
        body: "提供全天候監控、主動維護與功能升級。我們以嚴謹的 SLA 確保系統穩定性、安全性與長期效能。",
      },
    },
  },

  ai: {
    heading: "帶來實質業務成效的 AI 創新夥伴",
    subtitle:
      "從 AI 策略到雲端部署，我們協助企業打造安全、智慧且面向未來的數位系統。",
    labels: {
      nlp: ["自然語言處理與", "企業搜尋"],
      cv: ["電腦視覺"],
      genai: ["生成式 AI 與", "大型語言模型工程"],
      data: ["資料", "工程"],
      agentic: ["代理式", "AI 系統"],
      erp: ["ERP 與 SAP 的 AI 應用"],
      predictive: ["預測分析與", "機器學習模型"],
      advanced: ["進階 AI", "工程"],
      mlops: ["MLOps 與 LLMOps"],
    },
  },

  rfp: {
    heading: "寄來您的需求規格書，24 小時內看到成品。",
    body: "不必看簡報。我們的工程師會依照您的完整需求，在一天內做出可運作的原型；請以實際成果評斷我們，而不是提案。",
    cta: "寄出需求規格書",
    checklist: [
      "核心使用者流程的可點擊原型",
      "完整呈現系統端到端的流程圖",
      "涵蓋技術堆疊、整合與擴展性的架構方向",
      "與資深工程團隊的技術建議會議",
    ],
  },

  footer: {
    heading: "準備好讓團隊的軟體開發再上一層樓了嗎？",
    subtitle: "與 Wesantika 一起釋放潛力、達成更多。今天就開始。",
    fields: {
      name: "姓名*",
      email: "電子郵件*",
      phone: "電話號碼",
      company: "公司名稱*",
      message: "我們能如何協助您？*",
    },
    submit: "送出訊息",
    submitting: "傳送中…",
    sentMessage: "感謝您，訊息已送出，我們會盡快與您聯繫。",
    previewLink: "檢視已寄出的郵件",
    errorGeneric: "發生問題，請再試一次。",
    errorNetwork: "無法連線至伺服器，請檢查您的網路連線。",
    copyright: "© 2026 Wesantika. All Rights Reserved.",
    privacy: "隱私權政策",
  },

  about: {
    heroLead:
      "我們透過 AI、雲端技術與專業的軟體工程，協助組織將想法轉化為可擴展的數位解決方案。我們相信，長遠的成功建立在創新、可信賴的合作關係與工程上的卓越之上。",
    title: "關於我們",
    // about.blocks — intentionally untranslated, see the note above.
    vision: {
      label: "我們的願景",
      statement: "成為企業在創新最關鍵時刻願意信賴的技術夥伴。",
      body: [
        "並非因為我們使用最新的技術。",
        "而是因為我們懂得如何將技術轉化為長久的事業成功。",
      ],
    },
  },

  servicesPage: {
    detailLabel: "詳細內容",
    metaTitle: "軟體開發服務",
    metaDescription:
      "Wesantika 提供全週期的軟體開發服務，以客製化方案滿足您獨特的業務需求。",
    hero: {
      title: "軟體開發服務",
      body: "在 Wesantika，我們專注於將想法轉化為高品質的軟體產品。我們提供量身打造的軟體開發方案，並以具競爭力的定價策略協助您節省成本。憑藉投入與經驗，我們的做法能加快您的上市速度，讓您在競爭中脫穎而出。",
      cta: "與我們談談您的需求",
    },
    accelerate: {
      heading: "與 Wesantika 一起加速您的軟體開發旅程",
      highlights: {
        ai: "AI 開發服務",
        custom: "客製化軟體開發",
      },
    },
    offer: {
      heading: "我們提供的軟體開發服務",
      subtitle:
        "Wesantika 提供全週期的軟體開發服務，以客製化方案滿足您獨特的業務需求。",
      cards: {
        custom: {
          title: "客製化軟體開發",
          body: "我們的端到端軟體方案提供量身打造的功能、可擴展的效能與完整的客製化，讓您取得應有的競爭優勢。",
        },
      },
    },
    global: {
      heading: "如同自家團隊的全球工程團隊",
      intro:
        "我們的離岸開發模式不只是提供人力。我們建立專屬團隊，與您的工作流程無縫接軌、共享目標，並致力於您的長期成功。",
      requiresLead: "打造優秀的軟體，需要的不只是技術能力。",
      requiresLabel: "還需要：",
      points: {
        people: "對的人才",
        communication: "清楚的溝通",
        collaboration: "順暢的協作",
      },
      outro:
        "我們的全球工程團隊直接融入您的工作流程，在維持內部團隊般的品質與透明度的同時，協助您加速開發。",
    },
    why: {
      heading: "為什麼選擇 Wesantika？",
      cta: "與我們的專家聯繫",
      items: [
        "具成本效益的開發",
        "快速擴編團隊",
        "經驗豐富的工程師",
        "清楚的溝通",
        "長期的合作關係",
        "彈性的協作方式",
        "現代化技術",
        "可靠的品質與資安",
      ],
    },
  },

  // UI translated; article copy is sample content and falls back to English.

  blog: {
    metaTitle: "部落格",
    metaDescription:
      "關於 AI 工程、雲端平台，以及與分散團隊一起開發軟體的現場筆記。",
    heroTitle: "部落格",
    heroBody:
      "我們的工程師談應用 AI、雲端平台，以及分散團隊共同開發軟體時真正會發生的事。",
    featuredLabel: "精選",
    allCategories: "全部",
    readMore: "閱讀文章",
    back: "返回部落格",
    empty: "此分類目前尚無文章。",
    readTime: "閱讀約 {minutes} 分鐘",
    categories: { engineering: "工程", ai: "AI", design: "設計", business: "商業" },
  },

  // `capabilities` (four long paragraphs) falls back to English, as elsewhere.
  technologies: {
    metaTitle: "軟體開發技術",
    metaDescription:
      "涵蓋 AI、後端、前端、應用程式開發、DevOps 與雲端的技術堆疊 — 我們用來打造智慧且可擴展系統的工具。",
    hero: {
      titleLines: ["軟體開發", "技術"],
      body: "憑藉豐富的軟體開發經驗，Wesantika 透過與多國團隊、新創與各類市場企業的合作，累積了深厚的技術專業。我們持續導入 AI 與現代軟體工程的最新進展，結合全球視野與紮實的技術能力，開發出智慧、可擴展且高品質的解決方案，滿足嚴苛的業務與產業需求。",
      cta: "與我們談談您的需求",
    },
    stacksHeading: "滿足各類企業需求的頂尖軟體開發技術堆疊",
    sections: {
      ai: "驅動 AI 開發的核心技術",
      backend: "主要後端技術",
      frontend: "主要前端技術",
      app: "應用程式開發",
      devops: "DevOps",
      cloud: "雲端運算",
    },
    rfp: {
      heading: "選好你的技術堆疊，24 小時內看到成品。",
      body: "由精通 .NET、Java、Python、Node、React 等技術的工程師審視，以 AI 加速，從完整需求直達可運作的原型。",
    },
  },

  work: {
    metaTitle: "服務案例",
    metaDescription:
      "涵蓋 AI、區塊鏈、雲端、客製化軟體、ERP 與行動應用的案例 — 與合作夥伴共同交付的專案。",
    heroTitle: "服務案例",
    heroBody:
      "與合作夥伴共同交付的專案，涵蓋 AI、區塊鏈、雲端、ERP 與行動應用，從最初的原型到正式上線。",
    searchPlaceholder: "搜尋關鍵字...",
    searchLabel: "搜尋案例",
    all: "全部",
    servicesLabel: "依服務篩選",
    industriesLabel: "依產業篩選",
    empty: "目前沒有符合條件的專案。",
    resultCount: "{count} 個專案",
    pagination: "分頁",
    previous: "上一頁",
    next: "下一頁",
  },

  rfpModal: {
    open: "寄出需求規格書",
    close: "關閉",
    heading: {
      lead: "您的需求規格書，由專家在",
      emphasis: "24 小時內",
      trail: "完成審視",
    },
    bodyLines: [
      "以 AI 加速，從需求直達可運作的原型。",
      "由工程師對應，而非業務。",
    ],
    checklist: [
      "核心使用者流程的可點擊原型",
      "呈現整個系統的流程圖",
      "涵蓋技術堆疊、整合與擴展性的架構方向",
      "與工程團隊的技術建議會議",
    ],
    fields: {
      name: "姓名*",
      phone: "聯絡電話*",
      company: "公司名稱*",
      email: "電子郵件*",
      brief: "專案說明*",
    },
    chooseFile: "選擇檔案",
    noFileChosen: "尚未選擇檔案",
    submit: "送出需求",
    submitting: "傳送中…",
    sent: "已送出，我們會在 24 小時內與您聯繫。",
    previewLink: "檢視已寄出的郵件",
    errors: {
      generic: "發生問題，請再試一次。",
      network: "無法連線至伺服器，請檢查您的網路連線。",
      captchaMissing: "請先完成下方驗證。",
      captchaFailed: "驗證失敗，請再試一次。",
      fileTooLarge: "檔案超過 10 MB 上限。",
      fileType: "不支援這種檔案格式。",
    },
  },

  rail: {
    email: "電子郵件",
    telegram: "Telegram",
    whatsapp: "WhatsApp",
    line: "LINE",
  },
};
