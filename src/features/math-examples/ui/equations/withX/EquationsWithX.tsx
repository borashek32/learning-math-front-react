import { useEffect, useMemo, useState } from 'react'
import { AnswerType } from '../../../MathOperations.types'
import { useDispatch } from 'react-redux'
import { Loader } from '../../../../../common/components/loaders/CircularLoader'
import { Modal } from '../../../../../common/components/modal/Modal'
import { useTranslation } from 'react-i18next'
import { Score } from '../../../../../common/components/score/Score'
import { useUpdateScoreMutation } from '../../../../profile/profile.api'
import { useFormSchema } from '../../../../../common/utils/math/validationShemaMathOperations'
import { Resolver, SubmitHandler, useForm } from 'react-hook-form'
import { ScoreType } from '../../../../profile/profile.api.types'
import { useAppSelector } from '../../../../../common/hooks/useAppSelector/useAppSelector'
import { selectUserId } from '../../../../auth/auth.selectors'
import { yupResolver } from '@hookform/resolvers/yup'
import { setTotalUserScore } from '../../../../profile/profile.slice'
import { MathOperationsConstants, MathSignsConstants } from '../../../../../common/constants/MathConstants'
import { generateRandomNumber } from '../../../../../common/utils/math/generateRandomNumber'
import { MathExampleLayout } from '../../../../../common/components/layouts/MathExamlpeLayout'
import { DefaultDigit } from '../../../../../common/components/digits/DefaultDigit'
import { AppText } from '../../../../../common/components/text/AppText'
import { ResultInput } from '../../../../../common/components/input/resultInput/ResultInput'
import { ButtonsLayout } from '../../../../../common/components/layouts/ButtonsLayout'
import { MathOperationButton } from '../../../../../common/components/buttons/MathOperationButton'
import { Header } from '../../../../../common/components/header/Header'
import { GoTo } from '../../../../../common/components/goTo/GoTo'
import { getRandomMathOperation } from '../../../../../common/utils/math/getRandomMathOperation'
import { getCheckMathOperation } from '../../../../../common/utils/math/getCheckMathOperation'
import { Error } from '../../../../../common/components/error/Error'

