import { useTranslation } from 'react-i18next'
import styles from './DefaultButton.module.sass'
import { Props } from './DefaultButton.types'

export const DefaultButton = ({ error, type, name, onClick, outlined }: Props) => {
  const { t, i18n } = useTranslation('translation', { keyPrefix: 'nav' })

  return (
    <button 
      className={styles.button + ' ' + (
        outlined 
          ? styles.buttonOutlined 
          : error 
            ? styles.buttonSpace 
            : (name === 'Logout' || name === 'Выйти')
              ? styles.buttonRed 
              : styles.button)} 
      type={type}
      onClick={onClick}
    >
      {name}
    </button>
  )
}