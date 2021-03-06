export enum BackgroundUrlType {
  BMW_M2_CS,
  BUGATTI_CHIRON_PUR_SPORT,
  BUGATTI_CHIRON_SPORT,
  FORD_F150_LIGHTNING,
  LAMBORGHINI_SIAN_ROADSTER,
  MCLAREN_765LT,
  PORSCHE_911_GT2_RS,
  TESLA_CYBERTRUCK,
  TESLA_ROADSTER,
}

export interface StartPageCar {
  type: BackgroundUrlType
  name: string
}

export const carNamesForSelect: StartPageCar[] = [
  {
    type: BackgroundUrlType.BMW_M2_CS,
    name: 'BMW M2 CS',
  },
  {
    type: BackgroundUrlType.BUGATTI_CHIRON_PUR_SPORT,
    name: 'Bugatti Chiron Pur Sport',
  },
  {
    type: BackgroundUrlType.BUGATTI_CHIRON_SPORT,
    name: 'Bugatti Chiron Sport',
  },
  {
    type: BackgroundUrlType.FORD_F150_LIGHTNING,
    name: 'Ford F150 Lightning',
  },
  {
    type: BackgroundUrlType.LAMBORGHINI_SIAN_ROADSTER,
    name: 'Lamborghini Sian Roadster',
  },
  {
    type: BackgroundUrlType.MCLAREN_765LT,
    name: 'McLaren 765LT',
  },
  {
    type: BackgroundUrlType.PORSCHE_911_GT2_RS,
    name: 'Porsche 911 GT2 RS',
  },
  {
    type: BackgroundUrlType.TESLA_CYBERTRUCK,
    name: 'Tesla Cybertruck',
  },
  {
    type: BackgroundUrlType.TESLA_ROADSTER,
    name: 'Tesla Roadster',
  },
]

export const getRandomType = (): BackgroundUrlType => {
  const types = Object.keys(BackgroundUrlType)
    .map((key: string) => BackgroundUrlType[key as unknown as number])
    .filter((value: number | string) => typeof value === 'string')
  const index = Math.floor(Math.random() * types.length)
  return index as BackgroundUrlType
}

