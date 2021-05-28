import { Point } from './BezierCurve'

const DEFAULT_SIDE_LENGTH = 100

export default class Letters {
  private sideLength: number
  private XS_PADDING_X: number
  private SMALL_PADDING_X: number
  private MEDIUM_PADDING_X: number
  private LARGE_PADDING_X: number
  private XL_PADDING_X: number
  private XS_PADDING_DIAG: number
  private SMALL_PADDING_DIAG: number
  private MEDIUM_PADDING_DIAG: number
  private LARGE_PADDING_DIAG: number
  private XL_PADDING_DIAG: number

  constructor(sideLength = DEFAULT_SIDE_LENGTH) {
    this.sideLength = sideLength

    this.XS_PADDING_X = this.scaled(5)
    this.SMALL_PADDING_X = this.scaled(10)
    this.MEDIUM_PADDING_X = this.scaled(15)
    this.LARGE_PADDING_X = this.scaled(20)
    this.XL_PADDING_X = this.scaled(25)

    this.XS_PADDING_DIAG = this.scaled(10)
    this.SMALL_PADDING_DIAG = this.scaled(12)
    this.MEDIUM_PADDING_DIAG = this.scaled(15)
    this.LARGE_PADDING_DIAG = this.scaled(20)
    this.XL_PADDING_DIAG = this.scaled(25)
  }

  A = (x: number, y: number): Point[] => {
    const paddingX = this.SMALL_PADDING_X
    const barHeight = this.sideLength * 0.7
    const barDeltaX = (this.sideLength - barHeight) * 0.4
    return [
      { x: x + paddingX, y: y + this.sideLength },
      { x: x + (this.sideLength / 2), y: y + 0 },
      { x: x + (this.sideLength - paddingX), y: y + this.sideLength },
      { x: x + (this.sideLength - paddingX) - barDeltaX, y: y + barHeight },
      { x: x + paddingX + barDeltaX, y: y + barHeight },
    ]
  }
  
  B = (x: number, y: number): Point[] => {
    const paddingX = this.XL_PADDING_X
    const paddingDiag = this.MEDIUM_PADDING_DIAG
    return [
      { x: x + paddingX, y: y + 0 },
      { x: x + paddingX, y: y + this.sideLength },
      { x: x + paddingX, y: y + 0 },
      { x: x + (this.sideLength - paddingX - paddingDiag), y: y + 0 },
      { x: x + (this.sideLength - paddingX), y: y + paddingDiag },
      { x: x + (this.sideLength - paddingX), y: y + ((this.sideLength / 2) - paddingDiag) },
      { x: x + (this.sideLength - paddingX - paddingDiag), y: y + (this.sideLength / 2) },
      { x: x + paddingX, y: y + (this.sideLength / 2) },
      { x: x + (this.sideLength - paddingX - paddingDiag), y: y + (this.sideLength / 2) },
      { x: x + (this.sideLength - paddingX), y: y + ((this.sideLength / 2) + paddingDiag) },
      { x: x + (this.sideLength - paddingX), y: y + (this.sideLength - paddingDiag) },
      { x: x + (this.sideLength - paddingX - paddingDiag), y: y + this.sideLength },
      { x: x + paddingX, y: y + this.sideLength },
    ]
  }
  
  C = (x: number, y: number): Point[] => {
    const paddingX = this.MEDIUM_PADDING_X
    const paddingDiag = this.LARGE_PADDING_DIAG
    return [
      { x: x + (this.sideLength - paddingX), y: y + paddingDiag },
      { x: x + (this.sideLength - paddingX - paddingDiag), y: y + 0 },
      { x: x + paddingX + paddingDiag, y: y + 0 },
      { x: x + paddingX, y: y + paddingDiag },
      { x: x + paddingX, y: y + (this.sideLength - paddingDiag) },
      { x: x + paddingX + paddingDiag, y: y + this.sideLength },
      { x: x + (this.sideLength - paddingX - paddingDiag), y: y + this.sideLength },
      { x: x + (this.sideLength - paddingX), y: y + (this.sideLength - paddingDiag) },
    ]
  }
  
