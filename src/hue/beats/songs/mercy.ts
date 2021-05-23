/* eslint-disable @typescript-eslint/no-unused-vars */

import { UIColor } from '../../hue-color-conversion'
import { BeatStep } from '../beat-types'
import { Song } from '../song'
import { flashLights } from './utils/basic-routines'
import { createNote, LightGenerator, lightOff, lightState } from './utils/utils'

const RED = new UIColor(255, 0, 0)
const ORANGE = new UIColor(255, 120, 0)
const YELLOW = new UIColor(255, 255, 0)
const GREEN = new UIColor(0, 255, 0)
const BLUE = new UIColor(0, 0, 255)
const PURPLE = new UIColor(255, 0, 255)
const WHITE = new UIColor(255, 255, 255)
const BLACK = new UIColor(0, 0, 0)

const lightGenerator = new LightGenerator(2)

const chorusPart1And2 = (): BeatStep[] => [
  createNote(0, lightGenerator.allLightsOff()),
  ...flashLights(WHITE, 2, 3, lightGenerator),
]

const chorusPart3 = (): BeatStep[] => [
  createNote(0, lightGenerator.allLightsState(RED, 100 * (1 / 6))),
  createNote(0.5, lightGenerator.allLightsState(RED, 100 * (2 / 6))),
  createNote(1, lightGenerator.allLightsState(YELLOW, 100 * (3 / 6))),
  createNote(1.5, lightGenerator.allLightsState(YELLOW, 100 * (4 / 6))),
  createNote(2, lightGenerator.allLightsState(GREEN, 100 * (5 / 6))),
  createNote(2.5, lightGenerator.allLightsState(GREEN, 100 * (6 / 6))),
  createNote(3, lightGenerator.allLightsState(RED, 100 * (6 / 6))),
  createNote(3.5, lightGenerator.allLightsState(RED, 100 * (5 / 6))),
]

const chorusPart4 = (): BeatStep[] => [
  createNote(0, lightGenerator.allLightsState(YELLOW, 100 * (4 / 6))),
  createNote(0.5, lightGenerator.allLightsState(YELLOW, 100 * (3 / 6))),
  createNote(1, lightGenerator.allLightsState(GREEN, 100 * (2 / 6))),
  createNote(1.5, lightGenerator.allLightsState(GREEN, 100 * (1 / 6))),
  createNote(2, lightGenerator.allLightsState(WHITE)),
  createNote(2.5, lightGenerator.allLightsOff()),
  createNote(3, lightGenerator.allLightsState(WHITE)),
  createNote(3.5, lightGenerator.allLightsOff()),
]

const chorusPart4Alt = (): BeatStep[] => [
  createNote(0, lightGenerator.allLightsState(YELLOW, 100 * (4 / 6))),
  createNote(0.5, lightGenerator.allLightsState(YELLOW, 100 * (3 / 6))),
  createNote(1, lightGenerator.allLightsState(GREEN, 100 * (2 / 6))),
  createNote(1.5, lightGenerator.allLightsState(GREEN, 100 * (1 / 6))),
  createNote(2, lightGenerator.allLightsState(RED)),
  createNote(2.5, lightGenerator.allLightsState(YELLOW)),
  createNote(3, lightGenerator.allLightsState(GREEN)),
  createNote(3.5, lightGenerator.allLightsOff()),
]

const ohOhOhOhOhOkay = (): BeatStep[] => [
  createNote(0, [lightState(WHITE), lightOff()]),
  createNote(0.5, [lightOff(), lightState(WHITE)]),
  createNote(1, [lightState(WHITE), lightOff()]),
  createNote(1.5, [lightOff(), lightState(WHITE)]),
  createNote(2, [lightState(WHITE), lightOff()]),
  createNote(2.5, [lightOff(), lightState(WHITE)]),
  createNote(3, lightGenerator.allLightsState(WHITE)),
  // createNote(3.5, lightGenerator.allLightsOff()),
]

