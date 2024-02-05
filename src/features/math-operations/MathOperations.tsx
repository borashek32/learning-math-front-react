import { GoTo } from '../../common/components/goTo/GoTo'
import styles from './../../common/styles/App.module.sass'

export const MathOperations = () => {

  return (
    <>
      <GoTo address='/home' name='Back to Home' />

      <li className={styles.item}>
        <a className={styles.itemLink} href="/home/math-operations/summ">Calculate summ</a>
      </li>
      <li className={styles.item}>
        <a className={styles.itemLink} href="/home/math-operations/diff">Calculate difference</a>
      </li>
      <li className={styles.item}>
        <a className={styles.itemLink} href="/home/math-operations/docs">Instructions</a>
      </li>
    </>
  )
}