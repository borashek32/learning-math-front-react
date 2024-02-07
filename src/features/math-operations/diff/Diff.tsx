import React, { useEffect, useState } from 'react'
import { GoTo } from '../../../common/components/goTo/GoTo'
import { Header } from '../../../common/components/header/Header'

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
      <Header title='Calculate Difference' />
    </>
  );
}