// Method used: https://arrow.tudublin.ie/cgi/viewcontent.cgi?article=1018&context=argcon
// Great primer on STFT: https://www.youtube.com/watch?v=-Yxj3yfvY-4

const TWO_PI = 2 * Math.PI

export default class PercussionDetector {
  private previousStftValues: Float32Array

  private previousStftValuesBasic: Float32Array
  private previousStftValuesBasicV2: Float32Array

  /**
   * Sums the frequencies that meet the percussive criteria. Use the provided js FFT values.
   *
   * Params:
   *
   * freqValues - the frequency values (floats) from the current time window
   *
   * threshold - threshold for a frequency rate of change to be considered percussive
   */
  getPercussionCountBasic = (freqValues: Float32Array, threshold: number) => {
    const K = freqValues.length
    let percussionSum = 0

    if (this.previousStftValuesBasic) {
      // sum all values marked as percussive
      for (let k = 0; k < K; k++) {
        if (this.previousStftValuesBasic[k] !== 0 && freqValues[k] !== 0) {
          const rateOfChange = this.previousStftValuesBasic[k] / freqValues[k]
          const scaledRateOfChange = 20 * Math.log10(rateOfChange)
          if (scaledRateOfChange > threshold) {
            percussionSum++
          } else if (scaledRateOfChange < 1 / threshold) {
            percussionSum--
          }
        }
      }
    }

    this.previousStftValuesBasic = freqValues.slice()

    return percussionSum
  }

  /**
   * Sums the frequencies that meet the percussive criteria. Use the provided js FFT values, scaled by a window function.
   *
   * Params:
   *
   * freqValues - the frequency values (floats) from the current time window
   *
   * threshold - threshold for a frequency rate of change to be considered percussive
   */
  getPercussionCountBasicV2 = (freqValues: Float32Array, threshold: number) => {
    const K = freqValues.length
    let percussionSum = 0

    // applies the Hanning window function to a given value
    const hanningScalar = TWO_PI / (K - 1)
    const w = (n: number) => {
      return (1 - Math.cos(hanningScalar * n)) / 2
    }

    if (this.previousStftValuesBasicV2) {
      // sum all values marked as percussive
      for (let k = 0; k < K; k++) {
        freqValues[k] /= w(k)
        if (this.previousStftValuesBasicV2[k] !== 0 && freqValues[k] !== 0) {
          const rateOfChange = this.previousStftValuesBasicV2[k] / freqValues[k]
          const scaledRateOfChange = 20 * Math.log10(rateOfChange)
          if (scaledRateOfChange > threshold) {
            percussionSum++
          } else if (scaledRateOfChange < 1 / threshold) {
            percussionSum--
          }
        }
      }
    }

    this.previousStftValuesBasicV2 = freqValues.slice()

    return percussionSum
  }

  /**
   * Sums the frequencies that meet the percussive criteria. Uses a self-computed process for STFT.
   *
   * Params:
   *
   * amplitudeValues - the amplitude values (floats) from the current time window
   *
   * threshold - threshold for a frequency rate of change to be considered percussive. For example, a value of 1.25 would mean the scaled frequency rate of change must be 25% or more between frames to be considered percussive.
   */
  getPercussionCount = (amplitudeValues: Float32Array, threshold: number) => {
    const K = amplitudeValues.length
    let percussionSum = 0
    const currentStftValues = []

    if (this.previousStftValues) {
      // sum all values marked as percussive
      for (let k = 0; k < K; k++) {
        currentStftValues[k] = this.stft(amplitudeValues, k)
        if (this.previousStftValues[k] !== 0 && amplitudeValues[k] !== 0) {
          const rateOfChange = this.previousStftValues[k] / currentStftValues[k]
          // TODO is 20 needed?? should it be tuned?
          const scaledRateOfChange = 20 * Math.log10(rateOfChange)
          if (scaledRateOfChange > threshold) {
            percussionSum++
          } else if (scaledRateOfChange < 1) {
            // TODO tune this
            percussionSum -= 0.2
          }
        }
      }
    }

    this.previousStftValues = amplitudeValues.slice()

    return percussionSum
  }

  /**
   * Performs a short-time Fourier transform using the following equation:
   *
   * X(k,m) = abs(sum n = 0->N-1, w(n) * x(n + mH) * e ^ (-j * 2pi * k * n / N))
   *
   * k - frequency bin index
   *
   * m - time frame index (not needed in this implementation)
   *
   * N - FFT window size
   *
   * H - hopsize between frames (not needed in this implementation)
   *
   * Params:
   *
   * amplitudeValues - the amplitude values from the signal wave in the current time window. Relating to the equation, this is `x(n + mH), n = 0->N-1`.
   *
   * k - frequency bin index
   */
  private stft = (amplitudeValues: Float32Array, k: number) => {
    const N = amplitudeValues.length

    const hanningScalar = TWO_PI / (N - 1)
    /** Applies the Hanning window function `0.5 * (1 - cos(2PI * n / (N - 1))), n = 1..N`. */
    const w = (n: number) => {
      return (1 - Math.cos(hanningScalar * n)) / 2
    }

    const jScalar = TWO_PI * k / N
    /** Returns complex result of `e ^ (-j * 2PI * k * n / N)`. */
    const e = (n: number) => {
      // Euler identity: e ^ (i * x) = cos(x) + i * sin(x)
      const x = n * jScalar
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
