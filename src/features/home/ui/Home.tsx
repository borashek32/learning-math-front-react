import { useTranslation } from 'react-i18next'
import { DefaultButton } from '../../../common/components/buttons/DefaultButton'
import { Header } from '../../../common/components/header/Header'
import styles from './../../../common/styles/App.module.sass'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../../../common/hooks/useAppSelector'
import { selectUserEmail } from '../../auth/auth.selectors'
import { DevideLine } from '../../../common/components/devideLine/DevideLine'

export const Home = () => {
  const userEmail = useAppSelector(selectUserEmail)

  const { t } = useTranslation()
  
  return (
    <>
      <Header title={t('home.hello') + ', ' + userEmail} />
      
      <ul className={styles.listItems}>
        <li className={styles.item}>
          <Link 
            className={styles.itemLink} 
            to="/math-operations"
          >
            {t('screens.math')}
          </Link>
        </li>
        <li>
          <Link 
            className={styles.labelClass} 
            to="/home/school-program"
          >
              {t('screens.schoolProgram')}
          </Link>
        </li>
        <li>
          <Link 
            className={styles.labelClass} 
            to="/home/pre-school"
          >
              {t('screens.preSchool')}
          </Link>
        </li>

        <DevideLine />
        
        <li className={styles.item}>
          <Link 
            className={styles.itemLink} 
            to="/home/profile"
          >
            {t('screens.profile')}
          </Link>
        </li>
        <li className={styles.item}>
          <Link 
            className={styles.itemLink} 
            to="/logout"
          >
            <DefaultButton type='button' name={t('buttons.logout')} />
          </Link>
        </li>
      </ul>
    </>
  )
}