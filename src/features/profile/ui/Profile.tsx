import { Link } from 'react-router-dom'
import styles from './../../../common/styles/App.module.sass'
import { GoTo } from '../../../common/components/goTo/GoTo'
import { Header } from '../../../common/components/header/Header'
import { useTranslation } from 'react-i18next'
import { DefaultButton } from '../../../common/components/buttons/DefaultButton'
import { useState } from 'react'
import { DivideLine } from '../../../common/components/divideLine/DivideLine'

export const Profile = () => {
  const [active, setActive] = useState(false)
  const { t } = useTranslation()
  
  return (
    <>  
      <GoTo address="/home" name={t('links.back')} />
      <Header title={t('screens.profile')} />

      <ul className={styles.listItems}> 
        <li>
          <Link className={styles.itemLink} to="/home/profile/your-score">
            {t('screens.yourScore')}
          </Link>
        </li> 

        <DivideLine />

        <li>
          <Link className={styles.itemLink} to="/home/profile/choose-avatar">
            {t('screens.changeAvatar')}
          </Link>
        </li> 
        {/* <li>
          <Link className={styles.itemLink} to="/home/profile/change-email">
            {t('screens.changeEmail')}
          </Link>
        </li> 
        <li>
          <Link className={styles.itemLink} to="/home/profile/change-password">
            {t('screens.changePassword')}
          </Link>
        </li> */}
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