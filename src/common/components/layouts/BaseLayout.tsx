import { Logo } from '../logo/Logo'
import styles from './BaseLayout.module.sass'
import { Props } from './BaseLayout.types'

export const BaseLayout = ({ children }: Props) => {

  return (
    <div className={styles.app}>
      <div className={styles.appContent}>
        <Logo />
        { children }
      </div>
    </div>
  )
}