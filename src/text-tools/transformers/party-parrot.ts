import letterMap from './shared/letter-map'

export const partyParrotTransform = (rawValue: string): string[][] => {
  const url = 'https://cultofthepartyparrot.com/parrots/hd/parrot.gif'
  const alphabetRegex = /[a-z]/i
  return rawValue.split('').reduce((list: string[][], letter: string) => {
    // don't convert non-alpha chars
    if (!alphabetRegex.test(letter)) {
      return [...list, []]
    }

    // transform the letters
    const grid = letterMap(letter).map((row: number[]) => {
      return row.map((value: number) => value === 1 ? url : null)
    })
    return [...list, [], ...grid]
  }, [])
}

export default partyParrotTransform
