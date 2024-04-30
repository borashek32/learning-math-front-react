import { useTranslation } from "react-i18next"
import styles from './Nav.module.sass'
import { LogoSmall } from '../logo/LogoSmall'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { DefaultButton } from '../buttons/DefaultButton'
import { useAppSelector } from "../../hooks/useAppSelector/useAppSelector"
import { selectUserEmail } from "../../../features/auth/auth.selectors"
import { selectTotalUserScore } from "../../../features/profile/profile.selectors"
import { DivideLine } from "../divideLine/DivideLine"
import { SelectLang } from "../selectLang/SelectLang"
import { PRIVATE_PATHS } from "../../constants/paths/privatePaths"

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
        <LogoSmall />
        <div className={styles.headerWithUser}>
          {userEmail &&
            <Link to={PRIVATE_PATHS.PROFILE}
              onClick={() => setActive(false)}
            >
              <p className={styles.userEmail}>{userEmail}</p> 
              <div className={styles.yourScore}>
                <p className={styles.scoreText}>{t('yourScore.total')}</p>
                <p className={styles.titleScore}>{totalUserScore && totalUserScore} XP</p>
              </div> 
            </Link>
          }

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
                to={PRIVATE_PATHS.HOME}
                onClick={() => setActive(false)}
              >
                {t('screens.home')}
              </Link>
            </li>
            <li className={styles.item}>
              <DivideLine />
            </li>
            <li className={styles.item}>
              <Link 
                className={styles.itemLink}
                to={PRIVATE_PATHS.MATH_EXAMPLES}
                onClick={() => setActive(false)}
              >
                {t('screens.math')}
              </Link>
            </li>
            <li>
              <ul className={styles.subMenu}>
                <li className={styles.subMenuItem}>
                  <Link 
                    className={styles.subMenuItemLink}
                    to={`${PRIVATE_PATHS.MATH_EXAMPLES}/sum`}
                    onClick={() => setActive(false)}
                  >
                    {t('mathOperations.sum')}
                  </Link>
                </li>
                <li className={styles.subMenuItem}>
                  <Link 
                    className={styles.subMenuItemLink}
                    to={`${PRIVATE_PATHS.MATH_EXAMPLES}/difference`}
                    onClick={() => setActive(false)}
                  >
                    {t('mathOperations.diff')}
                  </Link>
                </li>
                <li className={styles.subMenuItem}>
                  <Link 
                    className={styles.subMenuItemLink}
                    to={PRIVATE_PATHS.MULTIPLICATION}
                    onClick={() => setActive(false)}
                  >
                    {t('mathOperations.multiplication')}
                  </Link>
                </li>
                <li className={styles.subMenuItem}>
                  <Link 
                    className={styles.subMenuItemLink}
                    to={PRIVATE_PATHS.EQUATIONS}
                    onClick={() => setActive(false)}
                  >
                    {t('mathOperations.equations')}
                  </Link>
                </li>
              </ul>
            </li>
            <li className={styles.item}>
              <DivideLine />
            </li>
            <li className={styles.item}>
              <Link 
                className={styles.itemLink}
                to={PRIVATE_PATHS.PRE_SCHOOL}
                onClick={() => setActive(false)}
              >
                {t('screens.preSchool')}
              </Link>
            </li>
            <li>
              <ul className={styles.subMenu}>
                <li className={styles.subMenuItem}>
                  <Link 
                    className={styles.subMenuItemLink}
                    to={PRIVATE_PATHS.NUMBERS}
                    onClick={() => setActive(false)}
                  >
                    {t('preSchool.numbers.title')}
                  </Link>
                </li>
              </ul>
            </li>
            <li className={styles.item}>
              <DivideLine />
            </li>
            <li className={styles.item}>
              <Link 
                className={styles.itemLink}
                to={PRIVATE_PATHS.SCHOOL_PROGRAM}
                onClick={() => setActive(false)}
              >
                {t('screens.schoolProgram')}
              </Link>
            </li>
            <li>
              <ul className={styles.subMenu}>
                <li className={styles.subMenuItem}>
                  <Link 
                    className={styles.subMenuItemLink}
                    to={PRIVATE_PATHS.FIRST_GRADE}
                    onClick={() => setActive(false)}
                  >
                    {t('schoolProgram.firstGrade')}
                  </Link>
                </li>
                <li className={styles.subMenuItem}>
                  <Link 
                    className={styles.subMenuItemLink}
                    to={PRIVATE_PATHS.SECOND_GRADE}
                    onClick={() => setActive(false)}
                  >
                    {t('schoolProgram.secondGrade')}
                  </Link>
                </li>
                <li className={styles.subMenuItem}>
                  <Link 
                    className={styles.subMenuItemLink}
                    to={PRIVATE_PATHS.THIRD_GRADE}
                    onClick={() => setActive(false)}
                      >
                        {t('schoolProgram.thirdGrade')}
                  </Link>
                </li>
              </ul>
            </li>
            <li className={styles.item}>
              <DivideLine />
            </li>
            <li className={styles.item}>
              <Link 
                className={styles.itemLink} 
                to={PRIVATE_PATHS.PROFILE}
                onClick={() => setActive(false)}
              >
                {t('screens.profile')}
              </Link>
            </li>
            <li className={styles.item}>
              <Link 
                className={styles.itemLink} 
                to={PRIVATE_PATHS.LOGOUT}
                onClick={() => setActive(false)}
              >
                <DefaultButton type='button' name={t('buttons.logout')} />
              </Link>
            </li>
            <li className={styles.item}>
              <DivideLine />
            </li>
            <li className={styles.item}>
              <Link 
                className={styles.itemLink}
                to={PRIVATE_PATHS.INSTRUCTIONS}
                onClick={() => setActive(false)}
              >
                {t('screens.instructions')}
              </Link>
            </li>
            <li className={styles.item}>
              <SelectLang />  
            </li> 
          </ul>
        </div>
      }
    </>
  )
}