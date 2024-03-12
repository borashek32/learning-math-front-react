import styles from './Logo.module.sass'
import { Props } from './Logo.types'

export const LogoSmall = ({ path }: Props) => {

  return (
    <a href={path} className={styles.logoLink}>
      <div className={styles.logoWrapperSmall}>
        <div className={styles.learnMathComWrapperSmall}>
          <p className={styles.learnSmall}>Learn</p>
          <p className={styles.mathComSmall}>-math</p>
          <p className={styles.mathComSmall}>.com</p>
        </div>
      </div>
    </a>
  )
}