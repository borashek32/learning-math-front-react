import { DefaultButton } from '../../../common/components/button/DefaultButton'
import { Header } from '../../../common/components/header/Header'
import styles from './../../../common/styles/App.module.sass'
import { Link } from 'react-router-dom'

export const Home = () => {
  const userEmail = localStorage.getItem('userEmail')
  
  return (
    <>
      <Header title={'Hello, ' + userEmail} />
      
      <ul className={styles.listItems}>
        <li className={styles.item}>
          <Link className={styles.itemLink} to="/home/math-operations">Math Operations</Link>
        </li>
        <li className={styles.item}>
          <Link className={styles.itemLink} to="/home/profile">Profile</Link>
        </li>
        <li className={styles.item}>
          <Link className={styles.itemLink} to="/logout">
            <DefaultButton type='button' name='Logout' />
          </Link>
        </li>
      </ul>
    </>
  )
}