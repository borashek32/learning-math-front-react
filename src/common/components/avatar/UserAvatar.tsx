import { UserAvatarProps } from './Avatar.types'
import { useTranslation } from "react-i18next"
import styles from './Avatar.module.sass'

export const UserAvatar = ({ source, avatarName, small }: UserAvatarProps) => {
  const { t } = useTranslation()

  return (
    <div className={small ? '' : styles.imageContainer}>
      {source && typeof source === 'string' && (
        <img
          src={source}
          className={small ? styles.characterImageSmall : styles.characterImage}
          alt="Character Image"
        />
      )}
      {avatarName && 
        <div className={styles.textWrapper}>
          <p className={styles.descText}>
            {t('profile.changeAvatar.youAre')} 
            {avatarName} 
            {t('profile.changeAvatar.fromRickMorty')}
          </p>
        </div>
      }
    </div>
  )
}