import { Props } from './Nav.types'
import styles from './Nav.module.sass'
import { LogoSmall } from '../logo/LogoSmall'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { selectUserEmail } from '../../../features/auth/auth.selectors'
import { Link } from 'react-router-dom'

export const Nav = () => {
  const [active, setActive] = useState(false)
  const userEmail = useSelector(selectUserEmail)
  console.log('reload nav')

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
          <Link to="/home/profile">
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
              <Link className={styles.itemLink} to="/home">Home</Link>
            </li>
            <li className={styles.item}>
              <Link className={styles.itemLink} to="/home/math-operations/summ">Calculate summ</Link>
            </li>
            <li className={styles.item}>
              <Link className={styles.itemLink} to="/home/math-operations/diff">Calculate difference</Link>
            </li>
            <li className={styles.item}>
              <Link className={styles.itemLink} to="/home/math-operations/docs">Instructions</Link>
            </li>
            
            <div className={styles.footerDevideLine}></div>
            <li className={styles.item}>
              <Link className={styles.itemLink} to="/home/profile">Profile</Link>
            </li>
            <li className={styles.item}>
              <Link className={styles.itemLink} to="/logout">Logout</Link>
            </li>
          </ul>
        </div>
      }
    </>
  )
}