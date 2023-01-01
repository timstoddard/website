// base acceleration values
const MIN_BASE_ACCELERATION = 1.005
const MAX_BASE_ACCELERATION = 1.045
// acceleration values after init
const MIN_TOTAL_ACCELERATION = 0.99
const MAX_TOTAL_ACCELERATION = 1.05
const ACCELERATION_SIN_FN_SCALAR = 0.03
// stars config
const INITIAL_STARS_COUNT = 10
const STAR_BASE_LENGTH = 3 // keep it short at first (<10)
const STAR_BASE_LENGTH_SCALAR = 2
const STAR_INCREASE_LENGTH_SCALAR = 1.25
// math constants
export const TWO_PI_RADIANS = 2 * Math.PI

export interface Star {
  // position
  x1: number
  y1: number
  x2: number
  y2: number
  // velocity
  dx: number
  dy: number
  // acceleration
  acceleration: number
  // appearance
  color: Color
  opacity: number
}

export enum Color {
  RED,
  ORANGE,
  YELLOW,
  GREEN,
  BLUE,
  PURPLE,
}

export interface ViewportDimensions {
  viewportWidth: number
  viewportHeight: number
}

export class StarService {
  private stars: Star[]
  private startTimeMs: number

  constructor(viewportDimensions: ViewportDimensions) {
    this.startTimeMs = Date.now()

    // generate the stars
    this.stars = []
    for (let i = 0; i < INITIAL_STARS_COUNT; i++) {
      this.stars.push(this.createNewStar(Color.RED, viewportDimensions))
    }
  }

  getStars = () => this.stars

  createNewStar = (color: Color, viewportDimensions: ViewportDimensions): Star => {
    const {
      viewportWidth,
      viewportHeight,
    } = viewportDimensions
    const randomPositive = (a: number, b: number): number => a + (Math.random() * (b - a))
    const opacity = randomPositive(0.6, 1)

    // start from center
    const centerX = viewportWidth / 2
    const centerY = viewportHeight / 2

    // generate velocity based on random angle
    const angle = randomPositive(0, TWO_PI_RADIANS)
    const dx = Math.cos(angle)
    const dy = Math.sin(angle)

    // initial acceleration value
    const acceleration = randomPositive(MIN_BASE_ACCELERATION, MAX_BASE_ACCELERATION)
    const lengthScalar = (acceleration - MIN_BASE_ACCELERATION) / (MAX_BASE_ACCELERATION - MIN_BASE_ACCELERATION)

    // generate 2nd pair of coords
    const initLength = STAR_BASE_LENGTH * (STAR_BASE_LENGTH_SCALAR * lengthScalar)
    const x1 = centerX + dx * initLength
    const y1 = centerY + dy * initLength
    const x2 = x1 + dx * initLength
    const y2 = y1 + dy * initLength

    return {
      x1,
      y1,
      x2,
      y2,
      dx,
      dy,
      acceleration,
      opacity,
      color,
    }
  }

  addStars = (viewportDimensions: ViewportDimensions): void => {
    // when time based scalar is at its minimum, accel is lowest -> add fewer stars
    // when time based scalar is at its maximum, accel is highest -> add more stars
    const baseScalar = this.getTimeBasedScalar() + 2 // [1, 3]
    const customScalar = baseScalar * 3
    for (let i = 0; i < customScalar; i++) {
      this.stars.push(this.createNewStar(Color.BLUE, viewportDimensions))
    }
  }

  updateStars = (viewportDimensions: ViewportDimensions): void => {
    const {
      viewportWidth,
      viewportHeight,
    } = viewportDimensions
    const accelerationDelta = this.getAccelerationScalar()

    // update all star positions
    this.stars = this.stars.map(({
      x1,
      y1,
      x2,
      y2,
      dx,
      dy,
      acceleration,
      opacity,
      color,
    }: Star) => {
      // apply velocity to coordinates
      const newX1 = x1 + dx
      const newY1 = y1 + dy
      const newX2 = x2 + dx * STAR_INCREASE_LENGTH_SCALAR
      const newY2 = y2 + dy * STAR_INCREASE_LENGTH_SCALAR

      // check if new position is out of bounds
      const outOfBounds = newX1 < 0
        || newX1 > viewportWidth
        || newY1 < 0
        || newY1 > viewportHeight

      if (outOfBounds) {
        return null
      } else {
        // apply acceleration to velocity
        const variableAcceleration = this.valueInRange(
          acceleration * accelerationDelta,
          MIN_TOTAL_ACCELERATION,
          MAX_TOTAL_ACCELERATION,
        )
        const newDx = dx * variableAcceleration
        const newDy = dy * variableAcceleration

        const updatedStar = {
          x1: newX1,
          y1: newY1,
          x2: newX2,
          y2: newY2,
          dx: newDx,
          dy: newDy,
          acceleration,
          opacity,
          color,
        }
        return updatedStar
      }
    })
      // filter null stars (out of bounds)
      .filter(start => !!start)
  }

  /**
   * Returns the value if it is in the range of [min, max], otherwise returns
   * the nearest value in the range.
   * @param value 
   * @param min 
   * @param max 
   * @returns 
   */
  private valueInRange = (value: number, min: number, max: number) => {
    return Math.max(Math.min(value, max), min)
  }

  /**
   * Returns values in range [MIN_TOTAL_ACCELERATION, MIN_TOTAL_ACCELERATION + 2 * ACCELERATION_SIN_FN_SCALAR].
   * @returns 
   */
  private getAccelerationScalar = () => {
    const min = MIN_TOTAL_ACCELERATION
    const accelerationScalar = min
      // add scaled sin value
      + (this.getTimeBasedScalar() * ACCELERATION_SIN_FN_SCALAR)
      // offset negative sin values
      + ACCELERATION_SIN_FN_SCALAR
    return accelerationScalar
  }

  /**
   * Returns a value from a periodic function based on elapsed ms since the component was created.
   * Value is in the range [-1, 1].
   * @returns 
   */
  private getTimeBasedScalar = () => {
    // calculate variable acceleration delta to apply to all stars
    // (makes animation speed up and slow down)
    const elapsedMs = Date.now() - this.startTimeMs
    return Math.sin(elapsedMs / 2000) // TODO magic number
  }
}
