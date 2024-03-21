import { useEffect, useState } from "react"
import styles from './../../../MathOperations.module.sass'
import { useTranslation } from "react-i18next"
import { GoTo } from "../../../../../common/components/goTo/GoTo"
import { Header } from "../../../../../common/components/header/Header"
import { DefaultDigit } from "../../../../../common/components/digits/DefaultDigit"
import { ResultInput } from "../../../../../common/components/input/resultInput/ResultInput"
import { MathOperationsFooter } from "../../mathOperationsFooter/MathOperationsFooter"
import { useFormSchema } from "../../../../../common/utils/math/validationShemaMathOperations"
import { useDispatch } from "react-redux"
import { AnswerType } from "../../../MathOperations.types"
import { useUpdateScoreMutation } from "../../../../profile/profile.api"
import { Resolver, SubmitHandler, useForm } from "react-hook-form"
import { ScoreType } from "../../../../profile/profile.api.types"
import { useAppSelector } from "../../../../../common/hooks/useAppSelector"
import { selectUserId } from "../../../../auth/auth.selectors"
import { yupResolver } from "@hookform/resolvers/yup"
import { setTotalUserScore } from "../../../../profile/profile.slice"
import { MathExampleLayout } from "../../../../../common/components/layouts/MathExamlpeLayout"
import { ButtonsLayout } from "../../../../../common/components/layouts/ButtonsLayout"
import { MathOperationButton } from "../../../../../common/components/buttons/MathOperationButton"
import { Score } from "../../../../../common/components/score/Score"
import { Loader } from "../../../../../common/components/loaders/CircularLoader"
import { Modal } from "../../../../../common/components/modal/Modal"
import { Error } from "../../../../../common/components/error/Error"

export const MultiplicationCheck = () => {
  const [firstMultiplier, setFirstMultiplier] = useState<number>(Math.floor(Math.random() * 8) + 2)
  const [secondMultiplier, setSecondMultiplier] = useState<number>(Math.floor(Math.random() * 8) + 2)
  const [score, setScore] = useState(0)
  const [answer, setAnswer] = useState<string>('')
  const [serverError, setServerError] = useState('')
  const [rightWrong, setRightWrong] = useState<AnswerType>(null)
  const [open, setOpen] = useState(false)
  const dispatch = useDispatch()

  const [updateScore, { isLoading }] = useUpdateScoreMutation()
  const { t } = useTranslation('translation')
  const formSchema = useFormSchema()

  const generateNewDigits = () => {
    setFirstMultiplier(Math.floor(Math.random() * 8) + 2)
    setSecondMultiplier(Math.floor(Math.random() * 8) + 2)
  }

  const onChangeHandler = (answer: string) => {
    setAnswer(answer)
  }
  
  const onGenerateNewDigits = () => {
    generateNewDigits()
    setAnswer('')
    setOpen(false)
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
    const answerToNumber = Number(answer)

    if (answerToNumber === secondMultiplier) {
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

  const onPressPlayMore = () => {
    setOpen(false)
    setAnswer('')
    generateNewDigits()
  }

  const onPressTryAgain = () => {
    setOpen(false)
    setAnswer('')
  }

  useEffect(() => {
    generateNewDigits()
  }, [])

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

      <GoTo address='/home/math-operations/multiplication' name={t('links.back')} />
      <Header title={t('mathOperations.multiplication')} />

      {serverError && <Error error={serverError} />}
      <MathExampleLayout>
        <DefaultDigit title={firstMultiplier * secondMultiplier} />
        <DefaultDigit title=':' />
        <DefaultDigit title={firstMultiplier} />
        <DefaultDigit title='=' />

        <ResultInput 
          value={answer}
          onChange={onChangeHandler}
        />
      </MathExampleLayout>

      <ButtonsLayout>
        <MathOperationButton
          onClick={onGenerateNewDigits}
          name={t('mathOperations.common.generate')}
        />
        <MathOperationButton
          onClick={handleSubmit(onSubmit)}
          name={t('mathOperations.common.check')}
        />
      </ButtonsLayout>
      
      <Score score={score} />
    </>
  )
}