  D = (x: number, y: number): Point[] => {
    const paddingX = this.MEDIUM_PADDING_X
    const paddingDiag = this.XL_PADDING_DIAG
    return [
      { x: x + paddingX, y: y + 0 },
      { x: x + (this.sideLength - paddingX - paddingDiag), y: y + 0 },
      { x: x + (this.sideLength - paddingX), y: y + paddingDiag },
      { x: x + (this.sideLength - paddingX), y: y + (this.sideLength - paddingDiag) },
      { x: x + (this.sideLength - paddingX - paddingDiag), y: y + this.sideLength },
      { x: x + paddingX, y: y + this.sideLength },
      { x: x + paddingX, y: y + 0 },
    ]
  }
  
  E = (x: number, y: number): Point[] => {
    const paddingX = this.LARGE_PADDING_X
    return [
      { x: x + (this.sideLength - paddingX), y: y + 0 },
      { x: x + paddingX, y: y + 0 },
      { x: x + paddingX, y: y + (this.sideLength / 2) },
      { x: x + (this.sideLength / 2), y: y + (this.sideLength / 2) },
      { x: x + paddingX, y: y + (this.sideLength / 2) },
      { x: x + paddingX, y: y + this.sideLength },
      { x: x + (this.sideLength - paddingX), y: y + this.sideLength },
    ]
  }
  
  F = (x: number, y: number): Point[] => {
    const paddingX = this.LARGE_PADDING_X
    return [
      { x: x + (this.sideLength - paddingX), y: y + 0 },
      { x: x + paddingX, y: y + 0 },
      { x: x + paddingX, y: y + (this.sideLength / 2) },
      { x: x + (this.sideLength / 2), y: y + (this.sideLength / 2) },
      { x: x + paddingX, y: y + (this.sideLength / 2) },
      { x: x + paddingX, y: y + this.sideLength },
    ]
  }
  
  G = (x: number, y: number): Point[] => {
    const paddingX = this.MEDIUM_PADDING_X
    const paddingDiag = this.MEDIUM_PADDING_DIAG
    return [
      { x: x + (this.sideLength - paddingX), y: y + paddingDiag },
      { x: x + (this.sideLength - paddingX - paddingDiag), y: y + 0 },
      { x: x + paddingX + paddingDiag, y: y + 0 },
      { x: x + paddingX, y: y + paddingDiag },
      { x: x + paddingX, y: y + (this.sideLength - paddingDiag) },
      { x: x + paddingX + paddingDiag, y: y + this.sideLength },
      { x: x + (this.sideLength - paddingX - paddingDiag), y: y + this.sideLength },
      { x: x + (this.sideLength - paddingX), y: y + (this.sideLength - paddingDiag) },
      { x: x + (this.sideLength - paddingX), y: y + (this.sideLength - paddingDiag * 3) },
      { x: x + (this.sideLength - paddingX - paddingDiag * 2), y: y + (this.sideLength - paddingDiag * 3) },
    ]
  }
  
  H = (x: number, y: number): Point[] => {
    const paddingX = this.LARGE_PADDING_X
    const barHeight = this.sideLength * 0.55
    return [
      { x: x + paddingX, y: y + 0 },
      { x: x + paddingX, y: y + this.sideLength },
      { x: x + paddingX, y: y + barHeight },
      { x: x + (this.sideLength - paddingX), y: y + barHeight },
      { x: x + (this.sideLength - paddingX), y: y + this.sideLength },
      { x: x + (this.sideLength - paddingX), y: y + 0 },
    ]
  }
  
