export interface Point {
  x: number
  y: number
}

class LetterBuilder {
  private x: number
  private y: number
  private points: Point[]

  constructor(x: number, y: number) {
    this.x = x
    this.y = y
    this.points = []
  }

  addPoint = (xList: number[], yList: number[]) => {
    const totalX = xList.reduce((prev: number, curr: number) => prev + curr, 0)
    const totalY = yList.reduce((prev: number, curr: number) => prev + curr, 0)
    const newPoint = {
      x: this.x + totalX,
      y: this.y + totalY,
    }
    this.points.push(newPoint)
    return this
  }

  getPoints = () => this.points
}

type LetterGeneratorFn = (letterBuilder: LetterBuilder) => Point[]

const DEFAULT_SIDE_LENGTH = 100
const DEFAULT_HORIZONTAL_PADDING_BETWEEN_LETTERS = 10
const DEFAULT_VERTICAL_PADDING_BETWEEN_LETTERS = 20

export default class Letters {
  private sideLength: number
  private horizontalLetterSpacing: number
  private verticalLetterSpacing: number

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

  constructor(
    sideLength = DEFAULT_SIDE_LENGTH,
    horizontalLetterSpacing = DEFAULT_HORIZONTAL_PADDING_BETWEEN_LETTERS,
    verticalLetterSpacing = DEFAULT_VERTICAL_PADDING_BETWEEN_LETTERS,
  ) {
    this.sideLength = sideLength
    this.horizontalLetterSpacing = horizontalLetterSpacing
    this.verticalLetterSpacing = verticalLetterSpacing

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

  convertString = (str: string, line: number) => {
    const xCoord = (charIndex: number) =>
      charIndex * (this.sideLength + this.horizontalLetterSpacing) + this.horizontalLetterSpacing
    const yCoord = (lineIndex: number) =>
      lineIndex * (this.sideLength + this.verticalLetterSpacing) + this.verticalLetterSpacing
    const letterCurves = str.split('').map((letter: string, i: number) =>
      this.convertLetterToCurve(letter, xCoord(i), yCoord(line)))
    return letterCurves
  }

  updateLayoutSettings = (
    sideLength: number,
    horizontalLetterSpacing: number,
    verticalLetterSpacing: number,
  ) => {
    this.updateSideLength(sideLength)
    this.updateHorizontalPadding(horizontalLetterSpacing)
    this.updateverticalLetterSpacing(verticalLetterSpacing)
  }

  updateSideLength = (sideLength: number) => {
    this.sideLength = sideLength
  }

  updateHorizontalPadding = (horizontalLetterSpacing: number) => {
    this.horizontalLetterSpacing = horizontalLetterSpacing
  }

  updateverticalLetterSpacing = (verticalLetterSpacing: number) => {
    this.verticalLetterSpacing = verticalLetterSpacing
  }

  private convertLetterToCurve = (letter: string, x: number, y: number) => {
    /**
     * ascii breakdown:
     * - symbols      [ 33 -  47]
     * - numbers      [ 48 -  57]
     * - symbols      [ 58 -  64]
     * - upper alpha  [ 65 -  90]
     * - symbols      [ 91 -  96]
     * - lower alpha  [ 97 - 122]
     * - symbols      [123 - 126]
     */
    const letterGenerators: { [key: string]: LetterGeneratorFn } = {
      // alphabet: [65-90], [97-122]
      'A': this.A, // 65 / 97
      'B': this.B, // 66 / 98
      'C': this.C, // 67 / 99
      'D': this.D, // 68 / 100
      'E': this.E, // 69 / 101
      'F': this.F, // 70 / 102
      'G': this.G, // 71 / 103
      'H': this.H, // 72 / 104
      'I': this.I, // 73 / 105
      'J': this.J, // 74 / 106
      'K': this.K, // 75 / 107
      'L': this.L, // 76 / 108
      'M': this.M, // 77 / 109
      'N': this.N, // 78 / 110
      'O': this.O, // 79 / 111
      'P': this.P, // 80 / 112
      'Q': this.Q, // 81 / 113
      'R': this.R, // 82 / 114
      'S': this.S, // 83 / 115
      'T': this.T, // 84 / 116
      'U': this.U, // 85 / 117
      'V': this.V, // 86 / 118
      'W': this.W, // 87 / 119
      'X': this.X, // 88 / 120
      'Y': this.Y, // 89 / 121
      'Z': this.Z, // 90 / 122

      // numbers: [48-57]
      '0': this.zero,  // 48
      '1': this.one,   // 49
      '2': this.two,   // 50
      '3': this.three, // 51
      '4': this.four,  // 52
      '5': this.five,  // 53
      '6': this.six,   // 54
      '7': this.seven, // 55
      '8': this.eight, // 56
      '9': this.nine,  // 57

      // symbols: [33-47], [58-64], [91-96], [123-126]
      '!': this.exclamationPoint,   // 33
      '"': this.doubleQuote,        // 34
      '#': this.hashtag,            // 35
      '$': this.dollarSign,         // 36
      '%': this.percent,            // 37
      '&': this.ampersand,          // 38
      '\'': this.singleQuote,       // 39
      '(': this.openParenthesis,    // 40
      ')': this.closeParenthesis,   // 41
      '*': this.asterisk,           // 42
      '+': this.plus,               // 43
      ',': this.comma,              // 44
      '-': this.hyphen,             // 45
      '.': this.period,             // 46
      '/': this.forwardSlash,       // 47
      ':': this.colon,              // 58
      ';': this.semicolon,          // 59
      '<': this.lessThan,           // 60
      '=': this.equals,             // 61
      '>': this.greaterThan,        // 62
      '?': this.questionMark,       // 63
      '@': this.atSign,             // 64
      '[': this.openBracket,        // 91
      '\\': this.backSlash,         // 92
      ']': this.closeBracket,       // 93
      '^': this.caret,              // 94
      '_': this.underscore,         // 95
      '`': this.backtick,           // 96
      '{': this.openSwirlyBracket,  // 123
      '|': this.pipe,               // 124
      '}': this.closeSwirlyBracket, // 125
      '~': this.tilde,              // 126
    }
    const letterGenerator = letterGenerators[letter.toUpperCase()] || this.space
    const letterBuilder = new LetterBuilder(x, y)
    return letterGenerator(letterBuilder)
  }

  private A = (letterBuilder: LetterBuilder): Point[] => {
    const paddingX = this.SMALL_PADDING_X
    const barHeight = this.sideLength * 0.7
    const barDeltaX = (this.sideLength - barHeight) * 0.4
    return letterBuilder
      .addPoint([paddingX], [this.sideLength])
      .addPoint([this.sideLength / 2], [])
      .addPoint([this.sideLength, -paddingX], [this.sideLength])
      .addPoint([this.sideLength, -paddingX, -barDeltaX], [barHeight])
      .addPoint([paddingX, barDeltaX], [barHeight])
      .getPoints()
  }

  private B = (letterBuilder: LetterBuilder): Point[] => {
    const paddingX = this.XL_PADDING_X
    const paddingDiag = this.MEDIUM_PADDING_DIAG
    return letterBuilder
      .addPoint([paddingX], [this.sideLength])
      .addPoint([paddingX], [])
      .addPoint([this.sideLength, -paddingX, -paddingDiag], [])
      .addPoint([this.sideLength, -paddingX], [paddingDiag])
      .addPoint([this.sideLength, -paddingX], [this.sideLength / 2, -paddingDiag])
      .addPoint([this.sideLength, -paddingX, -paddingDiag], [this.sideLength / 2])
      .addPoint([paddingX], [this.sideLength / 2])
      .addPoint([this.sideLength, -paddingX, -paddingDiag], [this.sideLength / 2])
      .addPoint([this.sideLength, -paddingX], [this.sideLength / 2, paddingDiag])
      .addPoint([this.sideLength, -paddingX], [this.sideLength, -paddingDiag])
      .addPoint([this.sideLength, -paddingX, -paddingDiag], [this.sideLength])
      .addPoint([paddingX], [this.sideLength])
      .getPoints()
  }

  private C = (letterBuilder: LetterBuilder): Point[] => {
    const paddingX = this.MEDIUM_PADDING_X
    const paddingDiag = this.LARGE_PADDING_DIAG
    return letterBuilder
      .addPoint([this.sideLength, -paddingX], [paddingDiag])
      .addPoint([this.sideLength, -paddingX, -paddingDiag], [])
      .addPoint([paddingX ,paddingDiag], [])
      .addPoint([paddingX], [paddingDiag])
      .addPoint([paddingX], [this.sideLength, -paddingDiag])
      .addPoint([paddingX, paddingDiag], [this.sideLength])
      .addPoint([this.sideLength, -paddingX, -paddingDiag], [this.sideLength])
      .addPoint([this.sideLength, -paddingX], [this.sideLength, -paddingDiag])
      .getPoints()
  }
  
  private D = (letterBuilder: LetterBuilder): Point[] => {
    const paddingX = this.MEDIUM_PADDING_X
    const paddingDiag = this.XL_PADDING_DIAG
    return letterBuilder
      .addPoint([paddingX], [])
      .addPoint([this.sideLength, -paddingX, -paddingDiag], [])
      .addPoint([this.sideLength, -paddingX], [paddingDiag])
      .addPoint([this.sideLength, -paddingX], [this.sideLength, -paddingDiag])
      .addPoint([this.sideLength, -paddingX, -paddingDiag], [this.sideLength])
      .addPoint([paddingX], [this.sideLength])
      .addPoint([paddingX], [])
      .getPoints()
  }
  
  private E = (letterBuilder: LetterBuilder): Point[] => {
    const paddingX = this.LARGE_PADDING_X
    return letterBuilder
      .addPoint([this.sideLength, -paddingX], [])
      .addPoint([paddingX], [])
      .addPoint([paddingX], [this.sideLength / 2])
      .addPoint([this.sideLength / 2], [this.sideLength / 2])
      .addPoint([paddingX], [this.sideLength / 2])
      .addPoint([paddingX], [this.sideLength])
      .addPoint([this.sideLength, -paddingX], [this.sideLength])
      .getPoints()
  }
  
  private F = (letterBuilder: LetterBuilder): Point[] => {
    const paddingX = this.LARGE_PADDING_X
    return letterBuilder
      .addPoint([this.sideLength, -paddingX], [])
      .addPoint([paddingX], [])
      .addPoint([paddingX], [this.sideLength / 2])
      .addPoint([this.sideLength / 2], [this.sideLength / 2])
      .addPoint([paddingX], [this.sideLength / 2])
      .addPoint([paddingX], [this.sideLength])
      .getPoints()
  }
  
  private G = (letterBuilder: LetterBuilder): Point[] => {
    const paddingX = this.MEDIUM_PADDING_X
    const paddingDiag = this.MEDIUM_PADDING_DIAG
    return letterBuilder
      .addPoint([this.sideLength, -paddingX], [paddingDiag])
      .addPoint([this.sideLength, -paddingX, -paddingDiag], [])
      .addPoint([paddingX, paddingDiag], [])
      .addPoint([paddingX], [paddingDiag])
      .addPoint([paddingX], [this.sideLength, -paddingDiag])
      .addPoint([paddingX, paddingDiag], [this.sideLength])
      .addPoint([this.sideLength, -paddingX, -paddingDiag], [this.sideLength])
      .addPoint([this.sideLength, -paddingX], [this.sideLength, -paddingDiag])
      .addPoint([this.sideLength, -paddingX], [this.sideLength, -3 * paddingDiag])
      .addPoint([this.sideLength, -paddingX, -2 * paddingDiag], [this.sideLength, -3 * paddingDiag])
      .getPoints()
  }
  
  private H = (letterBuilder: LetterBuilder): Point[] => {
    const paddingX = this.LARGE_PADDING_X
    const barHeight = this.sideLength * 0.55
    return letterBuilder
      .addPoint([paddingX], [])
      .addPoint([paddingX], [this.sideLength])
      .addPoint([paddingX], [barHeight])
      .addPoint([this.sideLength, -paddingX], [barHeight])
      .addPoint([this.sideLength, -paddingX], [])
      .addPoint([this.sideLength, -paddingX], [this.sideLength])
      .getPoints()
  }
  
  private I = (letterBuilder: LetterBuilder): Point[] => {
    const paddingX = this.XL_PADDING_X
    return letterBuilder
      .addPoint([paddingX], [])
      .addPoint([this.sideLength, -paddingX], [])
      .addPoint([this.sideLength / 2], [])
      .addPoint([this.sideLength / 2], [this.sideLength])
      .addPoint([paddingX], [this.sideLength])
      .addPoint([this.sideLength, -paddingX], [this.sideLength])
      .getPoints()
  }

  private J = (letterBuilder: LetterBuilder): Point[] => {
    const paddingX_top = this.XL_PADDING_X
    const paddingX_bottom = this.SMALL_PADDING_X
    const paddingDiag = this.SMALL_PADDING_DIAG
    return letterBuilder
    .addPoint([paddingX_top], [])
    .addPoint([this.sideLength, -paddingX_top], [])
      .addPoint([this.sideLength / 2], [])
      .addPoint([this.sideLength / 2], [this.sideLength, -paddingDiag])
      .addPoint([this.sideLength / 2, -paddingDiag], [this.sideLength])
      .addPoint([paddingX_bottom, paddingDiag], [this.sideLength])
      .addPoint([paddingX_bottom], [this.sideLength, -paddingDiag])
      .addPoint([paddingX_bottom], [this.sideLength, -2 * paddingDiag])
      .getPoints()
  }

  private K = (letterBuilder: LetterBuilder): Point[] => {
    const paddingX = this.LARGE_PADDING_X
    return letterBuilder
      .addPoint([paddingX], [])
      .addPoint([paddingX], [this.sideLength])
      .addPoint([paddingX], [this.sideLength / 2])
      .addPoint([this.sideLength, -paddingX], [])
      .addPoint([paddingX], [this.sideLength / 2])
      .addPoint([this.sideLength, -paddingX], [this.sideLength])
      .getPoints()
  }

  private L = (letterBuilder: LetterBuilder): Point[] => {
    const paddingX = this.LARGE_PADDING_X
    return letterBuilder
      .addPoint([paddingX], [])
      .addPoint([paddingX], [this.sideLength])
      .addPoint([this.sideLength, -paddingX], [this.sideLength])
      .getPoints()
  }
  
  private M = (letterBuilder: LetterBuilder): Point[] => {
    const paddingX = this.SMALL_PADDING_X
    return letterBuilder
      .addPoint([paddingX], [this.sideLength])
      .addPoint([paddingX], [])
      .addPoint([this.sideLength / 2], [this.sideLength * 2 / 3])
      .addPoint([this.sideLength, -paddingX], [])
      .addPoint([this.sideLength, -paddingX], [this.sideLength])
      .getPoints()
  }
  
  private N = (letterBuilder: LetterBuilder): Point[] => {
    const paddingX = this.MEDIUM_PADDING_X
    return letterBuilder
      .addPoint([paddingX], [this.sideLength])
      .addPoint([paddingX], [])
      .addPoint([this.sideLength, -paddingX], [this.sideLength])
      .addPoint([this.sideLength, -paddingX], [])
      .getPoints()
  }
  
  private O = (letterBuilder: LetterBuilder): Point[] => {
    const paddingX = this.MEDIUM_PADDING_X
    const paddingDiag = this.MEDIUM_PADDING_DIAG
    return letterBuilder
      .addPoint([paddingX, paddingDiag], [])
      .addPoint([this.sideLength, -paddingX, -paddingDiag], [])
      .addPoint([this.sideLength, -paddingX], [paddingDiag])
      .addPoint([this.sideLength, -paddingX], [this.sideLength, -paddingDiag])
      .addPoint([this.sideLength, -paddingX, -paddingDiag], [this.sideLength])
      .addPoint([paddingX, paddingDiag], [this.sideLength])
      .addPoint([paddingX], [this.sideLength, -paddingDiag])
      .addPoint([paddingX], [paddingDiag])
      .addPoint([paddingX, paddingDiag], [])
      .getPoints()
  }
  
  private P = (letterBuilder: LetterBuilder): Point[] => {
    const paddingX = this.XL_PADDING_X
    const paddingDiag = this.MEDIUM_PADDING_DIAG
    return letterBuilder
      .addPoint([paddingX], [this.sideLength])
      .addPoint([paddingX], [])
      .addPoint([this.sideLength, -paddingX, -paddingDiag], [])
      .addPoint([this.sideLength, -paddingX], [paddingDiag])
      .addPoint([this.sideLength, -paddingX], [this.sideLength / 2, -paddingDiag])
      .addPoint([this.sideLength, -paddingX, -paddingDiag], [this.sideLength / 2])
      .addPoint([paddingX], [this.sideLength / 2])
      .getPoints()
  }
  
  private Q = (letterBuilder: LetterBuilder): Point[] => {
    const paddingX = this.MEDIUM_PADDING_X
    const paddingTail = this.XL_PADDING_DIAG
    const paddingDiag = paddingTail / 2
    return letterBuilder
      .addPoint([this.sideLength, -paddingX], [this.sideLength, -paddingTail])
      .addPoint([this.sideLength, -paddingX], [paddingDiag])
      .addPoint([this.sideLength, -paddingX, -paddingDiag], [])
      .addPoint([paddingX, paddingDiag], [])
      .addPoint([paddingX], [paddingDiag])
      .addPoint([paddingX], [this.sideLength, -paddingDiag])
      .addPoint([paddingX, paddingDiag], [this.sideLength])
      .addPoint([this.sideLength, -paddingX, -paddingTail], [this.sideLength])
      .addPoint([this.sideLength, -paddingX], [this.sideLength, -paddingTail])
      .addPoint([this.sideLength, -paddingX, -paddingTail / 2], [this.sideLength, -paddingTail / 2])
      .addPoint([this.sideLength, -paddingX, -paddingTail], [this.sideLength, -paddingTail])
      .addPoint([this.sideLength, -paddingX], [this.sideLength])
      .getPoints()
  }
  
  private R = (letterBuilder: LetterBuilder): Point[] => {
    const paddingX = this.XL_PADDING_X
    const paddingDiag = this.MEDIUM_PADDING_DIAG
    return letterBuilder
      .addPoint([paddingX], [this.sideLength])
      .addPoint([paddingX], [])
      .addPoint([this.sideLength, -paddingX, -paddingDiag], [])
      .addPoint([this.sideLength, -paddingX], [paddingDiag])
      .addPoint([this.sideLength, -paddingX], [this.sideLength / 2, -paddingDiag])
      .addPoint([this.sideLength, -paddingX, -paddingDiag], [this.sideLength / 2])
      .addPoint([paddingX], [this.sideLength / 2])
      .addPoint([this.sideLength, -paddingX], [this.sideLength])
      .getPoints()
  }
  
  private S = (letterBuilder: LetterBuilder): Point[] => {
    const paddingX = this.LARGE_PADDING_X
    const paddingDiag = this.XS_PADDING_DIAG
    return letterBuilder
      .addPoint([this.sideLength, -paddingX], [paddingDiag])
      .addPoint([this.sideLength, -paddingX, -paddingDiag], [])
      .addPoint([paddingX, paddingDiag], [])
      .addPoint([paddingX], [paddingDiag])
      .addPoint([paddingX], [this.sideLength / 2, -paddingDiag])
      .addPoint([paddingX, paddingDiag], [this.sideLength / 2])
      .addPoint([this.sideLength, -paddingX, -paddingDiag], [this.sideLength / 2])
      .addPoint([this.sideLength, -paddingX], [this.sideLength / 2, paddingDiag])
      .addPoint([this.sideLength, -paddingX], [this.sideLength, -paddingDiag])
      .addPoint([this.sideLength, -paddingX, -paddingDiag], [this.sideLength])
      .addPoint([paddingX, paddingDiag], [this.sideLength])
      .addPoint([paddingX], [this.sideLength, -paddingDiag])
      .getPoints()
  }
  
  private T = (letterBuilder: LetterBuilder): Point[] => {
    const paddingX = this.SMALL_PADDING_X
    return letterBuilder
      .addPoint([paddingX], [])
      .addPoint([this.sideLength / 2], [])
      .addPoint([this.sideLength / 2], [this.sideLength])
      .addPoint([this.sideLength / 2], [])
      .addPoint([this.sideLength, -paddingX], [])
      .getPoints()
  }
  
  private U = (letterBuilder: LetterBuilder): Point[] => {
    const paddingX = this.MEDIUM_PADDING_X
    const paddingDiag = this.LARGE_PADDING_DIAG
    return letterBuilder
      .addPoint([paddingX], [])
      .addPoint([paddingX], [this.sideLength, -paddingDiag])
      .addPoint([paddingX, paddingDiag], [this.sideLength])
      .addPoint([this.sideLength, -paddingX, -paddingDiag], [this.sideLength])
      .addPoint([this.sideLength, -paddingX], [this.sideLength, -paddingDiag])
      .addPoint([this.sideLength, -paddingX], [])
      .getPoints()
  }
  
  private V = (letterBuilder: LetterBuilder): Point[] => {
    const paddingX = this.MEDIUM_PADDING_X
    return letterBuilder
      .addPoint([paddingX], [])
      .addPoint([this.sideLength / 2], [this.sideLength])
      .addPoint([this.sideLength, -paddingX], [])
      .getPoints()
  }
  
  private W = (letterBuilder: LetterBuilder): Point[] => {
    const paddingX = this.XS_PADDING_X
    const midpointX = (paddingX + (this.sideLength / 2)) / 2
    return letterBuilder
      .addPoint([paddingX], [])
      .addPoint([midpointX], [this.sideLength])
      .addPoint([this.sideLength / 2], [this.sideLength / 3])
      .addPoint([this.sideLength, -midpointX], [this.sideLength])
      .addPoint([this.sideLength, -paddingX], [])
      .getPoints()
  }
  
  private X = (letterBuilder: LetterBuilder): Point[] => {
    const paddingX = this.MEDIUM_PADDING_X
    return letterBuilder
      .addPoint([paddingX], [])
      .addPoint([this.sideLength, -paddingX], [this.sideLength])
      .addPoint([this.sideLength / 2], [this.sideLength / 2])
      .addPoint([this.sideLength, -paddingX], [])
      .addPoint([paddingX], [this.sideLength])
      .getPoints()
  }
  
  private Y = (letterBuilder: LetterBuilder): Point[] => {
    const paddingX = this.SMALL_PADDING_X
    const paddingDiag = this.sideLength * 0.45
    return letterBuilder
      .addPoint([paddingX], [])
      .addPoint([this.sideLength / 2], [paddingDiag])
      .addPoint([this.sideLength, -paddingX], [])
      .addPoint([this.sideLength / 2], [paddingDiag])
      .addPoint([this.sideLength / 2], [this.sideLength])
      .getPoints()
  }
  
  private Z = (letterBuilder: LetterBuilder): Point[] => {
    const paddingX = this.MEDIUM_PADDING_X
    return letterBuilder
      .addPoint([paddingX], [])
      .addPoint([this.sideLength, -paddingX], [])
      .addPoint([paddingX], [this.sideLength])
      .addPoint([this.sideLength, -paddingX], [this.sideLength])
      .getPoints()
  }

  private zero = (letterBuilder: LetterBuilder): Point[] => {
    const paddingX = this.MEDIUM_PADDING_X
    const paddingDiag = this.MEDIUM_PADDING_DIAG
    return letterBuilder
      .addPoint([this.sideLength, -paddingX], [paddingDiag])
      .addPoint([this.sideLength, -paddingX, -paddingDiag], [])
      .addPoint([paddingX, paddingDiag], [])
      .addPoint([paddingX], [paddingDiag])
      .addPoint([paddingX], [this.sideLength, -paddingDiag])
      .addPoint([paddingX, paddingDiag], [this.sideLength])
      .addPoint([this.sideLength, -paddingX, -paddingDiag], [this.sideLength])
      .addPoint([this.sideLength, -paddingX], [this.sideLength, -paddingDiag])
      .addPoint([this.sideLength, -paddingX], [paddingDiag])
      .addPoint([paddingX], [this.sideLength, -paddingDiag])
      .getPoints()
  }

  private one = (letterBuilder: LetterBuilder): Point[] => {
    const paddingX = this.XL_PADDING_X
    const paddingDiag = this.LARGE_PADDING_DIAG
    return letterBuilder
      .addPoint([this.sideLength / 2, -paddingDiag], [paddingDiag])
      .addPoint([this.sideLength / 2], [])
      .addPoint([this.sideLength / 2], [this.sideLength])
      .addPoint([paddingX], [this.sideLength])
      .addPoint([this.sideLength, -paddingX], [this.sideLength])
      .getPoints()
  }

  private two = (letterBuilder: LetterBuilder): Point[] => {
    const paddingX = this.LARGE_PADDING_X
    const paddingDiag = this.XS_PADDING_DIAG
    return letterBuilder
      .addPoint([paddingX], [paddingDiag])
      .addPoint([paddingX, paddingDiag], [])
      .addPoint([this.sideLength, -paddingX, -paddingDiag], [])
      .addPoint([this.sideLength, -paddingX], [paddingDiag])
      .addPoint([this.sideLength, -paddingX], [this.sideLength / 3])
      .addPoint([paddingX], [this.sideLength])
      .addPoint([this.sideLength, -paddingX], [this.sideLength])
      .getPoints()
  }

  private three = (letterBuilder: LetterBuilder): Point[] => {
    const paddingX = this.LARGE_PADDING_X
    const paddingDiag = this.XS_PADDING_DIAG
    return letterBuilder
      .addPoint([paddingX], [paddingDiag])
      .addPoint([paddingX, paddingDiag], [])
      .addPoint([this.sideLength, -paddingX, -paddingDiag], [])
      .addPoint([this.sideLength, -paddingX], [paddingDiag])
      .addPoint([this.sideLength, -paddingX], [this.sideLength / 2, -paddingDiag])
      .addPoint([this.sideLength, -paddingX, -paddingDiag], [this.sideLength / 2])
      .addPoint([this.sideLength / 4, paddingX], [this.sideLength / 2])
      .addPoint([this.sideLength, -paddingX, -paddingDiag], [this.sideLength / 2])
      .addPoint([this.sideLength, -paddingX], [this.sideLength / 2, paddingDiag])
      .addPoint([this.sideLength, -paddingX], [this.sideLength, -paddingDiag])
      .addPoint([this.sideLength, -paddingX, -paddingDiag], [this.sideLength])
      .addPoint([paddingX, paddingDiag], [this.sideLength])
      .addPoint([paddingX], [this.sideLength, -paddingDiag])
      .getPoints()
  }

  private four = (letterBuilder: LetterBuilder): Point[] => {
    const paddingX = this.LARGE_PADDING_X
    const paddingCross = this.scaled(15)
    return letterBuilder
      .addPoint([paddingX], [])
      .addPoint([paddingX], [this.sideLength / 2])
      .addPoint([this.sideLength, -paddingX], [this.sideLength / 2])
      .addPoint([this.sideLength, -paddingX, -paddingCross], [this.sideLength / 2])
      .addPoint([this.sideLength, -paddingX, -paddingCross], [])
      .addPoint([this.sideLength, -paddingX, -paddingCross], [this.sideLength])
      .getPoints()
  }

  private five = (letterBuilder: LetterBuilder): Point[] => {
    const paddingX = this.LARGE_PADDING_X
    const paddingDiag = this.XS_PADDING_DIAG
    return letterBuilder
      .addPoint([this.sideLength, -paddingX], [])
      .addPoint([paddingX], [])
      .addPoint([paddingX], [this.sideLength / 2])
      .addPoint([paddingX, paddingDiag], [this.sideLength / 2, -paddingDiag])
      .addPoint([this.sideLength, -paddingX, -paddingDiag], [this.sideLength / 2, -paddingDiag])
      .addPoint([this.sideLength, -paddingX], [this.sideLength / 2])
      .addPoint([this.sideLength, -paddingX], [this.sideLength, -paddingDiag])
      .addPoint([this.sideLength, -paddingX, -paddingDiag], [this.sideLength])
      .addPoint([paddingX, paddingDiag], [this.sideLength])
      .addPoint([paddingX], [this.sideLength, -paddingDiag])
      .getPoints()
  }

  private six = (letterBuilder: LetterBuilder): Point[] => {
    const paddingX = this.LARGE_PADDING_X
    const paddingDiag = this.XS_PADDING_DIAG
    return letterBuilder
      .addPoint([this.sideLength, -paddingX], [paddingDiag])
      .addPoint([this.sideLength, -paddingX, -paddingDiag], [])
      .addPoint([paddingX, paddingDiag], [])
      .addPoint([paddingX], [paddingDiag])
      .addPoint([paddingX], [this.sideLength, -paddingDiag])
      .addPoint([paddingX, paddingDiag], [this.sideLength])
      .addPoint([this.sideLength, -paddingX, -paddingDiag], [this.sideLength])
      .addPoint([this.sideLength, -paddingX], [this.sideLength, -paddingDiag])
      .addPoint([this.sideLength, -paddingX], [this.sideLength / 2, paddingDiag])
      .addPoint([this.sideLength, -paddingX, -paddingDiag], [this.sideLength / 2])
      .addPoint([paddingX], [this.sideLength / 2])
      .getPoints()
  }

  private seven = (letterBuilder: LetterBuilder): Point[] => {
    const paddingX = this.LARGE_PADDING_X
    return letterBuilder
      .addPoint([paddingX], [])
      .addPoint([this.sideLength, -paddingX], [])
      .addPoint([this.sideLength / 4, paddingX], [this.sideLength])
      .getPoints()
  }

  private eight = (letterBuilder: LetterBuilder): Point[] => {
    const paddingX = this.LARGE_PADDING_X
    const paddingDiag = this.XS_PADDING_DIAG
    return letterBuilder
      .addPoint([this.sideLength, -paddingX], [paddingDiag])
      .addPoint([this.sideLength, -paddingX, -paddingDiag], [])
      .addPoint([paddingX, paddingDiag], [])
      .addPoint([paddingX], [paddingDiag])
      .addPoint([paddingX], [this.sideLength / 2, -paddingDiag])
      .addPoint([paddingX, paddingDiag], [this.sideLength / 2])
      .addPoint([this.sideLength, -paddingX, -paddingDiag], [this.sideLength / 2])
      .addPoint([this.sideLength, -paddingX], [this.sideLength / 2, paddingDiag])
      .addPoint([this.sideLength, -paddingX], [this.sideLength, -paddingDiag])
      .addPoint([this.sideLength, -paddingX, -paddingDiag], [this.sideLength])
      .addPoint([paddingX, paddingDiag], [this.sideLength])
      .addPoint([paddingX], [this.sideLength, -paddingDiag])
      .addPoint([paddingX], [this.sideLength / 2, paddingDiag])
      .addPoint([paddingX, paddingDiag], [this.sideLength / 2])
      .addPoint([this.sideLength, -paddingX, -paddingDiag], [this.sideLength / 2])
      .addPoint([this.sideLength, -paddingX], [this.sideLength / 2, -paddingDiag])
      .addPoint([this.sideLength, -paddingX], [paddingDiag])
      .getPoints()
  }

  private nine = (letterBuilder: LetterBuilder): Point[] => {
    const paddingX = this.LARGE_PADDING_X
    const paddingDiag = this.XS_PADDING_DIAG
    return letterBuilder
      .addPoint([this.sideLength, -paddingX], [this.sideLength / 2])
      .addPoint([paddingX, paddingDiag], [this.sideLength / 2])
      .addPoint([paddingX], [this.sideLength / 2, -paddingDiag])
      .addPoint([paddingX], [paddingDiag])
      .addPoint([paddingX, paddingDiag], [])
      .addPoint([this.sideLength, -paddingX, -paddingDiag], [])
      .addPoint([this.sideLength, -paddingX], [paddingDiag])
      .addPoint([this.sideLength, -paddingX], [this.sideLength, -paddingDiag])
      .addPoint([this.sideLength, -paddingX, -paddingDiag], [this.sideLength])
      .addPoint([paddingX, paddingDiag], [this.sideLength])
      .addPoint([paddingX], [this.sideLength, -paddingDiag])
      .getPoints()
  }

  private space = (letterBuilder: LetterBuilder): Point[] => [] // 32

  private exclamationPoint = (letterBuilder: LetterBuilder): Point[] => { // 33
    const paddingX = this.SMALL_PADDING_X
    const radius = this.scaled(10)
    return letterBuilder
      // line part
      .addPoint([paddingX, radius], [this.sideLength * 2 / 3])
      .addPoint([paddingX], [this.sideLength * 2 / 3])
      .addPoint([paddingX], [])
      .addPoint([paddingX, 2 * radius], [])
      .addPoint([paddingX, 2 * radius], [this.sideLength * 2 / 3])
      .addPoint([paddingX, radius], [this.sideLength * 2 / 3])
      // dot part
      .addPoint([paddingX, radius], [this.sideLength, -2 * radius])
      .addPoint([paddingX], [this.sideLength, -2 * radius])
      .addPoint([paddingX], [this.sideLength])
      .addPoint([paddingX, 2 * radius], [this.sideLength])
      .addPoint([paddingX, 2 * radius], [this.sideLength, -2 * radius])
      .addPoint([paddingX, radius], [this.sideLength, -2 * radius])
      .getPoints()
  }

  private doubleQuote = (letterBuilder: LetterBuilder): Point[] => { // 34
    const paddingX = this.SMALL_PADDING_X
    const width = this.scaled(10)
    const height = this.scaled(15)
    return letterBuilder
      // quote 1
      .addPoint([paddingX, width], [2 * height])
      .addPoint([paddingX, 2 * width], [height])
      .addPoint([paddingX, 2 * width], [])
      .addPoint([paddingX], [])
      .addPoint([paddingX], [height])
      .addPoint([paddingX, width], [height])
      .addPoint([paddingX, width], [2 * height])
      // quote 2
      .addPoint([paddingX, 2.5 * width, width], [2 * height])
      .addPoint([paddingX, 2.5 * width, 2 * width], [height])
      .addPoint([paddingX, 2.5 * width, 2 * width], [])
      .addPoint([paddingX, 2.5 * width], [])
      .addPoint([paddingX, 2.5 * width], [height])
      .addPoint([paddingX, 2.5 * width, width], [height])
      .addPoint([paddingX, 2.5 * width, width], [2 * height])
      .getPoints()
  }

  private hashtag = (letterBuilder: LetterBuilder): Point[] => { // 35
    const paddingX = this.SMALL_PADDING_X
    const legLength = this.scaled(25)
    return letterBuilder
      .addPoint([paddingX, legLength], [])
      .addPoint([paddingX, legLength], [legLength])
      .addPoint([paddingX], [legLength])
      .addPoint([paddingX, legLength], [legLength])
      .addPoint([paddingX, legLength], [this.sideLength, -legLength])
      .addPoint([paddingX], [this.sideLength, -legLength])
      .addPoint([paddingX, legLength], [this.sideLength, -legLength])
      .addPoint([paddingX, legLength], [this.sideLength])
      .addPoint([paddingX, legLength], [this.sideLength, -legLength])
      .addPoint([this.sideLength, -paddingX, -legLength], [this.sideLength, -legLength])
      .addPoint([this.sideLength, -paddingX, -legLength], [this.sideLength])
      .addPoint([this.sideLength, -paddingX, -legLength], [this.sideLength, -legLength])
      .addPoint([this.sideLength, -paddingX], [this.sideLength, -legLength])
      .addPoint([this.sideLength, -paddingX, -legLength], [this.sideLength, -legLength])
      .addPoint([this.sideLength, -paddingX, -legLength], [legLength])
      .addPoint([this.sideLength, -paddingX], [legLength])
      .addPoint([this.sideLength, -paddingX, -legLength], [legLength])
      .addPoint([this.sideLength, -paddingX, -legLength], [])
      .addPoint([this.sideLength, -paddingX, -legLength], [legLength])
      .addPoint([paddingX, legLength], [legLength])
      .getPoints()
  }

  private dollarSign = (letterBuilder: LetterBuilder): Point[] => { // 36
    const paddingX = this.LARGE_PADDING_X
    const paddingY = this.SMALL_PADDING_X
    const paddingDiag = this.XS_PADDING_DIAG
    return letterBuilder
      .addPoint([this.sideLength, -paddingX], [paddingY, paddingDiag])
      .addPoint([this.sideLength, -paddingX, -paddingDiag], [paddingY ])
      .addPoint([paddingX, paddingDiag], [paddingY ])
      .addPoint([paddingX], [paddingY, paddingDiag])
      .addPoint([paddingX], [this.sideLength / 2, -paddingDiag])
      .addPoint([paddingX, paddingDiag], [this.sideLength / 2])
      .addPoint([this.sideLength, -paddingX, -paddingDiag], [this.sideLength / 2])
      .addPoint([this.sideLength, -paddingX], [this.sideLength / 2, paddingDiag])
      .addPoint([this.sideLength, -paddingX], [this.sideLength, -paddingY, -paddingDiag])
      .addPoint([this.sideLength, -paddingX, -paddingDiag], [this.sideLength, -paddingY])
      .addPoint([paddingX, paddingDiag], [this.sideLength, -paddingY])
      .addPoint([paddingX], [this.sideLength, -paddingY, -paddingDiag])
      .addPoint([paddingX, paddingDiag], [this.sideLength, -paddingY])
      .addPoint([this.sideLength / 2], [this.sideLength, -paddingY])
      .addPoint([this.sideLength / 2], [this.sideLength])
      .addPoint([this.sideLength / 2], [])
      .getPoints()
  }

  private percent = (letterBuilder: LetterBuilder): Point[] => { // 37
    const paddingX_box = this.XL_PADDING_X
    const paddingX_line = this.SMALL_PADDING_X
    const radius = this.scaled(16)
    return letterBuilder
      // circle 1
      .addPoint([paddingX_box, 2 * radius], [radius])
      .addPoint([paddingX_box, radius], [2 * radius])
      .addPoint([paddingX_box], [2 * radius])
      .addPoint([paddingX_box], [radius])
      .addPoint([paddingX_box, radius], [])
      .addPoint([paddingX_box, 2 * radius], [])
      .addPoint([paddingX_box, 2 * radius], [radius])
      // middle line
      .addPoint([this.sideLength, -paddingX_line], [])
      .addPoint([paddingX_line], [this.sideLength])
      // circle 2
      .addPoint([this.sideLength, -paddingX_box, -2 * radius], [this.sideLength, -radius])
      .addPoint([this.sideLength, -paddingX_box, -2 * radius], [this.sideLength])
      .addPoint([this.sideLength, -paddingX_box, -radius], [this.sideLength])
      .addPoint([this.sideLength, -paddingX_box], [this.sideLength, -radius])
      .addPoint([this.sideLength, -paddingX_box], [this.sideLength, -2 * radius])
      .addPoint([this.sideLength, -paddingX_box, -radius], [this.sideLength, -2 * radius])
      .addPoint([this.sideLength, -paddingX_box, -2 * radius], [this.sideLength, -radius])
      .getPoints()
    
    // OLD VERSION (might want later)
    // notes: looks more like a '%' during the animation, but also looks more like a 'Z'
    // return letterBuilder
    //   // circle 1
    //   .addPoint([paddingX_box, 2 * radius], [])
    //   .addPoint([paddingX_box, 2 * radius], [radius])
    //   .addPoint([paddingX_box, radius], [2 * radius])
    //   .addPoint([paddingX_box], [2 * radius])
    //   .addPoint([paddingX_box], [radius])
    //   .addPoint([paddingX_box, radius], [])
    //   // middle line
    //   .addPoint([this.sideLength, -paddingX_line], [])
    //   .addPoint([paddingX_line], [this.sideLength])
    //   // circle 2
    //   .addPoint([this.sideLength, -paddingX_box, -radius], [this.sideLength])
    //   .addPoint([this.sideLength, -paddingX_box], [this.sideLength, -radius])
    //   .addPoint([this.sideLength, -paddingX_box], [this.sideLength, -2 * radius])
    //   .addPoint([this.sideLength, -paddingX_box, -radius], [this.sideLength, -2 * radius])
    //   .addPoint([this.sideLength, -paddingX_box, -2 * radius], [this.sideLength, -radius])
    //   .addPoint([this.sideLength, -paddingX_box, -2 * radius], [this.sideLength])
    //   .getPoints()
  }

  private ampersand = (letterBuilder: LetterBuilder): Point[] => { // 38
    const paddingX = this.MEDIUM_PADDING_X
    const paddingDiag = this.SMALL_PADDING_DIAG
    return letterBuilder
      .addPoint([this.sideLength, -paddingX], [this.sideLength * 2 / 3])
      .addPoint([this.sideLength / 2], [this.sideLength])
      .addPoint([paddingX, paddingDiag], [this.sideLength])
      .addPoint([paddingX], [this.sideLength, -paddingDiag])
      .addPoint([paddingX], [this.sideLength, -2 * paddingDiag])
      .addPoint([paddingX, 3 * paddingDiag], [2 * paddingDiag])
      .addPoint([paddingX, 3 * paddingDiag], [paddingDiag])
      .addPoint([paddingX, 2 * paddingDiag], [])
      .addPoint([paddingX, paddingDiag], [])
      .addPoint([paddingX], [paddingDiag])
      .addPoint([paddingX], [2 * paddingDiag])
      .addPoint([this.sideLength, -paddingX], [this.sideLength])
      .getPoints()
  }

  private singleQuote = (letterBuilder: LetterBuilder): Point[] => { // 39
    const paddingX = this.SMALL_PADDING_X
    const width = this.scaled(10)
    const height = this.scaled(15)
    return letterBuilder
      .addPoint([paddingX, width], [2 * height])
      .addPoint([paddingX, 2 * width], [height])
      .addPoint([paddingX, 2 * width], [])
      .addPoint([paddingX], [])
      .addPoint([paddingX], [height])
      .addPoint([paddingX, width], [height])
      .addPoint([paddingX, width], [2 * height])
      .getPoints()
  }

  private openParenthesis = (letterBuilder: LetterBuilder): Point[] => { // 40
    const paddingDiag = this.MEDIUM_PADDING_DIAG
    return letterBuilder
      .addPoint([this.sideLength / 2], [])
      .addPoint([this.sideLength / 2, -paddingDiag], [paddingDiag])
      .addPoint([this.sideLength / 2, -paddingDiag], [this.sideLength, -paddingDiag])
      .addPoint([this.sideLength / 2], [this.sideLength])
      .getPoints()
  }

  private closeParenthesis = (letterBuilder: LetterBuilder): Point[] => { // 41
    const paddingDiag = this.MEDIUM_PADDING_DIAG
    return letterBuilder
      .addPoint([this.sideLength / 2], [])
      .addPoint([this.sideLength / 2, paddingDiag], [paddingDiag])
      .addPoint([this.sideLength / 2, paddingDiag], [this.sideLength, -paddingDiag])
      .addPoint([this.sideLength / 2], [this.sideLength])
      .getPoints()
  }

  private asterisk = (letterBuilder: LetterBuilder): Point[] => { // 42
    const paddingX = this.MEDIUM_PADDING_X
    const radius = 20
    const horizonalDistanceFromCenter = this.scaled(Math.sqrt(Math.pow(radius, 2) - Math.pow(radius / 2, 2)))
    const verticalDistanceFromTop = this.scaled(radius / 2)
    return letterBuilder
      .addPoint([paddingX], [verticalDistanceFromTop])
      .addPoint([paddingX, 2 * horizonalDistanceFromCenter], [3 * verticalDistanceFromTop])
      .addPoint([paddingX, horizonalDistanceFromCenter], [2 * verticalDistanceFromTop])
      .addPoint([paddingX, horizonalDistanceFromCenter], [])
      .addPoint([paddingX, horizonalDistanceFromCenter], [4 * verticalDistanceFromTop])
      .addPoint([paddingX, horizonalDistanceFromCenter], [2 * verticalDistanceFromTop])
      .addPoint([paddingX, 2 * horizonalDistanceFromCenter], [verticalDistanceFromTop])
      .addPoint([paddingX], [3 * verticalDistanceFromTop])
      .getPoints()
  }

  private plus = (letterBuilder: LetterBuilder): Point[] => { // 43
    const radius = this.scaled(25)
    return letterBuilder
      .addPoint([this.sideLength / 2], [this.sideLength / 2, -radius])
      .addPoint([this.sideLength / 2], [this.sideLength / 2, radius])
      .addPoint([this.sideLength / 2], [this.sideLength / 2])
      .addPoint([this.sideLength / 2, -radius], [this.sideLength / 2])
      .addPoint([this.sideLength / 2, radius], [this.sideLength / 2])
      .getPoints()
  }

  private comma = (letterBuilder: LetterBuilder): Point[] => { // 44
    const paddingX = this.SMALL_PADDING_X
    const radius = this.scaled(10)
    return letterBuilder
      .addPoint([paddingX], [this.sideLength, -2 * radius])
      .addPoint([paddingX], [this.sideLength, -radius])
      .addPoint([paddingX, radius], [this.sideLength, -radius])
      .addPoint([paddingX, radius], [this.sideLength])
      .addPoint([paddingX, 2 * radius], [this.sideLength, -radius])
      .addPoint([paddingX, 2 * radius], [this.sideLength, -2 * radius])
      .addPoint([paddingX], [this.sideLength, -2 * radius])
      .getPoints()
  }

  private hyphen = (letterBuilder: LetterBuilder): Point[] => { // 45
    const paddingX = this.LARGE_PADDING_X
    const halfHeight = this.scaled(8)
    return letterBuilder
      .addPoint([paddingX], [this.sideLength / 2, -halfHeight])
      .addPoint([this.sideLength, -paddingX], [this.sideLength / 2, -halfHeight])
      .addPoint([this.sideLength, -paddingX], [this.sideLength / 2, halfHeight])
      .addPoint([paddingX], [this.sideLength / 2, halfHeight])
      .addPoint([paddingX], [this.sideLength / 2, -halfHeight])
      .getPoints()
  }

  private period = (letterBuilder: LetterBuilder): Point[] => { // 46
    const paddingX = this.SMALL_PADDING_X
    const radius = this.scaled(10)
    return letterBuilder
      .addPoint([paddingX], [this.sideLength, -2 * radius])
      .addPoint([paddingX], [this.sideLength])
      .addPoint([paddingX, 2 * radius], [this.sideLength])
      .addPoint([paddingX, 2 * radius], [this.sideLength, -2 * radius])
      .addPoint([paddingX], [this.sideLength, -2 * radius])
      .getPoints()
  }

  private forwardSlash = (letterBuilder: LetterBuilder): Point[] => { // 47
    const paddingX = this.MEDIUM_PADDING_X
    const width = this.scaled(10)
    return letterBuilder
      .addPoint([this.sideLength, -paddingX, -width], [])
      .addPoint([paddingX], [this.sideLength])
      .addPoint([paddingX, width], [this.sideLength])
      .addPoint([this.sideLength, -paddingX], [])
      .addPoint([this.sideLength, -paddingX, -width], [])
      .getPoints()
  }

  private colon = (letterBuilder: LetterBuilder): Point[] => { // 58
    const paddingX = this.SMALL_PADDING_X
    const radius = this.scaled(10)
    return letterBuilder
      // top dot
      .addPoint([paddingX, radius], [this.sideLength, -3 * radius])
      .addPoint([paddingX], [this.sideLength, -3 * radius])
      .addPoint([paddingX], [this.sideLength, -3 * radius, -2 * radius])
      .addPoint([paddingX, 2 * radius], [this.sideLength, -3 * radius, -2 * radius])
      .addPoint([paddingX, 2 * radius], [this.sideLength, -3 * radius])
      .addPoint([paddingX, radius], [this.sideLength, -3 * radius])
      // bottom dot
      .addPoint([paddingX, radius], [this.sideLength, -2 * radius])
      .addPoint([paddingX], [this.sideLength, -2 * radius])
      .addPoint([paddingX], [this.sideLength])
      .addPoint([paddingX, 2 * radius], [this.sideLength])
      .addPoint([paddingX, 2 * radius], [this.sideLength, -2 * radius])
      .addPoint([paddingX, radius], [this.sideLength, -2 * radius])
      .getPoints()
  }

  private semicolon = (letterBuilder: LetterBuilder): Point[] => { // 59
    const paddingX = this.SMALL_PADDING_X
    const radius = this.scaled(10)
    return letterBuilder
      // top dot
      .addPoint([paddingX, radius], [this.sideLength, -3 * radius])
      .addPoint([paddingX], [this.sideLength, -3 * radius])
      .addPoint([paddingX], [this.sideLength, -3 * radius, -2 * radius])
      .addPoint([paddingX, 2 * radius], [this.sideLength, -3 * radius, -2 * radius])
      .addPoint([paddingX, 2 * radius], [this.sideLength, -3 * radius])
      .addPoint([paddingX, radius], [this.sideLength, -3 * radius])
      // bottom dot
      .addPoint([paddingX, radius], [this.sideLength, -2 * radius])
      .addPoint([paddingX], [this.sideLength, -2 * radius])
      .addPoint([paddingX], [this.sideLength, -radius])
      .addPoint([paddingX, radius], [this.sideLength, -radius])
      .addPoint([paddingX, radius], [this.sideLength])
      .addPoint([paddingX, 2 * radius], [this.sideLength, -radius])
      .addPoint([paddingX, 2 * radius], [this.sideLength, -2 * radius])
      .addPoint([paddingX, radius], [this.sideLength, -2 * radius])
      .getPoints()
  }

  private lessThan = (letterBuilder: LetterBuilder): Point[] => { // 60
    const paddingX = this.LARGE_PADDING_X
    const halfHeight = this.scaled(20)
    return letterBuilder
      .addPoint([this.sideLength, -paddingX], [this.sideLength / 2, -halfHeight])
      .addPoint([paddingX], [this.sideLength / 2])
      .addPoint([this.sideLength, -paddingX], [this.sideLength / 2, halfHeight])
      .getPoints()
  }

  private equals = (letterBuilder: LetterBuilder): Point[] => { // 61
    const paddingX = this.LARGE_PADDING_X
    const halfHeight = this.scaled(6)
    return letterBuilder
      // top line
      .addPoint([this.sideLength / 2], [this.sideLength / 2, -halfHeight])
      .addPoint([paddingX], [this.sideLength / 2, -halfHeight])
      .addPoint([paddingX], [this.sideLength / 2, -3 * halfHeight])
      .addPoint([this.sideLength, -paddingX], [this.sideLength / 2, -3 * halfHeight])
      .addPoint([this.sideLength, -paddingX], [this.sideLength / 2, -halfHeight])
      .addPoint([this.sideLength / 2], [this.sideLength / 2, -halfHeight])
      // bottom line
      .addPoint([this.sideLength / 2], [this.sideLength / 2, halfHeight])
      .addPoint([paddingX], [this.sideLength / 2, halfHeight])
      .addPoint([paddingX], [this.sideLength / 2, 3 * halfHeight])
      .addPoint([this.sideLength, -paddingX], [this.sideLength / 2, 3 * halfHeight])
      .addPoint([this.sideLength, -paddingX], [this.sideLength / 2, halfHeight])
      .addPoint([this.sideLength / 2], [this.sideLength / 2, halfHeight])
      .getPoints()
  }

  private greaterThan = (letterBuilder: LetterBuilder): Point[] => { // 62
    const paddingX = this.LARGE_PADDING_X
    const halfHeight = this.scaled(20)
    return letterBuilder
      .addPoint([paddingX], [this.sideLength / 2, -halfHeight])
      .addPoint([this.sideLength, -paddingX], [this.sideLength / 2])
      .addPoint([paddingX], [this.sideLength / 2, halfHeight])
      .getPoints()
  }

  private questionMark = (letterBuilder: LetterBuilder): Point[] => { // 63
    const curveDiag = this.scaled(12)
    const dotDiag = this.scaled(6)
    return letterBuilder
      // curve
      .addPoint([this.sideLength / 2, -2 * curveDiag], [curveDiag])
      .addPoint([this.sideLength / 2, -curveDiag], [])
      .addPoint([this.sideLength / 2, curveDiag], [])
      .addPoint([this.sideLength / 2, 2 * curveDiag], [curveDiag])
      .addPoint([this.sideLength / 2, 2 * curveDiag], [3 * curveDiag])
      .addPoint([this.sideLength / 2], [5 * curveDiag])
      // dot
      .addPoint([this.sideLength / 2], [this.sideLength, -2 * dotDiag])
      .addPoint([this.sideLength / 2, -dotDiag], [this.sideLength, -dotDiag])
      .addPoint([this.sideLength / 2], [this.sideLength])
      .addPoint([this.sideLength / 2, dotDiag], [this.sideLength, -dotDiag])
      .addPoint([this.sideLength / 2], [this.sideLength, -2 * dotDiag])
      .getPoints()
  }

  private atSign = (letterBuilder: LetterBuilder): Point[] => { // 64
    const innerRadius = this.scaled(10)
    const outerRadius = this.scaled(22)
    return letterBuilder
      // inner 'a'
      .addPoint([this.sideLength / 2, innerRadius], [this.sideLength / 2, -1.2 * innerRadius])
      .addPoint([this.sideLength / 2, innerRadius], [this.sideLength / 2, innerRadius / 2])
      .addPoint([this.sideLength / 2, innerRadius / 2], [this.sideLength / 2, innerRadius])
      .addPoint([this.sideLength / 2, -innerRadius / 2], [this.sideLength / 2, innerRadius])
      .addPoint([this.sideLength / 2, -innerRadius], [this.sideLength / 2, innerRadius / 2])
      .addPoint([this.sideLength / 2, -innerRadius], [this.sideLength / 2, -innerRadius / 2])
      .addPoint([this.sideLength / 2, -innerRadius / 2], [this.sideLength / 2, -innerRadius])
      .addPoint([this.sideLength / 2, innerRadius / 2], [this.sideLength / 2, -innerRadius])
      .addPoint([this.sideLength / 2, innerRadius], [this.sideLength / 2, -innerRadius / 2])
      .addPoint([this.sideLength / 2, innerRadius], [this.sideLength / 2, innerRadius])
      // outer circle
      .addPoint([this.sideLength / 2, outerRadius], [this.sideLength / 2, innerRadius])
      .addPoint([this.sideLength / 2, outerRadius], [this.sideLength / 2, -outerRadius / 2])
      .addPoint([this.sideLength / 2, outerRadius / 2], [this.sideLength / 2, -outerRadius])
      .addPoint([this.sideLength / 2, -outerRadius / 2], [this.sideLength / 2, -outerRadius])
      .addPoint([this.sideLength / 2, -outerRadius], [this.sideLength / 2, -outerRadius / 2])
      .addPoint([this.sideLength / 2, -outerRadius], [this.sideLength / 2, outerRadius / 2])
      .addPoint([this.sideLength / 2, -outerRadius / 2], [this.sideLength / 2, outerRadius])
      .addPoint([this.sideLength / 2, outerRadius / 2], [this.sideLength / 2, outerRadius])
      .getPoints()
  }

  private openBracket = (letterBuilder: LetterBuilder): Point[] => { // 91
    const bracketWidth = this.scaled(15)
    return letterBuilder
      .addPoint([this.sideLength / 2], [])
      .addPoint([this.sideLength / 2, -bracketWidth], [])
      .addPoint([this.sideLength / 2, -bracketWidth], [this.sideLength])
      .addPoint([this.sideLength / 2], [this.sideLength])
      .getPoints()
  }

  private backSlash = (letterBuilder: LetterBuilder): Point[] => { // 92
    const paddingX = this.MEDIUM_PADDING_X
    const width = this.scaled(10)
    return letterBuilder
      .addPoint([paddingX], [])
      .addPoint([this.sideLength, -paddingX, -width], [this.sideLength])
      .addPoint([this.sideLength, -paddingX], [this.sideLength])
      .addPoint([paddingX, width], [])
      .addPoint([paddingX], [])
      .getPoints()
  }

  private closeBracket = (letterBuilder: LetterBuilder): Point[] => { // 93
    const bracketWidth = this.scaled(15)
    return letterBuilder
      .addPoint([this.sideLength / 2], [])
      .addPoint([this.sideLength / 2, bracketWidth], [])
      .addPoint([this.sideLength / 2, bracketWidth], [this.sideLength])
      .addPoint([this.sideLength / 2], [this.sideLength])
      .getPoints()
  }

  private caret = (letterBuilder: LetterBuilder): Point[] => { // 94
    const paddingDiag = this.LARGE_PADDING_DIAG
    return letterBuilder
      .addPoint([this.sideLength / 2, -paddingDiag], [paddingDiag])
      .addPoint([this.sideLength / 2], [])
      .addPoint([this.sideLength / 2, paddingDiag], [paddingDiag])
      .getPoints()
  }

  private underscore = (letterBuilder: LetterBuilder): Point[] => { // 95
    const paddingX = this.SMALL_PADDING_X
    const height = this.scaled(10)
    return letterBuilder
      .addPoint([paddingX], [this.sideLength, -height])
      .addPoint([this.sideLength, -paddingX], [this.sideLength, -height])
      .addPoint([this.sideLength, -paddingX], [this.sideLength])
      .addPoint([paddingX], [this.sideLength])
      .addPoint([paddingX], [this.sideLength, -height])
      .getPoints()
  }

  private backtick = (letterBuilder: LetterBuilder): Point[] => { // 96
    const paddingDiag = this.SMALL_PADDING_DIAG
    const width = this.scaled(10)
    return letterBuilder
      .addPoint([this.sideLength / 2, -paddingDiag], [])
      .addPoint([this.sideLength / 2, paddingDiag], [1.5 * paddingDiag])
      .addPoint([this.sideLength / 2, paddingDiag, width], [1.5 * paddingDiag])
      .addPoint([this.sideLength / 2, -paddingDiag, width], [])
      .addPoint([this.sideLength / 2, -paddingDiag], [])
      .getPoints()
  }

  private openSwirlyBracket = (letterBuilder: LetterBuilder): Point[] => { // 123
    const paddingDiag = this.XS_PADDING_DIAG
    return letterBuilder
      .addPoint([this.sideLength / 2], [])
      .addPoint([this.sideLength / 2, -1 * paddingDiag], [])
      .addPoint([this.sideLength / 2, -2 * paddingDiag], [paddingDiag])
      .addPoint([this.sideLength / 2, -2 * paddingDiag], [this.sideLength / 2, -paddingDiag])
      .addPoint([this.sideLength / 2, -3 * paddingDiag], [this.sideLength / 2])
      .addPoint([this.sideLength / 2, -2 * paddingDiag], [this.sideLength / 2, paddingDiag])
      .addPoint([this.sideLength / 2, -2 * paddingDiag], [this.sideLength, -paddingDiag])
      .addPoint([this.sideLength / 2, -1 * paddingDiag], [this.sideLength])
      .addPoint([this.sideLength / 2], [this.sideLength])
      .getPoints()
  }

  private pipe = (letterBuilder: LetterBuilder): Point[] => { // 124
    const halfWidth = this.scaled(6)
    return letterBuilder
      .addPoint([this.sideLength / 2, -halfWidth], [])
      .addPoint([this.sideLength / 2, -halfWidth], [this.sideLength])
      .addPoint([this.sideLength / 2, halfWidth], [this.sideLength])
      .addPoint([this.sideLength / 2, halfWidth], [])
      .addPoint([this.sideLength / 2, -halfWidth], [])
      .getPoints()
  }

  private closeSwirlyBracket = (letterBuilder: LetterBuilder): Point[] => { // 125
    const paddingDiag = this.XS_PADDING_DIAG
    return letterBuilder
      .addPoint([this.sideLength / 2], [])
      .addPoint([this.sideLength / 2, paddingDiag], [])
      .addPoint([this.sideLength / 2, 2 * paddingDiag], [paddingDiag])
      .addPoint([this.sideLength / 2, 2 * paddingDiag], [this.sideLength / 2, -paddingDiag])
      .addPoint([this.sideLength / 2, 3 * paddingDiag], [this.sideLength / 2])
      .addPoint([this.sideLength / 2, 2 * paddingDiag], [this.sideLength / 2, paddingDiag])
      .addPoint([this.sideLength / 2, 2 * paddingDiag], [this.sideLength, -paddingDiag])
      .addPoint([this.sideLength / 2, paddingDiag], [this.sideLength])
      .addPoint([this.sideLength / 2], [this.sideLength])
      .getPoints()
  }

  private tilde = (letterBuilder: LetterBuilder): Point[] => { // 126
    const paddingX = this.SMALL_PADDING_X
    const paddingDiag = this.MEDIUM_PADDING_DIAG
    return letterBuilder
      .addPoint([paddingX], [this.sideLength / 2, paddingDiag / 2])
      .addPoint([paddingX, paddingDiag], [this.sideLength / 2, -paddingDiag / 2])
      .addPoint([this.sideLength / 2, -paddingDiag / 2], [this.sideLength / 2, -paddingDiag / 2])
      .addPoint([this.sideLength / 2, paddingDiag / 2], [this.sideLength / 2, paddingDiag / 2])
      .addPoint([this.sideLength, -paddingX, -paddingDiag], [this.sideLength / 2, paddingDiag / 2])
      .addPoint([this.sideLength, -paddingX], [this.sideLength / 2, -paddingDiag / 2])
      .getPoints()
  }

  private scaled = (n: number) => n * this.sideLength / DEFAULT_SIDE_LENGTH
}
