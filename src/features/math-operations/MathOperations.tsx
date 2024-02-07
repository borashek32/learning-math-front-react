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
          <Link className={styles.itemLink} to="/home/math-operations/summ">Calculate summ</Link>
        </li>
        <li className={styles.item}>
          <Link className={styles.itemLink} to="/home/math-operations/diff">Calculate difference</Link>
        </li>
        <li className={styles.item}>
          <Link className={styles.itemLink} to="/home/math-operations/private-instructions">Instructions</Link>
        </li>
      </ul>
    </>
  )
}