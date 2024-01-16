import { Props } from './FormContainer.types'
import styles from './FormContainer.module.sass'

export const FormContainer = ({ serverError, children }: Props) => {

  return (
    <div className={styles.formWrapper + ' ' + (serverError && styles.removeSpace)}>
      {children}
    </div>
  )
}