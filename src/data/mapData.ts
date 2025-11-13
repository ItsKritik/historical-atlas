export const timePeriods = [
  { year: 862, label: "Начало Руси", description: "Объединение славянских племен", latitude: 50.4501, longitude: 30.5234 },
  { year: 988, label: "Крещение Руси", description: "Принятие христианства князем Владимиром", latitude: 50.4501, longitude: 30.5234 },
  { year: 1240, label: "Монгольское нашествие", description: "Захват Киева монголами", latitude: 50.4501, longitude: 30.5234 },
  { year: 1480, label: "Стояние на Угре", description: "Освобождение от ордынского ига", latitude: 55.0000, longitude: 38.0000 },
  { year: 1703, label: "Основание Петербурга", description: "Начало эпохи Петра I", latitude: 59.9343, longitude: 30.3351 },
  { year: 1812, label: "Отечественная война", description: "Война с Наполеоном", latitude: 55.7558, longitude: 37.6173 },
  { year: 1917, label: "Революция", description: "Падение монархии", latitude: 55.7558, longitude: 37.6173 },
  { year: 1941, label: "Великая Отечественная", description: "Война с нацистской Германией", latitude: 55.7558, longitude: 37.6173 },
  { year: 1991, label: "Новейшее время", description: "Распад СССР", latitude: 55.7558, longitude: 37.6173 },
];

export const campaignPaths = [
  {
    id: 'napoleonic_campaign',
    year: 1812,
    name: 'Отечественная война 1812 года',
    path: [ [55.75, 37.62], [53.90, 27.56], [52.42, 31.03], [51.51, 31.29], [50.45, 30.52], [55.75, 37.62], ],
    color: '#E53E',
  },
  {
    id: 'mongol_invasion',
    year: 1240,
    name: 'Монгольское нашествие',
    path: [ [50.45, 30.52], [48.47, 35.04], [47.84, 35.14], [47.4, 33.42], [44.95, 34.11], ],
    color: '#8B000',
  },
  {
    id: 'peter_campaign',
    year: 1709,
    name: 'Походы Петра I',
    path: [ [59.93, 30.31], [54.84, 37.62], [55.75, 37.62], [51.67, 39.21], [47.23, 39.71], [45.04, 38.98], ],
    color: '#D69E2E',
  },
];

export const tradeRoutes = [
  {
    id: 'route_from_varangians',
    year: 862,
    name: 'Путь из варяг в греки',
    path: [ [59.93, 30.31], [58.59, 31.31], [56.14, 38.19], [55.88, 43.11], [55.75, 37.62], [50.45, 30.52], [46.47, 30.71], ],
    color: '#38A169',
  },
  {
    id: 'silk_route',
    year: 1300,
    name: 'Шелковый путь (русская часть)',
    path: [ [55.45, 78.33], [54.98, 82.92], [51.23, 85.18], [43.59, 42.93], [41.69, 44.83], ],
    color: '#D69E2E',
  },
  {
    id: 'white_sea_route',
    year: 1100,
    name: 'Беломорский путь',
    path: [ [64.56, 39.83], [62.01, 32.56], [59.93, 30.31], ],
    color: '#4299E1',
  },
];

export const educationalRoutes = [
  {
    id: 'rus_baptism',
    title: 'Становление Русского государства',
    description: 'Путь от объединения славянских племен до крещения Руси',
    events: [
      { title: 'Объединение под Киевом', latitude: 50.4501, longitude: 30.5234 },
      { title: 'Крещение Руси', latitude: 50.4501, longitude: 30.5234 },
      { title: 'Первые летописи', latitude: 50.4501, longitude: 30.5234 }
    ],
    duration: 'IX-X век'
  },
  {
    id: 'mongol_invasion',
    title: 'Монгольское нашествие',
    description: 'Завоевание Руси и период ордынского ига',
    events: [
      { title: 'Батыево нашествие', latitude: 50.4501, longitude: 30.5234 },
      { title: 'Падение Киева', latitude: 50.4501, longitude: 30.5234 },
      { title: 'Стояние на Угре', latitude: 55.0000, longitude: 38.0000 }
    ],
    duration: 'XIII-XV век'
  },
  {
    id: 'peter_reforms',
    title: 'Эпоха Петра I',
    description: 'Преобразования Петра Великого и становление империи',
    events: [
      { title: 'Северная война', latitude: 59.9343, longitude: 30.3351 },
      { title: 'Основание Петербурга', latitude: 59.9343, longitude: 30.3351 },
      { title: 'Табель о рангах', latitude: 55.7558, longitude: 37.6173 }
    ],
    duration: 'Конец XVII - начало XVIII века'
  },
  {
    id: 'ww1',
    title: 'Первая мировая война',
    description: 'Россия в Первой мировой войне',
    events: [
      { title: 'Восточный фронт', latitude: 50.0000, longitude: 30.0000 },
      { title: 'Брусиловский прорыв', latitude: 50.0000, longitude: 30.0000 },
      { title: 'Февральская революция', latitude: 59.9343, longitude: 30.3351 }
    ],
    duration: '1914-1917 гг.'
  },
  {
    id: 'revolution',
    title: 'Революции начала XX века',
    description: 'События 1905 и 1917 годов, приведшие к падению монархии',
    events: [
      { title: 'Революция 1905', latitude: 55.7558, longitude: 37.6173 },
      { title: 'Февральская революция', latitude: 59.9343, longitude: 30.3351 },
      { title: 'Октябрьская революция', latitude: 55.7558, longitude: 37.6173 }
    ],
    duration: '1905-1917 гг.'
  },
  {
    id: 'war_of_1812',
    title: 'Отечественная война 1812 года',
    description: 'Сражения и события Отечественной войны 1812 года',
    events: [
      { title: 'Сражение при Смоленске', latitude: 54.7833, longitude: 32.0500 },
      { title: 'Бородинское сражение', latitude: 55.2908, longitude: 36.5731 },
      { title: 'Тарутинский маневр', latitude: 55.1000, longitude: 36.8000 }
    ],
    duration: '1812 г.'
  }
];

export const cities = [
  { id: 1, name: "Киев", founded: "482", description: "Древняя столица Руси, один из старейших городов Восточной Европы.", latitude: 50.4501, longitude: 30.5234 },
  { id: 2, name: "Новгород", founded: "859", description: "Важный торговый и политический центр средневековой Руси.", latitude: 58.521, longitude: 31.275 },
  { id: 3, name: "Москва", founded: "1147", description: "Столица России, один из крупнейших городов мира.", latitude: 55.7558, longitude: 37.6173 },
  { id: 4, name: "Санкт-Петербург", founded: "1703", description: "Культурная столица России, основанная Петром I.", latitude: 59.9343, longitude: 30.3351 },
];