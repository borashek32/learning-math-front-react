import { ReactElement } from 'react'
import { Logo } from '../logo/Logo'
import styles from './BaseLayout.module.sass'

type Props = {
  children: ReactElement
}

export const BaseLayout = (props: Props) => {

  return (
    <div className={styles.App}>
      <header className={styles.AppHeader}>
        <Logo />
        { props.children }
      </header>
    </div>
  )
}