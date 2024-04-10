import { GoTo } from '../../../common/components/goTo/GoTo'
import { Header } from '../../../common/components/header/Header'
import styles from './../MathOperations.module.sass'
import { useTranslation } from 'react-i18next'
import { BlueButton } from '../../../common/components/buttons/BlueButton'
import { MathOperationsConstants } from '../../../common/constants/MathConstants'

export const MathOperations = () => {
  const { t } = useTranslation()
  const mathOperation: Array<string> = [MathOperationsConstants.SUMM, MathOperationsConstants.DIFF]

  return (
    <>
      <GoTo address='/home' name={t('links.back')} />
      <Header title={t('screens.math')}  />
    
      <ul className={styles.listItems}>
        <li className={styles.item}>
          <BlueButton 
            name={t('mathOperations.summ')} 
            type={'button'} 
            path={`/math-operations/${mathOperation[0]}`} 
          />
        </li>
        <li className={styles.item}>
          <BlueButton 
            name={t('mathOperations.diff')} 
            type={'button'} 
            path={`/math-operations/${mathOperation[1]}`} 
          />
        </li>
        <li className={styles.item}>
          <BlueButton 
            name={t('mathOperations.multiplication')} 
            type={'button'} 
            path={"/math-operations/multiplication"} 
          />
        </li>
        <li className={styles.item}>
          <BlueButton
            name={t('mathOperations.equations')}
            type={'button'}
            path={'/math-operations/equations'}
          />
        </li>
      </ul>
    </>
  )
}