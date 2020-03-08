import { UIColor } from '../../../hue-color-conversion'
import { BeatStep } from '../../beat-types'
import { allLightsOff, allLightsState, createNote } from './utils'

// flash lights on and off
export const flashLights = (color: UIColor, startBeat: number, endBeat: number): BeatStep[] => [
  createNote(startBeat, allLightsState(color)),
  createNote(endBeat, allLightsOff()),
]
