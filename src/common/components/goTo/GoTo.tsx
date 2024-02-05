import styles from './GoTo.module.sass'
import { Props } from './GoTo.types'

export const GoTo = ({ address, name, text }: Props) => {

  return (
    <div className={styles.noteWrapper}>
      <p className={styles.note}>{text}</p>
      <a href={address} className={styles.link}>{name}</a>
    </div>
  )
}