import { UIColor } from '../../hue-color-conversion'
import { BeatStep, BeatTypes } from '../beat-types'
import { Song } from '../song'
import { allLightsOff, allLightsState, createNote, lightOff, lightState } from './utils/utils'

const PINK = new UIColor(255, 0, 200)
// const RED = new UIColor(255, 0, 0)
const ORANGE = new UIColor(255, 120, 0)
const YELLOW = new UIColor(255, 255, 0)
const GREEN = new UIColor(0, 255, 0)
const CYAN = new UIColor(0, 200, 255)
// const BLUE = new UIColor(0, 0, 255)
// const PURPLE = new UIColor(255, 0, 255)
const WHITE = new UIColor(255, 255, 255)
const BLACK = new UIColor(0, 0, 0)

const combineBeatsWithColors = (beats: BeatTypes[], colors: UIColor[]): BeatStep[] => {
  const steps = []
  for (let i = 0; i < beats.length; i++) {
    steps.push(createNote(beats[i], allLightsState(colors[i % colors.length])))
  }
  return steps
}

const instrumentalPart1 = (colors: UIColor[]): BeatStep[] => {
  const beats = [
    0,
    BeatTypes.ONE_BEAT + BeatTypes.HALF_BEAT,
    BeatTypes.ONE_BEAT * 2,
    BeatTypes.ONE_BEAT * 3,
  ]
  return combineBeatsWithColors(beats, colors)
}

const instrumentalPart2 = (colors: UIColor[]): BeatStep[] => {
  const beats = [
    BeatTypes.ONE_BEAT,
    BeatTypes.ONE_BEAT * 2 + BeatTypes.HALF_BEAT,
    BeatTypes.ONE_BEAT * 3,
  ]
  return combineBeatsWithColors(beats, colors)
}

const chorusBeat1 = (colors: UIColor[]): BeatStep[] => {
  const beats = [
    0,
    BeatTypes.ONE_BEAT + BeatTypes.HALF_BEAT,
    BeatTypes.ONE_BEAT * 2,
    BeatTypes.ONE_BEAT * 3,
  ]
  return combineBeatsWithColors(beats, colors)
}

const chorusBeat2 = (colors: UIColor[]): BeatStep[] => {
  const beats = [
    BeatTypes.HALF_BEAT,
    BeatTypes.ONE_BEAT,
    BeatTypes.ONE_BEAT * 2,
  ]
  return combineBeatsWithColors(beats, colors)
}

const chorusPart1 = (colors: UIColor[]): BeatStep[] => {
  const beats = [
    0,
    0.5,
    1,
    2,
    3,
    3.5,
  ]
  return combineBeatsWithColors(beats, colors)
}

const chorusPart2 = (colors: UIColor[]): BeatStep[] => {
  const beats = [
    0,
    1,
    1.5,
    2,
    2.5,
    3.5,
  ]
  return combineBeatsWithColors(beats, colors)
}

const chorusPart3 = (colors: UIColor[]): BeatStep[] => {
  const beats = [
    0,
    0.5,
    1,
    1.5,
    2,
    2.5,
    3,
  ]
  return combineBeatsWithColors(beats, colors)
}

const chorusPart4 = (colors: UIColor[]): BeatStep[] => {
  const beats = [
    0,
    1,
    2,
    2.5,
    3.5,
  ]
  return combineBeatsWithColors(beats, colors)
}

const chorusPart5 = (colors: UIColor[]): BeatStep[] => {
  const beats = [
    0,
    1,
    1.5,
    2,
    3,
  ]
  return combineBeatsWithColors(beats, colors)
}

const chorusPart6 = (colors: UIColor[]): BeatStep[] => {
  const beats = [
    0,
    1,
    1.5,
    2,
    3.5,
  ]
  return combineBeatsWithColors(beats, colors)
}

// TODO dup of 5
const chorusPart7 = (colors: UIColor[]): BeatStep[] => {
  const beats = [
    0,
    1,
    1.5,
    2,
    3,
  ]
  return combineBeatsWithColors(beats, colors)
}

const chorusPart8 = (colors: UIColor[]): BeatStep[] => {
  const beats = [
    0,
    1,
    1.5,
    2,
  ]
  return [
    ...combineBeatsWithColors(beats, colors),
    createNote(3, allLightsOff()),
  ]
}

