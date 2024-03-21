import { Link } from 'react-router-dom'
import styles from '../../../common/styles/App.module.sass'
import { useTranslation } from 'react-i18next'

export const Main = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'screens' })

  return (
    <>
      <Link to="/register" className={styles.labelClass}>{t('register')}</Link>
      <br />
      <Link to="/login" className={styles.labelClass}>{t('login')}</Link>
      <br />
      <Link to="/instructions" className={styles.labelClass}>{t('instructions')}</Link>
    </>
  )
}