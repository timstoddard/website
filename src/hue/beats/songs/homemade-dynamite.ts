import { UIColor } from '../../hue-color-conversion'
import { BeatStep } from '../beat-types'
import { Song } from '../song'
import { allLightsOff, allLightsState, createNote, lightOff, lightState } from './utils/utils'

const BLUE = new UIColor(0, 0, 255)

const homemadeDynamite = new Song('Homemade Dynamite', 'Lorde', 107, 4, 1000)
  .measure([
    createNote(0, [lightState(BLUE, 10), lightOff()]),
    createNote(1, [lightOff(), lightState(BLUE, 20)]),
    createNote(2, [lightState(BLUE, 30), lightOff()]),
    createNote(3, [lightOff(), lightState(BLUE, 40)]),
  ])
  .measure([
    createNote(0, [lightState(BLUE, 50), lightOff()]),
    createNote(1, [lightOff(), lightState(BLUE, 60)]),
    createNote(2, [lightState(BLUE, 70), lightOff()]),
    createNote(3, [lightOff(), lightState(BLUE, 80)]),
  ])
  .measure([
    createNote(0, [lightState(BLUE, 90), lightOff()]),
    createNote(1, [lightOff(), lightState(BLUE, 100)]),
    createNote(2, [lightState(BLUE, 100), lightOff()]),
    createNote(3, [lightOff(), lightState(BLUE, 100)]),
  ])

export default homemadeDynamite
