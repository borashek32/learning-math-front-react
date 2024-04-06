import { Props } from './Layouts.types'
import styles from './Layouts.module.sass'

export const ImgLayout = ({ children }: Props) => {

  return (
    <div className={styles.containerImg}>
      {children}
    </div>
  )
}