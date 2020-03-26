import { UIColor } from '../../hue-color-conversion'
import { BeatStep, BeatTypes } from '../beat-types'
import { Song } from '../song'
import { flashLights } from './utils/basic-routines'
import { allLightsOff, allLightsState, createNote, lightOff, lightState } from './utils/utils'

const PINK = new UIColor(255, 0, 200)
const RED = new UIColor(255, 0, 0)
const ORANGE = new UIColor(255, 120, 0)
const YELLOW = new UIColor(255, 255, 0)
const GREEN = new UIColor(0, 255, 0)
const CYAN = new UIColor(0, 200, 255)
const BLUE = new UIColor(0, 0, 255)
const PURPLE = new UIColor(255, 0, 255)
const WHITE = new UIColor(255, 255, 255)
const BLACK = new UIColor(0, 0, 0)

const chorusIntro1 = (): BeatStep[] => [
  createNote(0,
    allLightsState(BLACK)),
  createNote(BeatTypes.ONE_BEAT,
    allLightsState(WHITE)),
  createNote(BeatTypes.ONE_BEAT * 2,
    allLightsState(BLACK)),
  createNote(BeatTypes.ONE_BEAT * 2 + BeatTypes.HALF_BEAT,
    allLightsState(WHITE)),
  createNote(BeatTypes.ONE_BEAT * 3,
    allLightsState(BLACK)),
  createNote(BeatTypes.ONE_BEAT * 3 + BeatTypes.HALF_BEAT,
    allLightsState(WHITE)),
]

const chorusIntro2 = (): BeatStep[] => [
  createNote(0,
    allLightsState(BLACK)),
  createNote(BeatTypes.ONE_BEAT,
    allLightsState(WHITE)),
  createNote(BeatTypes.ONE_BEAT + BeatTypes.QUARTER_BEAT * 2, [
    lightState(WHITE),
    lightOff(),
  ]),
  createNote(BeatTypes.ONE_BEAT + BeatTypes.QUARTER_BEAT * 3, [
    lightOff(),
    lightState(WHITE),
  ]),
  createNote(BeatTypes.ONE_BEAT * 2 + BeatTypes.THIRD_BEAT, [
    lightState(WHITE),
    lightOff(),
  ]),
  createNote(BeatTypes.ONE_BEAT * 3 + BeatTypes.HALF_BEAT, [
    lightOff(),
    lightState(WHITE),
  ]),
]

const chorusPart1 = (): BeatStep[] => [
  createNote(0,
    allLightsState(RED)),
  createNote(BeatTypes.ONE_BEAT,
    allLightsState(PINK)),
  createNote(BeatTypes.ONE_BEAT * 2,
    allLightsState(PINK, 67)),
  createNote(BeatTypes.ONE_BEAT * 3,
    allLightsState(PINK, 33)),
]

const chorusPart2 = (): BeatStep[] => [
  createNote(0,
    allLightsState(PINK)),
  createNote(BeatTypes.ONE_BEAT,
    allLightsState(RED)),
  createNote(BeatTypes.ONE_BEAT * 2,
    allLightsState(ORANGE)),
  createNote(BeatTypes.ONE_BEAT * 3,
    allLightsState(YELLOW)),
]

const chorusPart3 = (): BeatStep[] => [
  createNote(BeatTypes.ONE_BEAT * 2,
    allLightsState(GREEN)),
    createNote(BeatTypes.ONE_BEAT * 3,
    allLightsState(CYAN)),
]

const chorusPart4 = (): BeatStep[] => [
  createNote(0,
    allLightsState(BLUE)),
  createNote(BeatTypes.ONE_BEAT,
    allLightsState(BLUE, 50)),
]

const chorusEasyPart1 = (): BeatStep[] => [
  createNote(0,
    allLightsState(RED)),
  createNote(BeatTypes.ONE_BEAT,
    allLightsState(RED, 50)),
]

const chorusEasyPart2 = (): BeatStep[] => [
  createNote(0, allLightsOff()),
  createNote(BeatTypes.ONE_BEAT + BeatTypes.QUARTER_BEAT * 2, [
    lightState(RED),
    lightOff(),
  ]),
  createNote(BeatTypes.ONE_BEAT + BeatTypes.QUARTER_BEAT * 3, [
    lightOff(),
    lightState(RED),
  ]),
  createNote(BeatTypes.ONE_BEAT * 2 + BeatTypes.THIRD_BEAT, [
    lightState(RED),
    lightOff(),
  ]),
  createNote(BeatTypes.ONE_BEAT * 3 + BeatTypes.HALF_BEAT, [
    lightOff(),
    lightState(RED),
  ]),
]

const chorusInstrumental1 = (): BeatStep[] => [
  createNote(0,
    allLightsOff()),
  createNote(BeatTypes.ONE_BEAT * 2,
    allLightsState(RED)),
  createNote(BeatTypes.ONE_BEAT * 3,
    allLightsState(RED, 50)),
]

