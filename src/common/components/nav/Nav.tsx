import { useTranslation } from "react-i18next"
import styles from './Nav.module.sass'
import { LogoSmall } from '../logo/LogoSmall'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { DefaultButton } from '../buttons/DefaultButton'
import { useAppSelector } from "../../hooks/useAppSelector"
import { selectUserEmail } from "../../../features/auth/auth.selectors"
import { PATHS } from "../../constants/paths"
import { selectTotalUserScore } from "../../../features/profile/profile.selectors"

export const Nav = () => {
  const [active, setActive] = useState(false)
  const userEmail = useAppSelector(selectUserEmail)
  const totalUserScore = useAppSelector(selectTotalUserScore)

  const { t } = useTranslation()

  const onClick = () => {
    setActive(!active)
  }

  const menu = styles.menu
    + ' ' + (active && styles.active)

  return (
    <>
      <header className={styles.header}>
        <LogoSmall path={PATHS.HOME} />
        <div className={styles.headerWithUser}>
          {/* <Link to="/home/profile"
            onClick={() => setActive(false)}
          >
            <p className={styles.userEmail}>{userEmail && userEmail}</p> 
            <div className={styles.yourScore}>
              <p className={styles.scoreText}>{t('yourScore.total')}</p>
              <p className={styles.titleScore}>{totalUserScore && totalUserScore} XP</p>
            </div> 
          </Link> */}

          <div className={menu} onClick={onClick}>
            <span className={styles.line}></span>
          </div>
        </div>
      </header>
      {active &&
        <div className={styles.navigation}>
          <ul className={styles.menuItems}>
            {/* <li className={styles.item}>
              <Link 
                className={styles.itemLink}
                to="/home"
                onClick={() => setActive(false)}
              >
                {t('screens.home')}
              </Link>
            </li> */}
            <li className={styles.item}>
              <Link 
                className={styles.itemLink}
                to="/home/math-operations"
                onClick={() => setActive(false)}
              >
                {t('screens.math')}
              </Link>
            </li>
            <li className={styles.item}>
              <Link 
                className={styles.itemLink}
                to="/home/math-operations/summ"
                onClick={() => setActive(false)}
              >
                {t('mathOperations.summ')}
              </Link>
            </li>
            <li className={styles.item}>
              <Link 
                className={styles.itemLink}
                to="/home/math-operations/diff"
                onClick={() => setActive(false)}
              >
                {t('mathOperations.diff')}
              </Link>
            </li>
            <li className={styles.item}>
              <Link 
                className={styles.itemLink}
                to="/home/math-operations/multiplication"
                onClick={() => setActive(false)}
              >
                {t('mathOperations.multiplication')}
              </Link>
            </li>
            <li className={styles.item}>
              <Link 
                className={styles.itemLink}
                to="/home/math-operations/equations"
                onClick={() => setActive(false)}
              >
                {t('mathOperations.equations')}
              </Link>
            </li>
            
            <div className={styles.footerDevideLine}></div>
            {/* <li className={styles.item}>
              <Link 
                className={styles.itemLink} 
                to="/home/profile/your-score"
                onClick={() => setActive(false)}
              >
                {t('screens.yourScore')}
              </Link>
            </li> 
            <li className={styles.item}>
              <Link 
                className={styles.itemLink} 
                to="/home/profile"
                onClick={() => setActive(false)}
              >
                {t('screens.profile')}
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
            </li> */}
          </ul>
        </div>
      }
    </>
  )
}