import { GoTo } from '../../../common/components/goTo/GoTo'
import { Header } from '../../../common/components/header/Header'
import styles from './../MathExamples.module.sass'
import { useTranslation } from 'react-i18next'
import { BlueButton } from '../../../common/components/buttons/BlueButton'
import { PRIVATE_PATHS } from '../../../common/constants/paths/privatePaths'
import { useAppSelector } from '../../../common/hooks/useAppSelector/useAppSelector'
import { selectIsLoggedIn } from '../../auth/auth.selectors'
import { PUBLIC_PATHS } from '../../../common/constants/paths/publicPaths'

export const MathExamples = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn)

  const { t } = useTranslation()
  
  return (
    <>
      <GoTo address={PRIVATE_PATHS.HOME} name={t('links.back')} />
      <Header title={t('screens.math')}  />
    
      <ul className={styles.listItems}>
        <li className={styles.item}>
          <BlueButton 
            name={t('mathOperations.sum')} 
            type={'button'} 
            path={isLoggedIn ? `${PRIVATE_PATHS.MATH_EXAMPLES}/sum` : `${PUBLIC_PATHS.MATH_EXAMPLES}/sum`}
          />
        </li>
        <li className={styles.item}>
          <BlueButton 
            name={t('mathOperations.diff')} 
            type={'button'} 
            path={isLoggedIn ? `${PRIVATE_PATHS.MATH_EXAMPLES}/difference` : `${PUBLIC_PATHS.MATH_EXAMPLES}/difference`} 
          />
        </li>
        <li className={styles.item}>
          <BlueButton 
            name={t('mathOperations.multiplication')} 
            type={'button'} 
            path={isLoggedIn ? PRIVATE_PATHS.MULTIPLICATION : PUBLIC_PATHS.MULTIPLICATION}
          />
        </li>
        <li className={styles.item}>
          <BlueButton
            name={t('mathOperations.equations')}
            type={'button'}
            path={isLoggedIn ? PRIVATE_PATHS.EQUATIONS : PUBLIC_PATHS.EQUATIONS}
          />
        </li>
      </ul>
    </>
  )
}