import { useEffect, useState } from 'react'
import styles from './Logo.module.sass'
import { DotsLoader } from '../loaders/DotsLoader'

export const Logo = () => {
  const [firstDigit, setFirstDigit] = useState(0)
  const [secondDigit, setSecondDigit] = useState(0)
  const [answer, setAnswer] = useState<number | null>(null)
  const [toggleFlag, setToggleFlag] = useState(false)

  useEffect(() => {
    const generateRandomNumbers = () => {
      setFirstDigit(Math.floor(Math.random() * 21) + 1)
      setSecondDigit(Math.floor(Math.random() * 11) + 1)
      setAnswer(null)
    }
    generateRandomNumbers()
    const intervalId = setInterval(generateRandomNumbers, 4500)

    return () => clearInterval(intervalId)
  }, [toggleFlag])
 
  useEffect(() => {
    setTimeout(() => {
      setAnswer(firstDigit + secondDigit)
    }, 3000);
  }, [firstDigit, secondDigit])

  useEffect(() => {
    setTimeout(() => {
      setToggleFlag(!toggleFlag)
    }, 4500)
  }, [answer])

  return (
    <div className={styles.logo}>
      <div className={styles.logoWrapper}>
        {!toggleFlag && 
          <>
            <div className={styles.digitsWrapper}>
              <p className={styles.digit}>{firstDigit}</p>
              <p className={styles.digit}>+</p>
              <p className={styles.digit}>{secondDigit}</p>
            </div>
            <div className={styles.digitsWrapper}>
              <div className={styles.digit + ' ' + styles.equalsSign}>=</div>
              <div className={styles.digit + ' ' + styles.answer}>{answer ? answer : <DotsLoader />}</div>
            </div>
          </>
        }
        {toggleFlag && 
          <div className={styles.learnMathComWrapper}>
            <p className={styles.learn}>Learn</p>
            <p className={styles.mathCom}>-math</p>
            <p className={styles.mathCom}>.com</p>
          </div>
        }
      </div>
    </div>
  )
}
