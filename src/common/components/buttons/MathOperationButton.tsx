import styles from './DefaultButton.module.sass'
import { Props } from './DefaultButton.types'

export const MathOperationButton = ({ name, onClick, disabled }: Props) => {
  console.log(disabled)

  return (
    <button 
      className={styles.button + ' ' + (disabled ? styles.disabled : '')}  
      onClick={onClick}
      disabled={disabled}
    >
      <p className={styles.blueButtonText}>{name}</p>
    </button>
  )
}