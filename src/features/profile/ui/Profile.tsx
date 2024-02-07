import { Link } from 'react-router-dom'
import styles from './../../../common/styles/App.module.sass'

export const Profile = () => {
  
  return (
    <>
      <h1 style={{color: 'white'}}>Profile</h1>

      <li className={styles.item}>
        <Link className={styles.itemLink} to="/home/profile/change-password">Change password</Link>
      </li>
    </>
  )
}