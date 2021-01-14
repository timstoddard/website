import { UIColor } from '../../hue-color-conversion'
import { BeatStep, BeatTypes } from '../beat-types'
import { Song } from '../song'
import { allLightsOff, allLightsState, createNote } from './utils/utils'

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
  createNote(0,
    allLightsState(BLUE)),
  createNote(BeatTypes.HALF_BEAT,
    allLightsState(BLUE, 60)),
  createNote(BeatTypes.ONE_BEAT,
    allLightsState(BLUE)),
  createNote(BeatTypes.ONE_BEAT + BeatTypes.HALF_BEAT,
    allLightsState(BLUE, 60)),
  createNote(BeatTypes.ONE_BEAT * 2,
    allLightsState(RED)),
  createNote(BeatTypes.ONE_BEAT * 2 + BeatTypes.HALF_BEAT,
    allLightsState(BLUE, 60)),
  createNote(BeatTypes.ONE_BEAT * 3,
    allLightsState(RED)),
  createNote(BeatTypes.ONE_BEAT * 3 + BeatTypes.HALF_BEAT,
    allLightsState(BLUE, 60)),
]

const introPart2 = (): BeatStep[] => [
  createNote(0,
    allLightsState(RED)),
  createNote(BeatTypes.HALF_BEAT,
    allLightsState(BLUE, 60)),
  createNote(BeatTypes.ONE_BEAT,
    allLightsState(RED)),
  createNote(BeatTypes.ONE_BEAT + BeatTypes.HALF_BEAT,
    allLightsState(BLUE, 60)),
  createNote(BeatTypes.ONE_BEAT * 2,
    allLightsState(RED)),
  createNote(BeatTypes.ONE_BEAT * 2 + BeatTypes.HALF_BEAT,
    allLightsState(RED, 60)),
  createNote(BeatTypes.ONE_BEAT * 3,
    allLightsState(RED)),
  createNote(BeatTypes.ONE_BEAT * 3 + BeatTypes.HALF_BEAT,
    allLightsState(BLUE, 60)),
]

const introPart3 = (): BeatStep[] => [
  createNote(0,
    allLightsState(RED)),
  createNote(BeatTypes.HALF_BEAT,
    allLightsState(BLUE, 60)),
  createNote(BeatTypes.ONE_BEAT,
    allLightsState(BLUE)),
  createNote(BeatTypes.ONE_BEAT + BeatTypes.HALF_BEAT,
    allLightsState(BLUE, 60)),
  createNote(BeatTypes.ONE_BEAT * 2,
    allLightsState(BLUE)),
  createNote(BeatTypes.ONE_BEAT * 2 + BeatTypes.HALF_BEAT,
    allLightsState(BLUE, 60)),
  createNote(BeatTypes.ONE_BEAT * 3,
    allLightsState(BLUE)),
  createNote(BeatTypes.ONE_BEAT * 3 + BeatTypes.HALF_BEAT,
    allLightsState(BLUE, 60)),
]

const introPart4 = (): BeatStep[] => [
  createNote(0,
    allLightsState(BLUE)),
  createNote(BeatTypes.HALF_BEAT,
    allLightsState(BLUE, 60)),
  createNote(BeatTypes.ONE_BEAT,
    allLightsState(BLUE)),
  createNote(BeatTypes.ONE_BEAT + BeatTypes.HALF_BEAT,
    allLightsState(BLUE, 60)),
  createNote(BeatTypes.ONE_BEAT * 2,
    allLightsState(BLUE)),
  createNote(BeatTypes.ONE_BEAT * 2 + BeatTypes.HALF_BEAT,
    allLightsState(BLUE, 60)),
  createNote(BeatTypes.ONE_BEAT * 3,
    allLightsState(BLUE)),
  createNote(BeatTypes.ONE_BEAT * 3 + BeatTypes.HALF_BEAT,
    allLightsState(BLUE, 60)),
]

