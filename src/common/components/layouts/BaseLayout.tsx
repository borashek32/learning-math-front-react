import { Logo } from '../logo/Logo'
import { SelectLang } from '../nav/SelectLang/SelectLang'
import styles from './BaseLayout.module.sass'
import { Props } from './BaseLayout.types'

export const BaseLayout = ({ children }: Props) => {

  return (
    <div className={styles.app}>
      <SelectLang />
      <div className={styles.appContent}>
        <Logo />
        { children }
      </div>
    </div>
  )
}