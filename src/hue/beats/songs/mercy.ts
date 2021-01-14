import { UIColor } from '../../hue-color-conversion'
import { BeatStep, BeatTypes } from '../beat-types'
import { Song } from '../song'
import { flashLights } from './utils/basic-routines'
import { allLightsOff, allLightsState, createNote, lightOff, lightState } from './utils/utils'

const RED = new UIColor(255, 0, 0)
const ORANGE = new UIColor(255, 120, 0)
const YELLOW = new UIColor(255, 255, 0)
const GREEN = new UIColor(0, 255, 0)
const BLUE = new UIColor(0, 0, 255)
const PURPLE = new UIColor(255, 0, 255)
const WHITE = new UIColor(255, 255, 255)
const BLACK = new UIColor(0, 0, 0)

const chorusPart1And2 = (): BeatStep[] => [
  createNote(0, allLightsOff()),
  ...flashLights(WHITE, BeatTypes.ONE_BEAT * 2, BeatTypes.ONE_BEAT * 3),
]

const chorusPart3 = (): BeatStep[] => [
  createNote(0,
    allLightsState(RED, 100 * (1 / 6))),
  createNote(BeatTypes.HALF_BEAT,
    allLightsState(RED, 100 * (2 / 6))),
  createNote(BeatTypes.ONE_BEAT,
    allLightsState(YELLOW, 100 * (3 / 6))),
  createNote(BeatTypes.ONE_BEAT + BeatTypes.HALF_BEAT,
    allLightsState(YELLOW, 100 * (4 / 6))),
  createNote(BeatTypes.ONE_BEAT * 2,
    allLightsState(GREEN, 100 * (5 / 6))),
  createNote(BeatTypes.ONE_BEAT * 2 + BeatTypes.HALF_BEAT,
    allLightsState(GREEN, 100 * (6 / 6))),
  createNote(BeatTypes.ONE_BEAT * 3,
    allLightsState(RED, 100 * (6 / 6))),
  createNote(BeatTypes.ONE_BEAT * 3 + BeatTypes.HALF_BEAT,
    allLightsState(RED, 100 * (5 / 6))),
]

const chorusPart4 = (): BeatStep[] => [
  createNote(0,
    allLightsState(YELLOW, 100 * (4 / 6))),
  createNote(BeatTypes.HALF_BEAT,
    allLightsState(YELLOW, 100 * (3 / 6))),
  createNote(BeatTypes.ONE_BEAT,
    allLightsState(GREEN, 100 * (2 / 6))),
  createNote(BeatTypes.ONE_BEAT + BeatTypes.HALF_BEAT,
    allLightsState(GREEN, 100 * (1 / 6))),
  createNote(BeatTypes.ONE_BEAT * 2,
    allLightsState(WHITE)),
  createNote(BeatTypes.ONE_BEAT * 2 + BeatTypes.HALF_BEAT,
    allLightsOff()),
  createNote(BeatTypes.ONE_BEAT * 3,
    allLightsState(WHITE)),
  createNote(BeatTypes.ONE_BEAT * 3 + BeatTypes.HALF_BEAT,
    allLightsOff()),
]

const chorusPart4Alt = (): BeatStep[] => [
  createNote(0,
    allLightsState(YELLOW, 100 * (4 / 6))),
  createNote(BeatTypes.HALF_BEAT,
    allLightsState(YELLOW, 100 * (3 / 6))),
  createNote(BeatTypes.ONE_BEAT,
    allLightsState(GREEN, 100 * (2 / 6))),
  createNote(BeatTypes.ONE_BEAT + BeatTypes.HALF_BEAT,
    allLightsState(GREEN, 100 * (1 / 6))),
  createNote(BeatTypes.ONE_BEAT * 2,
    allLightsState(RED)),
  createNote(BeatTypes.ONE_BEAT * 2 + BeatTypes.HALF_BEAT,
    allLightsState(YELLOW)),
  createNote(BeatTypes.ONE_BEAT * 3,
    allLightsState(GREEN)),
  createNote(BeatTypes.ONE_BEAT * 3 + BeatTypes.HALF_BEAT,
    allLightsOff()),
]

const ohOhOhOhOhOkay = (): BeatStep[] => [
  createNote(0, [
    lightState(WHITE),
    lightOff(),
  ]),
  createNote(BeatTypes.HALF_BEAT, [
    lightOff(),
    lightState(WHITE),
  ]),
  createNote(BeatTypes.ONE_BEAT, [
    lightState(WHITE),
    lightOff(),
  ]),
  createNote(BeatTypes.ONE_BEAT + BeatTypes.HALF_BEAT, [
    lightOff(),
    lightState(WHITE),
  ]),
  createNote(BeatTypes.ONE_BEAT * 2, [
    lightState(WHITE),
    lightOff(),
  ]),
  createNote(BeatTypes.ONE_BEAT * 2 + BeatTypes.HALF_BEAT, [
    lightOff(),
    lightState(WHITE),
  ]),
  createNote(BeatTypes.ONE_BEAT * 3,
    allLightsState(WHITE)),
  // createNote(BeatTypes.ONE_BEAT * 3 + BeatTypes.HALF_BEAT,
  //   allLightsOff()),
]

