import styles from './Layouts.module.sass'
import { Props } from './Layouts.types'
import { LogoSmall } from '../logo/LogoSmall'
import { SelectLang } from '../selectLang/SelectLang'

export const DocsLayout = ({ title, children }: Props) => {

  return (
    <>
      <div className={styles.logoSmallWrapper}>
        <LogoSmall />
      </div>

      <div className={styles.appUnAuth}>
        <SelectLang />
        <div className={styles.appContent}>
          { children }
        </div>
      </div>
    </>
  )
}