const chorusInstrumental2 = (): BeatStep[] => [
  createNote(BeatTypes.HALF_BEAT,
    allLightsState(BLUE, 50)),
  createNote(BeatTypes.ONE_BEAT,
    allLightsState(BLUE)),
  createNote(BeatTypes.ONE_BEAT * 2,
    allLightsState(BLUE, 50)),
  createNote(BeatTypes.ONE_BEAT * 2 + BeatTypes.HALF_BEAT,
    allLightsState(BLUE)),
]

const chorusInstrumental3 = (): BeatStep[] => [
  createNote(0,
    allLightsOff()),
  createNote(BeatTypes.ONE_BEAT * 2,
    allLightsState(ORANGE)),
  createNote(BeatTypes.ONE_BEAT * 3,
    allLightsState(ORANGE, 50)),
]

const chorusInstrumental4 = (): BeatStep[] => [
  createNote(BeatTypes.ONE_BEAT,
    allLightsState(BLUE, 50)),
  createNote(BeatTypes.ONE_BEAT * 2,
    allLightsState(BLUE)),
]

const song = new Song(146, 4, 700)
const easySwitchScreens = song
  .measure(0, chorusIntro1())
  .measure(1, chorusIntro2())
  .measure(2, chorusIntro1())
  .measure(3, chorusIntro2())
  .measure(4, chorusIntro1())
  .measure(5, chorusIntro2())
  .measure(6, chorusIntro1())
  .measure(7, chorusIntro2())
  .measure(8, [
    createNote(0, allLightsState(RED)),
    ...flashLights(RED, BeatTypes.ONE_BEAT, BeatTypes.ONE_BEAT + BeatTypes.HALF_BEAT),
    ...flashLights(RED, BeatTypes.ONE_BEAT * 2, BeatTypes.ONE_BEAT * 2 + BeatTypes.HALF_BEAT),
    ...flashLights(RED, BeatTypes.ONE_BEAT * 3, BeatTypes.ONE_BEAT * 3 + BeatTypes.HALF_BEAT),
  ])
  .measure(9, chorusIntro2())
  .measure(10, chorusIntro1())
  .measure(11, chorusIntro2())
  .measure(12, chorusIntro1())
  .measure(13, chorusIntro2())
  .measure(14, chorusIntro1())
  .measure(15, chorusIntro2())

  // easy
  .measure(16, chorusEasyPart1())
  .measure(17, chorusEasyPart2())

  // easy
  .measure(18, chorusEasyPart1())
  .measure(19, chorusEasyPart2())

  // pull out your
  .measure(20, chorusPart1())

  // heart to make the
  .measure(21, chorusPart2())

  // being
  .measure(22, chorusPart3())

  // alone
  .measure(23, chorusPart4())

  // easy
  .measure(24, chorusEasyPart1())
  .measure(25, chorusEasyPart2())

  // easy
  .measure(26, chorusEasyPart1())
  .measure(27, chorusEasyPart2())

  // pull out your
  .measure(28, chorusPart1())

  // heart to make the
  .measure(29, chorusPart2())

  // being
  .measure(30, chorusPart3())

  // alone
  .measure(31, chorusPart4())

  // easy (instrumentals)
  .measure(32, [
    createNote(0,
      allLightsState(RED)),
    createNote(BeatTypes.ONE_BEAT,
      allLightsState(RED, 50)),
    createNote(BeatTypes.ONE_BEAT * 2,
      allLightsOff()),
    createNote(BeatTypes.ONE_BEAT * 3 + BeatTypes.HALF_BEAT,
      allLightsState(RED, 33)),
    createNote(BeatTypes.ONE_BEAT * 3 + BeatTypes.QUARTER_BEAT * 3,
      allLightsState(RED, 67)),
  ])
  .measure(33, [
    createNote(0,
      allLightsState(RED)),
  ])
  .measure(34, chorusInstrumental1())
  .measure(35, chorusInstrumental2())
  .measure(36, chorusInstrumental1())
  .measure(37, chorusInstrumental2())
  .measure(38, chorusInstrumental1())
  .measure(39, chorusInstrumental2())
  .measure(40, chorusInstrumental3())
  .measure(41, chorusInstrumental4())
  .measure(42, chorusInstrumental1())
  .measure(43, chorusInstrumental2())
  .measure(44, chorusInstrumental1())
  .measure(45, chorusInstrumental2())
  .measure(46, chorusInstrumental1())
  .measure(47, chorusInstrumental2())
  .measure(48, chorusInstrumental3())
  .measure(49, chorusInstrumental4())

  // easy
  .measure(50, chorusEasyPart1())
  .measure(51, chorusEasyPart2())

  // TODO
  .measure(52, [])
  .getSteps()

export default easySwitchScreens
