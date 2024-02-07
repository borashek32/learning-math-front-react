import { Props } from './Score.types'
import styles from './Score.module.sass'

export const Score = ({ score }: Props) => {

  return (
    <div>
      <h3 className={styles.title}>
        Your score: {score}
      </h3>
    </div>
  )
}