import { useTranslation } from "react-i18next"
import { GoTo } from "../../../../common/components/goTo/GoTo"
import { Header } from "../../../../common/components/header/Header"
import { Loader } from "../../../../common/components/loaders/CircularLoader"
import { useDispatch } from "react-redux"
import { useUpdateScoreMutation } from "../../../profile/profile.api"
import { useFormSchema } from "../../../../common/utils/math/validationShemaMathOperations"
import { Modal } from "../../../../common/components/modal/Modal"
import { useState } from "react"
import { AnswerType } from "../../../math-examples/MathOperations.types"
import { MathExampleLayout } from "../../../../common/components/layouts/MathExamlpeLayout"
import { ResultInput } from "../../../../common/components/input/resultInput/ResultInput"
import { ButtonsLayout } from "../../../../common/components/layouts/ButtonsLayout"
import { MathOperationButton } from "../../../../common/components/buttons/MathOperationButton"
import { Score } from "../../../../common/components/score/Score"
import { generateRandomNumber } from "../../../../common/utils/math/generateRandomNumber"
import cat from './../../../../common/assets/icons/cat.svg'
import { MathOperation } from "../../../../common/components/mathOpertion/mathOperation"
import { MathSignsConstants } from "../../../../common/constants/MathConstants"
import { ImgLayout } from "../../../../common/components/layouts/ImgLayout"

export const Numbers = () => {
  const [score, setScore] = useState(0)

  const [number, setNumber] = useState((generateRandomNumber(1, 10)))
  const [answer, setAnswer] = useState<string>('')
  const [rightWrong, setRightWrong] = useState<AnswerType>(null)
  const [serverError, setServerError] = useState('')
  const [open, setOpen] = useState(false)

  const dispatch = useDispatch()
  const [updateScore, { isLoading }] = useUpdateScoreMutation()
  const formSchema = useFormSchema()

  const { t } = useTranslation()

  const numbers: Array<number> = [];
  for (let i = 1; i <= number; i++) {
    numbers.push(i)
  }
  
  const onGenerateNewNumbers = () => {
    setAnswer('')
    setOpen(false)
    setNumber(generateRandomNumber(1, 10))
  }

  const onChangeHandler = (answer: string) => {
    setAnswer(answer)
  }

  const check = () => {
    setOpen(true)
    if (number === Number(answer)) {
      setRightWrong('right')
      setScore(score + 1)
    } else {
      setRightWrong('wrong')
      setScore(score - 1)
    }
  }

  const onPressPlayMore = () => {
    setOpen(false)
    onGenerateNewNumbers()
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
      {/* <GoTo address='/home' name={t('links.back')} /> */}
      <GoTo address='/home/pre-school' name={t('links.back')} />
      <Header title={t('preSchool.numbers')}  />
    
      <MathExampleLayout>
        <ImgLayout>
          {numbers && numbers.map((item: number) => {
            return <img key={item} src={cat} alt={'cat'} width={60} />
          })}
        </ImgLayout>

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
          // onClick={handleSubmit(onSubmit)}
          onClick={check}
          name={t('mathOperations.common.check')}
        />
      </ButtonsLayout>

      <Score score={score} />
    </>
  )
}