import { forwardRef } from "react"
import { Error } from "../error/Error"
import { Label } from "../label/Label"
import styles from './Input.module.sass'
import { Props } from "./Input.type"

export const Input = forwardRef<HTMLInputElement, Props>(
  (
    { label, value, disabled, placeholder, error, type, callback, onChange, onFocus,  },
    ref
  ) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e)
      callback?.(e.currentTarget.value)
    }

    return (
      <div className={styles.inputWrapper}>
        <Label title={label} />
        <input
          className={styles.input + ' ' + (error && styles.erroredInput)}
          placeholder={placeholder}
          onChange={handleChange}
          value={value}
          ref={ref}
          onFocus={onFocus} 
          type={type}
        />
        <Error error={error} />
      </div>
    )
  }
)