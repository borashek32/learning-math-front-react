import { useTranslation } from "react-i18next"
import styles from './Nav.module.sass'
import { LogoSmall } from '../logo/LogoSmall'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { DefaultButton } from '../buttons/DefaultButton'
import { SelectLang } from "../selectLang/SelectLang"
import { useAppSelector } from "../../hooks/useAppSelector"
import { selectUserEmail, selectUserId } from "../../../features/auth/auth.selectors"
import { useDispatch } from "react-redux"
import { selectTotalUserScore } from "../../../features/profile/profile.selectors"
import { useGetTotalUserScoreQuery } from "../../../features/profile/profile.api"
import { setTotalUserScore } from "../../../features/profile/profile.slice"
import { PATHS } from "../../constants/paths"

export const Nav = () => {
  const [active, setActive] = useState(false)
  const userEmail = useAppSelector(selectUserEmail)

  const totalUserScore = useAppSelector(selectTotalUserScore)
  const dispatch = useDispatch()
  const userId = useAppSelector(selectUserId)
  const { data: userScoreData, isLoading } = useGetTotalUserScoreQuery(userId || '')
  console.log('userScoreData', userScoreData, 'selectjr', totalUserScore)

  useEffect(() => {
    userScoreData && dispatch(setTotalUserScore(userScoreData.score))
  }, [userScoreData, dispatch])
  
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
          <Link to="/home/profile"
            onClick={() => setActive(false)}
          >
            <p className={styles.userEmail}>{userEmail && userEmail}</p> 
            <p className={styles.titleScore}>{totalUserScore && totalUserScore} XP</p> 
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
            <li className={styles.item}>
              123<SelectLang />
            </li>
          </ul>
        </div>
      }
    </>
  )
}