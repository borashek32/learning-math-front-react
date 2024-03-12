import styles from './Layouts.module.sass'
import { Nav } from '../nav/Nav'
import { Props } from './Layouts.types'
import { SelectLang } from '../selectLang/SelectLang'

export const AppLayout = ({ children }: Props) => {

  return (
    <>
      <SelectLang />
      <div className={styles.app}>
        <Nav />
        <div className={styles.appContent + ' ' + styles.app}>
          { children }
        </div>
      </div>
    </>
  )
}