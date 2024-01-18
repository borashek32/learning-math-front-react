import styles from './Docs.module.sass'

export const Docs = () => {

  return (
    <>
      <div className={styles.header}>Instructions:</div>
      <ol>
        <li className={styles.item}>one</li>
        <li className={styles.item}>two</li>
        <li className={styles.item}>three</li>
        <li className={styles.item}>four</li>
        <li className={styles.item}>five</li>
        <li className={styles.item}>six</li>
      </ol>
    </>
  )
}