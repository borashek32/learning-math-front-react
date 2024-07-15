import { Props } from "./DefaultButton.types"
import styles from './DefaultButton.module.sass'
import { Link } from "react-router-dom"

export const BlueButton: React.FC<Props> = ({ 
  error, 
  type, 
  name, 
  path, 
  outlined, 
  source, 
  avatarName, 
  onPress, 
  onPressWithValue,
  disabled,
}: Props) => {
  
  const handlePress = () => {
    if (onPressWithValue) {
      onPressWithValue(source, avatarName)
    } if (onPress) {
      onPress()
    }
  }
  
  return (
    <>
      {path 
        ? (
          <Link
            type={type}
            to={path as never}
            className={styles.blueButton + ' ' + (disabled ? styles.disabled : '')} 
          >
            <p className={styles.blueButtonText}>{name}</p>
          </Link>
        ) : (
          <div
            onClick={handlePress}
            className={styles.blueButton} 
          >
            <p className={styles.blueButtonText}>{name}</p>
          </div>
        )
      }
    </>
  )
}