import { Props } from './Nav.types'
import styles from './Nav.module.sass'
import { LogoSmall } from '../logo/LogoSmall'
import { useState } from 'react'

export const Nav = (props: Props) => {
  const [active, setActive] = useState(false)

  const onClick  = () => {
    setActive(!active)
  }

  const menu = styles.menu
    + ' ' + (active && styles.active)

  return (
    <>
      <header className={styles.header}>
        <LogoSmall />
        <div 
          className={menu}
          onClick={onClick}
        >
          <span className={styles.line}></span>
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