export const EquationsWithX = () => {
  const [firstNumber, setFirstNumber] = useState<number>(generateRandomNumber(1, 10))
  const [secondNumber, setSecondNumber] = useState<number>(generateRandomNumber(10, 100))
  const [randomOperation, setRandomOperation] = useState<string>('')
  const [hint, setHint] = useState(false)
  const [hintIsUsed, setHintIsUsed] = useState(false)
  const [score, setScore] = useState(0) 
  const [serverError, setServerError] = useState('')
  const [answer, setAnswer] = useState<string>('')
  const [rightWrong, setRightWrong] = useState<AnswerType>(1)
  const [open, setOpen] = useState(false)
  const dispatch = useDispatch()
  
  const [updateScore, { isLoading }] = useUpdateScoreMutation()
  const { t } = useTranslation('translation')
  const formSchema = useFormSchema()

  useEffect(() => {
    const newOperation = getRandomMathOperation([
      MathOperationsConstants.SUM, 
      MathOperationsConstants.DIFF, 
      // MathOperationsConstants.MULTIPLY
    ])
    setRandomOperation(newOperation)
  }, [])
  
  const checkRandomOperation = useMemo(() => getCheckMathOperation(randomOperation), [randomOperation])

  const generateNewNumbers = () => {
    setFirstNumber(generateRandomNumber(1, 10))
    setSecondNumber(generateRandomNumber(10, 100))
  }

  const onGenerateNewNumbers = () => {
    setAnswer('')
    setOpen(false)
    generateNewNumbers()
    const newOperation = getRandomMathOperation([
      MathOperationsConstants.SUM, 
      MathOperationsConstants.DIFF, 
      // MathOperationsConstants.MULTIPLY
    ])
    setRandomOperation(newOperation)
  }

  const onChangeHandler = (answer: string) => {
    setAnswer(answer)
  }

  // const {
  //   handleSubmit,
  //   reset,
  // } = useForm<ScoreType>({
  //   defaultValues: {
  //     score: score,
  //     userId: useAppSelector(selectUserId), 
  //     date: new Date()
  //   },
  //   mode: 'onChange',
  //   resolver: yupResolver(formSchema) as Resolver<ScoreType>,
  // })

  useEffect(() => {
    if (hint) {
      setHintIsUsed(true)
    }
  }, [hint])

  // const onSubmit: SubmitHandler<ScoreType> = (data: ScoreType) => {
  //   setHint(false)
  //   setHintIsUsed(false)
  //   setServerError('')

  //   if (
  //     MathOperationsConstants.SUMM && secondNumber - firstNumber === Number(answer) ||
  //     MathOperationsConstants.DIFF && secondNumber + firstNumber === Number(answer)
  //   ) {
  //     setScore(hintIsUsed ? (score + 1) : (score + 2))
  //     setRightWrong('right')
  //     data = { ...data, score: 2 }
  //   } else {
  //     setScore(score - 1)
  //     setRightWrong('wrong')
  //     data = { ...data, score: -1 }
  //   }
    
  //   updateScore(data)
  //     .unwrap()
  //     .then(response => {
  //       reset()
  //       setOpen(true)
  //       dispatch(setTotalUserScore(response.data.score))
  //     })
  //     .catch((e: any) => {
  //       if (e.status === 'FETCH_ERROR') setServerError(t('errors.serverError'))
  //     })
  // }

  const check = () => {
    setOpen(true)
    setHint(false)
    setHintIsUsed(false)
    setServerError('')
    if (
      MathOperationsConstants.SUM && secondNumber - firstNumber === Number(answer) ||
      MathOperationsConstants.DIFF && secondNumber + firstNumber === Number(answer) ||
      MathOperationsConstants.MULTIPLY && secondNumber * firstNumber === Number(answer) 
    ) {
      setScore(hintIsUsed ? (score + 1) : (score + 2))
      setRightWrong(1)
    } else {
      setScore(score - 1)
      setRightWrong(-1)
    }
  }

  const onPressPlayMore = () => onGenerateNewNumbers()

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
            rightWrong === 1
              ? t('modal.checkMathOperationSuccess') 
              : t('modal.checkMathOperationFail')
            }
          open={open}
          outlinedButton={false}
          buttonName={t('modal.button')}
          buttonCallback={rightWrong === 1 ? onPressPlayMore : onPressTryAgain}
          color={rightWrong === 1 ? 'blue' : 'red'}
          buttonBack={false}
        />
      )}
      <GoTo address='/home/math-operations/equations' name={t('links.back')} />
      <Header title={t('mathOperations.equationsWithX')} />
      {serverError && <Error error={serverError} />}
      <MathExampleLayout>
        <DefaultDigit title={MathSignsConstants.X} />
        <DefaultDigit title={randomOperation} />
        <DefaultDigit title={firstNumber} />
        <DefaultDigit title={MathSignsConstants.EQUAL} />
        <DefaultDigit title={secondNumber} />
      </MathExampleLayout>

      {!hint
      ? <AppText 
          onPress={() => 
          setHint(true)} desc={t('mathOperations.common.getHint')} 
          link={true}
        />
      : <MathExampleLayout onPress={() => setHint(false)}>
          <DefaultDigit title={MathSignsConstants.X} italic={true} />
          <DefaultDigit title={MathSignsConstants.EQUAL} italic={true} />
          <DefaultDigit title={secondNumber} italic={true} />
          <DefaultDigit title={checkRandomOperation} italic={true} />
          <DefaultDigit title={firstNumber} italic={true} />
        </MathExampleLayout>
      }

      <MathExampleLayout>
        <DefaultDigit title={MathSignsConstants.X} />
        <DefaultDigit title={MathSignsConstants.EQUAL} />
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
          // onClick={handleSubmit(onSubmit)}
          onClick={check}
          name={t('mathOperations.common.check')}
        />
      </ButtonsLayout>

      <Score score={score} />
    </>
  )
}
