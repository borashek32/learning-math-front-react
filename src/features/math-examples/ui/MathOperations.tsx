import { GoTo } from '../../../common/components/goTo/GoTo'
import { Header } from '../../../common/components/header/Header'
import styles from './../MathOperations.module.sass'
import { useTranslation } from 'react-i18next'
import { BlueButton } from '../../../common/components/buttons/BlueButton'
import { MathOperationsConstants } from '../../../common/constants/MathConstants'
import { useAppSelector } from '../../../common/hooks/useAppSelector/useAppSelector'
import { selectIsLoggedIn } from '../../auth/auth.selectors'

export const MathOperations = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  const mathOperation: Array<string> = [MathOperationsConstants.SUM, MathOperationsConstants.DIFF]

  const { t } = useTranslation()

  return (
    <>
      <GoTo address='/home' name={t('links.back')} />
      <Header title={t('screens.math')}  />
    
      <ul className={styles.listItems}>
        <li className={styles.item}>
          <BlueButton 
            name={t('mathOperations.sum')} 
            type={'button'} 
            path={isLoggedIn ? `/home/math-operations/${mathOperation[0]}` : `/math-operations/${mathOperation[0]}`} 
          />
        </li>
        <li className={styles.item}>
          <BlueButton 
            name={t('mathOperations.diff')} 
            type={'button'} 
            path={isLoggedIn ? `/home/math-operations/${mathOperation[1]}` : `/math-operations/${mathOperation[1]}`} 
          />
        </li>
        <li className={styles.item}>
          <BlueButton 
            name={t('mathOperations.multiplication')} 
            type={'button'} 
            path={isLoggedIn ? '/home/math-operations/multiplication' : '/math-operations/multiplication'} 
          />
        </li>
        <li className={styles.item}>
          <BlueButton
            name={t('mathOperations.equations')}
            type={'button'}
            path={isLoggedIn ? '/home/math-operations/equations' : '/math-operations/equations'}
          />
        </li>
      </ul>
    </>
  )
}