import { UIColor } from '../../hue-color-conversion'
import { BeatStep } from '../beat-types'
import { Song } from '../song'
import { allLightsOff, allLightsState, ColorGenerator, createNote, lightOff, lightState } from './utils/utils'

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

// TODO use this
const addColorsToBeats = (beats: number[], colorGenerator: ColorGenerator): BeatStep[] => {
  const steps = []
  for (const beat of beats) {
    steps.push(createNote(beat, allLightsState(colorGenerator.next())))
  }
  return steps
}

const instrumentalPart1 = (colorGenerator: ColorGenerator): BeatStep[] => {
  const beats = [
    0,
    1.5,
    2,
    3,
  ]
  return addColorsToBeats(beats, colorGenerator)
}

const instrumentalPart2 = (colorGenerator: ColorGenerator): BeatStep[] => {
  const beats = [
    1,
    2.5,
    3,
  ]
  return addColorsToBeats(beats, colorGenerator)
}

const chorusBeat1 = (colorGenerator: ColorGenerator): BeatStep[] => {
  const beats = [
    0,
    1.5,
    2,
    3,
  ]
  return addColorsToBeats(beats, colorGenerator)
}

const chorusBeat2 = (colorGenerator: ColorGenerator): BeatStep[] => {
  const beats = [
    0.5,
    1,
    2,
  ]
  return addColorsToBeats(beats, colorGenerator)
}

const chorusPart1 = (colorGenerator: ColorGenerator): BeatStep[] => {
  const beats = [
    0,
    0.5,
    1,
    2,
    3,
    3.5,
  ]
  return addColorsToBeats(beats, colorGenerator)
}

const chorusPart2 = (colorGenerator: ColorGenerator): BeatStep[] => {
  const beats = [
    0,
    1,
    1.5,
    2,
    2.5,
    3.5,
  ]
  return addColorsToBeats(beats, colorGenerator)
}

const chorusPart3 = (colorGenerator: ColorGenerator): BeatStep[] => {
  const beats = [
    0,
    0.5,
    1,
    1.5,
    2,
    2.5,
    3,
  ]
  return addColorsToBeats(beats, colorGenerator)
}

const chorusPart4 = (colorGenerator: ColorGenerator): BeatStep[] => {
  const beats = [
    0,
    1,
    2,
    2.5,
    3.5,
  ]
  return addColorsToBeats(beats, colorGenerator)
}

const chorusPart5 = (colorGenerator: ColorGenerator): BeatStep[] => {
  const beats = [
    0,
    1,
    1.5,
    2,
    3,
  ]
  return addColorsToBeats(beats, colorGenerator)
}

const chorusPart6 = (colorGenerator: ColorGenerator): BeatStep[] => {
  const beats = [
    0,
    1,
    1.5,
    2,
    3.5,
  ]
  return addColorsToBeats(beats, colorGenerator)
}

// TODO dup of 5
const chorusPart7 = (colorGenerator: ColorGenerator): BeatStep[] => {
  const beats = [
    0,
    1,
    1.5,
    2,
    3,
  ]
  return addColorsToBeats(beats, colorGenerator)
}

const chorusPart8 = (colorGenerator: ColorGenerator): BeatStep[] => {
  const beats = [
    0,
    1,
    1.5,
    2,
  ]
  return [
    ...addColorsToBeats(beats, colorGenerator),
    createNote(3, allLightsOff()),
  ]
}

const pinkGreen = new ColorGenerator([PINK, GREEN])
const orangeCyan = new ColorGenerator([ORANGE, CYAN])

const pinkOrangeGreen = new ColorGenerator([PINK, ORANGE, GREEN])
const pinkOrangeCyan = new ColorGenerator([PINK, ORANGE, CYAN])
const pinkCyanGreen = new ColorGenerator([PINK, CYAN, GREEN])

