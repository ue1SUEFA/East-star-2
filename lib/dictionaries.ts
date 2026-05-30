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
      title: "East Star — Toshkentdagi xususiy maktab",
      description:
        "East Star — Toshkentdagi zamonaviy xususiy maktab. Kuchli o'qituvchilar, kichik sinflar, ingliz tili va STEM yo'nalishlari. Ariza qoldiring — biz siz bilan bog'lanamiz.",
    },
    nav: {
      about: "Maktab haqida",
      programs: "Dasturlar",
      whyUs: "Nega bizni tanlash kerak",
      teachers: "O'qituvchilar",
      facilities: "Sharoit",
      contact: "Aloqa",
      cta: "Ariza qoldirish",
    },
    hero: {
      badge: "Toshkentdagi xususiy maktab",
      title: "East Star — bolangizning kelajagi shu yerdan boshlanadi",
      subtitle:
        "Kichik sinflar, individual yondashuv va xalqaro standartdagi ta'lim. Maktabgacha (0-sinf) va 1–4-sinflar uchun zamonaviy o'quv dasturi.",
      tagline: "Buyuk o'tmish — yorqin kelajak",
      ctaPrimary: "Ariza qoldirish",
      ctaSecondary: "Ko'proq bilish",
      stats: [
        { value: "12+", label: "Tajribali o'qituvchi" },
        { value: "20", label: "Sinfdagi o'quvchilar soni" },
        { value: "3", label: "O'quv tili" },
      ],
    },
    about: {
      eyebrow: "Maktab haqida",
      title: "Bilim, tarbiya va xalqaro tafakkur",
      body: [
        "East Star — Toshkentda joylashgan zamonaviy xususiy maktab. Biz har bir bolaga alohida e'tibor qaratamiz va uning iste'dodini ochishga yordam beramiz.",
        "Bizning maqsad — o'quvchilarni nafaqat imtihonlarga, balki hayotga ham tayyorlash. Shuning uchun darslar tanqidiy fikrlash, jamoa bo'lib ishlash va ijodiy yondashuvga asoslangan.",
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
          desc: "Robototexnika, shaxmat, futbol, rasm, musiqa va dramaturgiya.",
        },
      ],
    },
    whyUs: {
      eyebrow: "Nega East Star",
      title: "Ota-onalar bizni nima uchun tanlaydi",
      items: [
        {
          title: "Kichik sinflar",
          desc: "Bir sinfda 20 nafargacha o'quvchi — har bir bolaga e'tibor qaratiladi.",
        },
        {
          title: "Kuchli o'qituvchilar",
          desc: "Xalqaro sertifikatlangan, tajribali pedagoglar.",
        },
        {
          title: "Ingliz va xitoy tillari",
          desc: "Ingliz va xitoy tillari kuchaytirilgan dasturda — native speaker o'qituvchilar va kundalik amaliyot.",
        },
        {
          title: "Xavfsiz muhit",
          desc: "Videokuzatuv, ovqatlanish nazorati va malakali xodimlar.",
        },
        {
          title: "Zamonaviy texnologiya",
          desc: "Interaktiv doskalar, kompyuter sinflari va STEM laboratoriya.",
        },
        {
          title: "Ota-onalar bilan aloqa",
          desc: "Har hafta hisobotlar va shaxsiy uchrashuvlar.",
        },
      ],
    },
    teachers: {
      eyebrow: "O'qituvchilar",
      title: "Bolangiz uchun eng yaxshilari",
      body: "Bizning o'qituvchilarimiz — O'zbekiston va xorijdagi yetakchi universitetlar bitiruvchilari. Ularning ko'pchiligi CELTA, TKT va boshqa xalqaro sertifikatlarga ega.",
    },
    facilities: {
      eyebrow: "Sharoit",
      title: "Zamonaviy va qulay maktab binosi",
      items: [
        "Yorug' va keng sinflar",
        "STEM va kompyuter laboratoriyalari",
        "Sport zali va futbol maydoni",
        "Kutubxona va o'qish zali",
        "Issiq ovqatlanish (3 mahal)",
        "Tibbiy xona va doimiy hamshira",
      ],
    },
    contact: {
      eyebrow: "Aloqa",
      title: "Bizga keling yoki qo'ng'iroq qiling",
      address: "Toshkent, Yangi Hayot tumani, Navro'z ko'chasi, 19",
      phones: ["+998 90 812 40 04", "+998 97 137 07 76"],
      email: "info@eaststar.uz",
      hours: "Dushanba–Shanba, 08:00–18:00",
    },
    form: {
      eyebrow: "Ariza",
      title: "Ariza qoldiring — biz qo'ng'iroq qilamiz",
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
      tagline: "Buyuk o'tmish — yorqin kelajak.",
      rights: "Barcha huquqlar himoyalangan.",
      followUs: "Bizni kuzatib boring",
    },
  },

  ru: {
    meta: {
      title: "East Star — частная школа в Ташкенте",
      description:
        "East Star — современная частная школа в Ташкенте. Сильные учителя, маленькие классы, английский и STEM. Оставьте заявку — мы свяжемся с вами.",
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
      title: "East Star — будущее вашего ребёнка начинается здесь",
      subtitle:
        "Маленькие классы, индивидуальный подход и образование международного уровня. Современная программа для дошкольного (0 класс) и 1–4 классов.",
      tagline: "Великое прошлое — Яркое будущее",
      ctaPrimary: "Оставить заявку",
      ctaSecondary: "Узнать больше",
      stats: [
        { value: "12+", label: "Опытных учителей" },
        { value: "20", label: "Учеников в классе" },
        { value: "3", label: "Языка обучения" },
      ],
    },
    about: {
      eyebrow: "О школе",
      title: "Знания, воспитание и международное мышление",
      body: [
        "East Star — современная частная школа в Ташкенте. Мы уделяем внимание каждому ребёнку и помогаем раскрыть его таланты.",
        "Наша цель — подготовить детей не только к экзаменам, но и к жизни. Поэтому уроки строятся на критическом мышлении, командной работе и творческом подходе.",
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
          desc: "Робототехника, шахматы, футбол, рисование, музыка и театр.",
        },
      ],
    },
    whyUs: {
      eyebrow: "Почему East Star",
      title: "Почему родители выбирают нас",
      items: [
        {
          title: "Маленькие классы",
          desc: "До 20 учеников в классе — внимание каждому ребёнку.",
        },
        {
          title: "Сильные учителя",
          desc: "Опытные педагоги с международными сертификатами.",
        },
        {
          title: "Английский и китайский",
          desc: "Усиленные английский и китайский — носители языка и ежедневная практика.",
        },
        {
          title: "Безопасная среда",
          desc: "Видеонаблюдение, контроль питания и квалифицированный персонал.",
        },
        {
          title: "Современные технологии",
          desc: "Интерактивные доски, компьютерные классы и STEM-лаборатория.",
        },
        {
          title: "Связь с родителями",
          desc: "Еженедельные отчёты и личные встречи.",
        },
      ],
    },
    teachers: {
      eyebrow: "Учителя",
      title: "Лучшие для вашего ребёнка",
      body: "Наши учителя — выпускники ведущих университетов Узбекистана и зарубежья. Многие из них имеют CELTA, TKT и другие международные сертификаты.",
    },
    facilities: {
      eyebrow: "Условия",
      title: "Современное и комфортное здание школы",
      items: [
        "Светлые и просторные классы",
        "STEM и компьютерные лаборатории",
        "Спортивный зал и футбольное поле",
        "Библиотека и читальный зал",
        "Горячее питание (3 раза в день)",
        "Медицинский кабинет и постоянная медсестра",
      ],
    },
    contact: {
      eyebrow: "Контакты",
      title: "Приходите или позвоните нам",
      address: "г. Ташкент, Янгихаётский район, ул. Навруз, 19",
      phones: ["+998 90 812 40 04", "+998 97 137 07 76"],
      email: "info@eaststar.uz",
      hours: "Пн–Сб, 08:00–18:00",
    },
    form: {
      eyebrow: "Заявка",
      title: "Оставьте заявку — мы вам перезвоним",
      subtitle:
        "Оставьте свои данные, и мы свяжемся с вами в течение 1 рабочего дня и ответим на все вопросы.",
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
      tagline: "Великое прошлое — Яркое будущее.",
      rights: "Все права защищены.",
      followUs: "Мы в соцсетях",
    },
  },

  en: {
    meta: {
      title: "East Star — Private School in Tashkent",
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
      title: "East Star — where your child's future begins",
      subtitle:
        "Small classes, individual attention, and international-standard education. Modern curriculum for preschool (grade 0) and grades 1–4.",
      tagline: "Great heritage — bright future",
      ctaPrimary: "Apply now",
      ctaSecondary: "Learn more",
      stats: [
        { value: "12+", label: "Experienced teachers" },
        { value: "20", label: "Students per class" },
        { value: "3", label: "Languages of study" },
      ],
    },
    about: {
      eyebrow: "About the school",
      title: "Knowledge, character, and global thinking",
      body: [
        "East Star is a modern private school in Tashkent. We give every child personal attention and help them discover their talents.",
        "Our goal is to prepare students not just for exams, but for life. That's why our lessons are built around critical thinking, teamwork, and creativity.",
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
          desc: "Robotics, chess, football, art, music, and drama.",
        },
      ],
    },
    whyUs: {
      eyebrow: "Why East Star",
      title: "Why parents choose us",
      items: [
        {
          title: "Small classes",
          desc: "Up to 20 students per class — every child gets attention.",
        },
        {
          title: "Strong teachers",
          desc: "Experienced educators with international certifications.",
        },
        {
          title: "English & Chinese",
          desc: "Strong English and Chinese programs — native-speaker teachers and daily practice.",
        },
        {
          title: "Safe environment",
          desc: "CCTV, supervised meals, and qualified staff.",
        },
        {
          title: "Modern technology",
          desc: "Interactive boards, computer labs, and a STEM lab.",
        },
        {
          title: "Parent communication",
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
        "STEM and computer labs",
        "Gym and football field",
        "Library and reading room",
        "Hot meals (3 times a day)",
        "Medical room with on-site nurse",
      ],
    },
    contact: {
      eyebrow: "Contact",
      title: "Visit us or give us a call",
      address: "Tashkent, Yangi Hayot district, Navruz street, 19",
      phones: ["+998 90 812 40 04", "+998 97 137 07 76"],
      email: "info@eaststar.uz",
      hours: "Mon–Sat, 08:00–18:00",
    },
    form: {
      eyebrow: "Application",
      title: "Leave a request — we'll call you back",
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
      tagline: "Great heritage — bright future.",
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
