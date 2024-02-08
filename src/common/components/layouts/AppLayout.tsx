import styles from './BaseLayout.module.sass'
import { Nav } from '../nav/Nav'
import { Props } from './BaseLayout.types'
import { SelectLang } from '../nav/SelectLang/SelectLang'

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