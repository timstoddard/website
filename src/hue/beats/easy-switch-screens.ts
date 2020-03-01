import { UIColor } from '../hue-color-conversion'
import { BeatStep, BeatTypes, LightState } from './beat-types'
import { Song } from './song'

const RED = new UIColor(255, 0, 0)
const RED_ORANGE = new UIColor(255, 60, 0)
const ORANGE = new UIColor(255, 120, 0)
const YELLOW = new UIColor(255, 255, 0)
const GREEN = new UIColor(0, 255, 0)
const BLUE = new UIColor(0, 0, 255)
const PURPLE = new UIColor(255, 0, 255)
const WHITE = new UIColor(255, 255, 255)
const BLACK = new UIColor(0, 0, 0)

// a note in a measure
const createNote = (beat: number, lights: LightState[]): BeatStep => ({ beat, lights })

// control single light
const lightState = (
  color: UIColor,
  brightness: number = 100,
): LightState => ({
  on: true,
  color,
  brightness,
})
const lightOff = (): any => ({ on: false })

// controls all lights
const allLightsState = (
  color: UIColor,
  brightness: number = 100,
): LightState[] => [
  lightState(color, brightness),
  lightState(color, brightness),
]
const allLightsOff = (): LightState[] => ([
  lightOff(),
  lightOff(),
])

// flash lights on and off
const flashLights = (color: UIColor, startBeat: number, endBeat: number): BeatStep[] => [
  createNote(startBeat, allLightsState(color)),
  createNote(endBeat, allLightsOff()),
]

const chorusIntro1 = (): BeatStep[] => [
  createNote(0, [
    lightState(BLACK),
    lightState(BLACK),
  ]),
  createNote(BeatTypes.ONE_BEAT, [
    lightState(WHITE),
    lightState(WHITE),
  ]),
  createNote(BeatTypes.ONE_BEAT * 2, [
    lightState(BLACK),
    lightState(BLACK),
  ]),
  createNote(BeatTypes.ONE_BEAT * 2 + BeatTypes.HALF_BEAT, [
    lightState(WHITE),
    lightState(WHITE),
  ]),
  createNote(BeatTypes.ONE_BEAT * 3, [
    lightState(BLACK),
    lightState(BLACK),
  ]),
  createNote(BeatTypes.ONE_BEAT * 3 + BeatTypes.HALF_BEAT, [
    lightState(WHITE),
    lightState(WHITE),
  ]),
]

const chorusIntro2 = (): BeatStep[] => [
  createNote(0, [
    lightState(BLACK),
    lightState(BLACK),
  ]),
  createNote(BeatTypes.ONE_BEAT, [
    lightState(WHITE),
    lightState(WHITE),
  ]),
  createNote(BeatTypes.ONE_BEAT + BeatTypes.QUARTER_BEAT * 2, [
    lightState(WHITE /* BLACK */),
    lightOff(),
  ]),
  createNote(BeatTypes.ONE_BEAT + BeatTypes.QUARTER_BEAT * 3, [
    lightOff(),
    lightState(WHITE /* BLACK */),
  ]),
  createNote(BeatTypes.ONE_BEAT * 2 + BeatTypes.THIRD_BEAT, [
    lightState(WHITE /* BLACK */),
    lightOff(),
  ]),
  createNote(BeatTypes.ONE_BEAT * 3 + BeatTypes.HALF_BEAT, [
    lightOff(),
    lightState(WHITE /* BLACK */),
  ]),
]

const easyPart1 = (): BeatStep[] => [
  createNote(0,
    allLightsState(RED)),
  createNote(BeatTypes.ONE_BEAT,
    allLightsState(RED, 50)),
]

const easyPart2 = (): BeatStep[] => [
  createNote(0, allLightsOff()),
  createNote(BeatTypes.ONE_BEAT + BeatTypes.QUARTER_BEAT * 2, [
    lightState(RED),
    lightOff(),
  ]),
  createNote(BeatTypes.ONE_BEAT + BeatTypes.QUARTER_BEAT * 3, [
    lightOff(),
    lightState(RED),
  ]),
  createNote(BeatTypes.ONE_BEAT * 2 + BeatTypes.THIRD_BEAT, [
    lightState(RED),
    lightOff(),
  ]),
  createNote(BeatTypes.ONE_BEAT * 3 + BeatTypes.HALF_BEAT, [
    lightOff(),
    lightState(RED),
  ]),
]

