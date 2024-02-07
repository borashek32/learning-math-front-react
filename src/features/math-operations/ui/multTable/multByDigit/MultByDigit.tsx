import { useEffect, useState } from 'react'
import styles from './../../../MathOperations.module.sass'
import { Modal } from '../../../../../common/components/modal/Modal'
import { Score } from '../../../../../common/components/score/Score'
import { DefaultButton } from '../../../../../common/components/button/DefaultButton'
import { ResultInput } from '../../../../../common/components/input/resultInput/ResultInput'
import { MathOperation } from '../../../../../common/components/mathOpertion/mathOperation'
import { DefaultDigit } from '../../../../../common/components/digits/DefaultDigit'
import { GoTo } from '../../../../../common/components/goTo/GoTo'
import { Header } from '../../../../../common/components/header/Header'
import { useParams } from 'react-router-dom'

export const MultByDigit = () => {
  const { digit } = useParams()

  const [firstDigit, setFirstDigit] = useState<number | null>(null)
  const [answer, setAnswer] = useState<string>('')

  const onGenerateNewDigits = () => {
    setFirstDigit(Math.floor(Math.random() * (9 - 2 + 1)) + 2)
    setAnswer('')
    setRight(false)
    setWrong(false)
  }

  const onChangeHandler = (answer: string) => {
    setAnswer(answer)
  }

  const [right, setRight] = useState(false)
  const [wrong, setWrong] = useState(false)
  const [score, setScore] = useState(0)

  const onCheck = () => {
    const answerToNumber = Number(answer)
    if (firstDigit) {
      if (firstDigit * Number(digit) === answerToNumber) {
        setRight(true)
        setScore(score + 1)
      } else {
        setWrong(true)
        setScore(score - 1)
      }
    }
  }

  const onPressPlayMore = () => {
    setRight(false)
    setAnswer('')
    setFirstDigit(Math.floor(Math.random() * (9 - 2 + 1)) + 2)
  }

  const onPressTryAgain = () => {
    setWrong(false)
    setAnswer('')
  }

  useEffect(() => {
    setFirstDigit(Math.floor(Math.random() * (9 - 2 + 1)) + 2)
  }, [])

  return (
    <>
      <GoTo address='/home/math-operations/multiplication-table' name='Back to list' />
      <Header title={`Multiplication by ${digit}`} />

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

      <DefaultButton 
        type='button'
        name='Generate new digits' 
        onClick={onGenerateNewDigits}
      />
      <DefaultButton 
        type='button'
        name='Check' 
        onClick={onCheck}
      />
      
      {right && 
        <Modal 
          text="You are right!"
          color="green"
          buttonName="Play more?"
          open={right}
          buttonCallback={onPressPlayMore}
          outlinedButton={true}
          buttonBack={false}
        />
      }
      {wrong && 
        <Modal 
          text="You are not right!"
          color="red"
          buttonName="Try again?"
          open={wrong}
          buttonCallback={onPressTryAgain}
          outlinedButton={true}
          buttonBack={false}
        />
      }
      
      <Score score={score} />
    </>
  )
}