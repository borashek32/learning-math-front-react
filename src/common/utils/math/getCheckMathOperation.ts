import { MathOperationsConstants } from "../../constants/math/mathConstants"

export const getCheckMathOperation = (mathOperation: string) => {
  let checkMathOperation: string

  if (mathOperation === MathOperationsConstants.DIFF) {
    checkMathOperation = MathOperationsConstants.SUM

    return checkMathOperation
  } else if (mathOperation === MathOperationsConstants.SUM) {
    checkMathOperation = MathOperationsConstants.DIFF

    return checkMathOperation
  } else if (mathOperation === MathOperationsConstants.MULTIPLY) {
    checkMathOperation = MathOperationsConstants.DIVIDE

    return checkMathOperation
  } else if (mathOperation === MathOperationsConstants.DIVIDE) {
    checkMathOperation = MathOperationsConstants.MULTIPLY

    return checkMathOperation
  }
}