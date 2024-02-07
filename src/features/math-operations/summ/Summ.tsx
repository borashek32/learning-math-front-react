import { useEffect, useState } from "react"
import { GoTo } from "../../../common/components/goTo/GoTo"
import { Header } from "../../../common/components/header/Header"

export const Summ = () => {

  const [firstDigit, setFirstDigit] = useState<number | null>(null)
  const [secondDigit, setSecondDigit] = useState<number | null>(null)
  const [answer, setAnswer] = useState<string>('')

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
      if (firstDigit + secondDigit === answerToNumber) {
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
      <Header title='Calculate Summ' />
    </>
  )
}