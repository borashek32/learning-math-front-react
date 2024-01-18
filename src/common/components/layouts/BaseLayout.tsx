import { ReactElement } from 'react'
import { Logo } from '../logo/Logo'
import styles from './BaseLayout.module.sass'
import { Nav } from '../nav/Nav'

type Props = {
  children: ReactElement
}

export const BaseLayout = (props: Props) => {

  return (
    <div className={styles.app}>
      <Nav />
      <div className={styles.appContent}>
        <Logo />
        { props.children }
      </div>
    </div>
  )
}