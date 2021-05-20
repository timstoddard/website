import { UIColor } from '../../hue-color-conversion'
import { BeatStep } from '../beat-types'
import { Song } from '../song'
import { createNote, LightGenerator } from './utils/utils'

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

const lightGenerator = new LightGenerator(2)

const introPart1 = (): BeatStep[] => [
  createNote(0, lightGenerator.allLightsState(YELLOW, 10)),
  createNote(3, lightGenerator.allLightsState(YELLOW, 15)),
  createNote(3.5, lightGenerator.allLightsState(YELLOW, 10)),
]

const introPart2 = (): BeatStep[] => [
  createNote(0, lightGenerator.allLightsState(YELLOW, 10)),
  createNote(3,
    lightGenerator.allLightsOff()),
]

const yellowFlickerBeat = new Song('Yellow Flicker Beat', 'Lorde', 96, 4, 1000)
  .measure(introPart1())
  .measure(introPart2())
  .measure(introPart1())
  .measure(introPart2())
  .measure([
    createNote(0, lightGenerator.allLightsState(RED, 50)),
    createNote(3, lightGenerator.allLightsState(RED, 55)),
    createNote(3.5, lightGenerator.allLightsState(RED, 50)),
  ])

  // ... I'm a
  .measure([
    createNote(0, lightGenerator.allLightsState(RED, 55)),
    createNote(2, lightGenerator.allLightsOff()),
    createNote(3, lightGenerator.allLightsState(YELLOW, 10)),
    createNote(3.5, lightGenerator.allLightsState(YELLOW, 20)),
  ])

  // princess, cut from mar-
  .measure([
    createNote(0, lightGenerator.allLightsState(YELLOW, 30)),
    createNote(1, lightGenerator.allLightsState(YELLOW, 40)),
    createNote(2, lightGenerator.allLightsState(YELLOW, 50)),
    createNote(3, lightGenerator.allLightsState(YELLOW, 60)),
    createNote(3.5, lightGenerator.allLightsState(YELLOW, 60)),
  ])

  // -ble, smoother than a
  .measure([
    createNote(0, lightGenerator.allLightsState(YELLOW, 30)),
    createNote(1, lightGenerator.allLightsState(YELLOW, 40)),
    createNote(2, lightGenerator.allLightsState(YELLOW, 50)),
    createNote(3, lightGenerator.allLightsState(YELLOW, 60)),
  ])

  // stone ...
  .measure([
    createNote(0, lightGenerator.allLightsState(YELLOW, 30)),
    createNote(1, lightGenerator.allLightsState(YELLOW, 40)),
    createNote(2, lightGenerator.allLightsState(YELLOW, 50)),
    createNote(3, lightGenerator.allLightsState(YELLOW, 60)),
  ])

export default yellowFlickerBeat
