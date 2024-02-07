import { Link } from 'react-router-dom'
import styles from './GoTo.module.sass'
import { Props } from './GoTo.types'

export const GoTo = ({ address, name, text }: Props) => {

  return (
    <div className={styles.noteWrapper}>
      <p className={styles.note}>{text}</p>
      <Link to={address} className={styles.link}>{name}</Link>
    </div>
  )
}