  I = (x: number, y: number): Point[] => {
    const paddingX = this.XL_PADDING_X
    return [
      { x: x + paddingX, y: y + 0 },
      { x: x + (this.sideLength - paddingX), y: y + 0 },
      { x: x + (this.sideLength / 2), y: y + 0 },
      { x: x + (this.sideLength / 2), y: y + this.sideLength },
      { x: x + (this.sideLength - paddingX), y: y + this.sideLength },
      { x: x + paddingX, y: y + this.sideLength },
    ]
  }
  
  J = (x: number, y: number): Point[] => {
    const paddingX = this.SMALL_PADDING_X
    const paddingDiag = this.SMALL_PADDING_DIAG
    return [
      { x: x + paddingX, y: y + 0 },
      { x: x + (this.sideLength - paddingX), y: y + 0 },
      { x: x + (this.sideLength / 2), y: y + 0 },
      { x: x + (this.sideLength / 2), y: y + (this.sideLength - paddingDiag) },
      { x: x + ((this.sideLength / 2) - paddingDiag), y: y + this.sideLength },
      { x: x + paddingX + paddingDiag, y: y + this.sideLength },
      { x: x + paddingX, y: y + (this.sideLength - paddingDiag) },
      { x: x + paddingX, y: y + (this.sideLength - paddingDiag * 2) },
    ]
  }
  
  K = (x: number, y: number): Point[] => {
    const paddingX = this.LARGE_PADDING_X
    return [
      { x: x + paddingX, y: y + 0 },
      { x: x + paddingX, y: y + this.sideLength },
      { x: x + paddingX, y: y + (this.sideLength / 2) },
      { x: x + (this.sideLength - paddingX), y: y + 0 },
      { x: x + paddingX, y: y + (this.sideLength / 2) },
      { x: x + (this.sideLength - paddingX), y: y + this.sideLength },
    ]
  }
  
  L = (x: number, y: number): Point[] => {
    const paddingX = this.LARGE_PADDING_X
    return [
      { x: x + paddingX, y: y + 0 },
      { x: x + paddingX, y: y + this.sideLength },
      { x: x + (this.sideLength - paddingX), y: y + this.sideLength },
    ]
  }
  
  M = (x: number, y: number): Point[] => {
    const paddingX = this.SMALL_PADDING_X
    return [
      { x: x + paddingX, y: y + this.sideLength },
      { x: x + paddingX, y: y + 0 },
      { x: x + (this.sideLength / 2), y: y + (this.sideLength * 2 / 3) },
      { x: x + (this.sideLength - paddingX), y: y + 0 },
      { x: x + (this.sideLength - paddingX), y: y + this.sideLength },
    ]
  }
  
  N = (x: number, y: number): Point[] => {
    const paddingX = this.MEDIUM_PADDING_X
    return [
      { x: x + paddingX, y: y + this.sideLength },
      { x: x + paddingX, y: y + 0 },
      { x: x + (this.sideLength - paddingX), y: y + this.sideLength },
      { x: x + (this.sideLength - paddingX), y: y + 0 },
    ]
  }
  
  O = (x: number, y: number): Point[] => {
    const paddingX = this.MEDIUM_PADDING_X
    const paddingDiag = this.MEDIUM_PADDING_DIAG
    return [
      { x: x + paddingX + paddingDiag, y: y + 0 },
      { x: x + (this.sideLength - paddingX - paddingDiag), y: y + 0 },
      { x: x + (this.sideLength - paddingX), y: y + paddingDiag },
      { x: x + (this.sideLength - paddingX), y: y + (this.sideLength - paddingDiag) },
      { x: x + (this.sideLength - paddingX - paddingDiag), y: y + this.sideLength },
      { x: x + paddingX + paddingDiag, y: y + this.sideLength },
      { x: x + paddingX, y: y + (this.sideLength - paddingDiag) },
      { x: x + paddingX, y: y + paddingDiag },
      { x: x + paddingX + paddingDiag, y: y + 0 },
    ]
  }
  
