import { useNavigate } from "react-router-dom"
import { Modal } from "../../../common/components/modal/Modal"
import { useLogoutMutation } from "../auth.api"
import { useState } from "react"

export const Logout = () => {
  const navigate = useNavigate()
  const [open, setOpen] = useState(true)
  const [modalWithErrorOpen, setModalWithErrorOpen] = useState(false)
  const [logout] = useLogoutMutation()
  const [serverError, setServerError] = useState('')

  const handleOpenModal = () => setOpen(false)
  const handleOpenModalWithError = () => setModalWithErrorOpen(false)

  const logoutHandler = () => {
    logout()
      .unwrap()
      .then(() => {
        navigate('/')
      })
      .catch(e => {
        console.log(e)
        if (e) {
          setOpen(false)
          setModalWithErrorOpen(true)
          if (e.status === 401 || e.name === 'Error') {
            setServerError('User not authorized. First log in and then you can log out')
          }
        }
      })
  }

  return (
    <>
      {serverError && 
        <Modal
          open={modalWithErrorOpen}
          setOpen={handleOpenModalWithError}
          text={serverError}
          error={true}
        />
      }
      {open &&
        <Modal
          open={open}
          setOpen={handleOpenModal}
          text='Are you sure?'
          buttonName='Yes'
          buttonCallback={logoutHandler}
          outlinedButton={true}
        />
      }
    </>
  )
}