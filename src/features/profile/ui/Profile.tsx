import { useSelector } from 'react-redux'
import styles from './../../../common/styles/App.module.sass'
import { selectUserEmail } from '../../auth/auth.selector'

export const Profile = () => {
  
  return (
    <>
      <h1 style={{color: 'white'}}>Profile</h1>

      <li className={styles.item}>
        <a className={styles.itemLink} href="/home/profile/change-password">Change password</a>
      </li>
    </>
  )
}