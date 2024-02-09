import { useTranslation } from 'react-i18next'
import { DefaultButton } from '../../../common/components/button/DefaultButton'
import { Header } from '../../../common/components/header/Header'
import styles from './../../../common/styles/App.module.sass'
import { Link } from 'react-router-dom'

export const Home = () => {
  const userEmail = localStorage.getItem('userEmail')

  const { t } = useTranslation()
  
  return (
    <>
      <Header title={t('home.hello') + ', ' + userEmail} />
      
      <ul className={styles.listItems}>
        <li className={styles.item}>
          <Link className={styles.itemLink} to="/home/math-operations">{t('nav.items.mathOperations')}</Link>
        </li>
        <li className={styles.item}>
          <Link className={styles.itemLink} to="/home/profile">{t('nav.items.profile')}</Link>
        </li>
        <li className={styles.item}>
          <Link className={styles.itemLink} to="/logout">
            <DefaultButton type='button' name={t('buttons.logout')} />
          </Link>
        </li>
      </ul>
    </>
  )
}