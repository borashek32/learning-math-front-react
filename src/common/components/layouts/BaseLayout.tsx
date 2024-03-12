import { Logo } from '../logo/Logo'
import { SelectLang } from '../selectLang/SelectLang'
import styles from './Layouts.module.sass'
import { Props } from './Layouts.types'

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