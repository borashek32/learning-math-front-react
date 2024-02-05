import styles from './../../../common/styles/App.module.sass'

export const Home = () => {
  
  return (
    <>
      <h1 style={{color: 'white'}}>Hello</h1>
      

      <li className={styles.item}>
        <a className={styles.itemLink} href="/home/math-operations">Math Operations</a>
      </li>
      
      <div className={styles.footerDevideLine}></div>
      <li className={styles.item}>
        <a className={styles.itemLink} href="#">Profile</a>
      </li>
      <li className={styles.item}>
        <a className={styles.itemLink} href="/logout">Logout</a>
      </li>
    </>
  )
}