const beezInTheTrap = new Song('Beez In The Trap', 'Nicki Minaj', 150, 4, 400)
  .measure(instrumentalPart1(pinkGreen.reset()))
  .measure(instrumentalPart2(pinkGreen))
  .measure(instrumentalPart1(pinkGreen))
  .measure(instrumentalPart2(pinkGreen))
  .measure(instrumentalPart1(orangeCyan.reset()))
  .measure(instrumentalPart2(orangeCyan))
  .measure(instrumentalPart1(orangeCyan))
  .measure(instrumentalPart2(orangeCyan))

  // bitches say shit...
  .measure(chorusBeat1(pinkOrangeGreen.reset()))
  .measure(chorusBeat2(pinkOrangeGreen))
  .measure(chorusBeat1(pinkOrangeGreen))
  .measure(chorusBeat2(pinkOrangeGreen))
  .measure(chorusBeat1(pinkOrangeGreen))
  .measure(chorusBeat2(pinkOrangeGreen))
  .measure(chorusBeat1(pinkOrangeGreen))
  .measure(chorusBeat2(pinkOrangeGreen))

  // bitches say shit...
  .measure(chorusBeat1(pinkOrangeCyan.reset()))
  .measure(chorusBeat2(pinkOrangeCyan))
  .measure(chorusBeat1(pinkOrangeCyan))
  .measure(chorusBeat2(pinkOrangeCyan))
  .measure(chorusBeat1(pinkOrangeCyan))
  .measure(chorusBeat2(pinkOrangeCyan))
  .measure(chorusBeat1(pinkOrangeCyan))
  .measure(chorusBeat2(pinkOrangeCyan))

  // man I been popped off...
  .measure(instrumentalPart1(pinkGreen.reset()))
  .measure(instrumentalPart2(pinkGreen))
  .measure(instrumentalPart1(pinkGreen))
  .measure(instrumentalPart2(pinkGreen))
  .measure(instrumentalPart1(orangeCyan.reset()))
  .measure(instrumentalPart2(orangeCyan))
  .measure(instrumentalPart1(orangeCyan))
  .measure(instrumentalPart2(orangeCyan))

  // rip it off no jokin...
  .measure(chorusBeat1(pinkCyanGreen.reset()))
  .measure(chorusBeat2(pinkCyanGreen))
  .measure(chorusBeat1(pinkCyanGreen))
  .measure(chorusBeat2(pinkCyanGreen))
  .measure(chorusBeat1(pinkCyanGreen))
  .measure(chorusBeat2(pinkCyanGreen))
  .measure(chorusBeat1(pinkCyanGreen))
  .measure(chorusBeat2(pinkCyanGreen))

  // bitches say shit...
  .measure(chorusPart1(pinkOrangeGreen.reset()))
  .measure(chorusPart2(pinkOrangeGreen))
  .measure(chorusPart3(pinkOrangeGreen))
  .measure(chorusPart4(pinkOrangeGreen))
  .measure(chorusPart5(pinkOrangeGreen))
  .measure(chorusPart6(pinkOrangeGreen))
  .measure(chorusPart7(pinkOrangeGreen))
  .measure(chorusPart8(pinkOrangeGreen))

  // bitches say shit...
  .measure(chorusPart1(pinkOrangeCyan.reset()))
  .measure(chorusPart2(pinkOrangeCyan))
  .measure(chorusPart3(pinkOrangeCyan))
  .measure(chorusPart4(pinkOrangeCyan))
  .measure(chorusPart5(pinkOrangeCyan))
  .measure(chorusPart6(pinkOrangeCyan))
  .measure(chorusPart7(pinkOrangeCyan))
  .measure(chorusPart8(pinkOrangeCyan))

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
  .measure(chorusBeat1(pinkOrangeGreen.reset()))
  .measure(chorusBeat2(pinkOrangeGreen))
  .measure(chorusBeat1(pinkOrangeGreen))
  .measure(chorusBeat2(pinkOrangeGreen))
  .measure(chorusBeat1(pinkOrangeGreen))
  .measure(chorusBeat2(pinkOrangeGreen))
  .measure(chorusBeat1(pinkOrangeGreen))
  .measure(chorusBeat2(pinkOrangeGreen))

  // bitches say shit...
  .measure(chorusBeat1(pinkOrangeCyan.reset()))
  .measure(chorusBeat2(pinkOrangeCyan))
  .measure(chorusBeat1(pinkOrangeCyan))
  .measure(chorusBeat2(pinkOrangeCyan))
  .measure(chorusBeat1(pinkOrangeCyan))
  .measure(chorusBeat2(pinkOrangeCyan))
  .measure(chorusBeat1(pinkOrangeCyan))
  .measure(chorusBeat2(pinkOrangeCyan))

  // TODO finish song

export default beezInTheTrap