const mercy = new Song('Mercy', 'Kanye West', 140, 4, 2500)
  // weepin and a moanin...
  .measure([
    createNote(0, [lightState(RED, 50), lightOff()]),
    createNote(1, [lightState(RED, 50), lightState(YELLOW, 50)]),
    createNote(2, [lightState(GREEN, 50), lightState(YELLOW, 50)]),
    createNote(3, [lightState(GREEN, 50), lightState(RED, 50)]),
  ])
  .measure([
    createNote(0, [lightState(YELLOW, 50), lightState(RED, 50)]),
    createNote(1, [lightState(YELLOW, 50), lightState(GREEN, 50)]),
    createNote(2, [lightState(RED, 50), lightState(GREEN, 50)]),
    createNote(3, [lightState(RED, 50), lightState(YELLOW, 50)]),
  ])
  .measure([
    createNote(0, [lightState(GREEN, 50), lightState(YELLOW, 50)]),
    createNote(1, [lightState(GREEN, 50), lightState(RED, 50)]),
    createNote(2, [lightState(YELLOW, 50), lightState(RED, 50)]),
    createNote(3, [lightState(YELLOW, 50), lightState(GREEN, 50)]),
  ])
  .measure([
    createNote(0, [lightState(RED, 50), lightState(GREEN, 50)]),
    createNote(1, [lightState(RED, 50), lightState(YELLOW, 50)]),
    createNote(2, [lightState(GREEN, 50), lightState(YELLOW, 50)]),
    createNote(3, [lightState(GREEN, 50), lightState(RED, 50)]),
  ])
  .measure([
    createNote(0, [lightState(YELLOW, 50), lightState(RED, 50)]),
    createNote(2, [lightState(YELLOW, 50), lightState(GREEN, 50)]),
  ])
  .measure([
    createNote(1, [lightState(RED, 50), lightState(GREEN, 50)]),
    createNote(2, [lightState(RED, 50), lightState(YELLOW, 50)]),
    createNote(2.5, [lightState(GREEN, 50), lightState(YELLOW, 50)]),
  ])
  .measure([
    createNote(0, [lightState(GREEN, 50), lightState(RED, 50)]),
    createNote(2, [lightState(YELLOW, 50), lightState(RED, 50)]),
  ])

  // oh oh oh oh oh okay
  .measure(ohOhOhOhOhOkay())

  // Lamborghini mercy
  .measure(chorusPart1And2())

  // yo chick she's so thirsty, I'm
  .measure(chorusPart1And2())

  // in that 2 seat lambo with your
  .measure(chorusPart3())

  // girl she's tryna jerk me
  .measure(chorusPart4())

  // Lamborghini mercy
  .measure(chorusPart1And2())

  // yo chick she's so thirsty, I'm
  .measure(chorusPart1And2())

  // in that 2 seat lambo with your
  .measure(chorusPart3())

  // girl she's tryna jerk me
  .measure(chorusPart4())

  // Lamborghini mercy
  .measure(chorusPart1And2())

  // yo chick she's so thirsty, I'm
  .measure(chorusPart1And2())

  // in that 2 seat lambo with your
  .measure(chorusPart3())

  // girl she's tryna jerk me
  .measure(chorusPart4())

  // Lamborghini mercy
  .measure(chorusPart1And2())

  // yo chick she's so thirsty, I'm
  .measure(chorusPart1And2())

  // in that 2 seat lambo with your
  .measure(chorusPart3())

  // girl she's tryna jerk me
  .measure(chorusPart4Alt())

  // okay, drop it to the
  .measure([
    createNote(0, lightGenerator.allLightsOff()),
    createNote(2, lightGenerator.allLightsState(GREEN)),
    createNote(2.5, lightGenerator.allLightsState(BLUE)),
    createNote(3, lightGenerator.allLightsState(PURPLE)),
    createNote(3.5, lightGenerator.allLightsState(GREEN)),
  ])

  // floor, make that ass shake
  .measure([
    createNote(0, lightGenerator.allLightsState(BLUE)),
    createNote(1, lightGenerator.allLightsState(PURPLE)),
    createNote(1.5, lightGenerator.allLightsState(GREEN)),
    createNote(2, lightGenerator.allLightsState(BLUE)),
    createNote(3, lightGenerator.allLightsState(PURPLE)),
  ])

  // woah! make the ground
  .measure([
    createNote(0, lightGenerator.allLightsOff()),
    createNote(1, lightGenerator.allLightsState(GREEN)),
    createNote(2, lightGenerator.allLightsState(BLUE)),
    createNote(2.5, lightGenerator.allLightsState(PURPLE)),
    createNote(3, lightGenerator.allLightsState(GREEN)),
  ])

  // move, that's an ass-quake
  .measure([
    createNote(0, lightGenerator.allLightsState(BLUE)),
    createNote(1, lightGenerator.allLightsState(PURPLE)),
    createNote(1.5, lightGenerator.allLightsState(GREEN)),
    createNote(2, lightGenerator.allLightsState(BLUE)),
    createNote(3, lightGenerator.allLightsState(PURPLE)),
  ])

  // build a house up on that
  .measure([
    createNote(0, lightGenerator.allLightsOff()),
    createNote(1, lightGenerator.allLightsState(GREEN)),
    createNote(1.5, lightGenerator.allLightsState(BLUE)),
    createNote(2, lightGenerator.allLightsState(PURPLE)),
    createNote(2.5, lightGenerator.allLightsState(GREEN)),
    createNote(3, lightGenerator.allLightsState(BLUE)),
    createNote(3.5, lightGenerator.allLightsState(PURPLE)),
  ])

  // ass, that's an ass-tate
  .measure([
    createNote(0, lightGenerator.allLightsState(GREEN)),
    createNote(1, lightGenerator.allLightsState(BLUE)),
    createNote(1.5, lightGenerator.allLightsState(PURPLE)),
    createNote(2, lightGenerator.allLightsState(GREEN)),
    createNote(3, lightGenerator.allLightsState(BLUE)),
  ])

  // (roll roll) roll my weed
  .measure([
    createNote(0, lightGenerator.allLightsOff()),
    createNote(1, [lightState(GREEN), lightOff()]),
    createNote(1.5, [lightOff(), lightState(GREEN)]),
    createNote(2, lightGenerator.allLightsState(GREEN)),
    createNote(2.5, lightGenerator.allLightsState(BLUE)),
    createNote(3, lightGenerator.allLightsState(PURPLE)),
  ])

  // on it that's an ass tray
  .measure([
    createNote(0, lightGenerator.allLightsState(GREEN)),
    createNote(0.5, lightGenerator.allLightsState(BLUE)),
    createNote(1, lightGenerator.allLightsState(PURPLE)),
    createNote(1.5, lightGenerator.allLightsState(GREEN)),
    createNote(2, lightGenerator.allLightsState(BLUE)),
    createNote(3, lightGenerator.allLightsState(PURPLE)),
    // TODO add back in?
    // createNote(3.5, lightGenerator.allLightsOff()),
  ])

  // say ye, say ye, don't we
  .measure([
    ...flashLights(ORANGE, 0, 0.5, lightGenerator),
    ...flashLights(ORANGE, 2, 2.5, lightGenerator),
  ])

  // do this every day day (huh)
  .measure([
    createNote(2, [lightState(YELLOW), lightOff()]),
    createNote(2.5, [lightOff(), lightState(YELLOW)]),
    createNote(3, lightGenerator.allLightsState(WHITE)),
  ])

  // work them long nights, long
  .measure([
    ...flashLights(ORANGE, 1, 2, lightGenerator),
    ...flashLights(ORANGE, 3, 4, lightGenerator),
  ])

  // nights to get a pay day (huh)
  .measure([
    createNote(2, [lightState(YELLOW), lightOff()]),
    createNote(2.5, [lightOff(), lightState(YELLOW)]),
    createNote(3, lightGenerator.allLightsState(WHITE)),
  ])

  // finally got paid, now I need
  .measure([
    createNote(0, lightGenerator.allLightsState(GREEN)),
    createNote(0.5, lightGenerator.allLightsState(BLUE)),
    createNote(1, lightGenerator.allLightsState(PURPLE)),
    createNote(2, lightGenerator.allLightsState(GREEN)),
    createNote(2.5, lightGenerator.allLightsState(BLUE)),
    createNote(3, lightGenerator.allLightsState(PURPLE)),
    createNote(3.5, lightGenerator.allLightsState(GREEN)),
  ])

  // shade and a vacay
  .measure([
    createNote(0, lightGenerator.allLightsState(BLUE)),
    createNote(1, lightGenerator.allLightsState(PURPLE)),
    createNote(1.5, lightGenerator.allLightsState(GREEN)),
    createNote(2, lightGenerator.allLightsState(BLUE)),
    createNote(2.5, lightGenerator.allLightsState(PURPLE)),
    // TODO keep this out?
    // createNote(3, lightGenerator.allLightsOff()),
  ])

  // and niggas still hatin, so much
  .measure([
    ...flashLights(RED, 0, 0.5, lightGenerator),
    ...flashLights(RED, 2, 2.5, lightGenerator),
  ])

  // hate I need a AK
  .measure([
    createNote(2, [lightState(RED), lightOff()]),
    createNote(2.5, [lightOff(), lightState(RED)]),
    createNote(3, [lightState(RED, 40), lightOff()]),
    createNote(3.5, [lightOff(), lightState(RED, 40)]),
  ])

  // now we out in Paris
  .measure([
    createNote(0, lightGenerator.allLightsState(YELLOW)),
    createNote(0.5, lightGenerator.allLightsState(ORANGE)),
    createNote(1, lightGenerator.allLightsState(GREEN)),
    createNote(1.5, lightGenerator.allLightsState(YELLOW)),
    createNote(2, lightGenerator.allLightsState(ORANGE)),
    createNote(2.5, lightGenerator.allLightsState(GREEN)),
  ])

  // yeah I'm Perrier-in
  .measure([
    createNote(0, lightGenerator.allLightsState(YELLOW)),
    createNote(0.5, lightGenerator.allLightsState(ORANGE)),
    createNote(1, lightGenerator.allLightsState(GREEN)),
    createNote(1.5, lightGenerator.allLightsState(YELLOW)),
    createNote(2, lightGenerator.allLightsState(ORANGE)),
    createNote(2.5, lightGenerator.allLightsState(GREEN)),
  ])

  // white girls politickin
  .measure([
    createNote(0, lightGenerator.allLightsState(YELLOW)),
    createNote(1, lightGenerator.allLightsState(ORANGE)),
    createNote(2, lightGenerator.allLightsState(GREEN)),
    createNote(2.5, lightGenerator.allLightsState(YELLOW)),
    createNote(3, lightGenerator.allLightsState(ORANGE)),
    createNote(3.5, lightGenerator.allLightsState(GREEN)),
  ])

  // that's that Sarah Palin (get get)
  .measure([
    createNote(0, lightGenerator.allLightsOff()),
    ...flashLights(WHITE, 1, 1.5, lightGenerator),
    ...flashLights(WHITE, 2, 2.5, lightGenerator),
  ])

  // (get get) gettin high
  .measure([
    createNote(0, [lightState(GREEN, 30), lightOff()]),
    createNote(0.5, [lightOff(), lightState(GREEN, 30)]),
    createNote(1, lightGenerator.allLightsState(GREEN, 30)),
    createNote(1.5, lightGenerator.allLightsState(GREEN, 60)),
    createNote(2, lightGenerator.allLightsState(GREEN)),
  ])

  // Californicatin, I
  .measure([
    createNote(0, lightGenerator.allLightsState(YELLOW)),
    createNote(0.5, lightGenerator.allLightsState(ORANGE)),
    createNote(1, lightGenerator.allLightsState(GREEN)),
    createNote(1.5, lightGenerator.allLightsState(YELLOW)),
    createNote(2, lightGenerator.allLightsState(ORANGE)),
    createNote(2.5, lightGenerator.allLightsState(GREEN)),
  ])

  // give her that D, cause
  .measure([
    createNote(0, lightGenerator.allLightsState(YELLOW)),
    createNote(0.5, lightGenerator.allLightsState(ORANGE)),
    createNote(1, lightGenerator.allLightsState(GREEN)),
    createNote(2, lightGenerator.allLightsState(YELLOW)),
    createNote(3, lightGenerator.allLightsOff()),
  ])

  // that's where I was born and raised in (oh oh oh oh oh okay)
  .measure(ohOhOhOhOhOkay())

  // Lamborghini mercy
  .measure(chorusPart1And2())

  // yo chick she's so thirsty, I'm
  .measure(chorusPart1And2())

  // in that 2 seat lambo with your
  .measure(chorusPart3())

  // girl she's tryna jerk me
  .measure(chorusPart4())

  // Lamborghini mercy
  .measure(chorusPart1And2())

  // yo chick she's so thirsty, I'm
  .measure(chorusPart1And2())

  // in that 2 seat lambo with your
  .measure(chorusPart3())

  // girl she's tryna jerk me
  .measure(chorusPart4Alt())

  // weepin and a moanin...
  // TODO make lights more on beat
  .measure([
    createNote(0, [lightState(RED, 50), lightOff()]),
    createNote(1, [lightState(RED, 50), lightState(YELLOW, 50)]),
    createNote(2, [lightState(GREEN, 50), lightState(YELLOW, 50)]),
    createNote(3, [lightState(GREEN, 50), lightState(RED, 50)]),
  ])
  .measure([
    createNote(0, [lightState(YELLOW, 50), lightState(RED, 50)]),
    createNote(1, [lightState(YELLOW, 50), lightState(GREEN, 50)]),
    createNote(2, [lightState(RED, 50), lightState(GREEN, 50)]),
    createNote(3, [lightState(RED, 50), lightState(YELLOW, 50)]),
  ])
  .measure([
    createNote(0, [lightState(GREEN, 50), lightState(YELLOW, 50)]),
    createNote(1, [lightState(GREEN, 50), lightState(RED, 50)]),
    createNote(2, [lightState(YELLOW, 50), lightState(RED, 50)]),
    createNote(3, [lightState(YELLOW, 50), lightState(GREEN, 50)]),
  ])
  .measure([
    createNote(0, [lightState(RED, 50), lightState(GREEN, 50)]),
    createNote(1, [lightState(RED, 50), lightState(YELLOW, 50)]),
    createNote(2, [lightState(GREEN, 50), lightState(YELLOW, 50)]),
    createNote(3, [lightState(GREEN, 50), lightState(RED, 50)]),
  ])
  .measure([
    createNote(0, [lightState(YELLOW, 50), lightState(RED, 50)]),
    createNote(1, [lightState(YELLOW, 50), lightState(GREEN, 50)]),
    createNote(2, [lightState(RED, 50), lightState(GREEN, 50)]),
    createNote(3, [lightState(RED, 50), lightState(YELLOW, 50)]),
  ])
  .measure([
    createNote(0, [lightState(GREEN, 50), lightState(YELLOW, 50)]),
    createNote(1, [lightState(GREEN, 50), lightState(RED, 50)]),
    createNote(2, [lightState(YELLOW, 50), lightState(RED, 50)]),
    createNote(3, [lightState(YELLOW, 50), lightState(GREEN, 50)]),
  ])
  .measure([
    createNote(0, [lightState(BLUE), lightState(BLUE)]),
    createNote(2, [lightState(BLUE, 75), lightState(BLUE, 75)]),
  ])
  .measure([
    createNote(0, [lightState(BLUE, 50), lightState(BLUE, 50)]),
    createNote(2, [lightState(BLUE, 25), lightState(BLUE, 25)]),
  ])

  // yeah! it's prime time
  .measure([
    createNote(0, lightGenerator.allLightsState(YELLOW)),
  ])

  // my top back, this pimp game
  .measure([])

  // ho! I'm red leather, this
  .measure([])

  // cocaine, I'm Rick James
  .measure([])

  // ho! I'm bill-droppin, Ms.
  .measure([])

  // Pac-Man, this pill-poppin ass
  .measure([])

  // ho! I'm popping two, these
  .measure([])

  // blue dolphins need two coffins
  .measure([])

  // all she want is some heel money
  .measure([])

  // all she need is some bill money, he
  .measure([])

  // take his time, he counts it out, I
  .measure([])

  // weighs it up, that's real money
  .measure([])

  // check the neck, check the wrist, them
  .measure([])

  // heads turnin, that's exorcist, my
  .measure([])

  // Audemar's like Mardi Gras, that's
  .measure([])

  // Swiss time and that's excellence
  .measure([])

  // two door preference
  .measure([])

  // roof gone, George Jefferson, that
  .measure([])

  // white frost on that pound cake
  .measure([])

  // so your Duncan Hines is irrelevant (woo)
  .measure([])

  // Lambo
  .measure([])

  // Murcie-lago
  .measure([])

  // she go wherever I go, wherever
  .measure([])

  // we go, we do it pronto, it's like (oh oh oh oh oh okay)
  .measure(ohOhOhOhOhOkay())

  // Lamborghini mercy
  .measure(chorusPart1And2())

  // yo chick she's so thirsty, I'm
  .measure(chorusPart1And2())

  // in that 2 seat lambo with your
  .measure(chorusPart3())

  // girl she's tryna jerk me
  .measure(chorusPart4())

  // Lamborghini mercy
  .measure(chorusPart1And2())

  // yo chick she's so thirsty, I'm
  .measure(chorusPart1And2())

  // in that 2 seat lambo with your
  .measure(chorusPart3())

  // girl she's tryna jerk me
  .measure(chorusPart4Alt())

  // 8 measures of normal weepin/moanin
  .measure([])
  .measure([])
  .measure([])
  .measure([])
  .measure([])
  .measure([])
  .measure([])
  .measure([])

  // 8 measures of other (bugle blows many times)
  .measure([])
  .measure([])
  .measure([])
  .measure([])
  .measure([])
  .measure([])
  .measure([])
  .measure([])

  // let the
  .measure([
    createNote(0, [lightState(RED), lightState(RED)]),
    createNote(1, [lightOff(), lightOff()]),
    createNote(2, [lightState(RED), lightState(RED)]),
    createNote(3, [lightOff(), lightOff()]),
  ])

  // suicide doors up
  .measure([])

  // I threw sui-
  .measure([])

  // -cides on the tour bus
  .measure([])

  // I threw sui-
  .measure([])

  // -cides on the private jet
  .measure([])

  // you know what that
  .measure([])

  // mean, I'm fly to death
  .measure([])

  // I step in Def Jam
  .measure([])

  // building like I'm the shit
  .measure([])

  // tell 'em gimme 50
  .measure([])

  // million or Imma quit
  .measure([])

  // most rapper's taste level
  .measure([
    createNote(0, lightGenerator.allLightsState(RED)),
    // TODO fix 1/3 beats (use const instead? needs a better way)
    createNote(1/3 * 2, lightGenerator.allLightsState(YELLOW)),
    createNote(1 + 1/3, lightGenerator.allLightsState(BLACK)),
    createNote(2, lightGenerator.allLightsState(RED)),
    createNote(2 + 1/3 * 2, lightGenerator.allLightsState(YELLOW)),
    createNote(3 + 1/3, lightGenerator.allLightsState(BLACK)),
  ])

  // ain't at my waist level
  .measure([
    createNote(0, lightGenerator.allLightsState(RED)),
    createNote(1/3 * 2, lightGenerator.allLightsState(YELLOW)),
    createNote(1 + 1/3, lightGenerator.allLightsState(BLACK)),
    createNote(2, lightGenerator.allLightsState(RED)),
    createNote(2 + 1/3 * 2, lightGenerator.allLightsState(YELLOW)),
    createNote(3 + 1/3, lightGenerator.allLightsState(BLACK)),
  ])

  // turn up the bass till it's
  .measure([
    createNote(0, lightGenerator.allLightsState(RED)),
    createNote(1/3 * 2, lightGenerator.allLightsState(YELLOW)),
    createNote(1 + 1/3, lightGenerator.allLightsState(BLACK)),
    createNote(2, lightGenerator.allLightsState(RED)),
    createNote(2 + 1/3 * 2, lightGenerator.allLightsState(YELLOW)),
    createNote(3 + 1/3, lightGenerator.allLightsState(BLACK)),
  ])

  // up in your face level
  .measure([
    createNote(0, lightGenerator.allLightsState(RED)),
    createNote(1/3 * 2, lightGenerator.allLightsState(YELLOW)),
    createNote(1 + 1/3, lightGenerator.allLightsState(BLACK)),
    createNote(2, lightGenerator.allLightsState(RED)),
    createNote(2 + 1/3 * 2, lightGenerator.allLightsState(YELLOW)),
    createNote(3 + 1/3, lightGenerator.allLightsState(BLACK)),
  ])

  // don't do no press but I
  .measure([
    createNote(0, lightGenerator.allLightsState(RED)),
    createNote(1/3 * 2, lightGenerator.allLightsState(YELLOW)),
    createNote(1 + 1/3, lightGenerator.allLightsState(BLACK)),
    createNote(2, lightGenerator.allLightsState(RED)),
    createNote(2 + 1/3 * 2, lightGenerator.allLightsState(YELLOW)),
    createNote(3 + 1/3, lightGenerator.allLightsState(BLACK)),
  ])

  // get the most press kit
  .measure([
    createNote(0, lightGenerator.allLightsState(RED)),
    createNote(1/3 * 2, lightGenerator.allLightsState(YELLOW)),
    createNote(1 + 1/3, lightGenerator.allLightsState(BLACK)),
    createNote(2, lightGenerator.allLightsState(RED)),
    createNote(3, lightGenerator.allLightsState(YELLOW)),
  ])

  // plus, yo, my bitch make your
  .measure([
    createNote(0, lightGenerator.allLightsState(BLACK)),
    createNote(1, lightGenerator.allLightsState(RED)),
    createNote(1.5, lightGenerator.allLightsState(YELLOW)),
    createNote(2, lightGenerator.allLightsState(BLACK)),
    createNote(2 + 1/3 * 2, lightGenerator.allLightsState(RED)),
    createNote(3 + 1/3, lightGenerator.allLightsState(YELLOW)),
  ])

  // bitch look like Precious
  .measure([
    createNote(0, lightGenerator.allLightsState(BLACK)),
    createNote(1/3 * 2, lightGenerator.allLightsState(RED)),
    createNote(1 + 1/3, lightGenerator.allLightsState(YELLOW)),
    createNote(2, lightGenerator.allLightsState(BLACK)),
    createNote(3, lightGenerator.allLightsState(RED)),
  ])

  // somethin' bout Mary
  .measure([])

  // she gone off that molly
  .measure([])

  // now the whole party is
  .measure([])

  // melting like Dali
  .measure([])

  // now everybody is
  .measure([])

  // moving their body, don't
  .measure([])

  // sell me apartment, I
  .measure([])

  // move in the lobby (yah)
  .measure([])

  // niggas is loiterin just
  .measure([])

  // to feel important
  .measure([])

  // you gon' see lawyers, and
  .measure([])

  // niggas in Jordans (okay now)
  .measure([])

  // catch up to my campaign
  .measure([])

  // coupe the color of mayonnaise, I'm
  .measure([])

  // drunk and high at the same time, drinkin'
  .measure([])

  // champagne on the airplane
  .measure([])

  // spit rounds like a gun range
  .measure([])

  // beat it up like Rampage
  .measure([])

  // hundred bands, cut your girl, now
  .measure([])

  // your girl need a Band-Aid (damn)
  .measure([])

  // grade A, A1
  .measure([])

  // chain the color of Akon
  .measure([])

  // black diamonds, backpack rhymin'
  .measure([])

  // cosigned by Louis Vuitton (yep)
  .measure([])

  // horsepower, horsepower, all this
  .measure([])

  // Polo on I got horsepower
  .measure([])

  // pound of this cost 4 thousand, now
  .measure([])

  // make it rain she want more showers
  .measure([])

  // rain (rain), pourin' (pourin')
  .measure([])

  // all my cars is foreign (foreign)
  .measure([])

  // all my broads is foreign (foreign)
  .measure([])

  // money tall like Jordan (oh oh oh oh oh okay)
  .measure(ohOhOhOhOhOkay())

  // Lamborghini mercy
  .measure(chorusPart1And2())

  // yo chick she's so thirsty, I'm
  .measure(chorusPart1And2())

  // in that 2 seat lambo with your
  .measure(chorusPart3())

  // girl she's tryna jerk me
  .measure(chorusPart4())

  // Lamborghini mercy
  .measure(chorusPart1And2())

  // yo chick she's so thirsty, I'm
  .measure(chorusPart1And2())

  // in that 2 seat lambo with your
  .measure(chorusPart3())

  // girl she's tryna jerk me
  .measure(chorusPart4Alt())

  // TODO
  .measure([])
  .measure([])
  .measure([])
  .measure([])
  .measure([])
  .measure([])
  .measure([])
  .measure([])

  .measure([
    createNote(0, lightGenerator.allLightsState(YELLOW)),
  ])
  .measure([
    createNote(0, lightGenerator.allLightsState(GREEN)),
  ])
  .measure([
    createNote(0, lightGenerator.allLightsState(YELLOW)),
  ])
  .measure([
    createNote(0, lightGenerator.allLightsState(GREEN)),
  ])
  .measure([
    createNote(0, lightGenerator.allLightsState(YELLOW)),
  ])
  .measure([
    createNote(0, lightGenerator.allLightsState(GREEN)),
  ])
  .measure([
    createNote(0, lightGenerator.allLightsState(YELLOW)),
  ])
  .measure([
    createNote(0, lightGenerator.allLightsState(GREEN)),
  ])

  // fade out
  .measure([
    createNote(0, lightGenerator.allLightsState(BLACK)),
    createNote(1, lightGenerator.allLightsState(BLACK, 100 * (7 / 8))),
    createNote(2, lightGenerator.allLightsState(BLACK, 100 * (6 / 8))),
    createNote(3, lightGenerator.allLightsState(BLACK, 100 * (5 / 8))),
  ])
  .measure([
    createNote(0, lightGenerator.allLightsState(BLACK, 100 * (4 / 8))),
    createNote(1, lightGenerator.allLightsState(BLACK, 100 * (3 / 8))),
    createNote(2, lightGenerator.allLightsState(BLACK, 100 * (2 / 8))),
    createNote(3, lightGenerator.allLightsState(BLACK, 100 * (1 / 8))),
  ])
  .measure([
    createNote(0, lightGenerator.allLightsOff()),
  ])

export default mercy
