import { useState } from "react"
import { GoTo } from "../../../../common/components/goTo/GoTo"
import { Header } from "../../../../common/components/header/Header"
import { DefaultDigit } from "../../../../common/components/digits/DefaultDigit"
import { MathOperation } from "../../../../common/components/mathOpertion/mathOperation"
import { ResultInput } from "../../../../common/components/input/resultInput/ResultInput"
import { useTranslation } from "react-i18next"
import { setTotalUserScore } from "../../../profile/profile.slice"
import { checkMathOperation } from "../../../../common/utils/math/checkMathOperation"
import { MathOperationsConstants, MathSignsConstants } from "../../../../common/constants/MathConstants"
import { ScoreType } from "../../../profile/profile.api.types"
import { Resolver, SubmitHandler, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { useAppSelector } from "../../../../common/hooks/useAppSelector"
import { selectUserId } from "../../../auth/auth.selectors"
import { useDispatch } from "react-redux"
import { AnswerType } from "../../MathOperations.types"
import { generateRandomNumber } from "../../../../common/utils/math/generateRandomNumber"
import { useUpdateScoreMutation } from "../../../profile/profile.api"
import { useFormSchema } from "../../../../common/utils/math/validationShemaMathOperations"
import { Loader } from "../../../../common/components/loaders/CircularLoader"
import { Modal } from "../../../../common/components/modal/Modal"
import { MathExampleLayout } from "../../../../common/components/layouts/MathExamlpeLayout"
import { useParams } from "react-router-dom"
import { ButtonsLayout } from "../../../../common/components/layouts/ButtonsLayout"
import { MathOperationButton } from "../../../../common/components/buttons/MathOperationButton"
import { Score } from "../../../../common/components/score/Score"

export const SummDifference = () => {
  const userId = useAppSelector(selectUserId)

  const { mathOperation } = useParams<{ mathOperation: string }>()

  const [firstNumber, setFirstNumber] = useState<number>(generateRandomNumber(10, 20))
  const [secondNumber, setSecondNumber] = useState<number>(generateRandomNumber(1, 10))
  const [thirdNumber, setThirdNumber] = useState<number | null>(null)
  const [fourthNumber, setFourthNumber] = useState<number | null>(null)
  const [score, setScore] = useState(0)

  const [answer, setAnswer] = useState<string>('')
  const [rightWrong, setRightWrong] = useState<AnswerType>(null)
  const [serverError, setServerError] = useState('')
  const [open, setOpen] = useState(false)

  const dispatch = useDispatch()
  const [updateScore, { isLoading }] = useUpdateScoreMutation()
  const formSchema = useFormSchema()

  const { t } = useTranslation('translation')

  const generateNewNumbers = (score: number) => {
    if ((mathOperation === MathOperationsConstants.SUMM) 
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

  const {
    handleSubmit,
    reset,
  } = useForm<ScoreType>({
    defaultValues: {
      score: score,
      userId: useAppSelector(selectUserId), 
      date: new Date()
    },
    mode: 'onChange',
    resolver: yupResolver(formSchema) as Resolver<ScoreType>,
  })
  
  const onSubmit: SubmitHandler<ScoreType> = (data: ScoreType) => {
    setServerError('')

    if (( checkMathOperation({
      answer: Number(answer),
      operation: MathOperationsConstants.SUMM, 
      firstOperand: firstNumber, 
      secondOperand: secondNumber,
      thirdOperand: thirdNumber ? thirdNumber : 0,
      fourthOperand: fourthNumber ? fourthNumber : 0,
    }) === true ) ||
    ( checkMathOperation({
      answer: Number(answer),
      operation: MathOperationsConstants.DIFF, 
      firstOperand: firstNumber, 
      secondOperand: secondNumber,
      thirdOperand: thirdNumber ? thirdNumber : 0,
      fourthOperand: fourthNumber ? fourthNumber : 0,
    }) === true )) {

      setScore(score + 1)
      setRightWrong('right')
      data = { ...data, score: 1 }

    } else {
      setScore(score - 1)
      setRightWrong('wrong')
      data = { ...data, score: -1 }
    }
    
    updateScore(data)
      .unwrap()
      .then(response => {
        reset()
        setOpen(true)
        dispatch(setTotalUserScore(response.data.score))
      })
      .catch((e: any) => {
        if (e.status === 'FETCH_ERROR') setServerError(t('errors.serverError'))
      })
  }

  
  const check = () => {
    setOpen(true)
    if (( checkMathOperation({
      answer: Number(answer),
      operation: MathOperationsConstants.SUMM, 
      firstOperand: firstNumber, 
      secondOperand: secondNumber,
      thirdOperand: thirdNumber ? thirdNumber : 0,
      fourthOperand: fourthNumber ? fourthNumber : 0,
    }) === true ) ||
    ( checkMathOperation({
      answer: Number(answer),
      operation: MathOperationsConstants.DIFF, 
      firstOperand: firstNumber, 
      secondOperand: secondNumber,
      thirdOperand: thirdNumber ? thirdNumber : 0,
      fourthOperand: fourthNumber ? fourthNumber : 0,
    }) === true )) {
      setRightWrong('right')
      setScore(score + 1)
    } else {
      setRightWrong('wrong')
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

  return (
    <>
      {isLoading && <Loader />}
      {open && (
        <Modal
          text={
            rightWrong === 'right' 
              ? t('modal.checkMathOperationSuccess') 
              : t('modal.checkMathOperationFail')
            }
          open={open}
          outlinedButton={false}
          buttonName={t('modal.button')}
          buttonCallback={rightWrong === 'right' ? onPressPlayMore : onPressTryAgain}
          color={rightWrong === 'right' ? 'blue' : 'red'}
        />
      )}
      <GoTo address='/math-operations' name={t('links.back')} />
      <Header title={
        mathOperation === MathOperationsConstants.SUMM 
          ? t('mathOperations.summ')
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
          onClick={userId ? handleSubmit(onSubmit) : check}
          name={t('mathOperations.common.check')}
        />
      </ButtonsLayout>

      <Score score={score} />
    </>
  )
}