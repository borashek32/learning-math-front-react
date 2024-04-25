import styles from './Layouts.module.sass'
import { Nav } from '../nav/Nav'
import { AppLayoutType } from './Layouts.types'
import { SelectLang } from '../selectLang/SelectLang'

export const AppLayout = ({ children, user }: AppLayoutType) => {

  return (
    <div className={styles.appWrapper}>
      <SelectLang />
      <div className={styles.app}>
        <Nav />
        <div className={styles.appContent}>
          {/* <Logo /> */}
          { children }
        </div>
      </div>
    </div>
  )
}