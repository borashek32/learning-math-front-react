import { Link } from 'react-router-dom'
import { GoTo } from '../../common/components/goTo/GoTo'
import { Header } from '../../common/components/header/Header'
import styles from './../../common/styles/App.module.sass'
import { useTranslation } from 'react-i18next'

export const MathOperations = () => {

  const { t } = useTranslation()

  return (
    <>
      <GoTo address='/home' name={t('links.back')} />
      <Header title={t('mathOperations.title')}  />
    
      <ul className={styles.listItems}>
        <li className={styles.item}>
          <Link className={styles.itemLink} to="/home/math-operations/summ">
            {t('mathOperations.summ')}
          </Link>
        </li>
        <li className={styles.item}>
          <Link className={styles.itemLink} to="/home/math-operations/diff">
            {t('mathOperations.diff')}  
          </Link>
        </li>
        <li className={styles.item}>
          <Link className={styles.itemLink} to="/home/math-operations/mult">
            {t('mathOperations.multiplication')}  
          </Link>
        </li>
        <li className={styles.item}>
          <Link className={styles.itemLink} to="/home/math-operations/multiplication-table">
            {t('mathOperations.multTable')} 
          </Link>
        </li>
      </ul>
    </>
  )
}