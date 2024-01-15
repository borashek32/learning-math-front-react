import { Props } from './Note.types'
import styles from './Note.module.sass'

export const Note = ({ text }: Props) => {

  return <p className={styles.note}>{text}</p>
}