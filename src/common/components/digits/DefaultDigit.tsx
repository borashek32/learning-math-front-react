import { Props } from './Digits.types'
import styles from './Digits.module.sass'

export const DefaultDigit = ({ title }: Props) => {

  return (
    <div className={styles.digitWrapper}>
      <p className={styles.digitText}>{title}</p>
    </div>
  )
}