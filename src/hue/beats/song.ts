import { BeatStep, MsStep } from './beat-types'

export class Song {
  private bpm: number
  private timeSignature: number
  private initialTimeout: number
  private steps: MsStep[]

  constructor(
    bpm: number,
    timeSignature: number,
    initialTimeout: number,
  ) {
    this.bpm = bpm
    this.timeSignature = timeSignature
    this.initialTimeout = initialTimeout
    this.steps = []
  }

  measure = (n: number, steps: BeatStep[]): this => {
    const msPerBeat = 1000 / (this.bpm / 60)
    const measureStartMs = this.timeSignature * n * msPerBeat
    const totalMs = this.initialTimeout + measureStartMs
    for (const step of steps) {
      this.steps.push({
        lights: step.lights,
        ms: totalMs + (msPerBeat * step.beat),
      })
    }
    return this
  }

  getSteps = (): MsStep[] => {
    return this.steps
  }

  getTimeSignature = (): number => {
    return this.timeSignature
  }
}
