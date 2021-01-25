import { UIColor } from '../../hue-color-conversion'
import { BeatStep } from '../beat-types'
import { Song } from '../song'
import { createNote, LightGenerator } from './utils/utils'

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
  createNote(0, lightGenerator.allLightsState(BLUE)),
  createNote(0.5, lightGenerator.allLightsState(BLUE, 60)),
  createNote(1, lightGenerator.allLightsState(BLUE)),
  createNote(1.5, lightGenerator.allLightsState(BLUE, 60)),
  createNote(2, lightGenerator.allLightsState(RED)),
  createNote(2.5, lightGenerator.allLightsState(BLUE, 60)),
  createNote(3, lightGenerator.allLightsState(RED)),
  createNote(3.5, lightGenerator.allLightsState(BLUE, 60)),
]

const introPart2 = (): BeatStep[] => [
  createNote(0, lightGenerator.allLightsState(RED)),
  createNote(0.5, lightGenerator.allLightsState(BLUE, 60)),
  createNote(1, lightGenerator.allLightsState(RED)),
  createNote(1.5, lightGenerator.allLightsState(BLUE, 60)),
  createNote(2, lightGenerator.allLightsState(RED)),
  createNote(2.5, lightGenerator.allLightsState(RED, 60)),
  createNote(3, lightGenerator.allLightsState(RED)),
  createNote(3.5, lightGenerator.allLightsState(BLUE, 60)),
]

const introPart3 = (): BeatStep[] => [
  createNote(0, lightGenerator.allLightsState(RED)),
  createNote(0.5, lightGenerator.allLightsState(BLUE, 60)),
  createNote(1, lightGenerator.allLightsState(BLUE)),
  createNote(1.5, lightGenerator.allLightsState(BLUE, 60)),
  createNote(2, lightGenerator.allLightsState(BLUE)),
  createNote(2.5, lightGenerator.allLightsState(BLUE, 60)),
  createNote(3, lightGenerator.allLightsState(BLUE)),
  createNote(3.5, lightGenerator.allLightsState(BLUE, 60)),
]

const introPart4 = (): BeatStep[] => [
  createNote(0, lightGenerator.allLightsState(BLUE)),
  createNote(0.5, lightGenerator.allLightsState(BLUE, 60)),
  createNote(1, lightGenerator.allLightsState(BLUE)),
  createNote(1.5, lightGenerator.allLightsState(BLUE, 60)),
  createNote(2, lightGenerator.allLightsState(BLUE)),
  createNote(2.5, lightGenerator.allLightsState(BLUE, 60)),
  createNote(3, lightGenerator.allLightsState(BLUE)),
  createNote(3.5, lightGenerator.allLightsState(BLUE, 60)),
]

const bitingDown = new Song('Biting Down', 'Lorde', 116, 4, 600)
  .measure([
    createNote(0, lightGenerator.allLightsState(BLUE, 10)),
    createNote(0.5, lightGenerator.allLightsOff()),
    createNote(1, lightGenerator.allLightsState(BLUE, 20)),
    createNote(1.5, lightGenerator.allLightsOff()),
    createNote(2, lightGenerator.allLightsState(BLUE, 30)),
    createNote(2.5, lightGenerator.allLightsOff()),
    createNote(3, lightGenerator.allLightsState(BLUE, 40)),
    createNote(3.5, lightGenerator.allLightsOff()),
  ])
  .measure([
    createNote(0, lightGenerator.allLightsState(BLUE, 50)),
    createNote(0.5, lightGenerator.allLightsOff()),
    createNote(1, lightGenerator.allLightsState(BLUE, 60)),
    createNote(1.5, lightGenerator.allLightsOff()),
    createNote(2, lightGenerator.allLightsState(BLUE, 70)),
    createNote(2.5, lightGenerator.allLightsOff()),
    createNote(3, lightGenerator.allLightsState(BLUE, 80)),
    createNote(3.5, lightGenerator.allLightsOff()),
  ])

  // it feels
  .measure([
    createNote(0, lightGenerator.allLightsState(BLUE, 90)),
    createNote(0.5, lightGenerator.allLightsOff()),
    createNote(1, lightGenerator.allLightsState(BLUE)),
    createNote(1.5, lightGenerator.allLightsState(BLUE, 10)),
    createNote(2, lightGenerator.allLightsState(RED)),
    createNote(2.5, lightGenerator.allLightsState(BLUE, 20)),
    createNote(3, lightGenerator.allLightsState(RED)),
    createNote(3.5, lightGenerator.allLightsState(BLUE, 30)),
  ])

  // better biting
  .measure([
    createNote(0, lightGenerator.allLightsState(RED)),
    createNote(0.5, lightGenerator.allLightsState(BLUE, 40)),
    createNote(1, lightGenerator.allLightsState(RED)),
    createNote(1.5, lightGenerator.allLightsState(BLUE, 50)),
    createNote(2, lightGenerator.allLightsState(RED)),
    createNote(2.5, lightGenerator.allLightsState(RED, 60)),
    createNote(3, lightGenerator.allLightsState(RED)),
    createNote(3.5, lightGenerator.allLightsState(BLUE, 60)),
  ])

  // down
  .measure([
    createNote(0, lightGenerator.allLightsState(RED)),
    createNote(0.5, lightGenerator.allLightsState(BLUE, 40)),
    createNote(1, lightGenerator.allLightsState(BLUE)),
    createNote(1.5, lightGenerator.allLightsState(BLUE, 50)),
    createNote(2, lightGenerator.allLightsState(BLUE)),
    createNote(2.5, lightGenerator.allLightsState(BLUE, 60)),
    createNote(3, lightGenerator.allLightsState(BLUE)),
    createNote(3.5, lightGenerator.allLightsState(BLUE, 60)),
  ])
  .measure(introPart4())

  // it feels
  .measure(introPart1())

  // better biting
  .measure(introPart2())

  // down
  .measure(introPart3())
  .measure(introPart4())

  // it feels
  .measure(introPart1())

  // better biting
  .measure(introPart2())

  // down
  .measure(introPart3())
  .measure(introPart4())

  // TODO
  .measure([])

export default bitingDown
