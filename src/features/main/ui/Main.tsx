import styles from '../../../common/styles/App.module.sass'

export const Main = () => {
  return (
    <>
      <h1>Learning math</h1>
      <a href="/register" className={styles.labelClass}>Register</a>
      <br />
      <a href="/login" className={styles.labelClass}>Login</a>
    </>
  )
}