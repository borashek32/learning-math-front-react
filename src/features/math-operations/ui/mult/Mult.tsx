import { useEffect, useState } from "react"
import { GoTo } from "../../../../common/components/goTo/GoTo"
import { Header } from "../../../../common/components/header/Header"
import { DefaultButton } from "../../../../common/components/button/DefaultButton"
import styles from './../../MathOperations.module.sass'
import { DefaultDigit } from "../../../../common/components/digits/DefaultDigit"
import { MathOperation } from "../../../../common/components/mathOpertion/mathOperation"
import { ResultInput } from "../../../../common/components/input/resultInput/ResultInput"
import { Score } from "../../../../common/components/score/Score"
import { Modal } from "../../../../common/components/modal/Modal"

export const Mult = () => {

  const [firstDigit, setFirstDigit] = useState<number | null>(null)
  const [secondDigit, setSecondDigit] = useState<number | null>(null)
  const [answer, setAnswer] = useState<string>('')
  const [open, setOpen] = useState(false)

  const onGenerateNewDigits = () => {
    setFirstDigit(Math.floor(Math.random() * 21) + 1)
    setSecondDigit(Math.floor(Math.random() * 11) + 1)
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
    if (firstDigit && secondDigit) {
      if (firstDigit * secondDigit === answerToNumber) {
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
    setFirstDigit(Math.floor(Math.random() * 21) + 1)
    setSecondDigit(Math.floor(Math.random() * 11) + 1)
  }

  const onPressTryAgain = () => {
    setWrong(false)
    setAnswer('')
  }

  useEffect(() => {
    setFirstDigit(Math.floor(Math.random() * 21) + 1)
    setSecondDigit(Math.floor(Math.random() * 11) + 1)
  }, [])

  return (
    <>
      <GoTo address='/home/math-operations' name='Back to list' />
      <Header title='Calculate Multiplication' />

      <div className={styles.containerMathOperation}>
        <DefaultDigit title={firstDigit} />
        <MathOperation title='*' />
        <DefaultDigit title={secondDigit} />
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