const song = new Song(146, 4, 700)
const easySwitchScreens = song
  .measure(0, chorusIntro1())
  .measure(1, chorusIntro2())
  .measure(2, chorusIntro1())
  .measure(3, chorusIntro2())
  .measure(4, chorusIntro1())
  .measure(5, chorusIntro2())
  .measure(6, chorusIntro1())
  .measure(7, chorusIntro2())
  .measure(8, [
    createNote(0, allLightsState(RED)),
    ...flashLights(RED, BeatTypes.ONE_BEAT, BeatTypes.ONE_BEAT + BeatTypes.HALF_BEAT),
    ...flashLights(RED, BeatTypes.ONE_BEAT * 2, BeatTypes.ONE_BEAT * 2 + BeatTypes.HALF_BEAT),
    ...flashLights(RED, BeatTypes.ONE_BEAT * 3, BeatTypes.ONE_BEAT * 3 + BeatTypes.HALF_BEAT),
  ])
  .measure(9, chorusIntro2())
  .measure(10, chorusIntro1())
  .measure(11, chorusIntro2())
  .measure(12, chorusIntro1())
  .measure(13, chorusIntro2())
  .measure(14, chorusIntro1())
  .measure(15, chorusIntro2())

  // easy
  .measure(16, easyPart1())
  .measure(17, easyPart2())

  // easy
  .measure(18, easyPart1())
  .measure(19, easyPart2())

  .measure(20, [
    createNote(0,
      allLightsOff()),
    createNote(BeatTypes.ONE_BEAT,
      allLightsState(RED, 30)),
    createNote(BeatTypes.ONE_BEAT * 2,
      allLightsState(RED, 60)),
    createNote(BeatTypes.ONE_BEAT * 3,
      allLightsState(RED)),
  ])
  .measure(21, [
    createNote(0,
      allLightsState(RED)),
    createNote(BeatTypes.ONE_BEAT,
      allLightsState(RED, 60)),
    createNote(BeatTypes.ONE_BEAT * 2,
      allLightsState(RED, 30)),
    createNote(BeatTypes.ONE_BEAT * 3,
      allLightsOff()),
  ])
  .measure(22, [
    createNote(0,
      allLightsState(RED)),
    createNote(BeatTypes.ONE_BEAT,
      allLightsState(RED, 60)),
    createNote(BeatTypes.ONE_BEAT * 2,
      allLightsState(RED, 30)),
    createNote(BeatTypes.ONE_BEAT * 3,
      allLightsOff()),
  ])
  .measure(23, [
    createNote(0,
      allLightsOff()),
    createNote(BeatTypes.ONE_BEAT,
      allLightsState(RED, 30)),
    createNote(BeatTypes.ONE_BEAT * 2,
      allLightsState(RED, 60)),
    createNote(BeatTypes.ONE_BEAT * 3,
      allLightsState(RED)),
  ])

  // easy
  .measure(24, easyPart1())
  .measure(25, easyPart2())

  // easy
  .measure(26, easyPart1())
  .measure(27, easyPart2())

  .measure(28, [
    createNote(0,
      allLightsOff()),
    createNote(BeatTypes.ONE_BEAT,
      allLightsState(RED, 30)),
    createNote(BeatTypes.ONE_BEAT * 2,
      allLightsState(RED, 60)),
    createNote(BeatTypes.ONE_BEAT * 3,
      allLightsState(RED)),
  ])
  .measure(29, [
    createNote(0,
      allLightsState(RED)),
    createNote(BeatTypes.ONE_BEAT,
      allLightsState(RED, 60)),
    createNote(BeatTypes.ONE_BEAT * 2,
      allLightsState(RED, 30)),
    createNote(BeatTypes.ONE_BEAT * 3,
      allLightsOff()),
  ])
  .measure(30, [
    createNote(0,
      allLightsState(RED)),
    createNote(BeatTypes.ONE_BEAT,
      allLightsState(RED, 60)),
    createNote(BeatTypes.ONE_BEAT * 2,
      allLightsState(RED, 30)),
    createNote(BeatTypes.ONE_BEAT * 3,
      allLightsOff()),
  ])
  .measure(31, [
    createNote(0,
      allLightsOff()),
    createNote(BeatTypes.ONE_BEAT,
      allLightsState(RED, 30)),
    createNote(BeatTypes.ONE_BEAT * 2,
      allLightsState(RED, 60)),
    createNote(BeatTypes.ONE_BEAT * 3,
      allLightsState(RED)),
  ])

  // easy (variation)
  .measure(32, [
    createNote(0,
      allLightsState(RED)),
    createNote(BeatTypes.ONE_BEAT,
      allLightsState(PURPLE)),
    createNote(BeatTypes.ONE_BEAT * 3,
      allLightsState(PURPLE, 30)),
    createNote(BeatTypes.ONE_BEAT * 3 + BeatTypes.HALF_BEAT,
      allLightsState(PURPLE, 60)),
  ])
  .measure(33, [
    createNote(0,
      allLightsState(PURPLE)),
  ])

  .measure(34, [
    createNote(0,
      allLightsState(PURPLE, 30)),
  ])
  .measure(35, [])
  .measure(36, [])
  .measure(37, [])
  .measure(38, [])
  .measure(39, [])
  .measure(40, [])
  .measure(41, [])
  .getSteps()

export default easySwitchScreens
