import { Props } from './Nav.types'
import styles from './Nav.module.sass'
import { LogoSmall } from '../logo/LogoSmall'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { selectUserEmail } from '../../../features/auth/auth.selector'

export const Nav = () => {
  const [active, setActive] = useState(false)
  const userEmail = useSelector(selectUserEmail)

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
          <a href="/home/profile">
            <p className={styles.userEmail}>{userEmail}</p> 
          </a>

          <div 
          className={menu}
          onClick={onClick}
        >
          <span className={styles.line}></span>
        p</div>
        </div>
      </header>
      {active &&
        <div className={styles.navigation}>
          <ul className={styles.menuItems}>
            <li className={styles.item}>
              <a className={styles.itemLink} href="/">Home</a>
            </li>
            <li className={styles.item}>
              <a className={styles.itemLink} href="/home/math-operations/summ">Calculate summ</a>
            </li>
            <li className={styles.item}>
              <a className={styles.itemLink} href="/home/math-operations/diff">Calculate difference</a>
            </li>
            <li className={styles.item}>
              <a className={styles.itemLink} href="/home/math-operations/docs">Instructions</a>
            </li>
            
            <div className={styles.footerDevideLine}></div>
            <li className={styles.item}>
              <a className={styles.itemLink} href="#">Profile</a>
            </li>
            <li className={styles.item}>
              <a className={styles.itemLink} href="/logout">Logout</a>
            </li>
          </ul>
        </div>
      }
    </>
  )
}