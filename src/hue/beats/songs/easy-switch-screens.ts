import { UIColor } from '../../hue-color-conversion'
import { BeatStep } from '../beat-types'
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
  createNote(0, allLightsState(BLACK)),
  createNote(1, allLightsState(WHITE)),
  createNote(2, allLightsState(BLACK)),
  createNote(2.5, allLightsState(WHITE)),
  createNote(3, allLightsState(BLACK)),
  createNote(3.5, allLightsState(WHITE)),
]

const chorusIntro2 = (): BeatStep[] => [
  createNote(0, allLightsState(BLACK)),
  createNote(1, allLightsState(WHITE)),
  createNote(1.5, [lightState(WHITE), lightOff()]),
  createNote(1.75, [lightOff(), lightState(WHITE)]),
  createNote(2 + 1/3, [lightState(WHITE), lightOff()]),
  createNote(3.5, [lightOff(), lightState(WHITE)]),
]

const chorusPart1 = (): BeatStep[] => [
  createNote(0, allLightsState(RED)),
  createNote(1, allLightsState(PINK)),
  createNote(2, allLightsState(PINK, 67)),
  createNote(3, allLightsState(PINK, 33)),
]

const chorusPart2 = (): BeatStep[] => [
  createNote(0, allLightsState(PINK)),
  createNote(1, allLightsState(RED)),
  createNote(2, allLightsState(ORANGE)),
  createNote(3, allLightsState(YELLOW)),
]

const chorusPart3 = (): BeatStep[] => [
  createNote(2, allLightsState(GREEN)),
  createNote(3, allLightsState(CYAN)),
]

const chorusPart4 = (): BeatStep[] => [
  createNote(0, allLightsState(BLUE)),
  createNote(1, allLightsState(BLUE, 50)),
]

const chorusEasyPart1 = (): BeatStep[] => [
  createNote(0, allLightsState(RED)),
  createNote(1, allLightsState(RED, 50)),
]

const chorusEasyPart2 = (): BeatStep[] => [
  createNote(0, allLightsOff()),
  createNote(1.5, [lightState(RED), lightOff()]),
  createNote(1.75, [lightOff(), lightState(RED)]),
  createNote(2 + 1/3, [lightState(RED), lightOff()]),
  createNote(3.5, [lightOff(), lightState(RED)]),
]

const chorusInstrumental1 = (): BeatStep[] => [
  createNote(0, allLightsOff()),
  createNote(2, allLightsState(RED)),
  createNote(3, allLightsState(RED, 50)),
]

const chorusInstrumental2 = (): BeatStep[] => [
  createNote(0.5, allLightsState(BLUE, 50)),
  createNote(1, allLightsState(BLUE)),
  createNote(2, allLightsState(BLUE, 50)),
  createNote(2.5, allLightsState(BLUE)),
]

const chorusInstrumental3 = (): BeatStep[] => [
  createNote(0, allLightsOff()),
  createNote(2, allLightsState(ORANGE)),
  createNote(3, allLightsState(ORANGE, 50)),
]

const chorusInstrumental4 = (): BeatStep[] => [
  createNote(1, allLightsState(BLUE, 50)),
  createNote(2, allLightsState(BLUE)),
]

const easySwitchScreens = new Song('Easy (Switch Screens)', 'Lorde', 146, 4, 700)
  .measure(chorusIntro1())
  .measure(chorusIntro2())
  .measure(chorusIntro1())
  .measure(chorusIntro2())
  .measure(chorusIntro1())
  .measure(chorusIntro2())
  .measure(chorusIntro1())
  .measure(chorusIntro2())
  .measure([
    createNote(0, allLightsState(RED)),
    ...flashLights(RED, 1, 1.5),
    ...flashLights(RED, 2, 2.5),
    ...flashLights(RED, 3, 3.5),
  ])
  .measure(chorusIntro2())
  .measure(chorusIntro1())
  .measure(chorusIntro2())
  .measure(chorusIntro1())
  .measure(chorusIntro2())
  .measure(chorusIntro1())
  .measure(chorusIntro2())

  // easy
  .measure(chorusEasyPart1())
  .measure(chorusEasyPart2())

  // easy
  .measure(chorusEasyPart1())
  .measure(chorusEasyPart2())

  // pull out your
  .measure(chorusPart1())

  // heart to make the
  .measure(chorusPart2())

  // being
  .measure(chorusPart3())

  // alone
  .measure(chorusPart4())

  // easy
  .measure(chorusEasyPart1())
  .measure(chorusEasyPart2())

  // easy
  .measure(chorusEasyPart1())
  .measure(chorusEasyPart2())

  // pull out your
  .measure(chorusPart1())

  // heart to make the
  .measure(chorusPart2())

  // being
  .measure(chorusPart3())

  // alone
  .measure(chorusPart4())

  // easy (instrumentals)
  .measure([
    createNote(0, allLightsState(RED)),
    createNote(1, allLightsState(RED, 50)),
    createNote(2, allLightsOff()),
    createNote(3.5, allLightsState(RED, 33)),
    createNote(3.75, allLightsState(RED, 67)),
  ])
  .measure([
    createNote(0, allLightsState(RED)),
  ])
  .measure(chorusInstrumental1())
  .measure(chorusInstrumental2())
  .measure(chorusInstrumental1())
  .measure(chorusInstrumental2())
  .measure(chorusInstrumental1())
  .measure(chorusInstrumental2())
  .measure(chorusInstrumental3())
  .measure(chorusInstrumental4())
  .measure(chorusInstrumental1())
  .measure(chorusInstrumental2())
  .measure(chorusInstrumental1())
  .measure(chorusInstrumental2())
  .measure(chorusInstrumental1())
  .measure(chorusInstrumental2())
  .measure(chorusInstrumental3())
  .measure(chorusInstrumental4())

  // easy
  .measure(chorusEasyPart1())
  .measure(chorusEasyPart2())

  // TODO
  .measure([])

export default easySwitchScreens
