import React, { ReactNode, useEffect, useMemo, useState } from 'react'
import { AnswerType } from '../../../MathOperations.types'
import { useDispatch } from 'react-redux'
import { Loader } from '../../../../../common/components/loaders/CircularLoader'
import { Modal } from '../../../../../common/components/modal/Modal'
import { useTranslation } from 'react-i18next'
import { AppLayout } from '../../../../../common/components/layouts/AppLayout'
import { Error } from '../../../../../common/components/error/Error'
import { Score } from '../../../../../common/components/score/Score'
import { useUpdateScoreMutation } from '../../../../profile/profile.api'
import { useFormSchema } from '../../../../../common/utils/math/validationShemaMathOperations'
import { Resolver, SubmitHandler, useForm } from 'react-hook-form'
import { ScoreType } from '../../../../profile/profile.api.types'
import { useAppSelector } from '../../../../../common/hooks/useAppSelector'
import { selectUserId } from '../../../../auth/auth.selectors'
import { yupResolver } from '@hookform/resolvers/yup'
import { setTotalUserScore } from '../../../../profile/profile.slice'
import { MathOperationsConstants, MathSignsConstants } from '../../../../../common/constants/MathConstants'
import { getRandomMathOperation } from '../../../../../common/utils/math/getRandomMathOperation'
import { getCheckMathOperation } from '../../../../../common/utils/math/getCheckMathOperation'
import { generateRandomNumber } from '../../../../../common/utils/math/generateRandomNumber'
import { MathExampleLayout } from '../../../../../common/components/layouts/MathExamlpeLayout'
import { DefaultDigit } from '../../../../../common/components/digits/DefaultDigit'
import { MathOperation } from '../../../../../common/components/mathOpertion/mathOperation'
import { AppText } from '../../../../../common/components/text/AppText'
import { ResultInput } from '../../../../../common/components/input/resultInput/ResultInput'
import { ButtonsLayout } from '../../../../../common/components/layouts/ButtonsLayout'
import { MathOperationButton } from '../../../../../common/components/buttons/MathOperationButton'

export const EquationsWithX = () => {
  const [firstNumber, setFirstNumber] = useState<number>(generateRandomNumber(1, 10))
  const [secondNumber, setSecondNumber] = useState<number>(generateRandomNumber(1, 10))
  const [hint, setHint] = useState(false)
  const [score, setScore] = useState(0) 
  const [serverError, setServerError] = useState('')
  const [answer, setAnswer] = useState<string>('')
  const [rightWrong, setRightWrong] = useState<AnswerType>(null)
  const [open, setOpen] = useState(false)
  const dispatch = useDispatch()

  const randomOperation = useMemo(() => getRandomMathOperation(), [])
  const checkRandomOperation = useMemo(() => getCheckMathOperation(randomOperation), [randomOperation])
  
  const [updateScore, { isLoading }] = useUpdateScoreMutation()
  const { t } = useTranslation('translation')
  const formSchema = useFormSchema()

  const generateNewNumbers = () => {
    setFirstNumber(generateRandomNumber(1, 10))
    setSecondNumber(generateRandomNumber(1, 10))
  }

  const onGenerateNewNumbers = () => {
    setAnswer('')
    setOpen(false)
    generateNewNumbers()
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
    setHint(false)
    setServerError('')

    // if (checkMathOperation({
    //   score,
    //   answer: Number(answer),
    //   operation: randomOperation, 
    //   firstOperand: firstNumber, 
    //   secondOperand: secondNumber,
    // }) === true) {
    //   setScore(score + 1)
    //   setRightWrong('right')
    //   data = { ...data, score: 1 }
    // }
    // else {
    //   setScore(score - 1)
    //   setRightWrong('wrong')
    //   data = { ...data, score: -1 }
    // }

    if (
      (randomOperation === MathOperationsConstants.SUMM) && (Number(answer) + firstNumber === secondNumber) ||
      (randomOperation === MathOperationsConstants.DIFF) && (firstNumber + secondNumber === Number(answer)) ||
      (randomOperation === MathOperationsConstants.MULTIPLY) && (secondNumber / firstNumber === Number(answer)) ||
      (randomOperation === MathOperationsConstants.DIVIDE) && (secondNumber * firstNumber === Number(answer))
    ) {
      setScore(hint ? (score + 1) : (score + 2))
      setRightWrong('right')
      data = { ...data, score: 2 }
    }
    else {
      setScore(score - 1)
      setRightWrong('wrong')
      data = { ...data, score: -2 }
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
    generateNewNumbers()
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
          buttonBack={false}
        />
      )}
      <AppLayout title={t('screens.equations')}>
        {/* {serverError && <Error error={serverError} />} */}
        <MathExampleLayout>
          <DefaultDigit title={MathSignsConstants.X} />
          <MathOperation title={randomOperation} />
          <DefaultDigit title={firstNumber} />
          <MathOperation title={MathSignsConstants.EQUAL} />
          <DefaultDigit title={secondNumber} />
        </MathExampleLayout>

        {!hint
        ? <AppText onPress={() => setHint(true)} desc={t('mathOperations.common.getHint')} />
        : <MathExampleLayout onPress={() => setHint(false)}>
            <DefaultDigit title={MathSignsConstants.X} italic={true} />
            <DefaultDigit title={MathSignsConstants.EQUAL} italic={true} />
            <DefaultDigit title={secondNumber} italic={true} />
            <DefaultDigit title={checkRandomOperation as string} italic={true} />
            <DefaultDigit title={firstNumber} italic={true} />
          </MathExampleLayout>
        }

        <MathExampleLayout>
          <DefaultDigit title={MathSignsConstants.X} />
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
            onClick={handleSubmit(onSubmit)}
            name={t('mathOperations.common.check')}
          />
        </ButtonsLayout>
        
        <Score score={score} />
      </AppLayout>
    </>
  )
}
