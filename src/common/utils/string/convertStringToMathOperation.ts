export const convertStringToMathOperation = (mathOperation?: string) => {
  let mathSign: string

  switch (mathOperation) {
    case 'sum':
      mathSign = '+'
      break
    case 'difference':
      mathSign = '-'
      break
    case 'multiply':
      mathSign = '*'
      break
    case 'divide':
      mathSign = ':'
      break
    default: 
      mathSign = ''
      break
  }
  return mathSign
}
