export const LOCALES = ["uz", "ru", "en"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "uz";

// Union of the three locale shapes. Each has the same structure; only the
// string values differ. Components only render values as text, so the union
// is safe everywhere a `Dictionary` is consumed.
export type Dictionary = (typeof dictionaries)[Locale];

export const dictionaries = {
  uz: {
    meta: {
      title: "East Star – Toshkentdagi xususiy maktab",
      description:
        "East Star – Toshkentdagi zamonaviy xususiy maktab. Kuchli o'qituvchilar, kichik sinflar, ingliz tili va STEM yo'nalishlari. Ariza qoldiring – biz siz bilan bog'lanamiz.",
    },
    nav: {
      about: "Maktab haqida",
      programs: "Dasturlar",
      whyUs: "Afzalliklar",
      teachers: "O'qituvchilar",
      facilities: "Sharoit",
      contact: "Aloqa",
      cta: "Ariza qoldirish",
    },
    hero: {
      badge: "Toshkentdagi xususiy maktab",
      title: "EAST STAR Private School – bolangizning kelajagi shu yerdan boshlanadi",
      subtitle:
        "Kichik sinflar, individual yondashuv va valdorf ta'lim metodikasi. Nol va boshlang'ich sinflar uchun zamonaviy va sifatli o'quv dasturi.",
      tagline: "Buyuk o'tmish – yorqin kelajak",
      ctaPrimary: "Ariza qoldirish",
      ctaSecondary: "Ko'proq bilish",
      stats: [
        { value: "Valdorf", label: "O'qitish metodikasi" },
        { value: "20", label: "Sinfdagi o'quvchilar soni" },
        { value: "3", label: "O'quv tili" },
      ],
    },
    about: {
      eyebrow: "Maktab haqida",
      title: "Bilim, g'amxo'rlik va har bir bolaga e'tibor",
      body: [
        "East Star – Toshkentdagi xususiy maktab bo'lib, bolalar bu yerda qulay va qo'llab-quvvatlovchi muhitda mustahkam bilim asoslarini oladilar.",
        "Bizning maqsadimiz – bolalarda mustaqillik va o'z imkoniyatlariga ishonchni shakllantirish. Shu sababli darslar tanqidiy fikrlash, jamoa bo'lib ishlash va ijodiy yondashuvga asoslangan.",
      ],
    },
    programs: {
      eyebrow: "Dasturlar",
      title: "Har bir bosqich uchun puxta dastur",
      items: [
        {
          title: "Maktabgacha (0-sinf)",
          desc: "Bolani maktabga tayyorlash: harflar, raqamlar, ingliz tili asoslari va ijodiy mashg'ulotlar. O'yin orqali o'rganish.",
        },
        {
          title: "Boshlang'ich (1–4)",
          desc: "O'qish, yozish, matematika, ingliz va xitoy tillari. Individual yondashuv va kichik sinflar.",
        },
        {
          title: "Qo'shimcha to'garaklar",
          desc: "Robototexnika, shaxmat, futbol, rasm va musiqa.",
        },
      ],
    },
    whyUs: {
      eyebrow: "East Star",
      title: "Bizning afzalliklarimiz",
      items: [
        {
          title: "Hamyonbop ta'lim narxi",
          desc: "Qulay narxda sifatli ta'lim.",
        },
        {
          title: "Tajribali va e'tiborli pedagoglar",
          desc: "O'qituvchilarimiz har bir bolaning xususiyatlari va o'rganish suratini hisobga olib, dasturni ishonch bilan o'zlashtirishga yordam beradi.",
        },
        {
          title: "Bilingual ta'lim",
          desc: "Ingliz va xitoy tillari bolalarga dunyoqarashni kengaytirishga va dastlabki maktab yillaridanoq yangi imkoniyatlar bilan tanishishga yordam beradi.",
        },
        {
          title: "Zamonaviy ta'lim muhiti",
          desc: "Yorug' va jihozlangan sinflar o'qish, ijodkorlik va rivojlanish uchun qulay sharoit yaratadi.",
        },
        {
          title: "Kichik sinflar",
          desc: "Har bir sinfda 20 nafargacha o'quvchi o'qiydi, bu har bir bolaga ko'proq e'tibor berish imkonini beradi.",
        },
        {
          title: "Ota-onalar bilan doimiy aloqa",
          desc: "Haftalik hisobotlar va shaxsiy uchrashuvlar.",
        },
      ],
    },
    teachers: {
      eyebrow: "O'qituvchilar",
      title: "Bolangiz uchun eng yaxshilari",
      body: "Bizning o'qituvchilarimiz – O'zbekiston va xorijdagi yetakchi universitetlar bitiruvchilari. Ularning ko'pchiligi CELTA, TKT va boshqa xalqaro sertifikatlarga ega.",
    },
    facilities: {
      eyebrow: "Sharoit",
      title: "Zamonaviy va qulay maktab binosi",
      items: [
        "Yorug' va keng sinflar",
        "Futbol maydoni va bolalar maydonchasi",
        "Issiq ovqatlanish (3 mahal)",
        "Sinflarda multimedia jihozlari",
        "Umumiy hudud maydoni 3300 m²",
      ],
    },
    contact: {
      eyebrow: "Aloqa",
      title: "Biz bilan bog'laning",
      address: "Toshkent, Yangi Hayot tumani, Navro'z ko'chasi, 19",
      phones: ["+998 90 812 40 04", "+998 97 137 07 76"],
      telegram: "https://t.me/eaststarprivate",
      email: "eaststarprivateschool@yandex.com",
      hours: "Dushanba–Juma, 08:30–17:30",
    },
    form: {
      eyebrow: "",
      title: "Ariza qoldiring, va biz siz bilan bog'lanamiz",
      subtitle:
        "Ma'lumotlaringizni qoldiring, biz 1 ish kuni ichida siz bilan bog'lanamiz va savollaringizga javob beramiz.",
      nameLabel: "Ism (siz yoki bolangizning ismi)",
      namePlaceholder: "Masalan, Aziza",
      phoneLabel: "Telefon raqam",
      phonePlaceholder: "+998 90 123 45 67",
      gradeLabel: "Bola qaysi sinfga o'tmoqda (0–11)",
      gradePlaceholder: "Sinfni tanlang",
      gradeZero: "0 (maktabgacha)",
      submit: "Ariza yuborish",
      submitting: "Yuborilmoqda...",
      successTitle: "Rahmat!",
      successMessage:
        "Arizangiz qabul qilindi. Biz tez orada siz bilan bog'lanamiz.",
      errorTitle: "Xatolik",
      errorMessage: "Iltimos, qaytadan urinib ko'ring yoki bizga qo'ng'iroq qiling.",
      validation: {
        nameRequired: "Iltimos, ismingizni kiriting",
        phoneRequired: "Iltimos, telefon raqamingizni kiriting",
        phoneInvalid: "Telefon raqam noto'g'ri. Masalan: +998 90 123 45 67",
        gradeRequired: "Iltimos, sinfni tanlang",
      },
      privacy:
        "Ma'lumotlaringiz faqat siz bilan bog'lanish uchun ishlatiladi.",
    },
    footer: {
      tagline: "Buyuk o'tmish – yorqin kelajak.",
      rights: "Barcha huquqlar himoyalangan.",
      followUs: "Bizni kuzatib boring",
    },
  },

  ru: {
    meta: {
      title: "East Star – частная школа в Ташкенте",
      description:
        "East Star – современная частная школа в Ташкенте. Сильные учителя, маленькие классы, английский и STEM. Оставьте заявку – мы свяжемся с вами.",
    },
    nav: {
      about: "О школе",
      programs: "Программы",
      whyUs: "Почему мы",
      teachers: "Учителя",
      facilities: "Условия",
      contact: "Контакты",
      cta: "Оставить заявку",
    },
    hero: {
      badge: "Частная школа в Ташкенте",
      title: "EAST STAR Private School – будущее вашего ребёнка начинается здесь",
      subtitle:
        "Маленькие классы, индивидуальный подход и вальдорфская методика обучения. Современная и качественная программа обучения для нулевого и начальных классов.",
      tagline: "Великое прошлое – Яркое будущее",
      ctaPrimary: "Оставить заявку",
      ctaSecondary: "Узнать больше",
      stats: [
        { value: "Waldorf", label: "Методика обучения" },
        { value: "20", label: "Учеников в классе" },
        { value: "3", label: "Языка обучения" },
      ],
    },
    about: {
      eyebrow: "О школе",
      title: "Знания, забота и внимание к каждому ребёнку",
      body: [
        "East Star – частная школа в Ташкенте, где дети получают прочную базу знаний в комфортной и поддерживающей среде.",
        "Наша цель – привить детям самостоятельность и уверенность в своих возможностях. Поэтому уроки строятся на критическом мышлении, командной работе и творческом подходе.",
      ],
    },
    programs: {
      eyebrow: "Программы",
      title: "Продуманная программа для каждой ступени",
      items: [
        {
          title: "Дошкольная (0 класс)",
          desc: "Подготовка к школе: буквы, цифры, основы английского и творческие занятия. Обучение через игру.",
        },
        {
          title: "Начальная (1–4)",
          desc: "Чтение, письмо, математика, английский и китайский языки. Индивидуальный подход и маленькие классы.",
        },
        {
          title: "Доп. кружки",
          desc: "Робототехника, шахматы, футбол, рисование и музыка.",
        },
      ],
    },
    whyUs: {
      eyebrow: "East Star",
      title: "Наши преимущества",
      items: [
        {
          title: "Доступная стоимость обучения",
          desc: "Качественное образование по комфортной цене.",
        },
        {
          title: "Опытные и внимательные педагоги",
          desc: "Наши учителя помогают каждому ребёнку уверенно осваивать программу, учитывая его особенности и темп обучения.",
        },
        {
          title: "Билингвальное обучение",
          desc: "Английский и китайский языки помогают детям расширять кругозор и знакомиться с новыми возможностями с первых школьных лет.",
        },
        {
          title: "Современная образовательная среда",
          desc: "Светлые и оснащённые классы создают комфортные условия для учёбы, творчества и развития.",
        },
        {
          title: "Небольшие классы",
          desc: "В каждом классе обучается до 20 учеников, что позволяет уделять больше внимания каждому ребёнку.",
        },
        {
          title: "Постоянная коммуникация с родителями",
          desc: "Еженедельные отчёты и личные встречи.",
        },
      ],
    },
    teachers: {
      eyebrow: "Учителя",
      title: "Лучшие для вашего ребёнка",
      body: "Наши учителя – выпускники ведущих университетов Узбекистана и зарубежья. Многие из них имеют CELTA, TKT и другие международные сертификаты.",
    },
    facilities: {
      eyebrow: "Условия",
      title: "Современное и комфортное здание школы",
      items: [
        "Светлые и просторные классы",
        "Футбольное поле и детская площадка",
        "Горячее питание (3 раза в день)",
        "Мультимедийное оснащение классов",
        "Общая площадь территории 3300 м²",
      ],
    },
    contact: {
      eyebrow: "Контакты",
      title: "Обратная связь",
      address: "г. Ташкент, Янгихаётский район, ул. Навруз, 19",
      phones: ["+998 90 812 40 04", "+998 97 137 07 76"],
      telegram: "https://t.me/eaststarprivate",
      email: "eaststarprivateschool@yandex.com",
      hours: "Пн–Пт, 08:30–17:30",
    },
    form: {
      eyebrow: "",
      title: "Оставьте заявку и мы с вами свяжемся",
      subtitle:
        "Оставьте свои данные, мы свяжемся с вами в течение 1 рабочего дня и ответим на все вопросы.",
      nameLabel: "Имя (ваше или ребёнка)",
      namePlaceholder: "Например, Азиза",
      phoneLabel: "Номер телефона",
      phonePlaceholder: "+998 90 123 45 67",
      gradeLabel: "В какой класс переходит ребёнок (0–11)",
      gradePlaceholder: "Выберите класс",
      gradeZero: "0 (подготовительный)",
      submit: "Отправить заявку",
      submitting: "Отправка...",
      successTitle: "Спасибо!",
      successMessage:
        "Ваша заявка принята. Мы свяжемся с вами в ближайшее время.",
      errorTitle: "Ошибка",
      errorMessage:
        "Пожалуйста, попробуйте ещё раз или позвоните нам напрямую.",
      validation: {
        nameRequired: "Пожалуйста, укажите имя",
        phoneRequired: "Пожалуйста, укажите номер телефона",
        phoneInvalid: "Неверный номер. Пример: +998 90 123 45 67",
        gradeRequired: "Пожалуйста, выберите класс",
      },
      privacy:
        "Ваши данные используются только для связи с вами.",
    },
    footer: {
      tagline: "Великое прошлое – Яркое будущее.",
      rights: "Все права защищены.",
      followUs: "Мы в соцсетях",
    },
  },

  en: {
    meta: {
      title: "East Star – Private School in Tashkent",
      description:
        "East Star is a modern private school in Tashkent. Strong teachers, small classes, English and STEM focus. Leave a request and we'll get in touch.",
    },
    nav: {
      about: "About",
      programs: "Programs",
      whyUs: "Why us",
      teachers: "Teachers",
      facilities: "Facilities",
      contact: "Contact",
      cta: "Apply now",
    },
    hero: {
      badge: "Private school in Tashkent",
      title: "EAST STAR Private School – where your child's future begins",
      subtitle:
        "Small classes, individual attention, and the Waldorf teaching methodology. A modern, high-quality curriculum for preschool and primary grades.",
      tagline: "Great heritage – bright future",
      ctaPrimary: "Apply now",
      ctaSecondary: "Learn more",
      stats: [
        { value: "Waldorf", label: "Teaching methodology" },
        { value: "20", label: "Students per class" },
        { value: "3", label: "Languages of study" },
      ],
    },
    about: {
      eyebrow: "About the school",
      title: "Knowledge, care, and attention to every child",
      body: [
        "East Star is a private school in Tashkent where children build a strong foundation of knowledge in a comfortable, supportive environment.",
        "Our goal is to nurture independence and self-confidence in every child. That's why our lessons are built around critical thinking, teamwork, and creativity.",
      ],
    },
    programs: {
      eyebrow: "Programs",
      title: "A thoughtful program for every stage",
      items: [
        {
          title: "Preschool (grade 0)",
          desc: "Getting ready for school: letters, numbers, basic English, and creative classes. Learning through play.",
        },
        {
          title: "Primary (1–4)",
          desc: "Reading, writing, math, English and Chinese. Individual attention and small classes.",
        },
        {
          title: "After-school clubs",
          desc: "Robotics, chess, football, art, and music.",
        },
      ],
    },
    whyUs: {
      eyebrow: "East Star",
      title: "Our advantages",
      items: [
        {
          title: "Affordable tuition",
          desc: "High-quality education at a comfortable price.",
        },
        {
          title: "Experienced, caring teachers",
          desc: "Our teachers help every child confidently master the curriculum, taking their individual pace and needs into account.",
        },
        {
          title: "Bilingual program",
          desc: "English and Chinese help children broaden their horizons and discover new opportunities from their very first school years.",
        },
        {
          title: "Modern learning environment",
          desc: "Bright, well-equipped classrooms create comfortable conditions for study, creativity, and growth.",
        },
        {
          title: "Small classes",
          desc: "Up to 20 students per class – so every child gets more individual attention.",
        },
        {
          title: "Ongoing parent communication",
          desc: "Weekly reports and personal meetings.",
        },
      ],
    },
    teachers: {
      eyebrow: "Teachers",
      title: "The best for your child",
      body: "Our teachers are graduates of leading universities in Uzbekistan and abroad. Many of them hold CELTA, TKT, and other international certifications.",
    },
    facilities: {
      eyebrow: "Facilities",
      title: "A modern, comfortable school building",
      items: [
        "Bright, spacious classrooms",
        "Football field and children's playground",
        "Hot meals (3 times a day)",
        "Multimedia-equipped classrooms",
        "Total grounds area of 3,300 m²",
      ],
    },
    contact: {
      eyebrow: "Contact",
      title: "Get in touch",
      address: "Tashkent, Yangi Hayot district, Navruz street, 19",
      phones: ["+998 90 812 40 04", "+998 97 137 07 76"],
      telegram: "https://t.me/eaststarprivate",
      email: "eaststarprivateschool@yandex.com",
      hours: "Mon–Fri, 08:30–17:30",
    },
    form: {
      eyebrow: "",
      title: "Leave a request and we'll get in touch with you",
      subtitle:
        "Leave your details and we'll get in touch within 1 business day to answer all your questions.",
      nameLabel: "Name (yours or your child's)",
      namePlaceholder: "e.g. Aziza",
      phoneLabel: "Phone number",
      phonePlaceholder: "+998 90 123 45 67",
      gradeLabel: "Which grade is your child entering (0–11)",
      gradePlaceholder: "Select a grade",
      gradeZero: "0 (preschool)",
      submit: "Send request",
      submitting: "Sending...",
      successTitle: "Thank you!",
      successMessage:
        "Your request has been received. We'll be in touch soon.",
      errorTitle: "Something went wrong",
      errorMessage: "Please try again or call us directly.",
      validation: {
        nameRequired: "Please enter your name",
        phoneRequired: "Please enter your phone number",
        phoneInvalid: "Invalid phone. Example: +998 90 123 45 67",
        gradeRequired: "Please select a grade",
      },
      privacy: "Your details will only be used to contact you.",
    },
    footer: {
      tagline: "Great heritage – bright future.",
      rights: "All rights reserved.",
      followUs: "Follow us",
    },
  },
} as const;

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export function isValidLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}
