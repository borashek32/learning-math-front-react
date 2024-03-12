import styles from './DefaultButton.module.sass'
import { Props } from './DefaultButton.types'

export const MathOperationButton = ({ name, onClick }: Props) => {

  return (
    <div className={styles.button} onClick={onClick}>
      <p className={styles.blueButtonText}>{name}</p>
    </div>
  )
}