export const backgroundUrls = {
  [BackgroundUrlType.BMW_M2_CS]: [
    'https://www.wsupercars.com/wallpapers-regular/BMW/2020-BMW-M2-CS-001-2160.jpg',
    'https://www.wsupercars.com/wallpapers-regular/BMW/2020-BMW-M2-CS-002-2160.jpg',
    'https://www.wsupercars.com/wallpapers-regular/BMW/2020-BMW-M2-CS-003-2160.jpg',
    'https://www.wsupercars.com/wallpapers-regular/BMW/2020-BMW-M2-CS-004-2160.jpg',
    'https://www.wsupercars.com/wallpapers-regular/BMW/2020-BMW-M2-CS-005-2160.jpg',
    'https://www.wsupercars.com/wallpapers-regular/BMW/2020-BMW-M2-CS-006-2160.jpg',
  ],
  [BackgroundUrlType.BUGATTI_CHIRON_PUR_SPORT]: [
    'https://www.wsupercars.com/wallpapers-regular/Bugatti/2021-Bugatti-Chiron-Pur-Sport-001-2160.jpg',
    'https://www.wsupercars.com/wallpapers-regular/Bugatti/2021-Bugatti-Chiron-Pur-Sport-002-2160.jpg',
    'https://www.wsupercars.com/wallpapers-regular/Bugatti/2021-Bugatti-Chiron-Pur-Sport-003-2160.jpg',
    'https://www.wsupercars.com/wallpapers-regular/Bugatti/2021-Bugatti-Chiron-Pur-Sport-004-2160.jpg',
    'https://www.wsupercars.com/wallpapers-regular/Bugatti/2021-Bugatti-Chiron-Pur-Sport-005-2160.jpg',
    'https://www.wsupercars.com/wallpapers-regular/Bugatti/2021-Bugatti-Chiron-Pur-Sport-006-2160.jpg',
    'https://www.wsupercars.com/wallpapers-regular/Bugatti/2021-Bugatti-Chiron-Pur-Sport-007-2160.jpg',
    'https://www.wsupercars.com/wallpapers-regular/Bugatti/2021-Bugatti-Chiron-Pur-Sport-008-2160.jpg',
    'https://www.wsupercars.com/wallpapers-regular/Bugatti/2021-Bugatti-Chiron-Pur-Sport-009-2160.jpg',
  ],
  [BackgroundUrlType.BUGATTI_CHIRON_SPORT]: [
    'https://www.wsupercars.com/wallpapers-regular/Bugatti/2019-Bugatti-Chiron-Sport-001-2000.jpg',
    'https://www.wsupercars.com/wallpapers-regular/Bugatti/2019-Bugatti-Chiron-Sport-002-2000.jpg',
    'https://www.wsupercars.com/wallpapers-regular/Bugatti/2019-Bugatti-Chiron-Sport-003-2000.jpg',
    'https://www.wsupercars.com/wallpapers-regular/Bugatti/2019-Bugatti-Chiron-Sport-004-2000.jpg',
    'https://www.wsupercars.com/wallpapers-regular/Bugatti/2019-Bugatti-Chiron-Sport-005-2000.jpg',
  ],
  [BackgroundUrlType.FORD_F150_LIGHTNING]: [
    'https://www.wsupercars.com/wallpapers-regular/Ford/2022-Ford-F-150-Lightning-002-2160.jpg',
    'https://www.wsupercars.com/wallpapers-regular/Ford/2022-Ford-F-150-Lightning-003-2160.jpg',
    'https://www.wsupercars.com/wallpapers-regular/Ford/2022-Ford-F-150-Lightning-005-2160.jpg',
    'https://www.wsupercars.com/wallpapers-regular/Ford/2022-Ford-F-150-Lightning-006-2160.jpg',
    'https://www.wsupercars.com/wallpapers-regular/Ford/2022-Ford-F-150-Lightning-008-2160.jpg',
  ],
  [BackgroundUrlType.LAMBORGHINI_SIAN_ROADSTER]: [
    'https://www.wsupercars.com/wallpapers-regular/Lamborghini/2021-Lamborghini-Sian-Roadster-001-2160.jpg',
    'https://www.wsupercars.com/wallpapers-regular/Lamborghini/2021-Lamborghini-Sian-Roadster-002-2160.jpg',
    'https://www.wsupercars.com/wallpapers-regular/Lamborghini/2021-Lamborghini-Sian-Roadster-003-2160.jpg',
    'https://www.wsupercars.com/wallpapers-regular/Lamborghini/2021-Lamborghini-Sian-Roadster-004-2160.jpg',
    'https://www.wsupercars.com/wallpapers-regular/Lamborghini/2021-Lamborghini-Sian-Roadster-005-2160.jpg',
    'https://www.wsupercars.com/wallpapers-regular/Lamborghini/2021-Lamborghini-Sian-Roadster-006-2160.jpg',
    'https://www.wsupercars.com/wallpapers-regular/Lamborghini/2021-Lamborghini-Sian-Roadster-007-2160.jpg',
    'https://www.wsupercars.com/wallpapers-regular/Lamborghini/2021-Lamborghini-Sian-Roadster-008-2160.jpg',
    'https://www.wsupercars.com/wallpapers-regular/Lamborghini/2021-Lamborghini-Sian-Roadster-009-2160.jpg',
    'https://www.wsupercars.com/wallpapers-regular/Lamborghini/2021-Lamborghini-Sian-Roadster-010-2160.jpg',
    'https://www.wsupercars.com/wallpapers-regular/Lamborghini/2021-Lamborghini-Sian-Roadster-011-2160.jpg',
    'https://www.wsupercars.com/wallpapers-regular/Lamborghini/2021-Lamborghini-Sian-Roadster-012-2160.jpg',
  ],
  [BackgroundUrlType.MCLAREN_765LT]: [
    'https://www.wsupercars.com/wallpapers-regular/McLaren/2021-McLaren-765LT-001-2160.jpg',
    'https://www.wsupercars.com/wallpapers-regular/McLaren/2021-McLaren-765LT-002-2160.jpg',
    'https://www.wsupercars.com/wallpapers-regular/McLaren/2021-McLaren-765LT-003-2160.jpg',
    'https://www.wsupercars.com/wallpapers-regular/McLaren/2021-McLaren-765LT-004-2160.jpg',
    'https://www.wsupercars.com/wallpapers-regular/McLaren/2021-McLaren-765LT-005-2160.jpg',
    'https://www.wsupercars.com/wallpapers-regular/McLaren/2021-McLaren-765LT-006-2160.jpg',
    'https://www.wsupercars.com/wallpapers-regular/McLaren/2021-McLaren-765LT-007-1600.jpg', // 2160 doesn't load
    'https://www.wsupercars.com/wallpapers-regular/McLaren/2021-McLaren-765LT-008-2160.jpg',
    'https://www.wsupercars.com/wallpapers-regular/McLaren/2021-McLaren-765LT-009-2160.jpg',
  ],
  [BackgroundUrlType.PORSCHE_911_GT2_RS]: [
    'https://www.wsupercars.com/wallpapers-regular/Porsche/2018-Porsche-911-GT2-RS-001-2000.jpg',
    'https://www.wsupercars.com/wallpapers-regular/Porsche/2018-Porsche-911-GT2-RS-002-2000.jpg',
    'https://www.wsupercars.com/wallpapers-regular/Porsche/2018-Porsche-911-GT2-RS-003-2000.jpg',
    'https://www.wsupercars.com/wallpapers-regular/Porsche/2018-Porsche-911-GT2-RS-004-2000.jpg',
    'https://www.wsupercars.com/wallpapers-regular/Porsche/2018-Porsche-911-GT2-RS-005-2000.jpg',
    'https://www.wsupercars.com/wallpapers-regular/Porsche/2018-Porsche-911-GT2-RS-006-2000.jpg',
    'https://www.wsupercars.com/wallpapers-regular/Porsche/2018-Porsche-911-GT2-RS-007-2000.jpg',
    'https://www.wsupercars.com/wallpapers-regular/Porsche/2018-Porsche-911-GT2-RS-008-2000.jpg',
    'https://www.wsupercars.com/wallpapers-regular/Porsche/2018-Porsche-911-GT2-RS-009-2000.jpg',
    'https://www.wsupercars.com/wallpapers-regular/Porsche/2018-Porsche-911-GT2-RS-010-2000.jpg',
    'https://www.wsupercars.com/wallpapers-regular/Porsche/2018-Porsche-911-GT2-RS-011-2000.jpg',
    'https://www.wsupercars.com/wallpapers-regular/Porsche/2018-Porsche-911-GT2-RS-012-2000.jpg',
    'https://www.wsupercars.com/wallpapers-regular/Porsche/2018-Porsche-911-GT2-RS-013-2000.jpg',
    'https://www.wsupercars.com/wallpapers-regular/Porsche/2018-Porsche-911-GT2-RS-014-2000.jpg',
    'https://www.wsupercars.com/wallpapers-regular/Porsche/2018-Porsche-911-GT2-RS-015-2000.jpg',
  ],
  [BackgroundUrlType.TESLA_CYBERTRUCK]: [
    'https://www.wsupercars.com/wallpapers-regular/Tesla/2022-Tesla-Cybertruck-001-2160.jpg',
    'https://www.wsupercars.com/wallpapers-regular/Tesla/2022-Tesla-Cybertruck-002-2160.jpg',
    'https://www.wsupercars.com/wallpapers-regular/Tesla/2022-Tesla-Cybertruck-003-2160.jpg',
    'https://www.wsupercars.com/wallpapers-regular/Tesla/2022-Tesla-Cybertruck-004-2160.jpg',
    'https://www.wsupercars.com/wallpapers-regular/Tesla/2022-Tesla-Cybertruck-005-2160.jpg',
    'https://www.wsupercars.com/wallpapers-regular/Tesla/2022-Tesla-Cybertruck-006-2160.jpg',
    'https://www.wsupercars.com/wallpapers-regular/Tesla/2022-Tesla-Cybertruck-008-2160.jpg',
  ],
  [BackgroundUrlType.TESLA_ROADSTER]: [
    'https://www.wsupercars.com/wallpapers-regular/Tesla/2020-Tesla-Roadster-001-2000.jpg',
    'https://www.wsupercars.com/wallpapers-regular/Tesla/2020-Tesla-Roadster-001-2000.jpg',
    'https://www.wsupercars.com/wallpapers-regular/Tesla/2020-Tesla-Roadster-002-2000.jpg',
    'https://www.wsupercars.com/wallpapers-regular/Tesla/2020-Tesla-Roadster-003-2000.jpg',
    'https://www.wsupercars.com/wallpapers-regular/Tesla/2020-Tesla-Roadster-004-2000.jpg',
    'https://www.wsupercars.com/wallpapers-regular/Tesla/2020-Tesla-Roadster-005-2000.jpg',
    'https://www.wsupercars.com/wallpapers-regular/Tesla/2020-Tesla-Roadster-006-2000.jpg',
    'https://www.wsupercars.com/wallpapers-regular/Tesla/2020-Tesla-Roadster-007-2000.jpg',
    'https://www.wsupercars.com/wallpapers-regular/Tesla/2020-Tesla-Roadster-008-2000.jpg',
    'https://www.wsupercars.com/wallpapers-regular/Tesla/2020-Tesla-Roadster-010-2000.jpg',
  ],
}
