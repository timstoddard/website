import { UIColor } from '../../../hue-color-conversion'
import { BeatStep } from '../../beat-types'
import { ColorGenerator, createNote, LightGenerator } from './utils'

// flash lights on and off
export const flashLights = (color: UIColor, startBeat: number, endBeat: number, lightGenerator: LightGenerator): BeatStep[] => [
  createNote(startBeat, lightGenerator.allLightsState(color)),
  createNote(endBeat, lightGenerator.allLightsOff()),
]

export const quarterNotes = (colorGenerator: ColorGenerator, lightGenerator: LightGenerator) => [
  createNote(0, lightGenerator.allLightsState(colorGenerator.next())),
  createNote(1, lightGenerator.allLightsState(colorGenerator.next())),
  createNote(2, lightGenerator.allLightsState(colorGenerator.next())),
  createNote(3, lightGenerator.allLightsState(colorGenerator.next())),
]
