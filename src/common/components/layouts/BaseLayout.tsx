import { Logo } from '../logo/Logo'
import styles from './BaseLayout.module.sass'
import { Nav } from '../nav/Nav'
import { Props } from './BaseLayout.types'
import { useMeQuery } from '../../../features/auth/auth.api'

export const BaseLayout = ({ children }: Props) => {
  // const { data } = useMeQuery()
  // console.log(data?.user)
  
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