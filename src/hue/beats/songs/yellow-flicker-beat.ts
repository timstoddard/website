import { UIColor } from '../../hue-color-conversion'
import { BeatStep } from '../beat-types'
import { Song } from '../song'
import { allLightsOff, allLightsState, createNote, lightOff, lightState } from './utils/utils'

// TODO put common colors & shared fns in song utils
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

const introPart1 = (): BeatStep[] => [
  createNote(0, allLightsState(YELLOW, 10)),
  createNote(3, allLightsState(YELLOW, 15)),
  createNote(3.5, allLightsState(YELLOW, 10)),
]

const introPart2 = (): BeatStep[] => [
  createNote(0, allLightsState(YELLOW, 10)),
  createNote(3,
    allLightsOff()),
]

const yellowFlickerBeat = new Song('Yellow Flicker Beat', 'Lorde', 96, 4, 1000)
  .measure([
    createNote(0, allLightsState(YELLOW, 10)),
    createNote(3, allLightsState(YELLOW, 15)),
    createNote(3.5, allLightsState(YELLOW, 10)),
  ])
  .measure([
    createNote(0, allLightsState(YELLOW, 15)),
    createNote(3, allLightsOff()),
  ])
  .measure([
    createNote(0, allLightsState(YELLOW, 10)),
    createNote(3, allLightsState(YELLOW, 15)),
    createNote(3.5, allLightsState(YELLOW, 10)),
  ])
  .measure([
    createNote(0, allLightsState(YELLOW, 15)),
    createNote(3, allLightsOff()),
  ])
  .measure([
    createNote(0, allLightsState(RED, 50)),
    createNote(3, allLightsState(RED, 55)),
    createNote(3.5, allLightsState(RED, 50)),
  ])

  // ... I'm a
  .measure([
    createNote(0, allLightsState(RED, 55)),
    createNote(2, allLightsOff()),
    createNote(3, allLightsState(YELLOW, 10)),
    createNote(3.5, allLightsState(YELLOW, 20)),
  ])

  // princess, cut from mar-
  .measure([
    createNote(0, allLightsState(YELLOW, 30)),
    createNote(1, allLightsState(YELLOW, 40)),
    createNote(2, allLightsState(YELLOW, 50)),
    createNote(3, allLightsState(YELLOW, 60)),
    createNote(3.5, allLightsState(YELLOW, 60)),
  ])

  // -ble, smoother than a
  .measure([
    createNote(0, allLightsState(YELLOW, 30)),
    createNote(1, allLightsState(YELLOW, 40)),
    createNote(2, allLightsState(YELLOW, 50)),
    createNote(3, allLightsState(YELLOW, 60)),
  ])

  // stone ...
  .measure([
    createNote(0, allLightsState(YELLOW, 30)),
    createNote(1, allLightsState(YELLOW, 40)),
    createNote(2, allLightsState(YELLOW, 50)),
    createNote(3, allLightsState(YELLOW, 60)),
  ])

export default yellowFlickerBeat
