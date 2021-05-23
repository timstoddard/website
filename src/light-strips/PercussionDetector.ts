// Method used: https://arrow.tudublin.ie/cgi/viewcontent.cgi?article=1018&context=argcon
// Great primer on STFT: https://www.youtube.com/watch?v=-Yxj3yfvY-4
// Thesis on related topic: https://www.ii.uib.no/~espenr/hovedfag/thesis.pdf

const TWO_PI = 2 * Math.PI

export default class PercussionDetector {
  private previousDbValues: Float32Array
  private previousDbValuesFast: Float32Array

  getPercussionCountTimeMs = 0
  getPercussionCountFastTimeMs = 0

  getStftValues =  () => this.previousDbValues

  /**
   * Sums the frequencies that meet the percussive criteria. Designed for use with the result of AnalyserNode.getFloatFrequencyData(), which calculates a similar result but is much more performant than the JS implemention of STFT below due to the former using builtins under the hood. (https://github.com/chromium/chromium/blob/99314be8152e688bafbbf9a615536bdbb289ea87/third_party/blink/renderer/platform/audio/mac/fft_frame_mac.cc#L142)
   *
   * For the Web Audio spec about FFT implementation, see this link:
   * https://webaudio.github.io/web-audio-api/#fft-windowing-and-smoothing-over-time
   *
   * Params:
   * - freqValues: the frequency values (floats) from the current time window
   * - threshold: threshold for a frequency rate of change to be considered percussive
   */
  getPercussionCountFast = (freqValues: Float32Array, threshold: number) => {
    const start = Date.now()
    const K = freqValues.length
    let percussionSum = 0

    if (this.previousDbValuesFast) {
      // sum all values marked as percussive
      for (let k = 0; k < K; k++) {
        const rateOfChange = this.previousDbValuesFast[k] - freqValues[k]
        if (rateOfChange > threshold) {
          percussionSum++
        }
      }
    }

    this.previousDbValuesFast = freqValues.slice()
    this.getPercussionCountFastTimeMs = Date.now() - start

    return percussionSum
  }

  /**
   * Sums the frequencies that meet the percussive criteria. Uses a self-computed process for STFT.
   *
   * Params:
   * - amplitudeValues: the amplitude values (floats) from the current time window
   * - threshold: threshold for a frequency rate of change to be considered percussive. For example, a value of 1.25 would mean the scaled frequency rate of change must be 25% or more between frames to be considered percussive.
   */
  getPercussionCount = (amplitudeValues: Float32Array, threshold: number) => {
    const start = Date.now()
    const K = amplitudeValues.length / 2
    let percussionSum = 0
    const currentDbValues = new Float32Array(K)

    if (this.previousDbValues) {
      // sum all values marked as percussive
      for (let k = 0; k < K; k++) {
        // conversion to db
        currentDbValues[k] = 20 * Math.log10(this.stft(amplitudeValues, k))
        // log identity: log(x / y) = log(x) - log(y)
        const dbDelta = this.previousDbValues[k] - currentDbValues[k]
        if (dbDelta > threshold) {
          percussionSum++
        }
      }
    }

    this.previousDbValues = currentDbValues
    // console.log('STFT', currentDbValues.slice())
    this.getPercussionCountTimeMs = Date.now() - start

    return percussionSum
  }

  /**
   * Performs a short-time Fourier transform using the following equation:
   *
   * X(k,m) = abs(sum n = 0->N-1, w(n) * x(n + mH) * e ^ (-j * 2pi * k * n / N))
   * - k: frequency bin index
   * - m: time frame index (not needed in this implementation)
   * - N: FFT window size
   * - H: hopsize between frames (not needed in this implementation)
   *
   * Params:
   * - amplitudeValues: the amplitude values from the signal wave in the current time window. Relating to the equation, this is `x(n + mH), n = 0->N-1`.
   * - k: frequency bin index
   */
  private stft = (amplitudeValues: Float32Array, k: number) => {
    const N = amplitudeValues.length

    const hanningScalar = TWO_PI / (N - 1)
    /** Applies the Hanning window function `0.5 * (1 - cos(2PI * n / (N - 1))), n = 1..N`. */
    const w = (n: number) => {
      return (1 - Math.cos(hanningScalar * n)) / 2
    }

    const jScalar = - TWO_PI * k / N
    /** Returns complex result of `e ^ (-j * 2PI * k * n / N)`. */
    const e = (n: number) => {
      // Euler identity: e ^ (i * x) = cos(x) + i * sin(x)
      const x = jScalar * n
      return new Complex(Math.cos(x), Math.sin(x))
    }

    const complex = new Complex(0, 0)
    for (let n = 0; n < N; n++) {
      complex.addComplex(e(n).multiply(amplitudeValues[n] * w(n)))
    }

    return complex.magnitude()
  }
}

class Complex {
  private a: number
  private b: number

  constructor(a: number, b: number) {
    this.a = a
    this.b = b
  }

  addComplex = (other: Complex) => {
    this.a += other.a
    this.b += other.b
    return this
  }

  multiply = (n: number) => {
    this.a *= n
    this.b *= n
    return this
  }

  magnitude = () => {
    return Math.sqrt(this.a * this.a + this.b * this.b)
  }
}
