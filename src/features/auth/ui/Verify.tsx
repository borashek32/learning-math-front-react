import { useEffect, useState } from 'react'
import { useVerifyQuery } from '../auth.api'
import { useNavigate, useParams } from 'react-router-dom'
import { Error } from '../../../common/components/error/Error'
import { Modal } from '../../../common/components/modal/Modal'
import { useTranslation } from 'react-i18next'

export const Verify = () => {
  const { verificationLink } = useParams()
  const [open, setOpen] = useState(true)
  const [err, setErr] = useState('')
  const navigate = useNavigate()

  const { t } = useTranslation()

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
          text={t('auth.verify')}
          buttonName={t('buttons.login')}
          buttonCallback={() => navigate('/login')}
          outlinedButton={true}
          buttonBack={true}
        />
    </>
  )
}
