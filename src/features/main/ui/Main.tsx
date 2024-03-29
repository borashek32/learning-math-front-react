import { Link } from 'react-router-dom'
import styles from '../../../common/styles/App.module.sass'
import { useTranslation } from 'react-i18next'
import { AppText } from '../../../common/components/text/AppText'

export const Main = () => {
  const { t } = useTranslation('translation')

  return (
    <>
      {/* <Link to="/register" className={styles.labelClass}>{t('register')}</Link>
      <br />
      <Link to="/login" className={styles.labelClass}>{t('login')}</Link>
      <br /> */}
      <AppText desc={t('main.desc')}/>
      <br />
      <Link className={styles.labelClass} to="/home/math-operations">{t('screens.math')}</Link>
      <br />
      <Link to="/instructions" className={styles.labelClass}>{t('screens.instructions')}</Link>
    </>
  )
}