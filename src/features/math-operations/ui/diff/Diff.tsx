import { useEffect, useState } from 'react'
import { GoTo } from '../../../../common/components/goTo/GoTo'
import { Header } from '../../../../common/components/header/Header'
import { Modal } from '../../../../common/components/modal/Modal'
import { Score } from '../../../../common/components/score/Score'
import { DefaultButton } from '../../../../common/components/button/DefaultButton'
import { ResultInput } from '../../../../common/components/input/resultInput/ResultInput'
import { MathOperation } from '../../../../common/components/mathOpertion/mathOperation'
import { DefaultDigit } from '../../../../common/components/digits/DefaultDigit'
import styles from './../../MathOperations.module.sass'

export const Diff = () => {

  const [firstDigit, setFirstDigit] = useState<number | null>(null)
  const [secondDigit, setSecondDigit] = useState<number | null>(null)
  const [answer, setAnswer] = useState<string>('')

  const generateNewDigits = () => {
    const firstDigit = Math.floor(Math.random() * 21) + 1
    setFirstDigit(firstDigit)
  
    const secondDigit = Math.floor(Math.random() * firstDigit) + 1
    setSecondDigit(secondDigit)
  }
  
  const onGenerateNewDigits = () => {
    generateNewDigits()
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
      if (firstDigit - secondDigit === answerToNumber) {
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
    generateNewDigits()
  }

  const onPressTryAgain = () => {
    setWrong(false)
    setAnswer('')
  }

  useEffect(() => {
    generateNewDigits()
  }, [])

  return (
    <>
      <GoTo address='/home/math-operations' name='Back to list' />
      <Header title='Calculate Summ' />

      <div className={styles.containerMathOperation}>
        <DefaultDigit title={firstDigit} />
        <MathOperation title='-' />
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
  );
}