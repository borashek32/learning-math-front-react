import styles from './Label.module.sass'
import { Props } from './Label.types'

export const Label = ({ title }: Props) => {

  return <p className={styles.label}>{title}</p>
}