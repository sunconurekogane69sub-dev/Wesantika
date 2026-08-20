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
    solution: "Giải pháp",
    about: "Về chúng tôi",
    work: "Dự án",
    technologies: "Công nghệ",
    contact: "Liên hệ",
    openMenu: "Mở menu",
    languageLabel: "Đổi ngôn ngữ",
    comingSoon: "Sắp ra mắt",
  },

  hero: {
    title: "Phần mềm trụ được vào ngày tệ nhất.",
    subtitle:
      "Kỹ thuật phần mềm AI, đám mây và phát triển theo yêu cầu, cho những đội cần một hệ thống chạy thật chứ không phải nguyên mẫu. Mỗi dự án bắt đầu từ các ràng buộc, rồi thiết kế lùi từ đó.",
  },

  services: {
    heading: "Dịch vụ toàn diện",
      /** Rendered in the brand colour; must be a substring of heading. */
      headingAccent: "Dịch vụ",
    cta: "Xem chi tiết dịch vụ",
    categories: {
      custom: "Phát triển phần mềm theo yêu cầu",
      offshore: "Offshore & Outsourcing",
      ai: "Phát triển AI",
      qa: "Kiểm thử QA",
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
      enterprise: {
        title: "Phát triển phần mềm doanh nghiệp",
        body: "Dịch vụ phát triển phần mềm doanh nghiệp của chúng tôi được xây dựng trên sự am hiểu toàn diện về đặc thù từng ngành và những tiến bộ công nghệ mới nhất.",
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
      outsourcing: {
        title: "Thuê ngoài phát triển phần mềm",
        body: "Chúng tôi có năm mô hình thuê ngoài. Khi thuê ngoài phát triển phần mềm tại Việt Nam, bạn có thể tập trung vào hoạt động cốt lõi trong khi rút ngắn thời gian ra thị trường.",
      },
      offshoreTeams: {
        title: "Giải pháp phát triển offshore",
        body: "Phỏng vấn các lập trình viên hàng đầu ngay hôm nay. Đội ngũ của chúng tôi cung cấp dịch vụ phần mềm offshore chất lượng cao tại Việt Nam với chi phí hợp lý.",
      },
      aiDevelopment: {
        title: "Dịch vụ phát triển AI",
        body: "Kết hợp AI tiên tiến với học máy, chúng tôi xây dựng phần mềm thông minh giúp tinh gọn vận hành và nâng cao chất lượng ra quyết định, đưa doanh nghiệp của bạn đến hiệu quả và đổi mới.",
      },
      generativeAi: {
        title: "Dịch vụ tích hợp AI tạo sinh",
        body: "Tích hợp AI tạo sinh vào sản phẩm để tự động hóa quy trình. Chúng tôi cá nhân hóa trải nghiệm, giảm chi phí và mở rộng an toàn theo chuẩn tuân thủ doanh nghiệp.",
      },
      qaTesting: {
        title: "Dịch vụ kiểm thử QA phần mềm",
        body: "Kiểm thử thủ công và tự động với Selenium, Cypress và CI/CD. Phạm vi bao gồm chức năng, bảo mật và hiệu năng, giúp phát hành nhanh hơn và giảm rủi ro.",
      },
      itServices: {
        title: "Dịch vụ CNTT",
        body: "Chúng tôi đóng vai trò đối tác CNTT thuê ngoài trọn gói hoặc phần mở rộng chuyên môn cho đội ngũ của bạn, giảm thời gian gián đoạn, tối ưu hiệu năng và mang lại kết quả kinh doanh đo lường được.",
      },
      devops: {
        title: "Dịch vụ phát triển DevOps",
        body: "Kết hợp AI tiên tiến với học máy, chúng tôi xây dựng phần mềm thông minh giúp tinh gọn vận hành và nâng cao chất lượng ra quyết định, đưa doanh nghiệp của bạn đến hiệu quả và đổi mới.",
      },
      cloudMigration: {
        title: "Dịch vụ di chuyển lên đám mây",
        body: "Chuyển khối lượng công việc sang AWS, Azure và GCP theo chiến lược rehost, replatform và refactor. Chúng tôi bảo đảm gián đoạn tối thiểu, tuân thủ, tối ưu chi phí và khả năng mở rộng.",
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

  contact: {
    metaTitle: "Liên hệ",
    metaDescription:
      "Hãy cho chúng tôi biết bạn đang xây dựng điều gì. Gửi tin nhắn, dùng kênh liên hệ trực tiếp, hoặc gửi RFP - chúng tôi sẽ trả lời cụ thể, không phải bằng một tờ giới thiệu.",
    heroTitle: "Hãy trao đổi về những gì bạn đang xây dựng",
    heroBody:
      "Dù bạn đã có bản đặc tả được phê duyệt hay mới chỉ có một vấn đề chưa gọi được tên, cuộc trao đổi đầu tiên vẫn giống nhau: điều gì cần đúng để việc này chạy được?",
    heroCta: "Gửi tin nhắn",
    paths: {
      heading: "Hai cách bắt đầu",
      message: {
        title: "Gửi tin nhắn",
        body: "Phù hợp cho trao đổi ban đầu - xác định phạm vi, đánh giá khả thi, hoặc một câu hỏi bạn muốn có câu trả lời thẳng thắn.",
        cta: "Viết cho chúng tôi",
      },
      rfp: {
        title: "Gửi RFP",
        body: "Phù hợp khi yêu cầu, tiến độ và ngân sách đã rõ. Đính kèm tài liệu và chúng tôi sẽ phản hồi đúng theo đó.",
        cta: "Gửi RFP của bạn",
      },
    },
    form: {
      heading: "Gửi tin nhắn cho chúng tôi",
      body: "Bạn mô tả vấn đề càng rõ, phản hồi đầu tiên của chúng tôi càng hữu ích.",
    },
    channels: {
      heading: "Hoặc liên hệ trực tiếp",
      body: "Bạn bắt đầu từ kênh nào, chúng tôi trả lời ngay trên kênh đó.",
    },
    office: {
      /* Keyed by `Office.id` in lib/content.ts, so a third office is
         one new key here rather than a new branch in the markup. */
      names: {
        singapore: "Singapore",
        thailand: "Thái Lan",
      },
      mapLink: "Mở trong Google Maps",
    },
    next: {
      heading: "Điều gì diễn ra tiếp theo",
      steps: {
        reply: {
          title: "Một kỹ sư đọc tin của bạn",
          body: "Tin nhắn đến thẳng kỹ sư, không qua hàng chờ. Bạn sẽ nhận phản hồi trong vòng một ngày làm việc.",
        },
        call: {
          title: "Một buổi trao đổi ngắn",
          body: "Ba mươi phút để hiểu vấn đề, các ràng buộc, và liệu chúng tôi có phải đội ngũ phù hợp hay không.",
        },
        proposal: {
          title: "Đề xuất bằng văn bản",
          body: "Phạm vi, cách tiếp cận, cơ cấu đội ngũ và chi phí - bằng văn bản, để bạn có thể so sánh với bất kỳ bên nào khác.",
        },
      },
    },
    global: {
      heading: "Chúng tôi làm việc xuyên múi giờ",
      body: "Kỹ sư của chúng tôi ở nhiều thị trường và có giờ làm việc chồng lấn với châu Âu, châu Á và Bắc Mỹ. Hãy cho biết bạn ở đâu, chúng tôi sẽ làm việc theo giờ của bạn, không phải của chúng tôi.",
    },
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
    /** Footer link-column headings. */
    navHeading: "Khám phá",
    servicesHeading: "Dịch vụ",
    copyright: "© 2026 Wesantika | Đã đăng ký bản quyền",
    privacy: "Chính sách bảo mật",
  },

  about: {
    heroLead:
      "Chúng tôi giúp các tổ chức biến ý tưởng thành giải pháp số có khả năng mở rộng, thông qua AI, công nghệ đám mây và kỹ thuật phần mềm chuyên sâu. Chúng tôi tin rằng thành công bền vững được xây dựng từ sự đổi mới, quan hệ đối tác đáng tin cậy và sự xuất sắc trong kỹ thuật.",
    heroCta: "Xem dự án của chúng tôi",
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
      body: "Tại Wesantika, chúng tôi chuyên biến ý tưởng thành những sản phẩm phần mềm chất lượng cao.",
      /** The rest of the original paragraph, rendered under the hero. */
      bodyMore: "Chúng tôi cung cấp các giải pháp phát triển phần mềm được thiết kế theo nhu cầu của bạn, cùng chiến lược giá cạnh tranh giúp tiết kiệm chi phí. Với sự tận tâm và kinh nghiệm, cách làm của chúng tôi rút ngắn thời gian ra thị trường và giúp bạn khác biệt so với đối thủ.",
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
        web: {
          title: "Phát triển ứng dụng web",
          body: "Hãy xác định mục tiêu kinh doanh, chúng tôi sẽ xây dựng ứng dụng web để đạt được mục tiêu đó. Năng lực phát triển web, quản trị dự án Agile và hiểu biết về xu hướng bảo đảm một ứng dụng có ROI cao mà người dùng thực sự trân trọng. Đội ngũ chuyên trách giúp ứng dụng của bạn hiện đại, an toàn và dễ mở rộng.",
        },
        mobile: {
          title: "Phát triển ứng dụng di động",
          body: "Chúng tôi nghiên cứu thị trường chuyên sâu để tạo ra thiết kế lấy người dùng làm trung tâm, giúp bạn nổi bật trong một thị trường biến động. Chúng tôi xây dựng ứng dụng native và đa nền tảng với hiệu năng ổn định. Chiến lược này rút ngắn thời gian ra mắt, củng cố lợi thế cạnh tranh và thúc đẩy tăng trưởng.",
        },
        ai: {
          title: "Dịch vụ phát triển AI",
          body: "Ngành AI vẫn đang định hình, khiến chuyên gia nội bộ rất khó tìm. Chúng tôi cung cấp giải pháp tích hợp AI để giải quyết bài toán kinh doanh, tự động hóa tác vụ và cải thiện việc ra quyết định. Chúng tôi bắt đầu bằng PoC hoặc MVP để kiểm chứng ý tưởng, giảm rủi ro và tăng khả năng thành công trên thị trường.",
        },
        product: {
          title: "Phát triển sản phẩm phần mềm",
          body: "Cam kết đổi mới và cải tiến dẫn dắt toàn bộ hành trình từ ý tưởng đến ra mắt. Quá trình bao gồm thiết kế lấy người dùng làm trung tâm và các tính năng được xây dựng kỹ lưỡng, bảo đảm phần mềm đáng tin cậy. Sau khi ra mắt, hỗ trợ và bảo trì vẫn tiếp tục để dự án vận hành trơn tru.",
        },
        enterprise: {
          title: "Phát triển phần mềm doanh nghiệp",
          body: "Phần mềm doanh nghiệp phải thực sự cải thiện cách doanh nghiệp vận hành. Những giải pháp được thiết kế riêng giúp tăng hiệu quả và hỗ trợ đội ngũ làm việc tốt hơn là điều thiết yếu. Chúng tôi tập trung gắn kết phần mềm với mục tiêu kinh doanh, dẫn đến vận hành tốt hơn và một doanh nghiệp vững vàng hơn.",
        },
        saas: {
          title: "Phát triển ứng dụng SaaS",
          body: "Các dự án SaaS phức tạp và dài hạn cần nhà cung cấp giàu kinh nghiệm mới triển khai thành công. Các kỹ sư kỳ cựu của Wesantika hỗ trợ chuyên sâu với hơn 12 năm kinh nghiệm. Chúng tôi tạo ra giải pháp SaaS vững chắc, trực quan, thúc đẩy doanh nghiệp hiện đại bằng những ứng dụng chất lượng cao.",
        },
        hire: {
          title: "Thuê lập trình viên phần mềm",
          body: "Lập trình viên của chúng tôi có kinh nghiệm dày dạn trong môi trường thuê ngoài, đã tham gia nhiều dự án toàn cầu thuộc nhiều ngành khác nhau. Đội ngũ thích ứng tốt với thách thức ở bất kỳ lĩnh vực nào. Tiếng Anh vững và hiểu biết văn hóa giúp chúng tôi làm việc thuận lợi với khách hàng trên toàn thế giới.",
        },
        qa: {
          title: "Dịch vụ kiểm thử QA phần mềm",
          body: "Đội QA của chúng tôi kiểm thử kỹ lưỡng từng tính năng và chức năng, kết hợp kỹ thuật tự động và thủ công. Đội ngũ thực hiện kiểm tra độ ổn định trong giai đoạn UAT trước khi phát hành. Kỹ sư QA bảo đảm phần mềm chất lượng cao được bàn giao đúng hạn, đạt chuẩn quốc tế.",
        },
        integration: {
          title: "Dịch vụ tích hợp phần mềm",
          body: "Kết nối ứng dụng, dữ liệu và thiết bị của bạn bằng các tích hợp an toàn, dễ mở rộng — API, ERP/CRM và đám mây. Xóa bỏ silo dữ liệu, tự động hóa quy trình và rút ngắn thời gian bàn giao.",
        },
        mvp: {
          title: "Phát triển phần mềm MVP",
          body: "Phát triển MVP giúp bạn kiểm chứng ý tưởng nhanh chóng. Chúng tôi chỉ xây dựng những tính năng thiết yếu nhất, nhờ đó bạn thu được phản hồi người dùng từ sớm, tiết kiệm thời gian và hoàn thiện sản phẩm mà không lãng phí nguồn lực.",
        },
        poc: {
          title: "Dịch vụ phát triển PoC",
          body: "Dịch vụ phát triển phần mềm của chúng tôi bao gồm PoC để chứng minh tính khả thi của ý tưởng. Chúng tôi giúp bạn kiểm chứng trước khi bước vào phát triển toàn diện, giảm rủi ro và giúp bạn chọn hướng đi phù hợp nhất.",
        },
        devops: {
          title: "Dịch vụ phát triển DevOps",
          body: "Dịch vụ DevOps kết nối phát triển với vận hành. Đội DevOps của chúng tôi tăng tốc bàn giao phần mềm và tự động hóa tác vụ để tinh gọn quy trình. Bằng việc đưa vào các công cụ bảo mật tiên tiến, chúng tôi nâng cao đáng kể cả hiệu quả lẫn tốc độ.",
        },
        cloud: {
          title: "Dịch vụ di chuyển lên đám mây",
          body: "Đưa dữ liệu và ứng dụng lên đám mây là bước thiết yếu của phát triển phần mềm hiện đại. Dịch vụ di chuyển lên đám mây giúp quá trình này diễn ra suôn sẻ. Dữ liệu của bạn được bảo mật và ứng dụng sẵn sàng cho môi trường đám mây.",
        },
        backend: {
          title: "Dịch vụ phát triển back-end",
          body: "Một back-end vững chắc là yếu tố then chốt của phần mềm. Chúng tôi tập trung xây dựng logic phía máy chủ mạnh mẽ, áp dụng kỹ thuật lập trình nâng cao để tạo ra hệ thống back-end hiệu quả và đáng tin cậy. Quản trị cơ sở dữ liệu tốt mang lại nền móng vững chắc cho ứng dụng của bạn.",
        },
        frontend: {
          title: "Dịch vụ phát triển front-end",
          body: "Chúng tôi tạo ra giao diện thân thiện, xuất sắc cả về thẩm mỹ lẫn công năng, thiết kế những website bắt mắt và ứng dụng responsive với UI chỉn chu. Những giao diện này giữ chân người dùng và cải thiện trải nghiệm của họ.",
        },
        maintenance: {
          title: "Bảo trì và hỗ trợ phần mềm",
          body: "Giữ cho phần mềm luôn được cập nhật là điều thiết yếu. Dịch vụ phát triển phần mềm theo yêu cầu của chúng tôi bao gồm bảo trì và hỗ trợ. Ứng dụng của bạn luôn ở trạng thái tốt nhất để bắt kịp nhu cầu kinh doanh đang thay đổi.",
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


  // `capabilities` (four long paragraphs) falls back to English, as elsewhere.
  technologies: {
    metaTitle: "Công nghệ phát triển phần mềm",
    metaDescription:
      "Các nhóm công nghệ chúng tôi dùng cho AI, back-end, front-end, phát triển ứng dụng, DevOps và đám mây — nền tảng để xây dựng hệ thống thông minh, dễ mở rộng.",
    hero: {
      title: "Công nghệ phát triển phần mềm",
      body: "Với kinh nghiệm sâu rộng trong phát triển phần mềm, Wesantika đã xây dựng năng lực công nghệ vững chắc thông qua hợp tác với các đội ngũ đa quốc gia, startup và doanh nghiệp ở nhiều thị trường khác nhau.",
      /** The rest of the original paragraph, rendered under the hero. */
      bodyMore: "Chúng tôi liên tục tiếp nhận những tiến bộ mới nhất của AI và kỹ thuật phần mềm hiện đại, kết hợp góc nhìn toàn cầu với năng lực kỹ thuật chuyên sâu để phát triển các giải pháp thông minh, dễ mở rộng và chất lượng cao, đáp ứng những yêu cầu khắt khe của doanh nghiệp và ngành.",
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
    heroCta: "Bắt đầu dự án",
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
    body: "Lộ trình tăng tốc bằng AI, từ đề bài đến nguyên mẫu chạy được. Làm việc với kỹ sư, không phải nhân viên bán hàng.",
    checklist: [
      "Nguyên mẫu bấm được của luồng người dùng cốt lõi",
      "Sơ đồ quy trình mô tả toàn bộ hệ thống",
      "Định hướng kiến trúc gồm công nghệ, tích hợp và khả năng mở rộng",
      "Buổi tư vấn kỹ thuật cùng đội ngũ kỹ sư của chúng tôi",
    ],
    fields: {
      name: "Họ và tên*",
      phone: "Điện thoại công việc",
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

  a11y: {
    skipToContent: "Chuyển đến nội dung",
  },

  notFound: {
    metaTitle: "Không tìm thấy trang",
    title: "Trang này không tồn tại",
    body: "Liên kết có thể đã cũ hoặc trang đã được chuyển. Bạn có thể thử các trang sau.",
    home: "Về trang chủ",
  },

  rail: {
    email: "Email",
    telegram: "Telegram",
    whatsapp: "WhatsApp",
    line: "LINE",
  },
};
