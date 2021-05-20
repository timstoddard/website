import PercussionDetector from './PercussionDetector'

const MIN_FREQUENCY_BIN_COUNT = 128
const FREQUENCY_BIN_COUNT = MIN_FREQUENCY_BIN_COUNT * 1
/**
 * The window size of the FFT. A higher value will result in more details in the frequency domain at the expense of fewer details in the time domain (and vice versa, due to the time-frequency analysis uncertainty principle). For this project, we will want to keep it on the lower side to ensure high time precision.
 *
 * Must be a power of 2 between 2^5 and 2^15; 32, 64, 128, 256, 512, 1024, 2048, 4096, 8192, 16384, or 32768
 *
 * see also:
 * - https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode/fftSize
 * - https://webaudio.github.io/web-audio-api/#dom-analysernode-fftsize
 */
const FFT_SIZE = FREQUENCY_BIN_COUNT * 2

const CHANNEL_COUNT = 2
const DEFAULT_STFT_RATE_OF_CHANGE_THRESHOLD = 1.5
const DEFAULT_PERCUSSIVE_THRESHOLD = FFT_SIZE / 2.5

interface Config {
  bufferLen: number
  numChannels: number
  mimeType: string
}

export interface OnBeatDetectedParams {
  isBeatDetected: boolean
  amplitudeValues: Float32Array
  spectrogramData: Float32Array
  getPercussionCountTimeMs: number
}

export class InputAudioStream {
  // web audio api stuff
  private config: Config
  private audioContext: AudioContext
  private inputPoint: AudioNode
  // TODO dont use deprecated
  private node: ScriptProcessorNode
  private analyserNode: AnalyserNode
  private percussionDetector: PercussionDetector

  // fourier stuff
  private stftRateOfChangeThreshold: number = DEFAULT_STFT_RATE_OF_CHANGE_THRESHOLD
  private percussiveThreshold: number = DEFAULT_PERCUSSIVE_THRESHOLD
  private onBeatDetected: (sources: OnBeatDetectedParams) => void = () => {}

  constructor(config: Config = {
    bufferLen: FFT_SIZE,
    numChannels: CHANNEL_COUNT,
    mimeType: 'audio/wav'
  }) {
    this.config = Object.assign(this.config || {}, config)
  }

  init = (onBeatDetected: (sources: OnBeatDetectedParams) => void) => {
    this.percussionDetector = new PercussionDetector()
    this.onBeatDetected = onBeatDetected
    navigator.getUserMedia(
      { audio: true },
      this.handleStream,
      () => alert('Error getting audio'))
  }

  end = () => {
    this.node.removeEventListener('audioprocess', this.handleAudioInput)
  }

  setStftRateOfChangeThreshold = (stftRateOfChangeThreshold: number) => {
    this.stftRateOfChangeThreshold = stftRateOfChangeThreshold
  }

  setPercussiveThreshold = (percussiveThreshold: number) => {
    this.percussiveThreshold = percussiveThreshold
  }

  setFftSize = (fftSize: number) => {
    if (this.analyserNode) {
      this.analyserNode.fftSize = fftSize
    }
  }

  /**
   * Set up the audio handlers.
   *
   * @param stream
   */
  private handleStream = (stream: MediaStream) => {
    this.initAudioHandler(stream)
    this.initAnalyserNode()
  }

  private initAudioHandler = (stream: MediaStream) => {
    const audioContext = new AudioContext()
    const inputPoint = audioContext.createGain()

    // Create an AudioNode from the stream
    audioContext
      .createMediaStreamSource(stream)
      .connect(inputPoint)

    this.audioContext = audioContext
    this.inputPoint = inputPoint
  }

  /**
   * Sets up the analyser node. Expects `initAudioHandler` to have been called first.
   *
   * @param fftSize FFT size
   */
  private initAnalyserNode = (fftSize: number = FFT_SIZE) => {
    // Add an analyser node
    this.analyserNode = new AnalyserNode(this.audioContext, {
      fftSize,
      // TODO make these configurable
      maxDecibels: 0,
      minDecibels: -100,
      smoothingTimeConstant: 0,
    })
    this.inputPoint.connect(this.analyserNode)

    // Add a node with zero gain
    // const zeroGain = this.audioContext.createGain()
    // zeroGain.gain.value = 0.0
    // zeroGain.connect(this.audioContext.destination)
    // this.inputPoint.connect(zeroGain)

    // Create the listener and wire up a handler
    const context = this.inputPoint.context
    this.node = context.createScriptProcessor.call(
      context,
      this.config.bufferLen,
      this.config.numChannels,
      this.config.numChannels) as ScriptProcessorNode
    this.node.addEventListener('audioprocess', this.handleAudioInput)
    this.node.connect(context.destination)
    this.inputPoint.connect(this.node)
  }

  private handleAudioInput = (e: AudioProcessingEvent) => {
    /* const inputSignals = new Float32Array(e.inputBuffer.getChannelData(0).length)
    for (let i = 0; i < CHANNEL_COUNT; i++) {
      const inputData = e.inputBuffer.getChannelData(i)
      for (let j = 0; j < inputData.length; j++) {
        if (i === 0) {
          inputSignals[j] = inputData[j]
        } else {
          inputSignals[j] += inputData[j]
        }
      }
    } */
    // const pcmValues = inputSignals.map((amplitude: number) => amplitude / CHANNEL_COUNT)
    const startTime1 = Date.now()
    const freqValues = new Float32Array(this.analyserNode.frequencyBinCount)
    this.analyserNode.getFloatFrequencyData(freqValues)
    const time1 = Date.now() - startTime1
    const startTime2 = Date.now()
    const amplitudeValues = new Float32Array(this.analyserNode.fftSize)
    this.analyserNode.getFloatTimeDomainData(amplitudeValues)
    const time2 = Date.now() - startTime2
    this.processFrequencies(freqValues, amplitudeValues, time1, time2)
  }

  /**
   * Processes the given frequency values to determine if a percussive sound has occurred.
   */
  private processFrequencies = (freqValues: Float32Array, amplitudeValues: Float32Array, freqMs: number, amplitudeMs: number, isFast: boolean = true) => {
    const count = isFast
      ? this.percussionDetector.getPercussionCountFast(freqValues, this.stftRateOfChangeThreshold)
      : this.percussionDetector.getPercussionCount(amplitudeValues, this.stftRateOfChangeThreshold)
    const countTimeMs = isFast
      ? this.percussionDetector.getPercussionCountFastTimeMs + freqMs
      : this.percussionDetector.getPercussionCountTimeMs + amplitudeMs

    if (count > this.percussiveThreshold) {
      console.log('count', count, 'exceeded threshold of ', this.percussiveThreshold)
    }
    this.onBeatDetected({
      isBeatDetected: count > this.percussiveThreshold,
      amplitudeValues: amplitudeValues.slice(),
      spectrogramData: freqValues.slice(),
      getPercussionCountTimeMs: countTimeMs,
    })
  }
}
