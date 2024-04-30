import { useTranslation } from 'react-i18next'
import { DefaultButton } from '../../../common/components/buttons/DefaultButton'
import { Header } from '../../../common/components/header/Header'
import styles from './../../../common/styles/App.module.sass'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../../../common/hooks/useAppSelector/useAppSelector'
import { selectUserEmail } from '../../auth/auth.selectors'
import { DivideLine } from '../../../common/components/divideLine/DivideLine'
import { PRIVATE_PATHS } from '../../../common/constants/paths/privatePaths'

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
            to={PRIVATE_PATHS.MATH_EXAMPLES}
          >
            {t('screens.math')}
          </Link>
        </li>
        <li className={styles.item}>
          <Link 
            className={styles.labelClass} 
            to={PRIVATE_PATHS.SCHOOL_PROGRAM}
          >
              {t('screens.schoolProgram')}
          </Link>
        </li>
        <li className={styles.item}>
          <Link 
            className={styles.labelClass} 
            to={PRIVATE_PATHS.PRE_SCHOOL}
          >
              {t('screens.preSchool')}
          </Link>
        </li>

        <li className={styles.item}>
          <DivideLine />
        </li>
        
        <li className={styles.item}>
          <Link 
            className={styles.itemLink} 
            to={PRIVATE_PATHS.PROFILE}
          >
            {t('screens.profile')}
          </Link>
        </li>
        <li className={styles.item}>
          <Link 
            className={styles.itemLink} 
            to={PRIVATE_PATHS.LOGOUT}
          >
            <DefaultButton type='button' name={t('buttons.logout')} />
          </Link>
        </li>
      </ul>
    </>
  )
}