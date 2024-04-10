import { Props } from './Score.types'
import styles from './Score.module.sass'
import { useTranslation } from 'react-i18next'
import { UserAvatar } from '../avatar/UserAvatar'
import { useAppSelector } from '../../hooks/useAppSelector'
import { selectUserAvatarPath } from '../../../features/auth/auth.selectors'

export const Score = ({ score }: Props) => {
  const { t } = useTranslation()
  const avatarPath = useAppSelector(selectUserAvatarPath)

  return (
    <div className={styles.scoreWrapper}>
      <UserAvatar 
        small={true}
        source={avatarPath}
      />
      <div className={styles.titleWrapper}>
        <p className={styles.title}>{t('screens.yourScore')}</p>
        <p className={styles.score}>{score} XP</p>
      </div>
    </div>
  )
}