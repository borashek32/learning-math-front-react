import styles from './Layouts.module.sass'
import { Props } from './Layouts.types'
import { LogoSmall } from '../logo/LogoSmall'
import { selectIsLoggedIn, selectUserEmail } from '../../../features/auth/auth.selectors'
import { useAppSelector } from '../../hooks/useAppSelector'
import { PATHS } from '../../constants/paths'
import { SelectLang } from '../selectLang/SelectLang'

export const UnAuthLayout = ({ title, children }: Props) => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn)

  return (
    <>
      <div className={styles.logoSmallWrapper}>
        <LogoSmall path={isLoggedIn ? '/home' : '/'}  />
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