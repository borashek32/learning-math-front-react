import { Props } from './Nav.types'
import styles from './Nav.module.sass'

export const Nav = (props: Props) => {

  return (
    <header className={styles.header}>
      <div className={styles.logo}></div>
      <div className={styles.menu}>
        <span className="line"></span>
      </div>
    </header>
  )
}