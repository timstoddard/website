import { Point } from './BezierCurve'

interface Color {
  r: number
  g: number
  b: number
}

const BLACK: Color = { r: 0, g: 0, b: 0 }
const RED: Color = { r: 255, g: 0, b: 0 }
const BLUE: Color = { r: 0, g: 0, b: 255 }

export default class CurveImpl {
  private points: Point[]
  private progress: number
  private maxProgress: number // how many lines the curve is made of
  private intermediatePoints: Point[][]
  private curvePoints: Point[]
  private twoPiRadians: number = 2 * Math.PI

  constructor(points: Point[], maxProgress: number) {
    this.init(points, maxProgress)
  }

  init = (points: Point[], maxProgress: number) => {
    this.points = points
    this.progress = 0
    this.maxProgress = maxProgress
    this.intermediatePoints = []
    this.curvePoints = []
  }

  drawNext = (canvas: CanvasRenderingContext2D) => {
    this.generateIntermediatePoints()
    this.drawLayers(canvas)
    this.drawCurve(canvas)
    this.progress++
    if (this.progress >= this.maxProgress * 2) {
      this.progress = 0
      this.curvePoints = []
    }
  }

  private generateIntermediatePoints = () => {
    const {
      points,
      progress,
      maxProgress,
    } = this
    const intermediatePoints: Point[][] = []
    const isForward = progress <= maxProgress
    const progressPercent = isForward
      ? progress / maxProgress
      : (maxProgress * 2 - progress) / maxProgress

    const intermediateLayers = points.length - 2
    if (intermediateLayers >= 1) {
      // generate intermediate point layers
      let intermediateLayer: Point[] = []
      for (let i = 0; i < intermediateLayers; i++) {
        const previousLayer = i === 0
          ? points
          : intermediatePoints[intermediatePoints.length - 1]
        for (let j = 0; j < previousLayer.length - 1; j++) {
          const point1 = previousLayer[j]
          const point2 = previousLayer[j + 1]
          const newPoint = {
            x: point1.x + (point2.x - point1.x) * progressPercent,
            y: point1.y + (point2.y - point1.y) * progressPercent,
          }
          intermediateLayer.push(newPoint)
        }
        intermediatePoints.push([...intermediateLayer])
        intermediateLayer = []
      }

      // calculate point on the actual curve
      const lastLayer = intermediatePoints[intermediatePoints.length - 1]
      if (isForward) {
        const curvePoint = {
          x: lastLayer[0].x + (lastLayer[1].x - lastLayer[0].x) * progressPercent,
          y: lastLayer[0].y + (lastLayer[1].y - lastLayer[0].y) * progressPercent,
        }
        this.curvePoints.push(curvePoint)
      } else {
        this.curvePoints.pop()
      }
    }

    this.intermediatePoints = intermediatePoints
  }

  private drawCurve = (canvas: CanvasRenderingContext2D) => {
    const { curvePoints } = this
    for (let i = 0; i < curvePoints.length - 1; i++) {
      const point1 = curvePoints[i]
      const point2 = curvePoints[i + 1]
      this.drawLine(canvas, point1, point2, RED)
    }
    if (curvePoints.length > 0) {
      const lastPoint = curvePoints[curvePoints.length - 1]
      this.drawDot(canvas, lastPoint, RED, 0.8)
    }
  }

  private drawLayers = (canvas: CanvasRenderingContext2D) => {
    const {
      points,
      intermediatePoints,
    } = this
    const dotColor = BLUE
    const lineColor = BLACK
    this.drawLayer(canvas, points, dotColor, lineColor)
    for (let i = 0; i < intermediatePoints.length; i++) {
      // opacity = [0.4, 1]
      const opacity = 1 - (0.6 * (i + 1) / intermediatePoints.length)
      this.drawLayer(canvas, intermediatePoints[i], dotColor, lineColor, opacity)
    }
  }

  private drawLayer = (
    canvas: CanvasRenderingContext2D,
    points: Point[],
    dotColor: Color,
    lineColor: Color,
    opacity = 1,
    isDevMode = false,
  ) => {
    for (let i = 0; i < points.length - 1; i++) {
      const point1 = points[i]
      const point2 = points[i + 1]
      if (isDevMode) {
        this.drawDot(canvas, point1, dotColor, opacity)
      }
      this.drawLine(canvas, point1, point2, lineColor, opacity)
    }
    if (isDevMode) {
      const lastPoint = points[points.length - 1]
      this.drawDot(canvas, lastPoint, dotColor, opacity)
    }
  }

  private drawDot = (
    canvas: CanvasRenderingContext2D,
    point: Point,
    color: Color,
    opacity = 1,
  ): void => {
    const DOT_RADIUS = 5
    canvas.beginPath()
    canvas.arc(point.x, point.y, DOT_RADIUS, 0, this.twoPiRadians)
    canvas.fillStyle = `rgba(${color.r},${color.g},${color.b},${opacity})`
    canvas.fill()
  }

  private drawLine = (
    canvas: CanvasRenderingContext2D,
    point1: Point,
    point2: Point,
    color: Color,
    opacity = 1,
  ): void => {
    canvas.beginPath()
    canvas.moveTo(point1.x, point1.y)
    canvas.lineTo(point2.x, point2.y)
    canvas.strokeStyle = `rgba(${color.r},${color.g},${color.b},${opacity})`
    canvas.stroke()
  }
}
