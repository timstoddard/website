import { UIColor } from '../../hue-color-conversion'
import { BeatStep, BeatTypes } from '../beat-types'
import { Song } from '../song'
import { allLightsOff, allLightsState, createNote, lightOff, lightState } from './utils/utils'

const PINK = new UIColor(255, 0, 200)
const RED = new UIColor(255, 0, 0)
const ORANGE = new UIColor(255, 120, 0)
const YELLOW = new UIColor(255, 255, 0)
const GREEN = new UIColor(0, 255, 0)
const CYAN = new UIColor(0, 200, 255)
// const BLUE = new UIColor(0, 0, 255)
// const PURPLE = new UIColor(255, 0, 255)
const WHITE = new UIColor(255, 255, 255)
const BLACK = new UIColor(0, 0, 0)

const introPart1 = (): BeatStep[] => [
  createNote(0,
    allLightsState(YELLOW, 10)),
  createNote(BeatTypes.ONE_BEAT * 3,
    allLightsState(YELLOW, 15)),
  createNote(BeatTypes.ONE_BEAT * 3 + BeatTypes.HALF_BEAT,
    allLightsState(YELLOW, 10)),
]

const introPart2 = (): BeatStep[] => [
  createNote(0,
    allLightsState(YELLOW, 10)),
  createNote(BeatTypes.ONE_BEAT * 3,
    allLightsOff()),
]

const yellowFlickerBeat = new Song('Yellow Flicker Beat', 'Lorde', 96, 4, 1000)
  .measure(0, [
    createNote(0,
      allLightsState(YELLOW, 10)),
    createNote(BeatTypes.ONE_BEAT * 3,
      allLightsState(YELLOW, 15)),
    createNote(BeatTypes.ONE_BEAT * 3 + BeatTypes.HALF_BEAT,
      allLightsState(YELLOW, 10)),
  ])
  .measure(1, [
    createNote(0,
      allLightsState(YELLOW, 15)),
    createNote(BeatTypes.ONE_BEAT * 3,
      allLightsOff()),
  ])
  .measure(2, [
    createNote(0,
      allLightsState(YELLOW, 10)),
    createNote(BeatTypes.ONE_BEAT * 3,
      allLightsState(YELLOW, 15)),
    createNote(BeatTypes.ONE_BEAT * 3 + BeatTypes.HALF_BEAT,
      allLightsState(YELLOW, 10)),
  ])
  .measure(3, [
    createNote(0,
      allLightsState(YELLOW, 15)),
    createNote(BeatTypes.ONE_BEAT * 3,
      allLightsOff()),
  ])
  .measure(4, [
    createNote(0,
      allLightsState(RED, 50)),
    createNote(BeatTypes.ONE_BEAT * 3,
      allLightsState(RED, 55)),
    createNote(BeatTypes.ONE_BEAT * 3 + BeatTypes.HALF_BEAT,
      allLightsState(RED, 50)),
  ])

  // ... I'm a
  .measure(5, [
    createNote(0,
      allLightsState(RED, 55)),
    createNote(BeatTypes.ONE_BEAT * 2,
      allLightsOff()),
    createNote(BeatTypes.ONE_BEAT * 3,
      allLightsState(YELLOW, 10)),
    createNote(BeatTypes.ONE_BEAT * 3 + BeatTypes.HALF_BEAT,
      allLightsState(YELLOW, 20)),
  ])

  // princess, cut from mar-
  .measure(6, [
    createNote(0,
      allLightsState(YELLOW, 30)),
    createNote(BeatTypes.ONE_BEAT,
      allLightsState(YELLOW, 40)),
    createNote(BeatTypes.ONE_BEAT * 2,
      allLightsState(YELLOW, 50)),
    createNote(BeatTypes.ONE_BEAT * 3,
      allLightsState(YELLOW, 60)),
      createNote(BeatTypes.ONE_BEAT * 3 + BeatTypes.HALF_BEAT,
        allLightsState(YELLOW, 60)),
  ])

  // -ble, smoother than a
  .measure(7, [
    createNote(0,
      allLightsState(YELLOW, 30)),
    createNote(BeatTypes.ONE_BEAT,
      allLightsState(YELLOW, 40)),
    createNote(BeatTypes.ONE_BEAT * 2,
      allLightsState(YELLOW, 50)),
    createNote(BeatTypes.ONE_BEAT * 3,
      allLightsState(YELLOW, 60)),
  ])

  // stone ...
  .measure(8, [
    createNote(0,
      allLightsState(YELLOW, 30)),
    createNote(BeatTypes.ONE_BEAT,
      allLightsState(YELLOW, 40)),
    createNote(BeatTypes.ONE_BEAT * 2,
      allLightsState(YELLOW, 50)),
    createNote(BeatTypes.ONE_BEAT * 3,
      allLightsState(YELLOW, 60)),
  ])

export default yellowFlickerBeat
