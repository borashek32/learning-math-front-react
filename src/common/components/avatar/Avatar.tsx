import { Props } from './Avatar.types'
import { BlueButton } from "../buttons/BlueButton"
import { useTranslation } from 'react-i18next'
import styles from './Avatar.module.sass'

export const Avatar = ({ 
  source, 
  name, 
  status, 
  species, 
  location, 
  onPress,
}: Props) => {
  const { t } = useTranslation()

  return (
    <>
      <div className={styles.imageContainer}>
        <img
          src={source}
          className={styles.characterImage}
          alt="Character Image"
        />
        {name && 
          <div className={styles.desc}>
            {name && 
              <div className={styles.textWrapper}>
                <p className={styles.descName}>{t('profile.changeAvatar.name')}:</p>
                <p className={styles.descText}>{name}</p>
              </div>
            }
            {location &&
              <div className={styles.textWrapper}>
                <p className={styles.descName}>{t('profile.changeAvatar.location')}:</p>
                <p className={styles.descText}>{location}</p>
              </div>
            }
            {status && 
              <div className={styles.textWrapper}>
                <p className={styles.descName}>{t('profile.changeAvatar.status')}:</p>
                <p className={styles.descText}>{status}</p>
              </div>
            }
            {species && 
              <div className={styles.textWrapper}>
                <p className={styles.descName}>{t('profile.changeAvatar.species')}:</p>
                <p className={styles.descText}>{species}</p>
              </div>
            }
            <BlueButton 
              name={t('profile.changeAvatar.button')}
              source={source}
              avatarName={name}
              onPressWithValue={() => onPress(source, name)}
            />
          </div>
        }
      </div>
    </>
  )
}

