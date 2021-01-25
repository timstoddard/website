import { UIColor } from '../../../hue-color-conversion'
import { BeatStep } from '../../beat-types'
import { createNote, LightGenerator } from './utils'

// flash lights on and off
export const flashLights = (color: UIColor, startBeat: number, endBeat: number, lightGenerator: LightGenerator): BeatStep[] => [
  createNote(startBeat, lightGenerator.allLightsState(color)),
  createNote(endBeat, lightGenerator.allLightsOff()),
]
