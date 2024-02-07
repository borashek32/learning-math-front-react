import styles from './BaseLayout.module.sass'
import { Nav } from '../nav/Nav'
import { Props } from './BaseLayout.types'

export const AppLayout = ({ children }: Props) => {

  return (
    <div className={styles.app}>
      <Nav />
      <div className={styles.appContent + ' ' + styles.appContentApp}>
        { children }
      </div>
    </div>
  )
}