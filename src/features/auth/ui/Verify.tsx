import { useEffect, useState } from 'react'
import { useVerifyQuery } from '../auth.api'
import { useNavigate, useParams } from 'react-router-dom'
import { Error } from '../../../common/components/error/Error'
import { Modal } from '../../../common/components/modal/Modal'

export const Verify = () => {
  const { verificationLink } = useParams()
  const [open, setOpen] = useState(true)
  const [err, setErr] = useState('')
  const navigate = useNavigate()

  const { data: error } = useVerifyQuery(verificationLink)

  const handleOpenModal = () => setOpen(false)

  useEffect(() => {
    if (verificationLink) {
      
    } else if (error) {
      setErr(error)
    }
  }, [verificationLink])

  return (
    <>
      {err && <Error error={err} />} 
      <Modal
          open={open}
          setOpen={handleOpenModal}
          text="Your account is verified successfully"
          buttonName='Login'
          buttonCallback={() => navigate('/login')}
          outlinedButton={true}
        />
    </>
  )
}