const bitingDown = new Song('Biting Down', 'Lorde', 116, 4, 600)
  .measure(0, [
    createNote(0,
      allLightsState(BLUE, 10)),
    createNote(BeatTypes.HALF_BEAT,
      allLightsOff()),
    createNote(BeatTypes.ONE_BEAT,
      allLightsState(BLUE, 20)),
    createNote(BeatTypes.ONE_BEAT + BeatTypes.HALF_BEAT,
      allLightsOff()),
    createNote(BeatTypes.ONE_BEAT * 2,
      allLightsState(BLUE, 30)),
    createNote(BeatTypes.ONE_BEAT * 2 + BeatTypes.HALF_BEAT,
      allLightsOff()),
    createNote(BeatTypes.ONE_BEAT * 3,
      allLightsState(BLUE, 40)),
    createNote(BeatTypes.ONE_BEAT * 3 + BeatTypes.HALF_BEAT,
      allLightsOff()),
  ])
  .measure(1, [
    createNote(0,
      allLightsState(BLUE, 50)),
    createNote(BeatTypes.HALF_BEAT,
      allLightsOff()),
    createNote(BeatTypes.ONE_BEAT,
      allLightsState(BLUE, 60)),
    createNote(BeatTypes.ONE_BEAT + BeatTypes.HALF_BEAT,
      allLightsOff()),
    createNote(BeatTypes.ONE_BEAT * 2,
      allLightsState(BLUE, 70)),
    createNote(BeatTypes.ONE_BEAT * 2 + BeatTypes.HALF_BEAT,
      allLightsOff()),
    createNote(BeatTypes.ONE_BEAT * 3,
      allLightsState(BLUE, 80)),
    createNote(BeatTypes.ONE_BEAT * 3 + BeatTypes.HALF_BEAT,
      allLightsOff()),
  ])

  // it feels
  .measure(2, [
    createNote(0,
      allLightsState(BLUE, 90)),
    createNote(BeatTypes.HALF_BEAT,
      allLightsOff()),
    createNote(BeatTypes.ONE_BEAT,
      allLightsState(BLUE)),
    createNote(BeatTypes.ONE_BEAT + BeatTypes.HALF_BEAT,
      allLightsState(BLUE, 10)),
    createNote(BeatTypes.ONE_BEAT * 2,
      allLightsState(RED)),
    createNote(BeatTypes.ONE_BEAT * 2 + BeatTypes.HALF_BEAT,
      allLightsState(BLUE, 20)),
    createNote(BeatTypes.ONE_BEAT * 3,
      allLightsState(RED)),
    createNote(BeatTypes.ONE_BEAT * 3 + BeatTypes.HALF_BEAT,
      allLightsState(BLUE, 30)),
  ])

  // better biting
  .measure(3, [
    createNote(0,
      allLightsState(RED)),
    createNote(BeatTypes.HALF_BEAT,
      allLightsState(BLUE, 40)),
    createNote(BeatTypes.ONE_BEAT,
      allLightsState(RED)),
    createNote(BeatTypes.ONE_BEAT + BeatTypes.HALF_BEAT,
      allLightsState(BLUE, 50)),
    createNote(BeatTypes.ONE_BEAT * 2,
      allLightsState(RED)),
    createNote(BeatTypes.ONE_BEAT * 2 + BeatTypes.HALF_BEAT,
      allLightsState(RED, 60)),
    createNote(BeatTypes.ONE_BEAT * 3,
      allLightsState(RED)),
    createNote(BeatTypes.ONE_BEAT * 3 + BeatTypes.HALF_BEAT,
      allLightsState(BLUE, 60)),
  ])

  // down
  .measure(4, [
    createNote(0,
      allLightsState(RED)),
    createNote(BeatTypes.HALF_BEAT,
      allLightsState(BLUE, 40)),
    createNote(BeatTypes.ONE_BEAT,
      allLightsState(BLUE)),
    createNote(BeatTypes.ONE_BEAT + BeatTypes.HALF_BEAT,
      allLightsState(BLUE, 50)),
    createNote(BeatTypes.ONE_BEAT * 2,
      allLightsState(BLUE)),
    createNote(BeatTypes.ONE_BEAT * 2 + BeatTypes.HALF_BEAT,
      allLightsState(BLUE, 60)),
    createNote(BeatTypes.ONE_BEAT * 3,
      allLightsState(BLUE)),
    createNote(BeatTypes.ONE_BEAT * 3 + BeatTypes.HALF_BEAT,
      allLightsState(BLUE, 60)),
  ])
  .measure(5, introPart4())

  // it feels
  .measure(6, introPart1())

  // better biting
  .measure(7, introPart2())

  // down
  .measure(8, introPart3())
  .measure(9, introPart4())

  // it feels
  .measure(10, introPart1())

  // better biting
  .measure(11, introPart2())

  // down
  .measure(12, introPart3())
  .measure(13, introPart4())

  // TODO
  .measure(14, [])

export default bitingDown