const mercy = new Song('Mercy', 'Kanye West', 140, 4, 2500)
  // weepin and a moanin...
  .measure(0, [
    createNote(0, [
      lightState(RED, 50),
      lightOff(),
    ]),
    createNote(BeatTypes.ONE_BEAT, [
      lightState(RED, 50),
      lightState(YELLOW, 50),
    ]),
    createNote(BeatTypes.ONE_BEAT * 2, [
      lightState(GREEN, 50),
      lightState(YELLOW, 50),
    ]),
    createNote(BeatTypes.ONE_BEAT * 3, [
      lightState(GREEN, 50),
      lightState(RED, 50),
    ]),
  ])
  .measure(1, [
    createNote(0, [
      lightState(YELLOW, 50),
      lightState(RED, 50),
    ]),
    createNote(BeatTypes.ONE_BEAT, [
      lightState(YELLOW, 50),
      lightState(GREEN, 50),
    ]),
    createNote(BeatTypes.ONE_BEAT * 2, [
      lightState(RED, 50),
      lightState(GREEN, 50),
    ]),
    createNote(BeatTypes.ONE_BEAT * 3, [
      lightState(RED, 50),
      lightState(YELLOW, 50),
    ]),
  ])
  .measure(2, [
    createNote(0, [
      lightState(GREEN, 50),
      lightState(YELLOW, 50),
    ]),
    createNote(BeatTypes.ONE_BEAT, [
      lightState(GREEN, 50),
      lightState(RED, 50),
    ]),
    createNote(BeatTypes.ONE_BEAT * 2, [
      lightState(YELLOW, 50),
      lightState(RED, 50),
    ]),
    createNote(BeatTypes.ONE_BEAT * 3, [
      lightState(YELLOW, 50),
      lightState(GREEN, 50),
    ]),
  ])
  .measure(3, [
    createNote(0, [
      lightState(RED, 50),
      lightState(GREEN, 50),
    ]),
    createNote(BeatTypes.ONE_BEAT, [
      lightState(RED, 50),
      lightState(YELLOW, 50),
    ]),
    createNote(BeatTypes.ONE_BEAT * 2, [
      lightState(GREEN, 50),
      lightState(YELLOW, 50),
    ]),
    createNote(BeatTypes.ONE_BEAT * 3, [
      lightState(GREEN, 50),
      lightState(RED, 50),
    ]),
  ])
  .measure(4, [
    createNote(0, [
      lightState(YELLOW, 50),
      lightState(RED, 50),
    ]),
    createNote(BeatTypes.ONE_BEAT * 2, [
      lightState(YELLOW, 50),
      lightState(GREEN, 50),
    ]),
  ])
  .measure(5, [
    createNote(BeatTypes.ONE_BEAT, [
      lightState(RED, 50),
      lightState(GREEN, 50),
    ]),
    createNote(BeatTypes.ONE_BEAT * 2, [
      lightState(RED, 50),
      lightState(YELLOW, 50),
    ]),
    createNote(BeatTypes.ONE_BEAT * 2 + BeatTypes.HALF_BEAT, [
      lightState(GREEN, 50),
      lightState(YELLOW, 50),
    ]),
  ])
  .measure(6, [
    createNote(0, [
      lightState(GREEN, 50),
      lightState(RED, 50),
    ]),
    createNote(BeatTypes.ONE_BEAT * 2, [
      lightState(YELLOW, 50),
      lightState(RED, 50),
    ]),
  ])

  // oh oh oh oh oh okay
  .measure(7, ohOhOhOhOhOkay())

  // Lamborghini mercy
  .measure(8, chorusPart1And2())

  // yo chick she's so thirsty, I'm
  .measure(9, chorusPart1And2())

  // in that 2 seat lambo with your
  .measure(10, chorusPart3())

  // girl she's tryna jerk me
  .measure(11, chorusPart4())

  // Lamborghini mercy
  .measure(12, chorusPart1And2())

  // yo chick she's so thirsty, I'm
  .measure(13, chorusPart1And2())

  // in that 2 seat lambo with your
  .measure(14, chorusPart3())

  // girl she's tryna jerk me
  .measure(15, chorusPart4())

  // Lamborghini mercy
  .measure(16, chorusPart1And2())

  // yo chick she's so thirsty, I'm
  .measure(17, chorusPart1And2())

  // in that 2 seat lambo with your
  .measure(18, chorusPart3())

  // girl she's tryna jerk me
  .measure(19, chorusPart4())

  // Lamborghini mercy
  .measure(20, chorusPart1And2())

  // yo chick she's so thirsty, I'm
  .measure(21, chorusPart1And2())

  // in that 2 seat lambo with your
  .measure(22, chorusPart3())

  // girl she's tryna jerk me
  .measure(23, chorusPart4Alt())

  // okay, drop it to the
  .measure(24, [
    createNote(0,
      allLightsOff()),
    createNote(BeatTypes.ONE_BEAT * 2,
      allLightsState(GREEN)),
    createNote(BeatTypes.ONE_BEAT * 2 + BeatTypes.HALF_BEAT,
      allLightsState(BLUE)),
    createNote(BeatTypes.ONE_BEAT * 3,
      allLightsState(PURPLE)),
    createNote(BeatTypes.ONE_BEAT * 3 + BeatTypes.HALF_BEAT,
      allLightsState(GREEN)),
  ])

  // floor, make that ass shake
  .measure(25, [
    createNote(0,
      allLightsState(BLUE)),
    createNote(BeatTypes.ONE_BEAT,
      allLightsState(PURPLE)),
    createNote(BeatTypes.ONE_BEAT + BeatTypes.HALF_BEAT,
      allLightsState(GREEN)),
    createNote(BeatTypes.ONE_BEAT * 2,
      allLightsState(BLUE)),
    createNote(BeatTypes.ONE_BEAT * 3,
      allLightsState(PURPLE)),
  ])

  // woah! make the ground
  .measure(26, [
    createNote(0,
      allLightsOff()),
    createNote(BeatTypes.ONE_BEAT,
      allLightsState(GREEN)),
    createNote(BeatTypes.ONE_BEAT * 2,
      allLightsState(BLUE)),
    createNote(BeatTypes.ONE_BEAT * 2 + BeatTypes.HALF_BEAT,
      allLightsState(PURPLE)),
    createNote(BeatTypes.ONE_BEAT * 3,
      allLightsState(GREEN)),
  ])

  // move, that's an ass-quake
  .measure(27, [
    createNote(0,
      allLightsState(BLUE)),
    createNote(BeatTypes.ONE_BEAT,
      allLightsState(PURPLE)),
    createNote(BeatTypes.ONE_BEAT + BeatTypes.HALF_BEAT,
      allLightsState(GREEN)),
    createNote(BeatTypes.ONE_BEAT * 2,
      allLightsState(BLUE)),
    createNote(BeatTypes.ONE_BEAT * 3,
      allLightsState(PURPLE)),
  ])

  // build a house up on that
  .measure(28, [
    createNote(0,
      allLightsOff()),
    createNote(BeatTypes.ONE_BEAT,
      allLightsState(GREEN)),
    createNote(BeatTypes.ONE_BEAT + BeatTypes.HALF_BEAT,
      allLightsState(BLUE)),
    createNote(BeatTypes.ONE_BEAT * 2,
      allLightsState(PURPLE)),
    createNote(BeatTypes.ONE_BEAT * 2 + BeatTypes.HALF_BEAT,
      allLightsState(GREEN)),
    createNote(BeatTypes.ONE_BEAT * 3,
      allLightsState(BLUE)),
    createNote(BeatTypes.ONE_BEAT * 3 + BeatTypes.HALF_BEAT,
      allLightsState(PURPLE)),
  ])

  // ass, that's an ass-tate
  .measure(29, [
    createNote(0,
      allLightsState(GREEN)),
    createNote(BeatTypes.ONE_BEAT,
      allLightsState(BLUE)),
    createNote(BeatTypes.ONE_BEAT + BeatTypes.HALF_BEAT,
      allLightsState(PURPLE)),
    createNote(BeatTypes.ONE_BEAT * 2,
      allLightsState(GREEN)),
    createNote(BeatTypes.ONE_BEAT * 3,
      allLightsState(BLUE)),
  ])

  // (roll roll) roll my weed
  .measure(30, [
    createNote(0,
      allLightsOff()),
    createNote(BeatTypes.ONE_BEAT, [
      lightState(GREEN),
      lightOff(),
    ]),
    createNote(BeatTypes.ONE_BEAT + BeatTypes.HALF_BEAT, [
      lightOff(),
      lightState(GREEN),
    ]),
    createNote(BeatTypes.ONE_BEAT * 2,
      allLightsState(GREEN)),
    createNote(BeatTypes.ONE_BEAT * 2 + BeatTypes.HALF_BEAT,
      allLightsState(BLUE)),
    createNote(BeatTypes.ONE_BEAT * 3,
      allLightsState(PURPLE)),
  ])

  // on it that's an ass tray
  .measure(31, [
    createNote(0,
      allLightsState(GREEN)),
    createNote(BeatTypes.HALF_BEAT,
      allLightsState(BLUE)),
    createNote(BeatTypes.ONE_BEAT,
      allLightsState(PURPLE)),
    createNote(BeatTypes.ONE_BEAT + BeatTypes.HALF_BEAT,
      allLightsState(GREEN)),
    createNote(BeatTypes.ONE_BEAT * 2,
      allLightsState(BLUE)),
    createNote(BeatTypes.ONE_BEAT * 3,
      allLightsState(PURPLE)),
    // TODO add back in?
    // createNote(BeatTypes.ONE_BEAT * 3 + BeatTypes.HALF_BEAT,
    //   allLightsOff()),
  ])

  // say ye, say ye, don't we
  .measure(32, [
    ...flashLights(ORANGE, 0, BeatTypes.HALF_BEAT),
    ...flashLights(ORANGE, BeatTypes.ONE_BEAT * 2, BeatTypes.ONE_BEAT * 2 + BeatTypes.HALF_BEAT),
  ])

  // do this every day day (huh)
  .measure(33, [
    createNote(BeatTypes.ONE_BEAT * 2, [
      lightState(YELLOW),
      lightOff(),
    ]),
    createNote(BeatTypes.ONE_BEAT * 2 + BeatTypes.HALF_BEAT, [
      lightOff(),
      lightState(YELLOW),
    ]),
    createNote(BeatTypes.ONE_BEAT * 3,
      allLightsState(WHITE)),
  ])

  // work them long nights, long
  .measure(34, [
    ...flashLights(ORANGE, BeatTypes.ONE_BEAT, BeatTypes.ONE_BEAT * 2),
    ...flashLights(ORANGE, BeatTypes.ONE_BEAT * 3, BeatTypes.ONE_BEAT * 4),
  ])

  // nights to get a pay day (huh)
  .measure(35, [
    createNote(BeatTypes.ONE_BEAT * 2, [
      lightState(YELLOW),
      lightOff(),
    ]),
    createNote(BeatTypes.ONE_BEAT * 2 + BeatTypes.HALF_BEAT, [
      lightOff(),
      lightState(YELLOW),
    ]),
    createNote(BeatTypes.ONE_BEAT * 3,
      allLightsState(WHITE)),
  ])

  // finally got paid, now I need
  .measure(36, [
    createNote(0,
      allLightsState(GREEN)),
    createNote(BeatTypes.HALF_BEAT,
      allLightsState(BLUE)),
    createNote(BeatTypes.ONE_BEAT,
      allLightsState(PURPLE)),
    createNote(BeatTypes.ONE_BEAT * 2,
      allLightsState(GREEN)),
    createNote(BeatTypes.ONE_BEAT * 2 + BeatTypes.HALF_BEAT,
      allLightsState(BLUE)),
    createNote(BeatTypes.ONE_BEAT * 3,
      allLightsState(PURPLE)),
    createNote(BeatTypes.ONE_BEAT * 3 + BeatTypes.HALF_BEAT,
      allLightsState(GREEN)),
  ])

  // shade and a vacay
  .measure(37, [
    createNote(0,
      allLightsState(BLUE)),
    createNote(BeatTypes.ONE_BEAT,
      allLightsState(PURPLE)),
    createNote(BeatTypes.ONE_BEAT + BeatTypes.HALF_BEAT,
      allLightsState(GREEN)),
    createNote(BeatTypes.ONE_BEAT * 2,
      allLightsState(BLUE)),
    createNote(BeatTypes.ONE_BEAT * 2 + BeatTypes.HALF_BEAT,
      allLightsState(PURPLE)),
    // TODO take this out?
    // createNote(BeatTypes.ONE_BEAT * 3, allLightsOff()),
  ])

  // and niggas still hatin, so much
  .measure(38, [
    ...flashLights(RED, 0, BeatTypes.HALF_BEAT),
    ...flashLights(RED, BeatTypes.ONE_BEAT * 2, BeatTypes.ONE_BEAT * 2 + BeatTypes.HALF_BEAT),
  ])

  // hate I need a AK
  .measure(39, [
    createNote(BeatTypes.ONE_BEAT * 2, [
      lightState(RED),
      lightOff(),
    ]),
    createNote(BeatTypes.ONE_BEAT * 2 + BeatTypes.HALF_BEAT, [
      lightOff(),
      lightState(RED),
    ]),
    createNote(BeatTypes.ONE_BEAT * 3, [
      lightState(RED, 40),
      lightOff(),
    ]),
    createNote(BeatTypes.ONE_BEAT * 3 + BeatTypes.HALF_BEAT, [
      lightOff(),
      lightState(RED, 40),
    ]),
  ])

  // now we out in Paris
  .measure(40, [
    createNote(0,
      allLightsState(YELLOW)),
    createNote(BeatTypes.HALF_BEAT,
      allLightsState(ORANGE)),
    createNote(BeatTypes.ONE_BEAT,
      allLightsState(GREEN)),
    createNote(BeatTypes.ONE_BEAT + BeatTypes.HALF_BEAT,
      allLightsState(YELLOW)),
    createNote(BeatTypes.ONE_BEAT * 2,
      allLightsState(ORANGE)),
    createNote(BeatTypes.ONE_BEAT * 2 + BeatTypes.HALF_BEAT,
      allLightsState(GREEN)),
  ])

  // yeah I'm Perrier-in
  .measure(41, [
    createNote(0,
      allLightsState(YELLOW)),
    createNote(BeatTypes.HALF_BEAT,
      allLightsState(ORANGE)),
    createNote(BeatTypes.ONE_BEAT,
      allLightsState(GREEN)),
    createNote(BeatTypes.ONE_BEAT + BeatTypes.HALF_BEAT,
      allLightsState(YELLOW)),
    createNote(BeatTypes.ONE_BEAT * 2,
      allLightsState(ORANGE)),
    createNote(BeatTypes.ONE_BEAT * 2 + BeatTypes.HALF_BEAT,
      allLightsState(GREEN)),
  ])

  // white girls politickin
  .measure(42, [
    createNote(0,
      allLightsState(YELLOW)),
    createNote(BeatTypes.ONE_BEAT,
      allLightsState(ORANGE)),
    createNote(BeatTypes.ONE_BEAT * 2,
      allLightsState(GREEN)),
    createNote(BeatTypes.ONE_BEAT * 2 + BeatTypes.HALF_BEAT,
      allLightsState(YELLOW)),
    createNote(BeatTypes.ONE_BEAT * 3,
      allLightsState(ORANGE)),
    createNote(BeatTypes.ONE_BEAT * 3 + BeatTypes.HALF_BEAT,
      allLightsState(GREEN)),
  ])

  // that's that Sarah Palin (get get)
  .measure(43, [
    createNote(0, allLightsOff()),
    ...flashLights(WHITE, BeatTypes.ONE_BEAT, BeatTypes.ONE_BEAT + BeatTypes.HALF_BEAT),
    ...flashLights(WHITE, BeatTypes.ONE_BEAT * 2, BeatTypes.ONE_BEAT * 2 + BeatTypes.HALF_BEAT),
  ])

  // (get get) gettin high
  .measure(44, [
    createNote(0, [
      lightState(GREEN, 30),
      lightOff(),
    ]),
    createNote(BeatTypes.HALF_BEAT, [
      lightOff(),
      lightState(GREEN, 30),
    ]),
    createNote(BeatTypes.ONE_BEAT,
      allLightsState(GREEN, 30)),
    createNote(BeatTypes.ONE_BEAT + BeatTypes.HALF_BEAT,
      allLightsState(GREEN, 60)),
    createNote(BeatTypes.ONE_BEAT * 2,
      allLightsState(GREEN)),
  ])

  // Californicatin, I
  .measure(45, [
    createNote(0,
      allLightsState(YELLOW)),
    createNote(BeatTypes.HALF_BEAT,
      allLightsState(ORANGE)),
    createNote(BeatTypes.ONE_BEAT,
      allLightsState(GREEN)),
    createNote(BeatTypes.ONE_BEAT + BeatTypes.HALF_BEAT,
      allLightsState(YELLOW)),
    createNote(BeatTypes.ONE_BEAT * 2,
      allLightsState(ORANGE)),
    createNote(BeatTypes.ONE_BEAT * 2 + BeatTypes.HALF_BEAT,
      allLightsState(GREEN)),
  ])

  // give her that D, cause
  .measure(46, [
    createNote(0,
      allLightsState(YELLOW)),
    createNote(BeatTypes.HALF_BEAT,
      allLightsState(ORANGE)),
    createNote(BeatTypes.ONE_BEAT,
      allLightsState(GREEN)),
    createNote(BeatTypes.ONE_BEAT * 2,
      allLightsState(YELLOW)),
    createNote(BeatTypes.ONE_BEAT * 3,
      allLightsOff()),
  ])

  // that's where I was born and raised in (oh oh oh oh oh okay)
  .measure(47, ohOhOhOhOhOkay())

  // Lamborghini mercy
  .measure(48, chorusPart1And2())

  // yo chick she's so thirsty, I'm
  .measure(49, chorusPart1And2())

  // in that 2 seat lambo with your
  .measure(50, chorusPart3())

  // girl she's tryna jerk me
  .measure(51, chorusPart4())

  // Lamborghini mercy
  .measure(52, chorusPart1And2())

  // yo chick she's so thirsty, I'm
  .measure(53, chorusPart1And2())

  // in that 2 seat lambo with your
  .measure(54, chorusPart3())

  // girl she's tryna jerk me
  .measure(55, chorusPart4Alt())

  // weepin and a moanin...
  // TODO make lights more on beat
  .measure(56, [
    createNote(0, [
      lightState(RED, 50),
      lightOff(),
    ]),
    createNote(BeatTypes.ONE_BEAT, [
      lightState(RED, 50),
      lightState(YELLOW, 50),
    ]),
    createNote(BeatTypes.ONE_BEAT * 2, [
      lightState(GREEN, 50),
      lightState(YELLOW, 50),
    ]),
    createNote(BeatTypes.ONE_BEAT * 3, [
      lightState(GREEN, 50),
      lightState(RED, 50),
    ]),
  ])
  .measure(57, [
    createNote(0, [
      lightState(YELLOW, 50),
      lightState(RED, 50),
    ]),
    createNote(BeatTypes.ONE_BEAT, [
      lightState(YELLOW, 50),
      lightState(GREEN, 50),
    ]),
    createNote(BeatTypes.ONE_BEAT * 2, [
      lightState(RED, 50),
      lightState(GREEN, 50),
    ]),
    createNote(BeatTypes.ONE_BEAT * 3, [
      lightState(RED, 50),
      lightState(YELLOW, 50),
    ]),
  ])
  .measure(58, [
    createNote(0, [
      lightState(GREEN, 50),
      lightState(YELLOW, 50),
    ]),
    createNote(BeatTypes.ONE_BEAT, [
      lightState(GREEN, 50),
      lightState(RED, 50),
    ]),
    createNote(BeatTypes.ONE_BEAT * 2, [
      lightState(YELLOW, 50),
      lightState(RED, 50),
    ]),
    createNote(BeatTypes.ONE_BEAT * 3, [
      lightState(YELLOW, 50),
      lightState(GREEN, 50),
    ]),
  ])
  .measure(59, [
    createNote(0, [
      lightState(RED, 50),
      lightState(GREEN, 50),
    ]),
    createNote(BeatTypes.ONE_BEAT, [
      lightState(RED, 50),
      lightState(YELLOW, 50),
    ]),
    createNote(BeatTypes.ONE_BEAT * 2, [
      lightState(GREEN, 50),
      lightState(YELLOW, 50),
    ]),
    createNote(BeatTypes.ONE_BEAT * 3, [
      lightState(GREEN, 50),
      lightState(RED, 50),
    ]),
  ])
  .measure(60, [
    createNote(0, [
      lightState(YELLOW, 50),
      lightState(RED, 50),
    ]),
    createNote(BeatTypes.ONE_BEAT, [
      lightState(YELLOW, 50),
      lightState(GREEN, 50),
    ]),
    createNote(BeatTypes.ONE_BEAT * 2, [
      lightState(RED, 50),
      lightState(GREEN, 50),
    ]),
    createNote(BeatTypes.ONE_BEAT * 3, [
      lightState(RED, 50),
      lightState(YELLOW, 50),
    ]),
  ])
  .measure(61, [
    createNote(0, [
      lightState(GREEN, 50),
      lightState(YELLOW, 50),
    ]),
    createNote(BeatTypes.ONE_BEAT, [
      lightState(GREEN, 50),
      lightState(RED, 50),
    ]),
    createNote(BeatTypes.ONE_BEAT * 2, [
      lightState(YELLOW, 50),
      lightState(RED, 50),
    ]),
    createNote(BeatTypes.ONE_BEAT * 3, [
      lightState(YELLOW, 50),
      lightState(GREEN, 50),
    ]),
  ])
  .measure(62, [
    createNote(0, [
      lightState(BLUE),
      lightState(BLUE),
    ]),
    createNote(BeatTypes.ONE_BEAT * 2, [
      lightState(BLUE, 75),
      lightState(BLUE, 75),
    ]),
  ])
  .measure(63, [
    createNote(0, [
      lightState(BLUE, 50),
      lightState(BLUE, 50),
    ]),
    createNote(BeatTypes.ONE_BEAT * 2, [
      lightState(BLUE, 25),
      lightState(BLUE, 25),
    ]),
  ])

  // yeah! it's prime time
  .measure(64, [
    createNote(0, allLightsState(YELLOW)),
  ])

  // my top back, this pimp game
  .measure(65, [])

  // ho! I'm red leather, this
  .measure(66, [])

  // cocaine, I'm Rick James
  .measure(67, [])

  // ho! I'm bill-droppin, Ms.
  .measure(68, [])

  // Pac-Man, this pill-poppin ass
  .measure(69, [])

  // ho! I'm popping two, these
  .measure(70, [])

  // blue dolphins need two coffins
  .measure(71, [])

  // all she want is some heel money
  .measure(72, [])

  // all she need is some bill money, he
  .measure(73, [])

  // take his time, he counts it out, I
  .measure(74, [])

  // weighs it up, that's real money
  .measure(75, [])

  // check the neck, check the wrist, them
  .measure(76, [])

  // heads turnin, that's exorcist, my
  .measure(77, [])

  // Audemar's like Mardi Gras, that's
  .measure(78, [])

  // Swiss time and that's excellence
  .measure(79, [])

  // two door preference
  .measure(80, [])

  // roof gone, George Jefferson, that
  .measure(81, [])

  // white frost on that pound cake
  .measure(82, [])

  // so your Duncan Hines is irrelevant (woo)
  .measure(83, [])

  // Lambo
  .measure(84, [])

  // Murcie-lago
  .measure(85, [])

  // she go wherever I go, wherever
  .measure(86, [])

  // we go, we do it pronto, it's like (oh oh oh oh oh okay)
  .measure(87, ohOhOhOhOhOkay())

  // Lamborghini mercy
  .measure(88, chorusPart1And2())

  // yo chick she's so thirsty, I'm
  .measure(89, chorusPart1And2())

  // in that 2 seat lambo with your
  .measure(90, chorusPart3())

  // girl she's tryna jerk me
  .measure(91, chorusPart4())

  // Lamborghini mercy
  .measure(92, chorusPart1And2())

  // yo chick she's so thirsty, I'm
  .measure(93, chorusPart1And2())

  // in that 2 seat lambo with your
  .measure(94, chorusPart3())

  // girl she's tryna jerk me
  .measure(95, chorusPart4Alt())

  // 8 measures of normal weepin/moanin
  .measure(96, [])
  .measure(97, [])
  .measure(98, [])
  .measure(99, [])
  .measure(100, [])
  .measure(101, [])
  .measure(102, [])
  .measure(103, [])

  // 8 measures of other (bugle blows many times)
  .measure(104, [])
  .measure(105, [])
  .measure(106, [])
  .measure(107, [])
  .measure(108, [])
  .measure(109, [])
  .measure(110, [])
  .measure(111, [])

  // let the
  .measure(112, [
    createNote(0, [
      lightState(RED),
      lightState(RED),
    ]),
    createNote(BeatTypes.ONE_BEAT, [
      lightOff(),
      lightOff(),
    ]),
    createNote(BeatTypes.ONE_BEAT * 2, [
      lightState(RED),
      lightState(RED),
    ]),
    createNote(BeatTypes.ONE_BEAT * 3, [
      lightOff(),
      lightOff(),
    ]),
  ])

  // suicide doors up
  .measure(113, [])

  // I threw sui-
  .measure(114, [])

  // cides on the tour bus
  .measure(115, [])

  // I threw sui-
  .measure(116, [])

  // cides on the private jet
  .measure(117, [])

  // you know what that
  .measure(118, [])

  // mean, I'm fly to death
  .measure(119, [])

  // I step in Def Jam
  .measure(120, [])

  // building like I'm the shit
  .measure(121, [])

  // tell 'em gimme 50
  .measure(122, [])

  // million or Imma quit
  .measure(123, [])

  // most rapper's taste level
  .measure(124, [
    createNote(0,
      allLightsState(RED)),
    createNote(BeatTypes.THIRD_BEAT * 2,
      allLightsState(YELLOW)),
    createNote(BeatTypes.ONE_BEAT + BeatTypes.THIRD_BEAT,
      allLightsState(BLACK)),
    createNote(BeatTypes.ONE_BEAT * 2,
      allLightsState(RED)),
    createNote(BeatTypes.ONE_BEAT * 2 + BeatTypes.THIRD_BEAT * 2,
      allLightsState(YELLOW)),
    createNote(BeatTypes.ONE_BEAT * 3 + BeatTypes.THIRD_BEAT,
      allLightsState(BLACK)),
  ])

  // ain't at my waist level
  .measure(125, [
    createNote(0,
      allLightsState(RED)),
    createNote(BeatTypes.THIRD_BEAT * 2,
      allLightsState(YELLOW)),
    createNote(BeatTypes.ONE_BEAT + BeatTypes.THIRD_BEAT,
      allLightsState(BLACK)),
    createNote(BeatTypes.ONE_BEAT * 2,
      allLightsState(RED)),
    createNote(BeatTypes.ONE_BEAT * 2 + BeatTypes.THIRD_BEAT * 2,
      allLightsState(YELLOW)),
    createNote(BeatTypes.ONE_BEAT * 3 + BeatTypes.THIRD_BEAT,
      allLightsState(BLACK)),
  ])

  // turn up the bass till it's
  .measure(126, [
    createNote(0,
      allLightsState(RED)),
    createNote(BeatTypes.THIRD_BEAT * 2,
      allLightsState(YELLOW)),
    createNote(BeatTypes.ONE_BEAT + BeatTypes.THIRD_BEAT,
      allLightsState(BLACK)),
    createNote(BeatTypes.ONE_BEAT * 2,
      allLightsState(RED)),
    createNote(BeatTypes.ONE_BEAT * 2 + BeatTypes.THIRD_BEAT * 2,
      allLightsState(YELLOW)),
    createNote(BeatTypes.ONE_BEAT * 3 + BeatTypes.THIRD_BEAT,
      allLightsState(BLACK)),
  ])

  // up in your face level
  .measure(127, [
    createNote(0,
      allLightsState(RED)),
    createNote(BeatTypes.THIRD_BEAT * 2,
      allLightsState(YELLOW)),
    createNote(BeatTypes.ONE_BEAT + BeatTypes.THIRD_BEAT,
      allLightsState(BLACK)),
    createNote(BeatTypes.ONE_BEAT * 2,
      allLightsState(RED)),
    createNote(BeatTypes.ONE_BEAT * 2 + BeatTypes.THIRD_BEAT * 2,
      allLightsState(YELLOW)),
    createNote(BeatTypes.ONE_BEAT * 3 + BeatTypes.THIRD_BEAT,
      allLightsState(BLACK)),
  ])

  // don't do no press but I
  .measure(128, [
    createNote(0,
      allLightsState(RED)),
    createNote(BeatTypes.THIRD_BEAT * 2,
      allLightsState(YELLOW)),
    createNote(BeatTypes.ONE_BEAT + BeatTypes.THIRD_BEAT,
      allLightsState(BLACK)),
    createNote(BeatTypes.ONE_BEAT * 2,
      allLightsState(RED)),
    createNote(BeatTypes.ONE_BEAT * 2 + BeatTypes.THIRD_BEAT * 2,
      allLightsState(YELLOW)),
    createNote(BeatTypes.ONE_BEAT * 3 + BeatTypes.THIRD_BEAT,
      allLightsState(BLACK)),
  ])

  // get the most press kit
  .measure(129, [
    createNote(0,
      allLightsState(RED)),
    createNote(BeatTypes.THIRD_BEAT * 2,
      allLightsState(YELLOW)),
    createNote(BeatTypes.ONE_BEAT + BeatTypes.THIRD_BEAT,
      allLightsState(BLACK)),
    createNote(BeatTypes.ONE_BEAT * 2,
      allLightsState(RED)),
    createNote(BeatTypes.ONE_BEAT * 3,
      allLightsState(YELLOW)),
  ])

  // plus, yo, my bitch make your
  .measure(130, [
    createNote(0,
      allLightsState(BLACK)),
    createNote(BeatTypes.ONE_BEAT,
      allLightsState(RED)),
    createNote(BeatTypes.ONE_BEAT + BeatTypes.HALF_BEAT,
      allLightsState(YELLOW)),
    createNote(BeatTypes.ONE_BEAT * 2,
      allLightsState(BLACK)),
    createNote(BeatTypes.ONE_BEAT * 2 + BeatTypes.THIRD_BEAT * 2,
      allLightsState(RED)),
    createNote(BeatTypes.ONE_BEAT * 3 + BeatTypes.THIRD_BEAT,
      allLightsState(YELLOW)),
  ])

  // bitch look like Precious
  .measure(131, [
    createNote(0,
      allLightsState(BLACK)),
    createNote(BeatTypes.THIRD_BEAT * 2,
      allLightsState(RED)),
    createNote(BeatTypes.ONE_BEAT + BeatTypes.THIRD_BEAT,
      allLightsState(YELLOW)),
    createNote(BeatTypes.ONE_BEAT * 2,
      allLightsState(BLACK)),
    createNote(BeatTypes.ONE_BEAT * 3,
      allLightsState(RED)),
  ])

  // somethin' bout Mary
  .measure(132, [])

  // she gone off that molly
  .measure(133, [])

  // now the whole party is
  .measure(134, [])

  // melting like Dali
  .measure(135, [])

  // now everybody is
  .measure(136, [])

  // moving their body, don't
  .measure(137, [])

  // sell me apartment, I
  .measure(138, [])

  // move in the lobby (yah)
  .measure(139, [])

  // niggas is loiterin just
  .measure(140, [])

  // to feel important
  .measure(141, [])

  // you gon' see lawyers, and
  .measure(142, [])

  // niggas in Jordans (okay now)
  .measure(143, [])

  // catch up to my campaign
  .measure(144, [])

  // coupe the color of mayonnaise, I'm
  .measure(145, [])

  // drunk and high at the same time, drinkin'
  .measure(146, [])

  // champagne on the airplane
  .measure(147, [])

  // spit rounds like a gun range
  .measure(148, [])

  // beat it up like Rampage
  .measure(149, [])

  // hundred bands, cut your girl, now
  .measure(150, [])

  // your girl need a Band-Aid (damn)
  .measure(151, [])

  // grade A, A1
  .measure(152, [])

  // chain the color of Akon
  .measure(153, [])

  // black diamonds, backpack rhymin'
  .measure(154, [])

  // cosigned by Louis Vuitton (yep)
  .measure(155, [])

  // horsepower, horsepower, all this
  .measure(156, [])

  // Polo on I got horsepower
  .measure(157, [])

  // pound of this cost 4 thousand, now
  .measure(158, [])

  // make it rain she want more showers
  .measure(159, [])

  // rain (rain), pourin' (pourin')
  .measure(160, [])

  // all my cars is foreign (foreign)
  .measure(161, [])

  // all my broads is foreign (foreign)
  .measure(162, [])

  // money tall like Jordan (oh oh oh oh oh okay)
  .measure(163, ohOhOhOhOhOkay())

  // Lamborghini mercy
  .measure(164, chorusPart1And2())

  // yo chick she's so thirsty, I'm
  .measure(165, chorusPart1And2())

  // in that 2 seat lambo with your
  .measure(166, chorusPart3())

  // girl she's tryna jerk me
  .measure(167, chorusPart4())

  // Lamborghini mercy
  .measure(168, chorusPart1And2())

  // yo chick she's so thirsty, I'm
  .measure(169, chorusPart1And2())

  // in that 2 seat lambo with your
  .measure(170, chorusPart3())

  // girl she's tryna jerk me
  .measure(171, chorusPart4Alt())

  // TODO
  .measure(172, [])
  .measure(173, [])
  .measure(174, [])
  .measure(175, [])
  .measure(176, [])
  .measure(177, [])
  .measure(178, [])
  .measure(179, [])

  .measure(180, [
    createNote(0, allLightsState(YELLOW)),
  ])
  .measure(181, [
    createNote(0, allLightsState(GREEN)),
  ])
  .measure(182, [
    createNote(0, allLightsState(YELLOW)),
  ])
  .measure(183, [
    createNote(0, allLightsState(GREEN)),
  ])
  .measure(184, [
    createNote(0, allLightsState(YELLOW)),
  ])
  .measure(185, [
    createNote(0, allLightsState(GREEN)),
  ])
  .measure(186, [
    createNote(0, allLightsState(YELLOW)),
  ])
  .measure(187, [
    createNote(0, allLightsState(GREEN)),
  ])

  // fade out
  .measure(188, [
    createNote(0,
      allLightsState(BLACK)),
    createNote(BeatTypes.ONE_BEAT,
      allLightsState(BLACK, 100 * (7 / 8))),
    createNote(BeatTypes.ONE_BEAT * 2,
      allLightsState(BLACK, 100 * (6 / 8))),
    createNote(BeatTypes.ONE_BEAT * 3,
      allLightsState(BLACK, 100 * (5 / 8))),
  ])
  .measure(189, [
    createNote(0,
      allLightsState(BLACK, 100 * (4 / 8))),
    createNote(BeatTypes.ONE_BEAT,
      allLightsState(BLACK, 100 * (3 / 8))),
    createNote(BeatTypes.ONE_BEAT * 2,
      allLightsState(BLACK, 100 * (2 / 8))),
    createNote(BeatTypes.ONE_BEAT * 3,
      allLightsState(BLACK, 100 * (1 / 8))),
  ])
  .measure(190, [
    createNote(0, allLightsOff()),
  ])

export default mercy
