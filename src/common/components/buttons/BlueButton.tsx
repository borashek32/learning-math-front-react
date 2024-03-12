import { Props } from "./DefaultButton.types"
import styles from './DefaultButton.module.sass'
import { Link } from "react-router-dom"

export const BlueButton: React.FC<Props> = ({ 
  error, type, name, path, outlined
}: Props) => {
  
  return (
    <Link
      type={type}
      to={path as never}
      className={styles.blueButton} 
    >
      <p className={styles.blueButtonText}>{name}</p>
    </Link>
  )
}