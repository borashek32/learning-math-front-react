import { Link } from 'react-router-dom'
import styles from '../../../common/styles/App.module.sass'
import { useTranslation } from 'react-i18next'
import { AppText } from '../../../common/components/text/AppText'
import { PUBLIC_PATHS } from '../../../common/constants/paths/publicPaths'

export const Main = () => {
  const { t } = useTranslation('translation')

  return (
    <>
      <AppText desc={t('main.desc')}/>
      <br/>
      <Link to={PUBLIC_PATHS.REGISTER} className={styles.labelClass}>{t('screens.register')}</Link>
      <br />
      <Link to={PUBLIC_PATHS.LOGIN} className={styles.labelClass}>{t('screens.login')}</Link>
      <br />
      <Link to={PUBLIC_PATHS.MATH_EXAMPLES} className={styles.labelClass}>{t('screens.math')}</Link>
      <br />
      <Link to={PUBLIC_PATHS.INSTRUCTIONS} className={styles.labelClass}>{t('screens.instructions')}</Link>
      <br />
      <p className={styles.small}>Test user email: test-user@gmail.com</p>
      <p className={styles.small}>Test user password: test</p>
    </>
  )
}  
