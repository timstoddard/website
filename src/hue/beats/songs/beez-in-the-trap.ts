import { UIColor } from '../../hue-color-conversion'
import { BeatStep } from '../beat-types'
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

// TODO concept of "color rotator": given a list of colors (no dups), call next() to get
// next in list, loops around using %
const combineBeatsWithColors = (beats: number[], colors: UIColor[]): BeatStep[] => {
  const steps = []
  for (let i = 0; i < beats.length; i++) {
    steps.push(createNote(beats[i], allLightsState(colors[i % colors.length])))
  }
  return steps
}

const instrumentalPart1 = (colors: UIColor[]): BeatStep[] => {
  const beats = [
    0,
    1.5,
    2,
    3,
  ]
  return combineBeatsWithColors(beats, colors)
}

const instrumentalPart2 = (colors: UIColor[]): BeatStep[] => {
  const beats = [
    1,
    2.5,
    3,
  ]
  return combineBeatsWithColors(beats, colors)
}

const chorusBeat1 = (colors: UIColor[]): BeatStep[] => {
  const beats = [
    0,
    1.5,
    2,
    3,
  ]
  return combineBeatsWithColors(beats, colors)
}

const chorusBeat2 = (colors: UIColor[]): BeatStep[] => {
  const beats = [
    0.5,
    1,
    2,
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
  .measure(instrumentalPart1([PINK, GREEN]))
  .measure(instrumentalPart2([PINK, GREEN]))
  .measure(instrumentalPart1([GREEN, PINK]))
  .measure(instrumentalPart2([GREEN, PINK]))
  .measure(instrumentalPart1([ORANGE, CYAN]))
  .measure(instrumentalPart2([ORANGE, CYAN]))
  .measure(instrumentalPart1([CYAN, ORANGE]))
  .measure(instrumentalPart2([CYAN, ORANGE]))

  // bitches say shit...
  .measure(chorusBeat1([PINK, ORANGE, GREEN]))
  .measure(chorusBeat2([ORANGE, GREEN, PINK]))
  .measure(chorusBeat1([ORANGE, GREEN, PINK]))
  .measure(chorusBeat2([GREEN, PINK, ORANGE]))
  .measure(chorusBeat1([CYAN, PINK, ORANGE]))
  .measure(chorusBeat2([PINK, ORANGE, CYAN]))
  .measure(chorusBeat1([PINK, ORANGE, CYAN]))
  .measure(chorusBeat2([ORANGE, CYAN, PINK]))

  // bitches say shit...
  .measure(chorusBeat1([ORANGE, GREEN, PINK]))
  .measure(chorusBeat2([GREEN, PINK, ORANGE]))
  .measure(chorusBeat1([GREEN, PINK, ORANGE]))
  .measure(chorusBeat2([PINK, ORANGE, GREEN]))
  .measure(chorusBeat1([PINK, ORANGE, CYAN]))
  .measure(chorusBeat2([ORANGE, CYAN, PINK]))
  .measure(chorusBeat1([ORANGE, CYAN, PINK]))
  .measure(chorusBeat2([CYAN, PINK, ORANGE]))

  // man I been popped off...
  .measure(instrumentalPart1([PINK, GREEN]))
  .measure(instrumentalPart2([PINK, GREEN]))
  .measure(instrumentalPart1([GREEN, PINK]))
  .measure(instrumentalPart2([GREEN, PINK]))
  .measure(instrumentalPart1([ORANGE, CYAN]))
  .measure(instrumentalPart2([ORANGE, CYAN]))
  .measure(instrumentalPart1([CYAN, ORANGE]))
  .measure(instrumentalPart2([CYAN, ORANGE]))

  // rip it off no jokin...
  .measure(chorusBeat1([PINK, ORANGE, GREEN]))
  .measure(chorusBeat2([ORANGE, GREEN, PINK]))
  .measure(chorusBeat1([ORANGE, GREEN, PINK]))
  .measure(chorusBeat2([GREEN, PINK, ORANGE]))
  .measure(chorusBeat1([CYAN, PINK, ORANGE]))
  .measure(chorusBeat2([PINK, ORANGE, CYAN]))
  .measure(chorusBeat1([PINK, ORANGE, CYAN]))
  .measure(chorusBeat2([ORANGE, CYAN, PINK]))

  // bitches say shit...
  .measure(chorusPart1([PINK, CYAN, GREEN]))
  .measure(chorusPart2([PINK, CYAN, GREEN]))
  .measure(chorusPart3([PINK, CYAN, GREEN]))
  .measure(chorusPart4([CYAN, GREEN, PINK]))
  .measure(chorusPart5([PINK, CYAN, GREEN]))
  .measure(chorusPart6([GREEN, PINK, CYAN]))
  .measure(chorusPart7([CYAN, GREEN, PINK]))
  .measure(chorusPart8([PINK, CYAN, GREEN]))

  // bitches say shit...
  .measure(chorusPart1([PINK, CYAN, GREEN]))
  .measure(chorusPart2([PINK, CYAN, GREEN]))
  .measure(chorusPart3([PINK, CYAN, GREEN]))
  .measure(chorusPart4([CYAN, GREEN, PINK]))
  .measure(chorusPart5([PINK, CYAN, GREEN]))
  .measure(chorusPart6([GREEN, PINK, CYAN]))
  .measure(chorusPart7([CYAN, GREEN, PINK]))
  .measure(chorusPart8([PINK, CYAN, GREEN]))

  // nicki nicki nicki
  .measure([
    createNote(0, [lightState(ORANGE), lightOff()]),
    createNote(0.5, [lightOff(), lightState(ORANGE)]),
    createNote(1, [lightState(ORANGE), lightOff()]),
    createNote(1.5, [lightOff(), lightState(ORANGE)]),
    createNote(2, [lightState(ORANGE), lightOff()]),
    createNote(2.5, [lightOff(), lightState(ORANGE)]),
  ])

  // put it in your kidney, got a
  .measure([
    createNote(0, allLightsState(ORANGE)),
    createNote(0.5, allLightsState(WHITE)),
    createNote(1, allLightsState(ORANGE)),
    createNote(1.5, allLightsState(WHITE)),
    createNote(2, allLightsState(ORANGE)),
    createNote(2.5, allLightsState(WHITE)),
    createNote(3, allLightsState(ORANGE)),
    createNote(3.5, allLightsState(WHITE)),
  ])

  // new LS 450, ain't no
  .measure([
    createNote(0, allLightsState(ORANGE)),
    createNote(0.5, allLightsState(WHITE)),
    createNote(1, allLightsState(ORANGE)),
    createNote(1.5, allLightsState(WHITE)),
    createNote(2, allLightsState(ORANGE)),
    createNote(2.5, allLightsState(WHITE)),
    createNote(3, allLightsState(ORANGE)),
    createNote(3.5, allLightsState(WHITE)),
  ])

  // keys in this doohickey, if I weren't
  .measure([
    createNote(0, allLightsState(ORANGE)),
    createNote(0.5, allLightsState(WHITE)),
    createNote(1, allLightsState(ORANGE)),
    createNote(1.5, allLightsState(WHITE)),
    createNote(2, allLightsState(ORANGE)),
    createNote(2.5, allLightsState(WHITE)),
    createNote(3, allLightsState(ORANGE)),
    createNote(3.5, allLightsState(WHITE)),
  ])

  // rapping I'd be trapping, if I weren't
  .measure([
    createNote(0, allLightsState(ORANGE)),
    createNote(0.5, allLightsState(WHITE)),
    createNote(1, allLightsState(ORANGE)),
    createNote(1.5, allLightsState(WHITE)),
    createNote(2, allLightsState(ORANGE)),
    createNote(2.5, allLightsState(WHITE)),
    createNote(3, allLightsState(ORANGE)),
    createNote(3.5, allLightsState(WHITE)),
  ])

  // trapping I'd be pimping, if I weren't
  .measure([
    createNote(0, allLightsState(ORANGE)),
    createNote(0.5, allLightsState(WHITE)),
    createNote(1, allLightsState(ORANGE)),
    createNote(1.5, allLightsState(WHITE)),
    createNote(2, allLightsState(ORANGE)),
    createNote(2.5, allLightsState(WHITE)),
    createNote(3, allLightsState(ORANGE)),
    createNote(3.5, allLightsState(WHITE)),
  ])

  // pimping, I'd be getting it
  .measure([
    createNote(0, allLightsState(ORANGE)),
    createNote(0.5, allLightsState(WHITE)),
    createNote(1, allLightsState(ORANGE)),
    createNote(1.5, allLightsState(WHITE)),
    createNote(2, allLightsState(ORANGE)),
    createNote(2.5, allLightsState(WHITE)),
    createNote(3, allLightsState(ORANGE)),
    createNote(3.5, allLightsState(WHITE)),
  ])

  // period, I don't smoke no
  .measure([
    createNote(0, allLightsState(ORANGE)),
    createNote(0.5, allLightsState(WHITE)),
    createNote(1, allLightsState(ORANGE)),
    createNote(1.5, allLightsState(WHITE)),
    createNote(2, allLightsState(ORANGE)),
    createNote(2.5, allLightsState(WHITE)),
    createNote(3, allLightsState(ORANGE)),
    createNote(3.5, allLightsState(WHITE)),
  ])

  // bobby but my denim be from
  .measure([
    createNote(0, allLightsState(ORANGE)),
    createNote(0.5, allLightsState(WHITE)),
    createNote(1, allLightsState(ORANGE)),
    createNote(1.5, allLightsState(WHITE)),
    createNote(2, allLightsState(ORANGE)),
    createNote(2.5, allLightsState(WHITE)),
    createNote(3, allLightsState(ORANGE)),
    createNote(3.5, allLightsState(WHITE)),
  ])

  // ricky, got your girl on
  .measure([
    createNote(0, allLightsState(ORANGE)),
    createNote(0.5, allLightsState(WHITE)),
    createNote(1, allLightsState(ORANGE)),
    createNote(1.5, allLightsState(WHITE)),
    createNote(2, allLightsState(ORANGE)),
    createNote(2.5, allLightsState(WHITE)),
    createNote(3, allLightsState(ORANGE)),
    createNote(3.5, allLightsState(WHITE)),
  ])

  // molly and we smoking loud and
  .measure([
    createNote(0, allLightsState(ORANGE)),
    createNote(0.5, allLightsState(WHITE)),
    createNote(1, allLightsState(ORANGE)),
    createNote(1.5, allLightsState(WHITE)),
    createNote(2, allLightsState(ORANGE)),
    createNote(2.5, allLightsState(WHITE)),
    createNote(3, allLightsState(ORANGE)),
    createNote(3.5, allLightsState(WHITE)),
  ])

  // drinking, got my top
  .measure([
    createNote(0, allLightsState(ORANGE)),
    createNote(0.5, allLightsState(WHITE)),
    createNote(1, allLightsState(ORANGE)),
    createNote(1.5, allLightsState(WHITE)),
    createNote(2, allLightsState(ORANGE)),
    createNote(2.5, allLightsState(WHITE)),
    createNote(3, allLightsState(ORANGE)),
    createNote(3.5, allLightsState(WHITE)),
  ])

  // back so you can see what I've been
  .measure([
    createNote(0, allLightsState(ORANGE)),
    createNote(0.5, allLightsState(WHITE)),
    createNote(1, allLightsState(ORANGE)),
    createNote(1.5, allLightsState(WHITE)),
    createNote(2, allLightsState(ORANGE)),
    createNote(2.5, allLightsState(WHITE)),
    createNote(3, allLightsState(ORANGE)),
    createNote(3.5, allLightsState(WHITE)),
  ])

  // thinking, and if you know
  .measure([
    createNote(0, allLightsState(ORANGE)),
    createNote(0.5, allLightsState(WHITE)),
    createNote(1, allLightsState(ORANGE)),
    createNote(1.5, allLightsState(WHITE)),
    createNote(2, allLightsState(ORANGE)),
    createNote(2.5, allLightsState(WHITE)),
    createNote(3, allLightsState(ORANGE)),
    createNote(3.5, allLightsState(WHITE)),
  ])

  // me then you know I've been thinking
  .measure([
    createNote(0, allLightsState(ORANGE)),
    createNote(0.5, allLightsState(WHITE)),
    createNote(1, allLightsState(ORANGE)),
    createNote(1.5, allLightsState(WHITE)),
    createNote(2, allLightsState(ORANGE)),
    createNote(2.5, allLightsState(WHITE)),
    createNote(3, allLightsState(ORANGE)),
    createNote(3.5, allLightsState(WHITE)),
  ])

  // Franklin, money
  .measure([
    createNote(0, allLightsState(ORANGE)),
    createNote(0.5, allLightsState(WHITE)),
    createNote(1, allLightsState(ORANGE)),
    createNote(1.5, allLightsState(WHITE)),
    createNote(2, allLightsState(ORANGE)),
    createNote(2.5, allLightsState(WHITE)),
    createNote(3, allLightsState(ORANGE)),
    createNote(3.5, allLightsState(WHITE)),
  ])

  // thousands, True Religion
  .measure([
    createNote(0, allLightsState(ORANGE)),
    createNote(0.5, allLightsState(WHITE)),
    createNote(1, allLightsState(ORANGE)),
    createNote(1.5, allLightsState(WHITE)),
    createNote(2, allLightsState(ORANGE)),
    createNote(2.5, allLightsState(WHITE)),
    createNote(3, allLightsState(ORANGE)),
    createNote(3.5, allLightsState(WHITE)),
  ])

  // trousers, got a private
  .measure([
    createNote(0, allLightsState(ORANGE)),
    createNote(0.5, allLightsState(WHITE)),
    createNote(1, allLightsState(ORANGE)),
    createNote(1.5, allLightsState(WHITE)),
    createNote(2, allLightsState(ORANGE)),
    createNote(2.5, allLightsState(WHITE)),
    createNote(3, allLightsState(ORANGE)),
    createNote(3.5, allLightsState(WHITE)),
  ])

  // home started from them public
  .measure([
    createNote(0, allLightsState(ORANGE)),
    createNote(0.5, allLightsState(WHITE)),
    createNote(1, allLightsState(ORANGE)),
    createNote(1.5, allLightsState(WHITE)),
    createNote(2, allLightsState(ORANGE)),
    createNote(2.5, allLightsState(WHITE)),
    createNote(3, allLightsState(ORANGE)),
    createNote(3.5, allLightsState(WHITE)),
  ])

  // houses, hair weave
  .measure([
    createNote(0, allLightsState(ORANGE)),
    createNote(0.5, allLightsState(WHITE)),
    createNote(1, allLightsState(ORANGE)),
    createNote(1.5, allLightsState(WHITE)),
    createNote(2, allLightsState(ORANGE)),
    createNote(2.5, allLightsState(WHITE)),
    createNote(3, allLightsState(ORANGE)),
    createNote(3.5, allLightsState(WHITE)),
  ])

  // killer, causing her a-
  .measure([
    createNote(0, allLightsState(ORANGE)),
    createNote(0.5, allLightsState(WHITE)),
    createNote(1, allLightsState(ORANGE)),
    createNote(1.5, allLightsState(WHITE)),
    createNote(2, allLightsState(ORANGE)),
    createNote(2.5, allLightsState(WHITE)),
    createNote(3, allLightsState(ORANGE)),
    createNote(3.5, allLightsState(WHITE)),
  ])

  // -rousal, Audi A-
  .measure([
    createNote(0, allLightsState(ORANGE)),
    createNote(0.5, allLightsState(WHITE)),
    createNote(1, allLightsState(ORANGE)),
    createNote(1.5, allLightsState(WHITE)),
    createNote(2, allLightsState(ORANGE)),
    createNote(2.5, allLightsState(WHITE)),
    createNote(3, allLightsState(ORANGE)),
    createNote(3.5, allLightsState(WHITE)),
  ])

  // -8 tell them Audi 5
  .measure([
    createNote(0, allLightsState(ORANGE)),
    createNote(0.5, allLightsState(WHITE)),
    createNote(1, allLightsState(ORANGE)),
    createNote(1.5, allLightsState(WHITE)),
    createNote(2, allLightsState(ORANGE)),
    createNote(2.5, allLightsState(WHITE)),
    createNote(3, allLightsState(ORANGE)),
    createNote(3.5, allLightsState(WHITE)),
  ])

  // thousand (uh!)
  .measure([
    createNote(0, allLightsState(ORANGE)),
    createNote(0.5, allLightsState(WHITE)),
    createNote(1, allLightsState(ORANGE)),
    createNote(1.5, allLightsState(WHITE)),
    createNote(2, allLightsState(ORANGE)),
    createNote(2.5, allLightsState(WHITE)),
    createNote(3, allLightsState(ORANGE)),
    createNote(3.5, allLightsState(WHITE)),
  ])

  // bitches say shit...
  .measure(chorusPart1([PINK, CYAN, GREEN]))
  .measure(chorusPart2([PINK, CYAN, GREEN]))
  .measure(chorusPart3([PINK, CYAN, GREEN]))
  .measure(chorusPart4([CYAN, GREEN, PINK]))
  .measure(chorusPart5([PINK, CYAN, GREEN]))
  .measure(chorusPart6([GREEN, PINK, CYAN]))
  .measure(chorusPart7([CYAN, GREEN, PINK]))
  .measure(chorusPart8([PINK, CYAN, GREEN]))

  // bitches say shit...
  .measure(chorusPart1([PINK, CYAN, GREEN]))
  .measure(chorusPart2([PINK, CYAN, GREEN]))
  .measure(chorusPart3([PINK, CYAN, GREEN]))
  .measure(chorusPart4([CYAN, GREEN, PINK]))
  .measure(chorusPart5([PINK, CYAN, GREEN]))
  .measure(chorusPart6([GREEN, PINK, CYAN]))
  .measure(chorusPart7([CYAN, GREEN, PINK]))
  .measure(chorusPart8([PINK, CYAN, GREEN]))

export default beezInTheTrap
