import { useNavigate } from "react-router-dom"
import { Modal } from "../../../common/components/modal/Modal"
import { useLogoutMutation } from "../auth.api"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { removeUserInfo } from "../auth.slice"
import { Loader } from "../../../common/components/loaders/CircularLoader"
import { useTranslation } from "react-i18next"

export const Logout = () => {
  const navigate = useNavigate()
  const [open, setOpen] = useState(true)
  const [modalWithErrorOpen, setModalWithErrorOpen] = useState(false)
  const [logout, { isLoading }] = useLogoutMutation()
  const [serverError, setServerError] = useState('')
  const dispatch = useDispatch()

  const { t } = useTranslation()

  const handleOpenModal = () => setOpen(false)
  const handleOpenModalWithError = () => setModalWithErrorOpen(false)

  const logoutHandler = () => {
    logout()
      .unwrap()
      .then(() => {
        navigate('/login')
        setOpen(false)
        dispatch(removeUserInfo())
      })
      .catch(e => {
        if (e) {
          setOpen(false)
          setModalWithErrorOpen(true)
          if (e.status === 401 || e.name === 'Error') {
            setServerError(t('errors.logout'))
          }
        }
      })
  }

  return (
    <>
      {isLoading && <Loader />}
      {serverError && 
        <Modal
          open={modalWithErrorOpen}
          setOpen={handleOpenModalWithError}
          text={serverError}
          error={true}
          buttonBack={true}
        />
      }
      {open &&
        <Modal
          open={open}
          setOpen={handleOpenModal}
          text={t('auth.logout.sure')}
          buttonName='Ok'
          buttonCallback={logoutHandler}
          outlinedButton={true}
          buttonBack={true}
        />
      }
    </>
  )
}