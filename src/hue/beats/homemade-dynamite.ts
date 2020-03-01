import { UIColor } from '../hue-color-conversion'
import { BeatTypes } from './beat-types'

const song = [
  {
    time: 0,
    lights: {
      4: {
        on: true,
        color: new UIColor(0, 0, 255),
        brightness: 10,
      },
      6: {
        on: false,
      },
    },
  },
  {
    time: BeatTypes.ONE_BEAT,
    lights: {
      4: {
        on: false,
      },
      6: {
        on: true,
        color: new UIColor(0, 0, 255),
        brightness: 20,
      },
    },
  },
  {
    time: BeatTypes.ONE_BEAT * 2,
    lights: {
      4: {
        on: true,
        color: new UIColor(0, 0, 255),
        brightness: 30,
      },
      6: {
        on: false,
      },
    },
  },
  {
    time: BeatTypes.ONE_BEAT * 3,
    lights: {
      4: {
        on: false,
      },
      6: {
        on: true,
        color: new UIColor(0, 0, 255),
        brightness: 40,
      },
    },
  },
  {
    time: BeatTypes.ONE_BEAT * 4,
    lights: {
      4: {
        on: true,
        color: new UIColor(0, 0, 255),
        brightness: 50,
      },
      6: {
        on: false,
      },
    },
  },
  {
    time: BeatTypes.ONE_BEAT * 5,
    lights: {
      4: {
        on: false,
      },
      6: {
        on: true,
        color: new UIColor(0, 0, 255),
        brightness: 60,
      },
    },
  },
  {
    time: BeatTypes.ONE_BEAT * 6,
    lights: {
      4: {
        on: true,
        color: new UIColor(0, 0, 255),
        brightness: 70,
      },
      6: {
        on: false,
      },
    },
  },
  {
    time: BeatTypes.ONE_BEAT * 7,
    lights: {
      4: {
        on: false,
      },
      6: {
        on: true,
        color: new UIColor(0, 0, 255),
        brightness: 80,
      },
    },
  },
  {
    time: BeatTypes.ONE_BEAT * 8,
    lights: {
      4: {
        on: true,
        color: new UIColor(0, 0, 255),
        brightness: 90,
      },
      6: {
        on: false,
      },
    },
  },
  {
    time: BeatTypes.ONE_BEAT * 9,
    lights: {
      4: {
        on: false,
      },
      6: {
        on: true,
        color: new UIColor(0, 0, 255),
        brightness: 100,
      },
    },
  },
  {
    time: BeatTypes.ONE_BEAT * 10,
    lights: {
      4: {
        on: true,
        color: new UIColor(0, 0, 255),
        brightness: 100,
      },
      6: {
        on: false,
      },
    },
  },
  {
    time: BeatTypes.ONE_BEAT * 11,
    lights: {
      4: {
        on: false,
      },
      6: {
        on: true,
        color: new UIColor(0, 0, 255),
        brightness: 100,
      },
    },
  },
]

export default song
