import { ReactElement } from 'react'
import { Logo } from '../logo/Logo'
import styles from './BaseLayout.module.sass'
import { Nav } from '../nav/Nav'

type Props = {
  children: ReactElement
}

export const BaseLayout = (props: Props) => {

  return (
    <div className={styles.App}>
      <Nav />
      <div className={styles.AppHeader}>
        <Logo />
        { props.children }
      </div>
    </div>
  )
}