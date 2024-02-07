import styles from './../../../common/styles/App.module.sass'
import { Link } from 'react-router-dom'

export const Home = () => {
  const userEmail = localStorage.getItem('userEmail')
  
  return (
    <>
      <h3 style={{color: 'white'}}>Hello, {userEmail}</h3>
      

      <li className={styles.item}>
        <Link className={styles.itemLink} to="/home/math-operations">Math Operations</Link>
      </li>
      
      <div className={styles.footerDevideLine}></div>
      <li className={styles.item}>
        <Link className={styles.itemLink} to="/home/profile">Profile</Link>
      </li>
      <li className={styles.item}>
        <Link className={styles.itemLink} to="/logout">Logout</Link>
      </li>
    </>
  )
}