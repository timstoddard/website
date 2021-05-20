// https://developers.meethue.com/develop/application-design-guidance/color-conversion-formulas-rgb-to-xy-and-back

class CGPoint {
  x: number
  y: number

  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }
}

export class UIColor {
  r: number
  g: number
  b: number

  constructor(r: number, g: number, b: number) {
    this.r = r
    this.g = g
    this.b = b
  }
}

const cptRED = 0
const cptGREEN = 1
const cptBLUE = 2

/**
 * Convert to an rgb color given an xy value.
 *
 * @param xy x and y values from which to convert
 * @param model model of the hue bulb to make the color work with
 */
export const colorFromXy = (xy: CGPoint, model: string): UIColor => {
  const colorPoints = colorPointsForModel(model)
  const inReachOfLamps = checkPointInLampsReach(xy, colorPoints)

  if (!inReachOfLamps) {
    // It seems the colour is out of reach
    // let's find the closest colour we can produce with our lamp and send this XY value out.

    // Find the closest point on each line in the triangle.
    // tslint:disable:max-line-length
    const pAB = getClosestPointToPoints(getPointFromValue(colorPoints[cptRED]), getPointFromValue(colorPoints[cptGREEN]), xy)
    const pAC = getClosestPointToPoints(getPointFromValue(colorPoints[cptBLUE]), getPointFromValue(colorPoints[cptRED]), xy)
    const pBC = getClosestPointToPoints(getPointFromValue(colorPoints[cptGREEN]), getPointFromValue(colorPoints[cptBLUE]), xy)
    // tslint:enable:max-line-length

    // et the distances per point and see which point is closer to our Point.
    const dAB = getDistanceBetweenTwoPoints(xy, pAB)
    const dAC = getDistanceBetweenTwoPoints(xy, pAC)
    const dBC = getDistanceBetweenTwoPoints(xy, pBC)

    let lowest = dAB
    let closestPoint = pAB

    if (dAC < lowest) {
        lowest = dAC
        closestPoint = pAC
    }
    if (dBC < lowest) {
        lowest = dBC
        closestPoint = pBC
    }

    // Change the xy value to a value which is within the reach of the lamp.
    xy.x = closestPoint.x
    xy.y = closestPoint.y
  }

  const x = xy.x
  const y = xy.y
  const z = 1 - x - y

  const Y = 1
  const X = (Y / y) * x
  const Z = (Y / y) * z

  // sRGB D65 conversion
  let r =  X * 1.656492 - Y * 0.354851 - Z * 0.255038
  let g = -X * 0.707196 + Y * 1.655397 + Z * 0.036152
  let b =  X * 0.051713 - Y * 0.121364 + Z * 1.011530

  if (r > b && r > g && r > 1) {
    // red is too big
    g = g / r
    b = b / r
    r = 1
  } else if (g > b && g > r && g > 1) {
    // green is too big
    r = r / g
    b = b / g
    g = 1
  } else if (b > r && b > g && b > 1) {
    // blue is too big
    r = r / b
    g = g / b
    b = 1
  }

  // Apply gamma correction
  r = r <= 0.0031308 ? 12.92 * r : (1.0 + 0.055) * Math.pow(r, (1.0 / 2.4)) - 0.055
  g = g <= 0.0031308 ? 12.92 * g : (1.0 + 0.055) * Math.pow(g, (1.0 / 2.4)) - 0.055
  b = b <= 0.0031308 ? 12.92 * b : (1.0 + 0.055) * Math.pow(b, (1.0 / 2.4)) - 0.055

  if (r > b && r > g) {
    // red is biggest
    if (r > 1) {
      g = g / r
      b = b / r
      r = 1
    }
  } else if (g > b && g > r) {
    // green is biggest
    if (g > 1) {
      r = r / g
      b = b / g
      g = 1
    }
  } else if (b > r && b > g) {
    // blue is biggest
    if (b > 1) {
      r = r / b
      g = g / b
      b = 1
    }
  }

  return new UIColor(
    Math.round(r * 255),
    Math.round(g * 255),
    Math.round(b * 255))
}

