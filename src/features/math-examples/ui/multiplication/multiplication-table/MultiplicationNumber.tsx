import { useEffect, useState } from 'react'
import styles from './../../../MathOperations.module.sass'
import { ResultInput } from '../../../../../common/components/input/resultInput/ResultInput'
import { MathOperation } from '../../../../../common/components/mathOpertion/mathOperation'
import { DefaultDigit } from '../../../../../common/components/digits/DefaultDigit'
import { GoTo } from '../../../../../common/components/goTo/GoTo'
import { Header } from '../../../../../common/components/header/Header'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { MathOperationsFooter } from '../../mathOperationsFooter/MathOperationsFooter'
import { setTotalUserScore } from '../../../../profile/profile.slice'
import { AnswerType } from '../../../MathOperations.types'
import { useDispatch } from 'react-redux'
import { useFormSchema } from '../../../../../common/utils/math/validationShemaMathOperations'
import { useUpdateScoreMutation } from '../../../../profile/profile.api'
import { Resolver, SubmitHandler, useForm } from 'react-hook-form'
import { ScoreType } from '../../../../profile/profile.api.types'
import { useAppSelector } from '../../../../../common/hooks/useAppSelector'
import { selectUserId } from '../../../../auth/auth.selectors'
import { yupResolver } from '@hookform/resolvers/yup'
import { ButtonsLayout } from '../../../../../common/components/layouts/ButtonsLayout'
import { MathOperationButton } from '../../../../../common/components/buttons/MathOperationButton'
import { Loader } from '../../../../../common/components/loaders/CircularLoader'
import { Modal } from '../../../../../common/components/modal/Modal'
import { generateRandomNumber } from '../../../../../common/utils/math/generateRandomNumber'
import { Score } from '../../../../../common/components/score/Score'

export const MultiplicationNumber = () => {
  const { digit } = useParams()
  const [firstDigit, setFirstDigit] = useState<number>(generateRandomNumber(1, 10))
  const [score, setScore] = useState(0)
  const [serverError, setServerError] = useState('')
  const [answer, setAnswer] = useState('')
  const [rightWrong, setRightWrong] = useState<AnswerType>(1)
  const [open, setOpen] = useState(false)
  const dispatch = useDispatch()

  const [updateScore, { isLoading }] = useUpdateScoreMutation()
  const { t } = useTranslation('translation')
  const formSchema = useFormSchema()

  const generateNewDigits = () => {
    setFirstDigit(Math.floor(Math.random() * (9 - 2 + 1)) + 2)
  }

  const onGenerateNewNumbers = () => {
    setAnswer('')
    setOpen(false)
    generateNewDigits()
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

  // const onSubmit: SubmitHandler<ScoreType> = (data: ScoreType) => {
  //   setServerError('')
  //   const answerToNumber = Number(answer)

  //   if (Number(digit) * firstDigit === answerToNumber) {
  //     setScore(score + 1)
  //     setRightWrong('right')
  //     data = { ...data, score: 1 }
  //   }
  //   else {
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
    const answerToNumber = Number(answer)
    setOpen(true)
    if (Number(digit) * firstDigit === answerToNumber) {
      setScore(score + 1)
      setRightWrong(1)
    }
    else {
      setScore(score - 1)
      setRightWrong(-1)
    }
  }

  const onPressPlayMore = () => {
    setOpen(false)
    setAnswer('')
    setFirstDigit(Math.floor(Math.random() * (9 - 2 + 1)) + 2)
  }

  const onPressTryAgain = () => {
    setOpen(false)
    setAnswer('')
  }

  useEffect(() => {
    setFirstDigit(Math.floor(Math.random() * (9 - 2 + 1)) + 2)
  }, [])

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
        />
      )}
      
      <GoTo address='/home/math-operations/multiplication' name={t('links.back')} />
      <Header title={t('mathOperations.multBy') + ' ' + digit} />

      <div className={styles.containerMathOperation}>
        <DefaultDigit title={firstDigit} />
        <MathOperation title='*' />
        <DefaultDigit title={Number(digit)} />
        <MathOperation title='=' />

        <ResultInput
          value={answer} 
          onChange={onChangeHandler}
        />
      </div>

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