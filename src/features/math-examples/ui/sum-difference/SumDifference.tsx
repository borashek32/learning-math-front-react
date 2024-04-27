import { useEffect, useState } from "react"
import { GoTo } from "../../../../common/components/goTo/GoTo"
import { Header } from "../../../../common/components/header/Header"
import { DefaultDigit } from "../../../../common/components/digits/DefaultDigit"
import { MathOperation } from "../../../../common/components/mathOpertion/mathOperation"
import { ResultInput } from "../../../../common/components/input/resultInput/ResultInput"
import { useTranslation } from "react-i18next"
import { checkMathOperation } from "../../../../common/utils/math/checkMathOperation"
import { MathOperationsConstants, MathSignsConstants } from "../../../../common/constants/MathConstants"
import { useAppSelector } from "../../../../common/hooks/useAppSelector/useAppSelector"
import { selectIsLoggedIn, selectUserId } from "../../../auth/auth.selectors"
import { useDispatch } from "react-redux"
import { AnswerType } from "../../MathOperations.types"
import { generateRandomNumber } from "../../../../common/utils/math/generateRandomNumber"
import { useUpdateScoreMutation } from "../../../profile/profile.api"
import { useFormSchema } from "../../../../common/utils/math/validationSchemaMathOperations"
import { Loader } from "../../../../common/components/loaders/CircularLoader"
import { Modal } from "../../../../common/components/modal/Modal"
import { MathExampleLayout } from "../../../../common/components/layouts/MathExamlpeLayout"
import { useParams } from "react-router-dom"
import { ButtonsLayout } from "../../../../common/components/layouts/ButtonsLayout"
import { MathOperationButton } from "../../../../common/components/buttons/MathOperationButton"
import { Score } from "../../../../common/components/score/Score"
import { Error } from "../../../../common/components/error/Error"
import { useAppForm } from "../../../../common/hooks/useAppForm/useAppForm"

export const SumDifference = () => {
  const userId = useAppSelector(selectUserId)

  const { mathOperation } = useParams<{ mathOperation: string }>()

  const [firstNumber, setFirstNumber] = useState<number>(generateRandomNumber(10, 20))
  const [secondNumber, setSecondNumber] = useState<number>(generateRandomNumber(1, 10))
  const [thirdNumber, setThirdNumber] = useState<number | null>(null)
  const [fourthNumber, setFourthNumber] = useState<number | null>(null)
  const [score, setScore] = useState(0)

  const [answer, setAnswer] = useState<string>('')
  const [rightWrong, setRightWrong] = useState<AnswerType>(null)
  const [open, setOpen] = useState(false)

  const { t } = useTranslation('translation')

  const { isLoading, serverError, onSubmit } = useAppForm(score)


  const generateNewNumbers = (score: number) => {
    if ((mathOperation === MathOperationsConstants.SUM) 
    || (mathOperation === MathOperationsConstants.DIFF)) {
      if (score <= 5) {
        setFirstNumber(generateRandomNumber(10, 100))
        setSecondNumber(generateRandomNumber(1, 10))
        setThirdNumber(null)
        setFourthNumber(null)
      }
      if (score > 5) {
        setFirstNumber(generateRandomNumber(30, 60))
        setSecondNumber(generateRandomNumber(1, 10))
        setThirdNumber(generateRandomNumber(1, 10))
        setFourthNumber(null)
      }
      if (score > 10) {
        setFirstNumber(generateRandomNumber(30, 80))
        setSecondNumber(generateRandomNumber(1, 10))
        setThirdNumber(generateRandomNumber(1, 10))
        setFourthNumber(generateRandomNumber(1, 10))
      }
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
      operation: MathOperationsConstants.SUM, 
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
      <GoTo address='/home/math-operations' name={t('links.back')} />
      <Header title={
        mathOperation === MathOperationsConstants.SUM
          ? t('mathOperations.sum')
          : mathOperation === MathOperationsConstants.DIFF
          ? t('mathOperations.diff')
          : t('mathOperations.multCheck')
        } />

      <MathExampleLayout>
        <DefaultDigit title={firstNumber} />
        <DefaultDigit title={mathOperation} />
        <DefaultDigit title={secondNumber} />
        {thirdNumber ?
          <>
            <DefaultDigit title={mathOperation} />
            <DefaultDigit title={thirdNumber} />
          </> : <></>
        }
        {fourthNumber ? 
          <>
            <DefaultDigit title={mathOperation} />
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