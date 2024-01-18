import styles from './Modal.module.sass'
import { Props } from './Modal.type'
import { DefaultButton } from '../button/DefaultButton'
import { useNavigate } from 'react-router-dom'
import { Close } from '../close/Close'

export const Modal = ({ text, outlinedButton, buttonCallback, open, setOpen, error }: Props) => {
  const modalColor = !error ? styles.modal : styles.modalWithError
  const navigate = useNavigate()

  const back = () => navigate(-1)

  return (
    <>
      {open && 
        <div className={styles.modalWrapper}>
          <div className={modalColor}>
            <div className={styles.closeWrapper}>
              <Close
                open={open}
                setOpen={setOpen}
              />
            </div>

            <p className={styles.text}>{text}</p>

            <div className={styles.buttonWrapper}>
              <DefaultButton
                type="button"
                name="Back"
                onClick={back}
                outlined={outlinedButton}
              />
              {!error && 
                <DefaultButton 
                  type='submit' 
                  name="Yes"
                  onClick={buttonCallback}
                  outlined={outlinedButton}
                />
              }
            </div>
          </div>
        </div>
      }
    </>
  )
}