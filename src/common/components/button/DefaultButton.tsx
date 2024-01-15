import styles from './DefaultButton.module.sass'
import { Props } from './DefaultButton.types'

export const DefaultButton = ({ error, type, name }: Props) => {

  return (
    <button 
      className={styles.button + ' ' + (error ? styles.buttonSpace : "")} 
      type={type}
    >
      {name}
    </button>
  )
}