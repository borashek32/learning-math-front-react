import { Link } from 'react-router-dom'
import styles from '../../../common/styles/App.module.sass'

export const Main = () => {
  return (
    <>
      <Link to="/register" className={styles.labelClass}>Register</Link>
      <br />
      <Link to="/login" className={styles.labelClass}>Login</Link>
      <br />
      <Link to="/instructions" className={styles.labelClass}>Instructions</Link>
    </>
  )
}