/**
 * Returns the color gamut points for the given model.
 *
 * @param model model of the hue bulb
 * @returns the color points for the given model
 */
const colorPointsForModel = (model: string): number[][] => {
  const colorPoints: number[][] = []

  const hueBulbs = [
    'LCT001', /* Hue A19 */
    'LCT002', /* Hue BR30 */
    'LCT003', /* Hue GU10 */
  ]
  const livingColors = [
    'LLC001', /* Monet, Renoir, Mondriaan (gen II) */
    'LLC005', /* Bloom (gen II) */
    'LLC006', /* Iris (gen III) */
    'LLC007', /* Bloom, Aura (gen III) */
    'LLC011', /* Hue Bloom */
    'LLC012', /* Hue Bloom */
    'LLC013', /* Storylight */
    'LST001', /* Light Strips */
  ]

  if (hueBulbs.includes(model)) {
    // Hue bulbs color gamut triangle
    colorPoints.push(getValueFromPoint(makeCGPoint(0.674, 0.322))) // Red
    colorPoints.push(getValueFromPoint(makeCGPoint(0.408, 0.517))) // Green
    colorPoints.push(getValueFromPoint(makeCGPoint(0.168, 0.041))) // Blue
  } else if (livingColors.includes(model)) {
    // LivingColors color gamut triangle
    colorPoints.push(getValueFromPoint(makeCGPoint(0.703, 0.296))) // Red
    colorPoints.push(getValueFromPoint(makeCGPoint(0.214, 0.709))) // Green
    colorPoints.push(getValueFromPoint(makeCGPoint(0.139, 0.081))) // Blue
  } else {
    // Default construct triangle wich contains all values
    colorPoints.push(getValueFromPoint(makeCGPoint(1.0, 0.0))) // Red
    colorPoints.push(getValueFromPoint(makeCGPoint(0.0, 1.0))) // Green
    colorPoints.push(getValueFromPoint(makeCGPoint(0.0, 0.0))) // Blue
  }

  return colorPoints
}

/**
 * Convert to an xy value given an rgb color.
 *
 * @param xy x and y values from which to convert
 * @param model model of the hue bulb to make the color work with
 */
export const calculateXY = (color: UIColor, model: string): CGPoint => {
  const red = color.r
  const green = color.g
  const blue = color.b

  // Apply gamma correction
  const r = (red > 0.04045) ? Math.pow((red + 0.055) / (1 + 0.055), 2.4) : (red / 12.92)
  const g = (green > 0.04045) ? Math.pow((green + 0.055) / (1 + 0.055), 2.4) : (green / 12.92)
  const b = (blue > 0.04045) ? Math.pow((blue + 0.055) / (1 + 0.055), 2.4) : (blue / 12.92)

  // Wide gamut conversion D65
  const X = r * 0.664511 + g * 0.154324 + b * 0.162028
  const Y = r * 0.283881 + g * 0.668433 + b * 0.047685
  const Z = r * 0.000088 + g * 0.072310 + b * 0.986039

  let cx = X / (X + Y + Z)
  let cy = Y / (X + Y + Z)

  if (isNaN(cx)) {
      cx = 0
  }

  if (isNaN(cy)) {
      cy = 0
  }

  // Check if the given XY value is within the colourreach of our lamps.

  const xyPoint = makeCGPoint(cx, cy)
  const colorPoints = colorPointsForModel(model)
  const inReachOfLamps = checkPointInLampsReach(xyPoint, colorPoints)

  if (!inReachOfLamps) {
    // It seems the colour is out of reach
    // let's find the closest colour we can produce with our lamp and send this XY value out.

    // Find the closest point on each line in the triangle.
    // tslint:disable:max-line-length
    const pAB = getClosestPointToPoints(getPointFromValue(colorPoints[cptRED]), getPointFromValue(colorPoints[cptGREEN]), xyPoint)
    const pAC = getClosestPointToPoints(getPointFromValue(colorPoints[cptBLUE]), getPointFromValue(colorPoints[cptRED]), xyPoint)
    const pBC = getClosestPointToPoints(getPointFromValue(colorPoints[cptGREEN]), getPointFromValue(colorPoints[cptBLUE]), xyPoint)
    // tslint:enable:max-line-length

    // Get the distances per point and see which point is closer to our Point.
    const dAB = getDistanceBetweenTwoPoints(xyPoint, pAB)
    const dAC = getDistanceBetweenTwoPoints(xyPoint, pAC)
    const dBC = getDistanceBetweenTwoPoints(xyPoint, pBC)

    let lowest = dAB
    let closestPoint = pAB

    if (dAC < lowest) {
        lowest = dAC
        closestPoint = pAC
    }
    if (dBC < lowest) {
        lowest = dBC
        closestPoint = pBC
    }

    // Change the xy value to a value which is within the reach of the lamp.
    cx = closestPoint.x
    cy = closestPoint.y
  }

  return makeCGPoint(cx, cy)
}