  P = (x: number, y: number): Point[] => {
    const paddingX = this.XL_PADDING_X
    const paddingDiag = this.MEDIUM_PADDING_DIAG
    return [
      { x: x + paddingX, y: y + 0 },
      { x: x + paddingX, y: y + this.sideLength },
      { x: x + paddingX, y: y + 0 },
      { x: x + (this.sideLength - paddingX - paddingDiag), y: y + 0 },
      { x: x + (this.sideLength - paddingX), y: y + paddingDiag },
      { x: x + (this.sideLength - paddingX), y: y + ((this.sideLength / 2) - paddingDiag) },
      { x: x + (this.sideLength - paddingX - paddingDiag), y: y + (this.sideLength / 2) },
      { x: x + paddingX, y: y + (this.sideLength / 2) },
    ]
  }
  
  Q = (x: number, y: number): Point[] => {
    const paddingX = this.MEDIUM_PADDING_X
    const paddingTail = this.XL_PADDING_DIAG
    const paddingDiag = paddingTail / 2
    return [
      { x: x + (this.sideLength - paddingX), y: y + (this.sideLength - paddingTail) },
      { x: x + (this.sideLength - paddingX), y: y + paddingDiag },
      { x: x + (this.sideLength - paddingX - paddingDiag), y: y + 0 },
      { x: x + paddingX + paddingDiag, y: y + 0 },
      { x: x + paddingX, y: y + paddingDiag },
      { x: x + paddingX, y: y + (this.sideLength - paddingDiag) },
      { x: x + paddingX + paddingDiag, y: y + this.sideLength },
      { x: x + (this.sideLength - paddingX - paddingTail), y: y + this.sideLength },
      { x: x + (this.sideLength - paddingX), y: y + (this.sideLength - paddingTail) },
      { x: x + (this.sideLength - paddingX) - (paddingTail / 2), y: y + this.sideLength - (paddingTail / 2) },
      { x: x + (this.sideLength - paddingX - paddingTail), y: y + (this.sideLength - paddingTail) },
      { x: x + (this.sideLength - paddingX), y: y + this.sideLength },
    ]
  }
  
  R = (x: number, y: number): Point[] => {
    const paddingX = this.XL_PADDING_X
    const paddingDiag = this.MEDIUM_PADDING_DIAG
    return [
      { x: x + paddingX, y: y + 0 },
      { x: x + paddingX, y: y + this.sideLength },
      { x: x + paddingX, y: y + 0 },
      { x: x + (this.sideLength - paddingX - paddingDiag), y: y + 0 },
      { x: x + (this.sideLength - paddingX), y: y + paddingDiag },
      { x: x + (this.sideLength - paddingX), y: y + ((this.sideLength / 2) - paddingDiag) },
      { x: x + (this.sideLength - paddingX - paddingDiag), y: y + (this.sideLength / 2) },
      { x: x + paddingX, y: y + (this.sideLength / 2) },
      { x: x + (this.sideLength - paddingX), y: y + this.sideLength },
    ]
  }
  
  S = (x: number, y: number): Point[] => {
    const paddingX = this.LARGE_PADDING_X
    const paddingDiag = this.XS_PADDING_DIAG
    return [
      { x: x + (this.sideLength - paddingX), y: y + paddingDiag },
      { x: x + (this.sideLength - paddingX - paddingDiag), y: y + 0 },
      { x: x + paddingX + paddingDiag, y: y + 0 },
      { x: x + paddingX, y: y + paddingDiag },
      { x: x + paddingX, y: y + ((this.sideLength / 2) - paddingDiag) },
      { x: x + paddingX + paddingDiag, y: y + (this.sideLength / 2) },
      { x: x + (this.sideLength - paddingX - paddingDiag), y: y + (this.sideLength / 2) },
      { x: x + (this.sideLength - paddingX), y: y + (this.sideLength / 2) + paddingDiag },
      { x: x + (this.sideLength - paddingX), y: y + (this.sideLength - paddingDiag) },
      { x: x + (this.sideLength - paddingX - paddingDiag), y: y + this.sideLength },
      { x: x + paddingX + paddingDiag, y: y + this.sideLength },
      { x: x + paddingX, y: y + (this.sideLength - paddingDiag) },
    ]
  }
  
