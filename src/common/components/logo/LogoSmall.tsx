import { selectIsLoggedIn } from '../../../features/auth/auth.selectors'
import { useAppSelector } from '../../hooks/useAppSelector'
import styles from './Logo.module.sass'
import { Props } from './Logo.types'

export const LogoSmall = ({}: Props) => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn)

  return (
    <a href={isLoggedIn ? '/home' : '/'} className={styles.logoLink}>
      <div className={styles.logoWrapperSmall}>
        <div className={styles.learnMathComWrapperSmall}>
          <p className={styles.learnSmall}>Free</p>
          <p className={styles.mathComSmall}>math</p>
          <p className={styles.mathComSmall}>trainer</p>
        </div>
      </div>
    </a>
  )
}