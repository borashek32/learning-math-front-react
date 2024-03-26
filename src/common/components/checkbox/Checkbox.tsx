import styles from './Checkbox.module.sass'
import { Props } from './Checkbox.types'

export const Checkbox = ({ label, isChecked, onChange }: Props) => {
  const toggleCheckbox = () => {
    onChange(!isChecked)
  }

  return (
    <div onClick={toggleCheckbox} className={styles.container}>
      <div className={styles.checkbox}>
        {isChecked && <div className={styles.checkmark} />}
      </div>
      <p className={styles.label}>{label}</p>
    </div>
  )
}
