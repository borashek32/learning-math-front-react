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
import { DevideLine } from "../devideLine/DevideLine"
import { MathOperationsConstants } from "../../constants/MathConstants"
import { SelectLang } from "../selectLang/SelectLang"

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
          {userEmail &&
            <Link to="/home/profile"
              onClick={() => setActive(false)}
            >
              <p className={styles.userEmail}>{userEmail}</p> 
              <div className={styles.yourScore}>
                <p className={styles.scoreText}>{t('yourScore.total')}</p>
                <p className={styles.titleScore}>{totalUserScore && totalUserScore} XP</p>
              </div> 
            </Link>}

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
                {t('screens.home')}
              </Link>
            </li>
            <li className={styles.item}>
              <DevideLine />
            </li>
            <li className={styles.item}>
              <Link 
                className={styles.itemLink}
                to="/math-operations"
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
                    to='/math-operations/+'
                    onClick={() => setActive(false)}
                  >
                    {t('mathOperations.summ')}
                  </Link>
                </li>
                <li className={styles.subMenuItem}>
                  <Link 
                    className={styles.subMenuItemLink}
                    to='/math-operations/-'
                    onClick={() => setActive(false)}
                  >
                    {t('mathOperations.diff')}
                  </Link>
                </li>
                <li className={styles.subMenuItem}>
                  <Link 
                    className={styles.subMenuItemLink}
                    to="/math-operations/multiplication"
                    onClick={() => setActive(false)}
                  >
                    {t('mathOperations.multiplication')}
                  </Link>
                </li>
                <li className={styles.subMenuItem}>
                  <Link 
                    className={styles.subMenuItemLink}
                    to="/math-operations/equations"
                    onClick={() => setActive(false)}
                  >
                    {t('mathOperations.equations')}
                  </Link>
                </li>
              </ul>
            </li>
            <li className={styles.item}>
              <DevideLine />
            </li>
            {userEmail && 
              <>
                <li className={styles.item}>
                  <Link 
                    className={styles.itemLink}
                    to="/home/pre-school"
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
                        to='/home/pre-school/numbers'
                        onClick={() => setActive(false)}
                      >
                        {t('preSchool.numbers.title')}
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className={styles.item}>
                  <DevideLine />
                </li>
                <li className={styles.item}>
                  <Link 
                    className={styles.itemLink}
                    to="/home/school-program"
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
                        to="/home/school-program/first-grade"
                        onClick={() => setActive(false)}
                      >
                        {t('schoolProgram.firstGrade')}
                      </Link>
                    </li>
                    <li className={styles.subMenuItem}>
                      <Link 
                        className={styles.subMenuItemLink}
                        to="/home/school-program/second-grade"
                        onClick={() => setActive(false)}
                      >
                        {t('schoolProgram.secondGrade')}
                      </Link>
                    </li>
                    <li className={styles.subMenuItem}>
                      <Link 
                        className={styles.subMenuItemLink}
                        to="/home/school-program/third-grade"
                        onClick={() => setActive(false)}
                          >
                            {t('schoolProgram.thirdGrade')}
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className={styles.item}>
                  <DevideLine />
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
                </li>
              </>
            }
            <li className={styles.item}>
              <Link 
                className={styles.itemLink}
                to="/instructions"
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