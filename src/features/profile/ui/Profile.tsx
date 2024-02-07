import { Link } from 'react-router-dom'
import styles from './../../../common/styles/App.module.sass'
import { GoTo } from '../../../common/components/goTo/GoTo'
import { Header } from '../../../common/components/header/Header'

export const Profile = () => {
  
  return (
    <>  
      <GoTo address="/home" name="Back to Home" />

      <Header title={'Profile'} />

      <ul>
        <li className={styles.listItems}>
          <Link className={styles.itemLink} to="/home/profile/change-password">Change password</Link>
        </li> 
      </ul>
    </>
  )
}