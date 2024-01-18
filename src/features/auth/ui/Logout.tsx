import { useNavigate } from "react-router-dom"
import { Modal } from "../../../common/components/modal/Modal"
import { useLogoutMutation } from "../auth.api"
import { useState } from "react"
import { Loader } from "../../../common/components/loaders/CircularLoader"

export const Logout = () => {
  const navigate = useNavigate()
  const [open, setOpen] = useState(true)
  const [modalWithErrorOpen, setModalWithErrorOpen] = useState(false)
  const [logout, { isLoading }] = useLogoutMutation()
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
        if (e) {
          setOpen(false)
          setModalWithErrorOpen(true)
          setServerError(e.message)
        }
      })
      .finally(() => {
        
      })
  }

  console.log(serverError)

  return (
    <>
      {isLoading && <Loader />}
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