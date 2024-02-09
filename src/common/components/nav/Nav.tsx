import { useTranslation } from "react-i18next"
import styles from './Nav.module.sass'
import { LogoSmall } from '../logo/LogoSmall'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { DefaultButton } from '../button/DefaultButton'

export const Nav = () => {
  const [active, setActive] = useState(false)
  const userEmail = localStorage.getItem('userEmail')
  const { t } = useTranslation()

  const onClick = () => {
    setActive(!active)
  }

  const menu = styles.menu
    + ' ' + (active && styles.active)

  return (
    <>
      <header className={styles.header}>
        <LogoSmall />
        <div className={styles.headerWithUser}>
          <Link to="/home/profile"
            onClick={() => setActive(false)}
          >
            <p className={styles.userEmail}>{userEmail && userEmail}</p> 
          </Link>

          <div className={menu} onClick={onClick}>
            <span className={styles.line}></span>
          </div>
        </div>
      </header>
      {active &&
        <div className={styles.navigation}>
          <ul className={styles.menuItems}>
            <li className={styles.item}>
              <Link 
                className={styles.itemLink}
                to="/home"
                onClick={() => setActive(false)}
              >
                {t('nav.items.home')}
              </Link>
            </li>
            <li className={styles.item}>
              <Link 
                className={styles.itemLink}
                to="/home/math-operations"
                onClick={() => setActive(false)}
              >
                {t('nav.items.mathOperations')}
              </Link>
            </li>
            <li className={styles.item}>
              <Link 
                className={styles.itemLink}
                to="/home/math-operations/docs"
                onClick={() => setActive(false)}
              >
                {t('nav.items.instructions')}
              </Link>
            </li>
            
            <div className={styles.footerDevideLine}></div>
            <li className={styles.item}>
              <Link 
                className={styles.itemLink} 
                to="/home/profile"
                onClick={() => setActive(false)}
              >
                {t('nav.items.profile')}
              </Link>
            </li>
            <li className={styles.item}>
              <Link 
                className={styles.itemLink} 
                to="/home/profile/your-score"
              >
                {t('nav.items.score')}
              </Link>
            </li> 
            <li className={styles.item}>
              <Link 
                className={styles.itemLink} 
                to="/logout"
                onClick={() => setActive(false)}
              >
                <DefaultButton type='button' name={t('buttons.logout')} />
              </Link>
            </li>
          </ul>
        </div>
      }
    </>
  )
}