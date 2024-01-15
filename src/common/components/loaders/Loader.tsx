import { CircularProgress } from "@mui/material"
import styles from './Loader.module.sass'

export const Loader = () => {

  return (
    <div className={styles.loaderWrapper}>
      <CircularProgress />
    </div>
  )
}