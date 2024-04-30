import { Props } from './MathOperation.types'
import styles from './MathOperation.module.sass'

export const MathOperation = ({ title }: Props) => {

  return (
    <div className={styles.mathOperationWrapper}>
      <p className={styles.mathOperation}>{title}</p>
    </div>
  )
}