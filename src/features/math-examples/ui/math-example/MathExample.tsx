import { useEffect, useState } from "react"
import { GoTo } from "../../../../common/components/goTo/GoTo"
import { Header } from "../../../../common/components/header/Header"
import { DefaultDigit } from "../../../../common/components/digits/DefaultDigit"
import { MathOperation } from "../../../../common/components/mathOperation/mathOperation"
import { ResultInput } from "../../../../common/components/input/resultInput/ResultInput"
import { useTranslation } from "react-i18next"
import { checkMathOperation } from "../../../../common/utils/math/checkMathOperation"
import { MathOperationsConstants, MathSignsConstants } from "../../../../common/constants/math/mathConstants"
import { useAppSelector } from "../../../../common/hooks/useAppSelector/useAppSelector"
import { AnswerType } from "../../MathExamples.types"
import { Loader } from "../../../../common/components/loaders/CircularLoader"
import { Modal } from "../../../../common/components/modal/Modal"
import { MathExampleLayout } from "../../../../common/components/layouts/MathExampleLayout"
import { useParams } from "react-router-dom"
import { ButtonsLayout } from "../../../../common/components/layouts/ButtonsLayout"
import { MathOperationButton } from "../../../../common/components/buttons/MathOperationButton"
import { Score } from "../../../../common/components/score/Score"
import { Error } from "../../../../common/components/error/Error"
import { useAppForm } from "../../../../common/hooks/useAppForm/useAppForm"
import { convertStringToMathOperation } from "../../../../common/utils/string/convertStringToMathOperation"
import { PRIVATE_PATHS } from "../../../../common/constants/paths/privatePaths"
import { selectUserId } from "../../../auth/auth.selectors"
import { PUBLIC_PATHS } from "../../../../common/constants/paths/publicPaths"
import { generateRandomNumber } from "../../../../common/utils/math/generateRandomNumber"
import { generateRandomNumberWithNulls } from "../../../../common/utils/math/generateRandomNumberWithNulls"

