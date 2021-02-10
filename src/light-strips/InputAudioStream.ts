import PercussionDetector from './PercussionDetector'

/**
 * The window size of the FFT. A higher value will result in more details in the frequency domain at the expense of fewer details in the time domain (and vice versa, due to the time-frequency analysis uncertainty principle). For this project, we will want to keep it on the lower side to ensure high time precision.
 *
 * Must be a power of 2 between 2^5 and 2^15; 32, 64, 128, 256, 512, 1024, 2048, 4096, 8192, 16384, or 32768
 *
 * see also: https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode/fftSize
 */
const FFT_SIZE = 128 // TODO tune this value!!

const DEFAULT_SFST_THRESHOLD = 1.4
const DEFAULT_PERCUSSIVE_THRESHOLD = FFT_SIZE / 3 // TODO should this ratio'd to fftSize?

interface Config {
  bufferLen: number
  numChannels: number
  mimeType: string
}

export class InputAudioStream {
  // web audio api stuff
  private config: Config
  private node: ScriptProcessorNode
  private analyserNode: AnalyserNode
  private percussionDetector: PercussionDetector

  // fourier stuff
  private stftThreshold: number = DEFAULT_SFST_THRESHOLD
  private percussiveThreshold: number = DEFAULT_PERCUSSIVE_THRESHOLD
  private onBeatDetected: (sources: string[]) => void = () => {}

  constructor(config: Config = {
    bufferLen: 2048,
    numChannels: 2,
    mimeType: 'audio/wav'
  }) {
    this.config = Object.assign(this.config || {}, config)
  }

  init = (onBeatDetected: (sources: string[]) => void) => {
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

  setStftThreshold = (stftThreshold: number) => {
    this.stftThreshold = stftThreshold
  }

  setPercussiveThreshold = (percussiveThreshold: number) => {
    this.percussiveThreshold = percussiveThreshold
  }

  /**
   * Set up the audio handlers.
   *
   * @param stream
   */
  private handleStream = (stream: MediaStream) => {
    const audioContext = new AudioContext()
    const inputPoint = audioContext.createGain()

    // Create an AudioNode from the stream.
    const audioInput = audioContext.createMediaStreamSource(stream)
    audioInput.connect(inputPoint)

    this.analyserNode = audioContext.createAnalyser()
    this.analyserNode.fftSize = FFT_SIZE
    inputPoint.connect(this.analyserNode)

    const zeroGain = audioContext.createGain()
    zeroGain.gain.value = 0.0
    zeroGain.connect(audioContext.destination)
    inputPoint.connect(zeroGain)

    const context = inputPoint.context
    this.node = context.createScriptProcessor.call(
      context,
      this.config.bufferLen,
      this.config.numChannels,
      this.config.numChannels) as ScriptProcessorNode
    this.node.addEventListener('audioprocess', this.handleAudioInput)
    inputPoint.connect(this.node)
    this.node.connect(context.destination) // TODO this should not be necessary (?)
  }

  private handleAudioInput = () => {
    const freqValues = new Float32Array(this.analyserNode.frequencyBinCount)
    this.analyserNode.getFloatFrequencyData(freqValues)
    const amplitudeValues = new Float32Array(this.analyserNode.fftSize)
    this.analyserNode.getFloatTimeDomainData(amplitudeValues)
    this.processFrequencies(freqValues, amplitudeValues)
  }

  /**
   * Processes the given frequency values to determine if a percussive sound has occurred.
   */
  private processFrequencies = (freqValues: Float32Array, amplitudeValues: Float32Array) => {
    const sources = []
    const foo = this.percussionDetector.getPercussionCountBasicV2(freqValues, 1.1)
    if (foo > 5) {
      sources.push('basic')
      console.log('basic', foo)
    }
    const foo3 = this.percussionDetector.getPercussionCount(amplitudeValues, this.stftThreshold)
    if (foo3 > this.percussiveThreshold) {
      sources.push('normal')
      console.log('normal', foo3)
    }
    this.onBeatDetected(sources)
  }
}
