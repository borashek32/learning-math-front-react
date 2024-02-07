import { Props } from './ResultInput.types'
import styles from './ResultInput.module.sass'

export const ResultInput = ({ value, onChange }: Props) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.currentTarget.value)
  }

  return (
    <div className={styles.inputResultWrapper}>
      <input 
        onChange={handleChange}
        value={value}
        type='numeric'
        className={styles.inputResultText}
      />
    </div>
  )
}