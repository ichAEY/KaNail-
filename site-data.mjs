// Ka Nail customer data for the exact TANEM template pinned from ichAEY/claytone-current.
// Individual data only. Template code, layout and animations are loaded from the reference commit during Pages build.

const bookingUrl = "https://dikidi.net/497647";
const mapUrl = "https://yandex.ru/maps/org/ka_nail/173380608081/?ll=37.473123%2C55.655254&z=17";
const reviewsUrl = "https://yandex.ru/maps/org/ka_nail/173380608081/reviews/?ll=37.473123%2C55.655254&z=17";

const gallery = Array.from({ length: 13 }, (_, index) => {
  const number = String(index + 1).padStart(2, "0");
  return {
    src: `/KaNail-/assets/work-${number}.png`,
    alt: `Работа Карины, Ka Nail — ${index + 1}`,
  };
});

export default {
  brand: {
    name: "Ka Nail",
    subtitle: "Nail studio",
    monogram: "K",
  },

  master: {
    name: "Карина",
    dative: "Карине",
    genitive: "Карины",
    monogram: "K",
    profession: "мастер ногтевого сервиса",
    heroTitle: "Карина — мастер ногтевого сервиса",
    heroCopy: "Маникюр и педикюр с аккуратной обработкой и вниманием к деталям.",
    experienceYears: "10+",
    experienceAria: "Более десяти лет опыта",
    aboutTitle: "Карина — мастер Ka Nail",
    aboutLead: "Я Карина — мастер маникюра и педикюра. В профессии более 10 лет.",
    aboutParagraphs: [
      "Я работаю с маникюром, педикюром, укреплением, наращиванием и френчем. Для меня важны аккуратная форма, чистая обработка и результат, который удобно носить каждый день.",
      "Клиенты часто отмечают в отзывах скорость работы, качество, внимание к деталям и чистоту рабочего места.",
    ],
    skills: [
      "Маникюр и педикюр",
      "Укрепление и наращивание",
      "Мужской маникюр и педикюр",
    ],
  },

  location: {
    city: "Москва",
    metro: "м. Тропарёво",
    cityMetro: "Москва · м. Тропарёво",
    address: "Москва, проспект Вернадского, 92",
    mapCardAddress: "проспект Вернадского, 92",
    schedule: "по предварительной записи",
    scheduleCapitalized: "По предварительной записи",
    latitude: 55.655254,
    longitude: 37.473123,
  },

  contacts: {
    phoneDisplay: "+7 960 188-68-06",
    phoneHref: "tel:+79601886806",
    personalTelegramUrl: "",
    channelTelegramUrl: "",
  },

  links: {
    bookingUrl,
    bookingWidgetScriptUrl: "/KaNail-/noop.js",
    reviewsUrl,
    mapUrl,
    routeUrl: "https://yandex.ru/maps/?mode=routes&rtext=~55.655254%2C37.473123&rtt=auto",
    mobileMapEmbedUrl: "https://yandex.ru/map-widget/v1/?ll=37.473123%2C55.655254&mode=search&oid=173380608081&ol=biz&z=16",
    desktopMapEmbedUrl: "https://yandex.ru/map-widget/v1/?ll=37.473123%2C55.655254&z=16&l=map&pt=37.473123%2C55.655254%2Cpm2rdm",
    yandexMapHrefMatch: "yandex.ru/maps/org/ka_nail",
  },

  reputation: {
    rating: "5,0",
    reviewCount: "54",
  },

  images: {
    portrait: "/KaNail-/assets/karina.png",
    about: "/KaNail-/assets/karina.png",
    favicon: "/KaNail-/favicon.svg",
    beforeAfter: gallery.slice(0, 2),
    gallery,
  },

  services: {
    manicure: [
      { name: "Маникюр женский", price: "1 800 ₽", time: "1 ч", description: "Маникюр женский.", url: bookingUrl },
      { name: "Маникюр мужской", price: "2 200 ₽", time: "1 ч", description: "Маникюр мужской.", url: bookingUrl },
      { name: "Маникюр с покрытием гель лака в один тон", price: "3 200 ₽", time: "1 ч 30 мин", description: "Снятие + маникюр + гель лак.", url: bookingUrl },
      { name: "Маникюр с выравниванием и гель лак", price: "3 500 ₽", time: "1 ч 30 мин", description: "Маникюр всё включено.", url: bookingUrl },
      { name: "Маникюр френч все включено", price: "4 000 ₽", time: "2 ч", description: "Маникюр всё включено френч.", url: bookingUrl },
      { name: "Укрепление ногтей гелем и покрытие в один тон", price: "4 000 ₽", time: "2 ч", description: "Маникюр всё включено.", url: bookingUrl },
      { name: "Коррекция длинных ногтей гель", price: "4 500 ₽", time: "2 ч", description: "Коррекция длинных ногтей гелем.", url: bookingUrl },
      { name: "Наращивание ногтей", price: "6 000 ₽", time: "2 ч 30 мин", description: "Наращивание ногтей.", url: bookingUrl },
      { name: "Ремонт 1 ногтя", price: "200 ₽", time: "10 мин", description: "Дополнительная услуга.", url: bookingUrl },
      { name: "Снятие гель лака", price: "500 ₽", time: "30 мин", description: "Дополнительная услуга.", url: bookingUrl },
      { name: "Лечение IBX", price: "500 ₽", time: "30 мин", description: "Дополнительная услуга.", url: bookingUrl },
      { name: "Френч", price: "500 ₽", time: "30 мин", description: "Дополнительная услуга.", url: bookingUrl },
      { name: "Втирка", price: "500 ₽", time: "15 мин", description: "Дополнительная услуга.", url: bookingUrl },
    ],
    pedicure: [
      { name: "Педикюр женский", price: "3 500 ₽", time: "1 ч", description: "Педикюр женский.", url: bookingUrl },
      { name: "Педикюр мужской", price: "3 700 ₽", time: "1 ч", description: "Педикюр мужской.", url: bookingUrl },
      { name: "Педикюр пальчики с покрытием гель лака в один тон", price: "3 500 ₽", time: "1 ч 30 мин", description: "Педикюр пальчики.", url: bookingUrl },
      { name: "Педикюр с покрытием гель лак", price: "4 000 ₽", time: "1 ч 30 мин", description: "Женский педикюр всё включено.", url: bookingUrl },
    ],
  },

  reviews: [
    { text: "Её скорость и качество поражают. Всегда отличный результат, красота и никаких отслоек и сломанных ногтей!", author: "Наталья Р." },
    { text: "Очень хороший мастер, приятный в общении! Делает всё быстро и качественно!", author: "Наталья А." },
    { text: "Шикарный мастер! Хожу к Карине уже много лет - всегда всё идеально. И маникюр, и педикюр на высшем уровне!", author: "Зара Назарян" },
  ],

  promotions: [],

  amenities: [
    { title: "Онлайн-запись", text: "Удобное время можно выбрать заранее в Dikidi" },
    { title: "Парковка", text: "Есть парковка для посетителей" },
    { title: "Оплата", text: "Наличные, перевод или СБП" },
  ],

  seo: {
    title: "Карина | Ka Nail — маникюр и педикюр в Москве",
    description: "Ka Nail — маникюр и педикюр у мастера Карины в Москве. Услуги, цены, реальные работы, отзывы и онлайн-запись.",
    keywords: [
      "Ka Nail",
      "Карина маникюр",
      "маникюр Тропарёво",
      "педикюр Тропарёво",
      "маникюр проспект Вернадского",
    ],
    locale: "ru_RU",
  },

  analytics: {
    yandexMetrikaId: "0",
  },
};
