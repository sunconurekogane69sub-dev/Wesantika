import type { PartialDictionary } from "../types";

/**
 * Vietnamese.
 *
 * Complete except for `about.blocks` — the five long-form narrative sections on
 * the About Us page, which fall back to English on purpose. They need a human
 * transcreation rather than a translation. Drop the strings into `about.blocks`
 * here and they take effect immediately.
 */
export const vi: PartialDictionary = {
  meta: {
    siteTitle: "Wesantika — Phần mềm hiện đại. Tăng trưởng thực chất.",
    siteDescription:
      "Chúng tôi thiết kế và xây dựng phần mềm ứng dụng AI, nền tảng đám mây và hệ thống số giúp doanh nghiệp đổi mới, vận hành hiệu quả và mở rộng một cách tự tin.",
    aboutTitle: "Về chúng tôi",
    aboutDescription:
      "Chúng tôi giúp các tổ chức biến ý tưởng thành giải pháp số có khả năng mở rộng, thông qua AI, công nghệ đám mây và kỹ thuật phần mềm chuyên sâu.",
  },

  nav: {
    top: "Trang chủ",
    solution: "Giải pháp",
    about: "Về chúng tôi",
    work: "Dự án",
    technologies: "Công nghệ",
    blog: "Blog",
    contact: "Liên hệ",
    openMenu: "Mở menu",
    languageLabel: "Đổi ngôn ngữ",
    comingSoon: "Sắp ra mắt",
  },

  hero: {
    title: "Phần mềm hiện đại. Tăng trưởng thực chất.",
    subtitle:
      "Chúng tôi thiết kế và xây dựng phần mềm ứng dụng AI, nền tảng đám mây và hệ thống số giúp doanh nghiệp đổi mới, vận hành hiệu quả và mở rộng một cách tự tin.",
  },

  services: {
    heading: "Dịch vụ toàn diện",
    cta: "Xem chi tiết dịch vụ",
    categories: {
      custom: "Phát triển phần mềm theo yêu cầu",
      offshore: "Offshore & Outsourcing",
      ai: "Phát triển AI",
      infrastructure: "Hạ tầng",
    },
    cards: {
      custom: {
        title: "Phát triển phần mềm theo yêu cầu",
        body: "Giải pháp phần mềm toàn trình của chúng tôi mang lại các tính năng được thiết kế riêng, hiệu năng có khả năng mở rộng và mức độ cá nhân hoá hoàn toàn, giúp bạn có được lợi thế cạnh tranh xứng đáng.",
      },
      web: {
        title: "Phát triển ứng dụng web",
        body: "Chúng tôi áp dụng Agile và thiết kế mobile-first để xây dựng ứng dụng web an toàn, dễ mở rộng, giúp rút ngắn thời gian ra mắt và tạo ra kết quả kinh doanh đo lường được.",
      },
      mobile: {
        title: "Phát triển ứng dụng di động",
        body: "Phát triển ứng dụng iOS và Android theo hướng native và đa nền tảng. Các công nghệ như Swift, Kotlin, Flutter và React Native đảm bảo hiệu năng cao và mức độ tương tác của người dùng.",
      },
      mvp: {
        title: "Phát triển MVP",
        body: "Xây dựng MVP và PoC theo các sprint Agile. Chúng tôi dùng Figma, React và Firebase để giảm rủi ro, kiểm chứng thị trường và đẩy nhanh việc gọi vốn.",
      },
      legacy: {
        title: "Hiện đại hoá hệ thống cũ",
        body: "Giảm tới 40% chi phí bảo trì hệ thống cũ và ra tính năng nhanh gấp 3 lần. Chúng tôi chuyển đổi các ứng dụng lỗi thời sang hạ tầng cloud-native theo từng bước — không di chuyển ồ ạt, không đóng băng lộ trình, không gián đoạn môi trường thật.",
      },
      saas: {
        title: "Phát triển ứng dụng SaaS",
        body: "Xây dựng nền tảng SaaS multi-tenant an toàn với AWS, Azure và Kubernetes. Agile và DevOps đảm bảo khả năng mở rộng, tuân thủ và tốc độ ra mắt.",
      },
      backend: {
        title: "Phát triển back-end",
        body: "Xây dựng hệ thống back-end an toàn với Node.js, .NET và Java. Chúng tôi bao quát tích hợp API, hạ tầng đám mây và tối ưu cơ sở dữ liệu với hiệu năng ở mức doanh nghiệp.",
      },
      frontend: {
        title: "Phát triển front-end",
        body: "Xây dựng giao diện responsive, tuân thủ WCAG với React, Angular và Vue. Chúng tôi mang lại trải nghiệm nhanh và dễ tiếp cận, giúp tăng tương tác và tỷ lệ chuyển đổi.",
      },
      integration: {
        title: "Dịch vụ tích hợp hệ thống",
        body: "Thúc đẩy tăng trưởng bằng các kết nối an toàn giữa ERP, CRM và ứng dụng đám mây. Xoá bỏ dữ liệu phân tán, tự động hoá quy trình và có được khả năng theo dõi tức thời với API dễ mở rộng cùng hỗ trợ 24/7.",
      },
      maintenance: {
        title: "Bảo trì và hỗ trợ phần mềm",
        body: "Giám sát 24/7, bảo trì chủ động và nâng cấp tính năng. Các giải pháp của chúng tôi đảm bảo SLA nghiêm ngặt về tính ổn định, bảo mật và hiệu năng dài hạn của hệ thống.",
      },
    },
  },

  ai: {
    heading: "Đối tác đổi mới AI mang lại tác động kinh doanh thực sự",
    subtitle:
      "Từ chiến lược AI đến triển khai đám mây, chúng tôi giúp doanh nghiệp xây dựng hệ thống số an toàn, thông minh và sẵn sàng cho tương lai.",
    labels: {
      nlp: ["NLP &", "Tìm kiếm doanh nghiệp"],
      cv: ["Thị giác máy tính"],
      genai: ["Kỹ thuật GenAI", "& LLM"],
      data: ["Kỹ thuật", "dữ liệu"],
      agentic: ["Hệ thống AI", "tác tử"],
      erp: ["AI cho ERP & SAP"],
      predictive: ["Phân tích dự báo &", "Mô hình học máy"],
      advanced: ["Kỹ thuật AI", "nâng cao"],
      mlops: ["MLOps & LLMOps"],
    },
  },

  rfp: {
    heading: "Gửi yêu cầu của bạn. Thấy sản phẩm sau 24 giờ.",
    body: "Không cần bài thuyết trình bán hàng. Các kỹ sư của chúng tôi biến toàn bộ đề bài của bạn thành một nguyên mẫu chạy được chỉ trong một ngày, để bạn đánh giá chúng tôi qua sản phẩm chứ không qua lời giới thiệu.",
    cta: "Gửi yêu cầu",
    checklist: [
      "Nguyên mẫu bấm được của luồng người dùng cốt lõi",
      "Sơ đồ quy trình mô tả toàn bộ hệ thống từ đầu đến cuối",
      "Định hướng kiến trúc gồm công nghệ, tích hợp và khả năng mở rộng",
      "Buổi tư vấn kỹ thuật cùng đội ngũ kỹ sư cấp cao của chúng tôi",
    ],
  },

  footer: {
    heading:
      "Bạn đã sẵn sàng tăng tốc hành trình phát triển phần mềm của đội ngũ?",
    subtitle:
      "Khai phá tiềm năng và đạt được nhiều hơn cùng Wesantika. Bắt đầu ngay hôm nay!",
    fields: {
      name: "Họ và tên*",
      email: "Email*",
      phone: "Số điện thoại",
      company: "Công ty*",
      message: "Chúng tôi có thể giúp gì cho bạn?*",
    },
    submit: "Gửi tin nhắn",
    submitting: "Đang gửi…",
    sentMessage:
      "Cảm ơn bạn — tin nhắn đã được gửi. Chúng tôi sẽ liên hệ lại trong thời gian sớm nhất.",
    previewLink: "Xem email đã gửi",
    errorGeneric: "Đã xảy ra lỗi. Vui lòng thử lại.",
    errorNetwork:
      "Không kết nối được tới máy chủ. Vui lòng kiểm tra đường truyền của bạn.",
    copyright: "© 2026 Wesantika. All Rights Reserved.",
    privacy: "Chính sách bảo mật",
  },

  about: {
    heroLead:
      "Chúng tôi giúp các tổ chức biến ý tưởng thành giải pháp số có khả năng mở rộng, thông qua AI, công nghệ đám mây và kỹ thuật phần mềm chuyên sâu. Chúng tôi tin rằng thành công bền vững được xây dựng từ sự đổi mới, quan hệ đối tác đáng tin cậy và sự xuất sắc trong kỹ thuật.",
    title: "Về chúng tôi",
    // about.blocks — intentionally untranslated, see the note above.
    vision: {
      label: "Tầm nhìn của chúng tôi",
      statement:
        "Trở thành đối tác công nghệ mà doanh nghiệp tin tưởng vào những thời điểm đổi mới quan trọng nhất.",
      body: [
        "Không phải vì chúng tôi dùng công nghệ mới nhất.",
        "Mà vì chúng tôi biết cách biến công nghệ thành thành công kinh doanh bền vững.",
      ],
    },
  },

  servicesPage: {
    detailLabel: "CHI TIẾT",
    metaTitle: "Dịch vụ phát triển phần mềm",
    metaDescription:
      "Wesantika cung cấp dịch vụ phát triển phần mềm trọn vòng đời, với các giải pháp riêng đáp ứng nhu cầu đặc thù của doanh nghiệp bạn.",
    hero: {
      title: "Dịch vụ phát triển phần mềm",
      body: "Tại Wesantika, chúng tôi chuyên biến ý tưởng thành những sản phẩm phần mềm chất lượng cao. Chúng tôi cung cấp các giải pháp phát triển phần mềm được thiết kế theo nhu cầu của bạn, cùng chiến lược giá cạnh tranh giúp tiết kiệm chi phí. Với sự tận tâm và kinh nghiệm, cách làm của chúng tôi rút ngắn thời gian ra thị trường và giúp bạn khác biệt so với đối thủ.",
      cta: "Trao đổi về nhu cầu của bạn",
    },
    accelerate: {
      heading: "Tăng tốc hành trình phát triển phần mềm cùng Wesantika",
      highlights: {
        ai: "Dịch vụ phát triển AI",
        custom: "Phát triển phần mềm theo yêu cầu",
      },
    },
    offer: {
      heading: "Các dịch vụ phát triển phần mềm của chúng tôi",
      subtitle:
        "Wesantika cung cấp dịch vụ phát triển phần mềm trọn vòng đời, với các giải pháp riêng đáp ứng nhu cầu đặc thù của doanh nghiệp bạn.",
      cards: {
        custom: {
          title: "Phát triển phần mềm theo yêu cầu",
          body: "Giải pháp phần mềm toàn trình của chúng tôi mang lại các tính năng được thiết kế riêng, hiệu năng có khả năng mở rộng và mức độ cá nhân hoá hoàn toàn, giúp bạn có được lợi thế cạnh tranh xứng đáng.",
        },
      },
    },
    global: {
      heading: "Đội ngũ kỹ sư toàn cầu như chính đội ngũ của bạn",
      intro:
        "Mô hình phát triển offshore của chúng tôi không chỉ dừng ở việc cung cấp nhân lực. Chúng tôi xây dựng những đội ngũ chuyên trách hòa nhập liền mạch vào quy trình của bạn, chia sẻ mục tiêu và cam kết với thành công dài hạn của bạn.",
      requiresLead: "Xây dựng phần mềm xuất sắc cần nhiều hơn năng lực kỹ thuật.",
      requiresLabel: "Nó còn cần :",
      points: {
        people: "Đúng người",
        communication: "Giao tiếp rõ ràng",
        collaboration: "Hợp tác liền mạch",
      },
      outro:
        "Đội ngũ kỹ sư toàn cầu của chúng tôi tham gia trực tiếp vào quy trình của bạn, giúp tăng tốc phát triển trong khi vẫn giữ chất lượng và sự minh bạch như một đội ngũ nội bộ.",
    },
    why: {
      heading: "Vì sao chọn Wesantika?",
      cta: "Liên hệ với chuyên gia của chúng tôi",
      items: [
        "Phát triển tối ưu chi phí",
        "Mở rộng đội ngũ nhanh chóng",
        "Kỹ sư giàu kinh nghiệm",
        "Giao tiếp rõ ràng",
        "Quan hệ đối tác dài hạn",
        "Hợp tác linh hoạt",
        "Công nghệ hiện đại",
        "Chất lượng và bảo mật đáng tin cậy",
      ],
    },
  },

  // UI translated; article copy is sample content and falls back to English.

  blog: {
    metaTitle: "Blog",
    metaDescription:
      "Ghi chép thực tế về kỹ thuật AI, nền tảng đám mây và việc xây dựng phần mềm cùng đội ngũ phân tán.",
    heroTitle: "Blog",
    heroBody:
      "Ghi chép từ các kỹ sư của chúng tôi về AI ứng dụng, nền tảng đám mây, và điều thực sự diễn ra khi các đội ngũ phân tán cùng xây dựng phần mềm.",
    featuredLabel: "Nổi bật",
    allCategories: "Tất cả",
    readMore: "Đọc bài viết",
    back: "Quay lại Blog",
    empty: "Chưa có bài viết nào trong mục này.",
    readTime: "Đọc {minutes} phút",
    categories: { engineering: "Kỹ thuật", ai: "AI", design: "Thiết kế", business: "Kinh doanh" },
  },

  // `capabilities` (four long paragraphs) falls back to English, as elsewhere.
  technologies: {
    metaTitle: "Công nghệ phát triển phần mềm",
    metaDescription:
      "Các nhóm công nghệ chúng tôi dùng cho AI, back-end, front-end, phát triển ứng dụng, DevOps và đám mây — nền tảng để xây dựng hệ thống thông minh, dễ mở rộng.",
    hero: {
      titleLines: ["Công nghệ phát triển", "phần mềm"],
      body: "Với kinh nghiệm sâu rộng trong phát triển phần mềm, Wesantika đã xây dựng năng lực công nghệ vững chắc thông qua hợp tác với các đội ngũ đa quốc gia, startup và doanh nghiệp ở nhiều thị trường khác nhau. Chúng tôi liên tục tiếp nhận những tiến bộ mới nhất của AI và kỹ thuật phần mềm hiện đại, kết hợp góc nhìn toàn cầu với năng lực kỹ thuật chuyên sâu để phát triển các giải pháp thông minh, dễ mở rộng và chất lượng cao, đáp ứng những yêu cầu khắt khe của doanh nghiệp và ngành.",
      cta: "Trao đổi về nhu cầu của bạn",
    },
    stacksHeading:
      "Những nhóm công nghệ phát triển phần mềm hàng đầu, đáp ứng mọi nhu cầu doanh nghiệp",
    sections: {
      ai: "Công nghệ cốt lõi cho phát triển AI",
      backend: "Công nghệ back-end chủ chốt",
      frontend: "Công nghệ front-end chủ chốt",
      app: "Phát triển ứng dụng",
      devops: "DevOps",
      cloud: "Điện toán đám mây",
    },
    rfp: {
      heading: "Chọn công nghệ của bạn. Thấy sản phẩm sau 24 giờ.",
      body: "Lộ trình được tăng tốc bằng AI, đi từ đề bài đầy đủ của bạn đến một nguyên mẫu chạy được, do các kỹ sư thành thạo .NET, Java, Python, Node, React và nhiều công nghệ khác thẩm định.",
    },
  },

  work: {
    metaTitle: "Dự án",
    metaDescription:
      "Các dự án tiêu biểu về AI, blockchain, đám mây, phần mềm theo yêu cầu, ERP và di động — được triển khai cùng các công ty đối tác.",
    heroTitle: "Dự án",
    heroBody:
      "Những dự án chúng tôi triển khai cùng các công ty đối tác trong lĩnh vực AI, blockchain, đám mây, ERP và di động — từ nguyên mẫu đầu tiên đến khi vận hành thực tế.",
    searchPlaceholder: "Tìm theo từ khoá...",
    searchLabel: "Tìm kiếm dự án",
    all: "Tất cả",
    servicesLabel: "Lọc theo dịch vụ",
    industriesLabel: "Lọc theo ngành",
    empty: "Chưa có dự án nào khớp với bộ lọc này.",
    resultCount: "{count} dự án",
    pagination: "Phân trang",
    previous: "Trước",
    next: "Sau",
  },

  rfpModal: {
    open: "Gửi yêu cầu",
    close: "Đóng",
    heading: {
      lead: "Yêu cầu của bạn, được chuyên gia xem xét trong",
      emphasis: "24 giờ",
      trail: "",
    },
    bodyLines: [
      "Lộ trình tăng tốc bằng AI, từ đề bài đến nguyên mẫu chạy được.",
      "Làm việc với kỹ sư, không phải nhân viên bán hàng.",
    ],
    checklist: [
      "Nguyên mẫu bấm được của luồng người dùng cốt lõi",
      "Sơ đồ quy trình mô tả toàn bộ hệ thống",
      "Định hướng kiến trúc gồm công nghệ, tích hợp và khả năng mở rộng",
      "Buổi tư vấn kỹ thuật cùng đội ngũ kỹ sư của chúng tôi",
    ],
    fields: {
      name: "Họ và tên*",
      phone: "Điện thoại công việc*",
      company: "Tên công ty*",
      email: "Email*",
      brief: "Mô tả dự án*",
    },
    chooseFile: "Chọn tệp",
    noFileChosen: "Chưa chọn tệp nào",
    submit: "Gửi yêu cầu",
    submitting: "Đang gửi…",
    sent: "Đã gửi — chúng tôi sẽ phản hồi trong vòng 24 giờ.",
    previewLink: "Xem email đã gửi",
    errors: {
      generic: "Đã xảy ra lỗi. Vui lòng thử lại.",
      network: "Không kết nối được tới máy chủ. Vui lòng kiểm tra đường truyền.",
      captchaMissing: "Vui lòng hoàn tất phần xác minh bên dưới.",
      captchaFailed: "Xác minh không thành công. Vui lòng thử lại.",
      fileTooLarge: "Tệp vượt quá giới hạn 10 MB.",
      fileType: "Không hỗ trợ định dạng tệp này.",
    },
  },

  rail: {
    email: "Email",
    telegram: "Telegram",
    whatsapp: "WhatsApp",
    line: "LINE",
  },
};
