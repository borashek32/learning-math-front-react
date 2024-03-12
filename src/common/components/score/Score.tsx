import { Props } from './Score.types'
import styles from './Score.module.sass'
import { useTranslation } from 'react-i18next'

export const Score = ({ score }: Props) => {
  const { t } = useTranslation()

  return (
    <div>
      <h3 className={styles.title}>
        {t('mathOperations.score')} {score} XP
      </h3>
    </div>
  )
}