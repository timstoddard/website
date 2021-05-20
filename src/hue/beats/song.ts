import { BeatStep, MsStep } from './beat-types'

export class Song {
  title: string
  artist: string
  private bpm: number
  private timeSignature: number
  private initialTimeout: number
  private steps: MsStep[]
  private measureCount: number
  private lightTracksCount: number

  constructor(
    title: string,
    artist: string,
    bpm: number,
    timeSignature: number,
    initialTimeout: number,
  ) {
    this.title = title
    this.artist = artist
    this.bpm = bpm
    this.timeSignature = timeSignature
    this.initialTimeout = initialTimeout
    this.steps = []
    this.measureCount = 0
    // TODO add explicit # of light tracks as constructor arg
    this.lightTracksCount = 0
  }

  measure = (steps: BeatStep[]): this => {
    const msPerBeat = 1000 / (this.bpm / 60)
    const measureStartMs = this.timeSignature * this.measureCount * msPerBeat
    const totalMs = this.initialTimeout + measureStartMs
    for (const step of steps) {
      this.steps.push({
        lights: step.lights,
        ms: totalMs + (msPerBeat * step.beat),
        transitionMs: step.transitionMs,
      })
    }
    this.measureCount++
    return this
  }

  getSteps = (): MsStep[] => {
    return this.steps
  }
}