  T = (x: number, y: number): Point[] => {
    const paddingX = this.SMALL_PADDING_X
    return [
      { x: x + paddingX, y: y + 0 },
      { x: x + (this.sideLength / 2), y: y + 0 },
      { x: x + (this.sideLength / 2), y: y + this.sideLength },
      { x: x + (this.sideLength / 2), y: y + 0 },
      { x: x + (this.sideLength - paddingX), y: y + 0 },
    ]
  }
  
  U = (x: number, y: number): Point[] => {
    const paddingX = this.MEDIUM_PADDING_X
    const paddingDiag = this.LARGE_PADDING_DIAG
    return [
      { x: x + paddingX, y: y + 0 },
      { x: x + paddingX, y: y + (this.sideLength - paddingDiag) },
      { x: x + paddingX + paddingDiag, y: y + this.sideLength },
      { x: x + (this.sideLength - paddingX - paddingDiag), y: y + this.sideLength },
      { x: x + (this.sideLength - paddingX), y: y + (this.sideLength - paddingDiag) },
      { x: x + (this.sideLength - paddingX), y: y + 0 },
    ]
  }
  
  V = (x: number, y: number): Point[] => {
    const paddingX = this.MEDIUM_PADDING_X
    return [
      { x: x + paddingX, y: y + 0 },
      { x: x + (this.sideLength / 2), y: y + this.sideLength },
      { x: x + (this.sideLength - paddingX), y: y + 0 },
    ]
  }
  
  W = (x: number, y: number): Point[] => {
    const paddingX = this.XS_PADDING_X
    const midpointX = (paddingX + (this.sideLength / 2)) / 2
    return [
      { x: x + paddingX, y: y + 0 },
      { x: x + midpointX, y: y + this.sideLength },
      { x: x + (this.sideLength / 2), y: y + (this.sideLength / 3) },
      { x: x + (this.sideLength - midpointX), y: y + this.sideLength },
      { x: x + (this.sideLength - paddingX), y: y + 0 },
    ]
  }
  
  X = (x: number, y: number): Point[] => {
    const paddingX = this.MEDIUM_PADDING_X
    return [
      { x: x + paddingX, y: y + 0 },
      { x: x + (this.sideLength - paddingX), y: y + this.sideLength },
      { x: x + (this.sideLength / 2), y: y + (this.sideLength / 2) },
      { x: x + (this.sideLength - paddingX), y: y + 0 },
      { x: x + paddingX, y: y + this.sideLength },
    ]
  }
  
  Y = (x: number, y: number): Point[] => {
    const paddingX = this.SMALL_PADDING_X
    const paddingDiag = this.sideLength * 0.45
    return [
      { x: x + paddingX, y: y + 0 },
      { x: x + (this.sideLength / 2), y: y + paddingDiag },
      { x: x + (this.sideLength - paddingX), y: y + 0 },
      { x: x + (this.sideLength / 2), y: y + paddingDiag },
      { x: x + (this.sideLength / 2), y: y + this.sideLength },
    ]
  }
  
  Z = (x: number, y: number): Point[] => {
    const paddingX = this.MEDIUM_PADDING_X
    return [
      { x: x + paddingX, y: y + 0 },
      { x: x + (this.sideLength - paddingX), y: y + 0 },
      { x: x + paddingX, y: y + this.sideLength },
      { x: x + (this.sideLength - paddingX), y: y + this.sideLength },
    ]
  }

  private scaled = (n: number) => n * this.sideLength / DEFAULT_SIDE_LENGTH
}
