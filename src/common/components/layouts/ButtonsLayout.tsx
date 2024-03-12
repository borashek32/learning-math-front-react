import { Props } from './Layouts.types'
import styles from './Layouts.module.sass'

export const ButtonsLayout = ({ children }: Props) => {

  return (
    <div className={styles.buttonsWrapper}>{children}</div>
  )
}