import styles from './Modal.module.sass'
import { Props } from './Modal.type'
import { DefaultButton } from '../button/DefaultButton'
import { useLocation, useNavigate } from 'react-router-dom'
import { Close } from '../close/Close'
import { useTranslation } from 'react-i18next'

export const Modal = ({ 
  text, 
  outlinedButton, 
  buttonName, 
  buttonCallback, 
  open, 
  error,
  color,
  buttonBack
}: Props) => {
  const modalColor = !error ? styles.modal : styles.modalWithError
  const navigate = useNavigate()
  const location = useLocation()

  const { t } = useTranslation()

  const back = () => navigate(-1)

  // let textStyle
  // switch (location.pathname) {
  //   case '/register': 
  //     textStyle = styles.textSmall
  //     break
  //   case '/logout':
  //     textStyle = styles.textSmall
  //     break
  //   case '/change-email':
  //     textStyle = styles.textSmall
  //     break
  // }

  // if (location.pathname.startsWith('/verify/')) textStyle = styles.textSmall
 
  return (
    <>
      {open && 
        <div className={styles.modalWrapper}>
          <div style={color ? { backgroundColor: color } : {}} className={modalColor}>
            <div className={styles.closeWrapper}>
              {/* <Close
                open={open}
                setOpen={back}
              /> */}
            </div>

            <p className={styles.textSmall}>{text}</p>

            <div className={styles.buttonWrapper}>
              {buttonBack && <DefaultButton
                type="button"
                name={t('links.back')}
                onClick={back}
                outlined={outlinedButton}
              />}
              {(!error || text.includes('Please, check' || buttonCallback)) && ( 
                <DefaultButton 
                  type='submit' 
                  name={buttonName ? buttonName : "Ok"}
                  onClick={buttonCallback}
                  outlined={outlinedButton}
                />)
              }
            </div>
          </div>
        </div>
      }
    </>
  )
}