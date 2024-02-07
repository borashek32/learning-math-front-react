import { Props } from './Nav.types'
import styles from './Nav.module.sass'
import { LogoSmall } from '../logo/LogoSmall'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { DefaultButton } from '../button/DefaultButton'

export const Nav = () => {
  const [active, setActive] = useState(false)
  const userEmail = localStorage.getItem('userEmail')

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
                Home
              </Link>
            </li>
            <li className={styles.item}>
              <Link 
                className={styles.itemLink}
                to="/home/math-operations/summ"
                onClick={() => setActive(false)}
              >
                Calculate summ
              </Link>
            </li>
            <li className={styles.item}>
              <Link 
                className={styles.itemLink}
                to="/home/math-operations/diff"
                onClick={() => setActive(false)}
              >
                Calculate difference
              </Link>
            </li>
            <li className={styles.item}>
              <Link 
                className={styles.itemLink}
                to="/home/math-operations/docs"
                onClick={() => setActive(false)}
              >
                Instructions
              </Link>
            </li>
            
            <div className={styles.footerDevideLine}></div>
            <li className={styles.item}>
              <Link 
                className={styles.itemLink} 
                to="/home/profile"
                onClick={() => setActive(false)}
              >
                Profile
              </Link>
            </li>
            <li className={styles.item}>
              <Link 
                className={styles.itemLink} 
                to="/logout"
                onClick={() => setActive(false)}
              >
                <DefaultButton type='button' name='Logout' />
              </Link>
            </li>
          </ul>
        </div>
      }
    </>
  )
}