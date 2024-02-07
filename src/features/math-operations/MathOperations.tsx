import { Link } from 'react-router-dom'
import { GoTo } from '../../common/components/goTo/GoTo'
import { Header } from '../../common/components/header/Header'
import styles from './../../common/styles/App.module.sass'

export const MathOperations = () => {

  return (
    <>
      <GoTo address='/home' name='Back to Home' />

      <Header title='Math operations' />
    
      <ul className={styles.listItems}>
        <li className={styles.item}>
          <Link className={styles.itemLink} to="/home/math-operations/summ">Summ</Link>
        </li>
        <li className={styles.item}>
          <Link className={styles.itemLink} to="/home/math-operations/diff">Difference</Link>
        </li>
        <li className={styles.item}>
          <Link className={styles.itemLink} to="/home/math-operations/mult">Multiplication</Link>
        </li>
        <li className={styles.item}>
          <Link className={styles.itemLink} to="/home/math-operations/multiplication-table">Multiplication table</Link>
        </li>
        <li className={styles.item}>
          <Link className={styles.itemLink} to="/home/math-operations/private-instructions">Instructions</Link>
        </li>
      </ul>
    </>
  )
}