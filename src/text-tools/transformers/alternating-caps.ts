const alternatingCapsTransform = (rawValue: string, firstIsUpper: boolean): string => {
  let result = ''
  let lastWasUpper = !firstIsUpper // make first char lowercase
  const alphabetRegex = /[a-z]/i

  for (const c of rawValue) {
    if (alphabetRegex.test(c)) {
      result += lastWasUpper ? c.toLowerCase() : c.toUpperCase()
      lastWasUpper = !lastWasUpper
    } else {
      result += c
    }
  }
  return result
}

export default alternatingCapsTransform
