import styles from './DefaultButton.module.sass'
import { Props } from './DefaultButton.types'

export const DefaultButton = ({ error, type, name, onClick, outlined }: Props) => {

  return (
    <button 
      className={styles.button + ' ' + (
        outlined 
          ? styles.buttonOutlined 
          : error 
            ? styles.buttonSpace 
            : name === 'Logout' 
              ? styles.buttonRed 
              : styles.button)} 
      type={type}
      onClick={onClick}
    >
      {name}
    </button>
  )
}