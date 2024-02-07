import styles from './Header.module.sass'
import { Props } from './Header.types'

export const Header = ({ title }: Props) => {

  return <h3 className={styles.title}>{title}</h3>
}