const beezInTheTrap = new Song('Beez In The Trap', 'Nicki Minaj', 150, 4, 400)
  .measure(0, instrumentalPart1([PINK, GREEN]))
  .measure(1, instrumentalPart2([PINK, GREEN]))
  .measure(2, instrumentalPart1([GREEN, PINK]))
  .measure(3, instrumentalPart2([GREEN, PINK]))
  .measure(4, instrumentalPart1([ORANGE, CYAN]))
  .measure(5, instrumentalPart2([ORANGE, CYAN]))
  .measure(6, instrumentalPart1([CYAN, ORANGE]))
  .measure(7, instrumentalPart2([CYAN, ORANGE]))

  // bitches say shit...
  .measure(8, chorusBeat1([PINK, ORANGE, GREEN]))
  .measure(9, chorusBeat2([ORANGE, GREEN, PINK]))
  .measure(10, chorusBeat1([ORANGE, GREEN, PINK]))
  .measure(11, chorusBeat2([GREEN, PINK, ORANGE]))
  .measure(12, chorusBeat1([CYAN, PINK, ORANGE]))
  .measure(13, chorusBeat2([PINK, ORANGE, CYAN]))
  .measure(14, chorusBeat1([PINK, ORANGE, CYAN]))
  .measure(15, chorusBeat2([ORANGE, CYAN, PINK]))

  // bitches say shit...
  .measure(16, chorusBeat1([ORANGE, GREEN, PINK]))
  .measure(17, chorusBeat2([GREEN, PINK, ORANGE]))
  .measure(18, chorusBeat1([GREEN, PINK, ORANGE]))
  .measure(19, chorusBeat2([PINK, ORANGE, GREEN]))
  .measure(20, chorusBeat1([PINK, ORANGE, CYAN]))
  .measure(21, chorusBeat2([ORANGE, CYAN, PINK]))
  .measure(22, chorusBeat1([ORANGE, CYAN, PINK]))
  .measure(23, chorusBeat2([CYAN, PINK, ORANGE]))

  // man I been popped off...
  .measure(24, instrumentalPart1([PINK, GREEN]))
  .measure(25, instrumentalPart2([PINK, GREEN]))
  .measure(26, instrumentalPart1([GREEN, PINK]))
  .measure(27, instrumentalPart2([GREEN, PINK]))
  .measure(28, instrumentalPart1([ORANGE, CYAN]))
  .measure(29, instrumentalPart2([ORANGE, CYAN]))
  .measure(30, instrumentalPart1([CYAN, ORANGE]))
  .measure(31, instrumentalPart2([CYAN, ORANGE]))

  // rip it off no jokin...
  .measure(32, chorusBeat1([PINK, ORANGE, GREEN]))
  .measure(33, chorusBeat2([ORANGE, GREEN, PINK]))
  .measure(34, chorusBeat1([ORANGE, GREEN, PINK]))
  .measure(35, chorusBeat2([GREEN, PINK, ORANGE]))
  .measure(36, chorusBeat1([CYAN, PINK, ORANGE]))
  .measure(37, chorusBeat2([PINK, ORANGE, CYAN]))
  .measure(38, chorusBeat1([PINK, ORANGE, CYAN]))
  .measure(39, chorusBeat2([ORANGE, CYAN, PINK]))

  // bitches say shit...
  .measure(40, chorusPart1([PINK, CYAN, GREEN]))
  .measure(41, chorusPart2([PINK, CYAN, GREEN]))
  .measure(42, chorusPart3([PINK, CYAN, GREEN]))
  .measure(43, chorusPart4([CYAN, GREEN, PINK]))
  .measure(44, chorusPart5([PINK, CYAN, GREEN]))
  .measure(45, chorusPart6([GREEN, PINK, CYAN]))
  .measure(46, chorusPart7([CYAN, GREEN, PINK]))
  .measure(47, chorusPart8([PINK, CYAN, GREEN]))

  // bitches say shit...
  .measure(48, chorusPart1([PINK, CYAN, GREEN]))
  .measure(49, chorusPart2([PINK, CYAN, GREEN]))
  .measure(50, chorusPart3([PINK, CYAN, GREEN]))
  .measure(51, chorusPart4([CYAN, GREEN, PINK]))
  .measure(52, chorusPart5([PINK, CYAN, GREEN]))
  .measure(53, chorusPart6([GREEN, PINK, CYAN]))
  .measure(54, chorusPart7([CYAN, GREEN, PINK]))
  .measure(55, chorusPart8([PINK, CYAN, GREEN]))

  // nicki nicki nicki
  .measure(56, [
    createNote(0, [
      lightState(ORANGE),
      lightOff(),
    ]),
    createNote(0.5, [
      lightOff(),
      lightState(ORANGE),
    ]),
    createNote(1, [
      lightState(ORANGE),
      lightOff(),
    ]),
    createNote(1.5, [
      lightOff(),
      lightState(ORANGE),
    ]),
    createNote(2, [
      lightState(ORANGE),
      lightOff(),
    ]),
    createNote(2.5, [
      lightOff(),
      lightState(ORANGE),
    ]),
  ])

  // put it in your kidney, got a
  .measure(57, [
    createNote(0,
      allLightsState(ORANGE)),
    createNote(0.5,
      allLightsState(WHITE)),
    createNote(1,
      allLightsState(ORANGE)),
    createNote(1.5,
      allLightsState(WHITE)),
    createNote(2,
      allLightsState(ORANGE)),
    createNote(2.5,
      allLightsState(WHITE)),
    createNote(3,
      allLightsState(ORANGE)),
    createNote(3.5,
      allLightsState(WHITE)),
  ])

  // new LS 450, ain't no
  .measure(58, [
    createNote(0,
      allLightsState(ORANGE)),
    createNote(0.5,
      allLightsState(WHITE)),
    createNote(1,
      allLightsState(ORANGE)),
    createNote(1.5,
      allLightsState(WHITE)),
    createNote(2,
      allLightsState(ORANGE)),
    createNote(2.5,
      allLightsState(WHITE)),
    createNote(3,
      allLightsState(ORANGE)),
    createNote(3.5,
      allLightsState(WHITE)),
  ])

  // keys in this doohickey, if I weren't
  .measure(59, [
    createNote(0,
      allLightsState(ORANGE)),
    createNote(0.5,
      allLightsState(WHITE)),
    createNote(1,
      allLightsState(ORANGE)),
    createNote(1.5,
      allLightsState(WHITE)),
    createNote(2,
      allLightsState(ORANGE)),
    createNote(2.5,
      allLightsState(WHITE)),
    createNote(3,
      allLightsState(ORANGE)),
    createNote(3.5,
      allLightsState(WHITE)),
  ])

  // rapping I'd be trapping, if I weren't
  .measure(60, [
    createNote(0,
      allLightsState(ORANGE)),
    createNote(0.5,
      allLightsState(WHITE)),
    createNote(1,
      allLightsState(ORANGE)),
    createNote(1.5,
      allLightsState(WHITE)),
    createNote(2,
      allLightsState(ORANGE)),
    createNote(2.5,
      allLightsState(WHITE)),
    createNote(3,
      allLightsState(ORANGE)),
    createNote(3.5,
      allLightsState(WHITE)),
  ])

  // trapping I'd be pimping, if I weren't
  .measure(61, [
    createNote(0,
      allLightsState(ORANGE)),
    createNote(0.5,
      allLightsState(WHITE)),
    createNote(1,
      allLightsState(ORANGE)),
    createNote(1.5,
      allLightsState(WHITE)),
    createNote(2,
      allLightsState(ORANGE)),
    createNote(2.5,
      allLightsState(WHITE)),
    createNote(3,
      allLightsState(ORANGE)),
    createNote(3.5,
      allLightsState(WHITE)),
  ])

  // pimping, I'd be getting it
  .measure(62, [
    createNote(0,
      allLightsState(ORANGE)),
    createNote(0.5,
      allLightsState(WHITE)),
    createNote(1,
      allLightsState(ORANGE)),
    createNote(1.5,
      allLightsState(WHITE)),
    createNote(2,
      allLightsState(ORANGE)),
    createNote(2.5,
      allLightsState(WHITE)),
    createNote(3,
      allLightsState(ORANGE)),
    createNote(3.5,
      allLightsState(WHITE)),
  ])

  // period, I don't smoke no
  .measure(63, [
    createNote(0,
      allLightsState(ORANGE)),
    createNote(0.5,
      allLightsState(WHITE)),
    createNote(1,
      allLightsState(ORANGE)),
    createNote(1.5,
      allLightsState(WHITE)),
    createNote(2,
      allLightsState(ORANGE)),
    createNote(2.5,
      allLightsState(WHITE)),
    createNote(3,
      allLightsState(ORANGE)),
    createNote(3.5,
      allLightsState(WHITE)),
  ])

  // bobby but my denim be from
  .measure(64, [
    createNote(0,
      allLightsState(ORANGE)),
    createNote(0.5,
      allLightsState(WHITE)),
    createNote(1,
      allLightsState(ORANGE)),
    createNote(1.5,
      allLightsState(WHITE)),
    createNote(2,
      allLightsState(ORANGE)),
    createNote(2.5,
      allLightsState(WHITE)),
    createNote(3,
      allLightsState(ORANGE)),
    createNote(3.5,
      allLightsState(WHITE)),
  ])

  // ricky, got your girl on
  .measure(65, [
    createNote(0,
      allLightsState(ORANGE)),
    createNote(0.5,
      allLightsState(WHITE)),
    createNote(1,
      allLightsState(ORANGE)),
    createNote(1.5,
      allLightsState(WHITE)),
    createNote(2,
      allLightsState(ORANGE)),
    createNote(2.5,
      allLightsState(WHITE)),
    createNote(3,
      allLightsState(ORANGE)),
    createNote(3.5,
      allLightsState(WHITE)),
  ])

  // molly and we smoking loud and
  .measure(66, [
    createNote(0,
      allLightsState(ORANGE)),
    createNote(0.5,
      allLightsState(WHITE)),
    createNote(1,
      allLightsState(ORANGE)),
    createNote(1.5,
      allLightsState(WHITE)),
    createNote(2,
      allLightsState(ORANGE)),
    createNote(2.5,
      allLightsState(WHITE)),
    createNote(3,
      allLightsState(ORANGE)),
    createNote(3.5,
      allLightsState(WHITE)),
  ])

  // drinking, got my top
  .measure(67, [
    createNote(0,
      allLightsState(ORANGE)),
    createNote(0.5,
      allLightsState(WHITE)),
    createNote(1,
      allLightsState(ORANGE)),
    createNote(1.5,
      allLightsState(WHITE)),
    createNote(2,
      allLightsState(ORANGE)),
    createNote(2.5,
      allLightsState(WHITE)),
    createNote(3,
      allLightsState(ORANGE)),
    createNote(3.5,
      allLightsState(WHITE)),
  ])

  // back so you can see what I've been
  .measure(68, [
    createNote(0,
      allLightsState(ORANGE)),
    createNote(0.5,
      allLightsState(WHITE)),
    createNote(1,
      allLightsState(ORANGE)),
    createNote(1.5,
      allLightsState(WHITE)),
    createNote(2,
      allLightsState(ORANGE)),
    createNote(2.5,
      allLightsState(WHITE)),
    createNote(3,
      allLightsState(ORANGE)),
    createNote(3.5,
      allLightsState(WHITE)),
  ])

  // thinking, and if you know
  .measure(69, [
    createNote(0,
      allLightsState(ORANGE)),
    createNote(0.5,
      allLightsState(WHITE)),
    createNote(1,
      allLightsState(ORANGE)),
    createNote(1.5,
      allLightsState(WHITE)),
    createNote(2,
      allLightsState(ORANGE)),
    createNote(2.5,
      allLightsState(WHITE)),
    createNote(3,
      allLightsState(ORANGE)),
    createNote(3.5,
      allLightsState(WHITE)),
  ])

  // me then you know I've been thinking
  .measure(70, [
    createNote(0,
      allLightsState(ORANGE)),
    createNote(0.5,
      allLightsState(WHITE)),
    createNote(1,
      allLightsState(ORANGE)),
    createNote(1.5,
      allLightsState(WHITE)),
    createNote(2,
      allLightsState(ORANGE)),
    createNote(2.5,
      allLightsState(WHITE)),
    createNote(3,
      allLightsState(ORANGE)),
    createNote(3.5,
      allLightsState(WHITE)),
  ])

  // Franklin, money
  .measure(71, [
    createNote(0,
      allLightsState(ORANGE)),
    createNote(0.5,
      allLightsState(WHITE)),
    createNote(1,
      allLightsState(ORANGE)),
    createNote(1.5,
      allLightsState(WHITE)),
    createNote(2,
      allLightsState(ORANGE)),
    createNote(2.5,
      allLightsState(WHITE)),
    createNote(3,
      allLightsState(ORANGE)),
    createNote(3.5,
      allLightsState(WHITE)),
  ])

  // thousands, True Religion
  .measure(72, [
    createNote(0,
      allLightsState(ORANGE)),
    createNote(0.5,
      allLightsState(WHITE)),
    createNote(1,
      allLightsState(ORANGE)),
    createNote(1.5,
      allLightsState(WHITE)),
    createNote(2,
      allLightsState(ORANGE)),
    createNote(2.5,
      allLightsState(WHITE)),
    createNote(3,
      allLightsState(ORANGE)),
    createNote(3.5,
      allLightsState(WHITE)),
  ])

  // trousers, got a private
  .measure(73, [
    createNote(0,
      allLightsState(ORANGE)),
    createNote(0.5,
      allLightsState(WHITE)),
    createNote(1,
      allLightsState(ORANGE)),
    createNote(1.5,
      allLightsState(WHITE)),
    createNote(2,
      allLightsState(ORANGE)),
    createNote(2.5,
      allLightsState(WHITE)),
    createNote(3,
      allLightsState(ORANGE)),
    createNote(3.5,
      allLightsState(WHITE)),
  ])

  // home started from them public
  .measure(74, [
    createNote(0,
      allLightsState(ORANGE)),
    createNote(0.5,
      allLightsState(WHITE)),
    createNote(1,
      allLightsState(ORANGE)),
    createNote(1.5,
      allLightsState(WHITE)),
    createNote(2,
      allLightsState(ORANGE)),
    createNote(2.5,
      allLightsState(WHITE)),
    createNote(3,
      allLightsState(ORANGE)),
    createNote(3.5,
      allLightsState(WHITE)),
  ])

  // houses, hair weave
  .measure(75, [
    createNote(0,
      allLightsState(ORANGE)),
    createNote(0.5,
      allLightsState(WHITE)),
    createNote(1,
      allLightsState(ORANGE)),
    createNote(1.5,
      allLightsState(WHITE)),
    createNote(2,
      allLightsState(ORANGE)),
    createNote(2.5,
      allLightsState(WHITE)),
    createNote(3,
      allLightsState(ORANGE)),
    createNote(3.5,
      allLightsState(WHITE)),
  ])

  // killer, causing her a-
  .measure(76, [
    createNote(0,
      allLightsState(ORANGE)),
    createNote(0.5,
      allLightsState(WHITE)),
    createNote(1,
      allLightsState(ORANGE)),
    createNote(1.5,
      allLightsState(WHITE)),
    createNote(2,
      allLightsState(ORANGE)),
    createNote(2.5,
      allLightsState(WHITE)),
    createNote(3,
      allLightsState(ORANGE)),
    createNote(3.5,
      allLightsState(WHITE)),
  ])

  // -rousal, Audi A-
  .measure(77, [
    createNote(0,
      allLightsState(ORANGE)),
    createNote(0.5,
      allLightsState(WHITE)),
    createNote(1,
      allLightsState(ORANGE)),
    createNote(1.5,
      allLightsState(WHITE)),
    createNote(2,
      allLightsState(ORANGE)),
    createNote(2.5,
      allLightsState(WHITE)),
    createNote(3,
      allLightsState(ORANGE)),
    createNote(3.5,
      allLightsState(WHITE)),
  ])

  // -8 tell them Audi 5
  .measure(78, [
    createNote(0,
      allLightsState(ORANGE)),
    createNote(0.5,
      allLightsState(WHITE)),
    createNote(1,
      allLightsState(ORANGE)),
    createNote(1.5,
      allLightsState(WHITE)),
    createNote(2,
      allLightsState(ORANGE)),
    createNote(2.5,
      allLightsState(WHITE)),
    createNote(3,
      allLightsState(ORANGE)),
    createNote(3.5,
      allLightsState(WHITE)),
  ])

  // thousand (uh!)
  .measure(79, [
    createNote(0,
      allLightsState(ORANGE)),
    createNote(0.5,
      allLightsState(WHITE)),
    createNote(1,
      allLightsState(ORANGE)),
    createNote(1.5,
      allLightsState(WHITE)),
    createNote(2,
      allLightsState(ORANGE)),
    createNote(2.5,
      allLightsState(WHITE)),
    createNote(3,
      allLightsState(ORANGE)),
    createNote(3.5,
      allLightsState(WHITE)),
  ])

  // bitches say shit...
  .measure(80, chorusPart1([PINK, CYAN, GREEN]))
  .measure(81, chorusPart2([PINK, CYAN, GREEN]))
  .measure(82, chorusPart3([PINK, CYAN, GREEN]))
  .measure(83, chorusPart4([CYAN, GREEN, PINK]))
  .measure(84, chorusPart5([PINK, CYAN, GREEN]))
  .measure(85, chorusPart6([GREEN, PINK, CYAN]))
  .measure(86, chorusPart7([CYAN, GREEN, PINK]))
  .measure(87, chorusPart8([PINK, CYAN, GREEN]))

  // bitches say shit...
  .measure(88, chorusPart1([PINK, CYAN, GREEN]))
  .measure(89, chorusPart2([PINK, CYAN, GREEN]))
  .measure(90, chorusPart3([PINK, CYAN, GREEN]))
  .measure(91, chorusPart4([CYAN, GREEN, PINK]))
  .measure(92, chorusPart5([PINK, CYAN, GREEN]))
  .measure(93, chorusPart6([GREEN, PINK, CYAN]))
  .measure(94, chorusPart7([CYAN, GREEN, PINK]))
  .measure(95, chorusPart8([PINK, CYAN, GREEN]))

export default beezInTheTrap
