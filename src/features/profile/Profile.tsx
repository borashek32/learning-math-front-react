import { Link } from 'react-router-dom'
import styles from './../../common/styles/App.module.sass'
import { GoTo } from '../../common/components/goTo/GoTo'
import { Header } from '../../common/components/header/Header'
import { useTranslation } from 'react-i18next'
import { DefaultButton } from '../../common/components/button/DefaultButton'
import { useState } from 'react'

export const Profile = () => {
  const [active, setActive] = useState(false)
  const { t } = useTranslation()
  
  return (
    <>  
      <GoTo address="/home" name={t('links.back')} />
      <Header title={t('profile.title')} />

      <ul className={styles.listItems}> 
        <li>
          <Link className={styles.itemLink} to="/home/profile/change-email">
            {t('profile.changeEmail')}
          </Link>
        </li> 
        <li>
          <Link className={styles.itemLink} to="/home/profile/change-password">
            {t('profile.changePassword')}
          </Link>
        </li>
        <li>
          <Link className={styles.itemLink} to="/home/profile/your-score">
            {t('profile.yourScore')}
          </Link>
        </li> 

        <div className={styles.footerDevideLine}></div>

        <li className={styles.item}>
          <Link 
            className={styles.itemLink} 
            to="/logout"
            onClick={() => setActive(false)}
          >
            <DefaultButton type='button' name={t('buttons.logout')} />
          </Link>
        </li>
      </ul>
    </>
  )
}