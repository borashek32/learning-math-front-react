import styles from './DefaultButton.module.sass'
import { Props } from './DefaultButton.types'

export const DefaultButton = ({ error, type, name, onClick, outlined }: Props) => {
  const outlinedButton = outlined ? styles.buttonOutlined : styles.button

  return (
    <button 
      className={outlinedButton + ' ' + (error ? styles.buttonSpace : "")} 
      type={type}
      onClick={onClick}
    >
      {name}
    </button>
  )
}