export const MathExample = () => {
  const userId = useAppSelector(selectUserId)

  const { mathOperation, digit } = useParams<{ mathOperation: string, digit: string | undefined }>()
  const mathSign = convertStringToMathOperation(mathOperation)

  const [firstNumber, setFirstNumber] = useState<number>(generateRandomNumber(10, 20))
  const [secondNumber, setSecondNumber] = useState<number>(generateRandomNumber(1, 10))
  const [thirdNumber, setThirdNumber] = useState<number | null>(null)
  const [fourthNumber, setFourthNumber] = useState<number | null>(null)

  const [answer, setAnswer] = useState<string>('')
  const [rightWrong, setRightWrong] = useState<AnswerType>(null)
  const [open, setOpen] = useState(false)

  const [score, setScore] = useState(0)

  const { t } = useTranslation('translation')

  const { isLoading, serverError, onSubmit } = useAppForm(score)

  const generateNewNumbers = (score: number) => {
    if ((mathSign === MathOperationsConstants.SUM) 
    || (mathSign === MathOperationsConstants.DIFF)) {
      if (score <= 5) {
        setFirstNumber(generateRandomNumber(10, 100))
        setSecondNumber(generateRandomNumber(1, 10))
      }
      if (score > 5) {
        setFirstNumber(generateRandomNumber(30, 60))
        setSecondNumber(generateRandomNumber(1, 10))
        setThirdNumber(generateRandomNumber(1, 10))
      }
      if (score > 10) {
        setFirstNumber(generateRandomNumber(30, 80))
        setSecondNumber(generateRandomNumber(1, 10))
        setThirdNumber(generateRandomNumber(1, 10))
        setFourthNumber(generateRandomNumber(1, 10))
      }
    }
    if (mathSign === MathOperationsConstants.MULTIPLY) {
      setFirstNumber(generateRandomNumber(1, 10))
      setSecondNumber(Number(digit))
    }
    if ((mathSign === MathOperationsConstants.MULTIPLY)
    && (digit === 'numbers-with-nulls')) {
      if (score <= 10) {
        setFirstNumber(generateRandomNumberWithNulls(1, 10))
        setSecondNumber(generateRandomNumberWithNulls(1, 10))
      }
      if (score > 10) {
        setFirstNumber(generateRandomNumberWithNulls(1, 10))
        setSecondNumber(generateRandomNumberWithNulls(1, 10))
        setThirdNumber(generateRandomNumberWithNulls(1, 10))
      }
    }
    if (mathSign === MathOperationsConstants.DIVIDE) {
      setFirstNumber(generateRandomNumber(1, 10))
      setSecondNumber(generateRandomNumber(1, 10))
    }
  }
  
  const onGenerateNewNumbers = () => {
    setAnswer('')
    setOpen(false)
    generateNewNumbers(score)
  }

  const onChangeHandler = (answer: string) => {
    setAnswer(answer)
  }
  
  const check = () => {
    setOpen(true)
    if (checkMathOperation({
      answer: Number(answer),
      operation: mathSign, 
      firstOperand: firstNumber, 
      secondOperand: secondNumber,
      thirdOperand: thirdNumber ? thirdNumber : 0,
      fourthOperand: fourthNumber ? fourthNumber : 0,
    })) {
      setRightWrong(1)
      setScore(score + 1)
    } else {
      setRightWrong(-1)
      setScore(score - 1)
    }
  }

  const onPressPlayMore = () => {
    setOpen(false)
    generateNewNumbers(score)
    setAnswer('')
  }

  const onPressTryAgain = () => {
    setOpen(false)
    setAnswer('')
  }

  useEffect(() => {
    if (userId && rightWrong) {
      onSubmit({
        score: rightWrong,
        userId, 
        date: new Date()
      })
    }
  }, [score, userId, rightWrong])

  useEffect(() => {
    generateNewNumbers(score)
  }, [])

  return (
    <>
      {isLoading && <Loader />}
      {serverError && 
        <Error error={serverError} />
      }
      {open && (
        <Modal
          text={
            rightWrong === 1 
              ? t('modal.checkMathOperationSuccess') 
              : t('modal.checkMathOperationFail')
            }
          open={open}
          outlinedButton={false}
          buttonName={t('modal.button')}
          buttonCallback={rightWrong === 1 ? onPressPlayMore : onPressTryAgain}
          color={rightWrong === 1 ? 'blue' : 'red'}
        />
      )}

      <GoTo address={userId ? PRIVATE_PATHS.MATH_EXAMPLES : PUBLIC_PATHS.MATH_EXAMPLES} name={t('links.back')} />
      
      <Header title={
        mathSign === MathOperationsConstants.SUM
          ? t('mathOperations.sum')
          : mathSign === MathOperationsConstants.DIFF
          ? t('mathOperations.diff')
          : mathSign === MathOperationsConstants.MULTIPLY && digit === 'numbers-with-nulls'
          ? t('mathOperations.multNulls')
          : mathSign === MathOperationsConstants.MULTIPLY
          ? t('mathOperations.multBy') + ' ' + digit
          : mathSign === MathOperationsConstants.DIVIDE
          ? t('mathOperations.multCheck')
          : ''
        } />

      <MathExampleLayout>
        <DefaultDigit title={
          mathSign === MathOperationsConstants.DIVIDE
            ? firstNumber * secondNumber
            : firstNumber
        } />
        <DefaultDigit title={mathSign} />
        <DefaultDigit title={secondNumber} />
        {thirdNumber ?
          <>
            <DefaultDigit title={mathSign} />
            <DefaultDigit title={thirdNumber} />
          </> : <></>
        }
        {fourthNumber ? 
          <>
            <DefaultDigit title={mathSign} />
            <DefaultDigit title={fourthNumber} />
          </> : <></>
        }
        <MathOperation title={MathSignsConstants.EQUAL} />

        <ResultInput
          value={answer} 
          onChange={onChangeHandler}
        />
      </MathExampleLayout>

      <ButtonsLayout>
        <MathOperationButton
          onClick={onGenerateNewNumbers}
          name={t('mathOperations.common.generate')}
        />
        <MathOperationButton
          onClick={check}
          name={t('mathOperations.common.check')}
        />
      </ButtonsLayout>

      <Score score={score} />
    </>
  )
}