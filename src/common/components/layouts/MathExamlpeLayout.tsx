import { Props } from './Layouts.types'
import styles from './Layouts.module.sass'

export const MathExampleLayout = ({ title, onPress, children }: Props) => {

  return (
    <div onClick={onPress} className={styles.containerMathOperation}>
      {children}
    </div>
  )
}