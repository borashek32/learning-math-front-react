import { useSelector } from 'react-redux'
import styles from './../../../common/styles/App.module.sass'
import { selectUserEmail } from '../../auth/auth.selector'

export const Home = () => {
  const userEmail = useSelector(selectUserEmail)
  
  return (
    <>
      <h3 style={{color: 'white'}}>Hello, {userEmail}</h3>
      

      <li className={styles.item}>
        <a className={styles.itemLink} href="/home/math-operations">Math Operations</a>
      </li>
      
      <div className={styles.footerDevideLine}></div>
      <li className={styles.item}>
        <a className={styles.itemLink} href="/home/profile">Profile</a>
      </li>
      <li className={styles.item}>
        <a className={styles.itemLink} href="/logout">Logout</a>
      </li>
    </>
  )
}