/**
 * Calculates crossProduct of two 2D vectors / points.
 *
 * @param p1 first point used as vector
 * @param p2 second point used as vector
 * @return crossProduct of vectors
 */
const crossProduct = (p1: CGPoint, p2: CGPoint): number => {
  return (p1.x * p2.y - p1.y * p2.x)
}

/**
 * Find the closest point on a line.
 * This point will be within reach of the lamp.
 *
 * @param A the point where the line starts
 * @param B the point where the line ends
 * @param P the point which is close to a line.
 * @return the point which is on the line.
 */
const getClosestPointToPoints = (A: CGPoint, B: CGPoint, P: CGPoint): CGPoint => {
  const AP = makeCGPoint(P.x - A.x, P.y - A.y)
  const AB = makeCGPoint(B.x - A.x, B.y - A.y)
  const ab2 = AB.x * AB.x + AB.y * AB.y
  const ap_ab = AP.x * AB.x + AP.y * AB.y // tslint:disable-line:variable-name

  let t = ap_ab / ab2

  if (t < 0) {
    t = 0
  } else if (t > 1) {
    t = 1
  }

  const newPoint = makeCGPoint(A.x + AB.x * t, A.y + AB.y * t)
  return newPoint
}

/**
 * Find the distance between two points.
 *
 * @param one
 * @param two
 * @return the distance between point one and two
 */
const getDistanceBetweenTwoPoints = (one: CGPoint, two: CGPoint): number => {
  const dx = one.x - two.x
  const dy = one.y - two.y
  const dist = Math.sqrt(dx * dx + dy * dy)
  return dist
}

/**
 * Method to see if the given XY value is within the reach of the lamps.
 *
 * @param p the point containing the X,Y value
 * @param colorPoints the color gamut points to use as bounds
 * @return true if within reach, false otherwise.
 */
const checkPointInLampsReach = (p: CGPoint, colorPoints: number[][]): boolean => {
  const red = getPointFromValue(colorPoints[cptRED])
  const green = getPointFromValue(colorPoints[cptGREEN])
  const blue = getPointFromValue(colorPoints[cptBLUE])

  const v1 = makeCGPoint(green.x - red.x, green.y - red.y)
  const v2 = makeCGPoint(blue.x - red.x, blue.y - red.y)

  const q = makeCGPoint(p.x - red.x, p.y - red.y)

  const s = crossProduct(q, v2) / crossProduct(v1, v2)
  const t = crossProduct(v1, q) / crossProduct(v1, v2)

  return s >= 0 && t >= 0 && s + t <= 1
}

////////////// HELPER FUNCTIONS //////////////

export const makeCGPoint = (x: number, y: number): CGPoint => {
  return new CGPoint(x, y)
}

const getPointFromValue = (value: number[]): CGPoint => {
  return makeCGPoint(value[0], value[1])
}

export const getValueFromPoint = (point: CGPoint): number[] => {
  return [point.x, point.y]
}
