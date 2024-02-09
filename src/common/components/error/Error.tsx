import styles from './Error.module.sass'
import { Props } from './Error.types'

export const Error = ({ error }: Props) => {

  return (
    <div className={styles.errorWrapper}>
      <p className={styles.error}>
        {error}
      </p>
    </div>
  )
}