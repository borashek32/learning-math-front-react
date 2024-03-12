import styles from './Layouts.module.sass'
import { Props } from './Layouts.types'
import { LogoSmall } from '../logo/LogoSmall'
import { selectUserEmail } from '../../../features/auth/auth.selectors'
import { useAppSelector } from '../../hooks/useAppSelector'
import { PATHS } from '../../constants/paths'

export const AuthLayout = ({ title, children }: Props) => {
  const userEmail = useAppSelector(selectUserEmail)

  return (
    <>
      <div className={styles.logoSmallWrapper}>
        <LogoSmall path={userEmail ? PATHS.HOME : PATHS.MAIN}  />
      </div>
      <div className={styles.container}>
        {/* <View style={styles.contentWrapper}> */}
          <p className={styles.title}>{title}</p>
          { children }
        {/* </View> */}
      </div>
    </>
  )
}