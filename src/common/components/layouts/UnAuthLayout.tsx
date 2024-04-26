import styles from './Layouts.module.sass'
import { Props } from './Layouts.types'
import { LogoSmall } from '../logo/LogoSmall'
import { SelectLang } from '../selectLang/SelectLang'

export const UnAuthLayout = ({ title, children }: Props) => {

  return (
    <>
      <div className={styles.logoSmallWrapper}>
        <LogoSmall />
      </div>

      <div className={styles.app}>
        <SelectLang />
        <div className={styles.appContent}>
          { children }
        </div>
      </div>
    </>
  )
}