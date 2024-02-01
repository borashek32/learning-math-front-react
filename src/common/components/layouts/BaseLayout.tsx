import { Logo } from '../logo/Logo'
import styles from './BaseLayout.module.sass'
import { Nav } from '../nav/Nav'
import { Props } from './BaseLayout.types'

export const BaseLayout = ({ children }: Props) => {

  return (
    <div className={styles.app}>
      <Nav />
      <div className={styles.appContent}>
        <Logo />
        { children }
      </div>
    </div>
  )
}