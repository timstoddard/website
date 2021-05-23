/* eslint-disable @typescript-eslint/no-unused-vars */

import { UIColor } from '../../hue-color-conversion'
import { BeatStep } from '../beat-types'
import { Song } from '../song'
import { flashLights, quarterNotes } from './utils/basic-routines'
import { ColorGenerator, createNote, LightGenerator, lightOff, lightState } from './utils/utils'

const MIN_TRANSITION_MS = 100 // TODO make this shared

const PINK = new UIColor(255, 0, 200)
const RED = new UIColor(255, 0, 0)
const ORANGE = new UIColor(255, 120, 0)
const YELLOW = new UIColor(255, 255, 0)
const GREEN = new UIColor(0, 255, 0)
const CYAN = new UIColor(0, 200, 255)
const BLUE = new UIColor(0, 0, 255)
const PURPLE = new UIColor(255, 0, 255) // TODO not actually purple
const WHITE = new UIColor(255, 255, 255)
const BLACK = new UIColor(0, 0, 0)

const lightGenerator = new LightGenerator(2)
const colorRotation1 = new ColorGenerator([RED, ORANGE, YELLOW])

const FOO_MS = 200

const basicBeat = (colorGenerator: ColorGenerator) => [
  createNote(0, lightGenerator.allLightsState(colorGenerator.next())),
  createNote(1, lightGenerator.allLightsState(colorGenerator.next())),
  createNote(2, lightGenerator.allLightsState(colorGenerator.next())),
  createNote(3, lightGenerator.allLightsState(colorGenerator.next())),
  createNote(3.5, lightGenerator.allLightsState(colorGenerator.next())),
]

const risingNotes = (color: UIColor) => [
  createNote(0, lightGenerator.allLightsState(color, (100 / 8 * 1))),
  createNote(0.5, lightGenerator.allLightsState(color, (100 / 8 * 2))),
  createNote(1, lightGenerator.allLightsState(color, (100 / 8 * 3))),
  createNote(1.5, lightGenerator.allLightsState(color, (100 / 8 * 4))),
  createNote(2, lightGenerator.allLightsState(color, (100 / 8 * 5))),
  createNote(2.5, lightGenerator.allLightsState(color, (100 / 8 * 6))),
  createNote(3, lightGenerator.allLightsState(color, (100 / 8 * 7))),
  createNote(3.5, lightGenerator.allLightsState(color, (100 / 8 * 8))),
]

const coolPart = () => [ // TODO rename this
  createNote(0, lightGenerator.allLightsState(BLACK)),
  createNote(1/4, lightGenerator.allLightsState(BLACK, 50), FOO_MS),
  createNote(1.5, lightGenerator.allLightsState(BLACK)),
  createNote(2.5, lightGenerator.allLightsState(BLACK, 50)),
  createNote(3, lightGenerator.allLightsState(BLACK)),
  createNote(3 + (1/3), lightGenerator.allLightsState(BLACK, 60)),
  createNote(3 + (2/3), lightGenerator.allLightsState(BLACK)),
]

const moneyMakeHerSmile = new Song('Money Make Her Smile', 'Bruno Mars', 93, 4, 600)
  .measure([createNote(0, lightGenerator.allLightsState(BLUE, 20), FOO_MS)])
  .measure([createNote(0, lightGenerator.allLightsState(BLUE, 60), FOO_MS)])
  .measure([createNote(0, lightGenerator.allLightsState(BLUE), FOO_MS)])
  .measure([
    createNote(0, lightGenerator.allLightsState(BLUE, 60), FOO_MS),
    createNote(2, lightGenerator.allLightsOff(), FOO_MS),
  ])
  .measure(basicBeat(colorRotation1.reset()))
  .measure(basicBeat(colorRotation1))
  .measure(basicBeat(colorRotation1))
  .measure(basicBeat(colorRotation1))
  .measure(basicBeat(colorRotation1))
  .measure(basicBeat(colorRotation1))
  .measure(basicBeat(colorRotation1))
  .measure([
    ...flashLights(BLUE, 0 * (1/4), 1 * (1/4), lightGenerator),
    ...flashLights(BLUE, 3 * (1/4), 4 * (1/4), lightGenerator),
    ...flashLights(BLUE, 6 * (1/4), 7 * (1/4), lightGenerator),
    ...flashLights(BLUE, 9 * (1/4), 10 * (1/4), lightGenerator),
    createNote(3, lightGenerator.allLightsState(WHITE, 100)),
    createNote(3, lightGenerator.allLightsState(WHITE, 0), MIN_TRANSITION_MS),
  ])
  .measure(risingNotes(PURPLE))
  .measure(risingNotes(BLUE))
  .measure(risingNotes(GREEN))

  // oh it's
  .measure(risingNotes(YELLOW))

  // not complicated so this
  .measure([])

  // won't take a while, you see
  .measure([])

  // music make her dance and
  .measure([])

  // money money money make her smile
  .measure([])

  // (refrain? x4)
  .measure([])
  .measure([])
  .measure([])
  .measure([])

  .measure(quarterNotes(colorRotation1.reset(), lightGenerator))

  .measure([]) // basicBeat(colorRotation1))
  .measure([]) // basicBeat(colorRotation1))
  .measure([]) // basicBeat(colorRotation1))

  .measure([
    // switch lights off for a moment
  ])

  .measure([]) // basicBeat(colorRotation1))
  .measure([]) // basicBeat(colorRotation1))
  .measure([]) // basicBeat(colorRotation1))
  .measure([
    ...flashLights(BLUE, 0 * (1/4), 1 * (1/4), lightGenerator),
    ...flashLights(BLUE, 3 * (1/4), 4 * (1/4), lightGenerator),
    ...flashLights(BLUE, 6 * (1/4), 7 * (1/4), lightGenerator),
    ...flashLights(BLUE, 9 * (1/4), 10 * (1/4), lightGenerator),
    createNote(3, lightGenerator.allLightsState(WHITE, 100)),
    createNote(3, lightGenerator.allLightsState(WHITE, 0), MIN_TRANSITION_MS),
  ])
  .measure(risingNotes(PURPLE))
  .measure(risingNotes(BLUE))
  .measure(risingNotes(GREEN))

  // oh it's
  .measure(risingNotes(YELLOW))

  // not complicated so this
  .measure([])

  // won't take a while, you see
  .measure([])

  // music make her dance and
  .measure([])

  // money money money make her smile
  .measure([])

  // (refrain? x4)
  .measure([])
  .measure([])
  .measure([])
  .measure([])

  // (refrain? x4)
  .measure([])
  .measure([])
  .measure([])
  .measure([])

  // lead into cool part
  .measure([])
  .measure([])
  .measure([])
  .measure([])

  // cool part
  .measure(coolPart())
  .measure(coolPart())
  .measure(coolPart())
  .measure(coolPart())

  // oh it's
  .measure(risingNotes(YELLOW))

  // not complicated so this
  .measure([])

  // won't take a while, you see
  .measure([])

  // music make her dance and
  .measure([])

  // money money money make her smile
  .measure([])

export default moneyMakeHerSmile
