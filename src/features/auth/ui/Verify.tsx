import { useEffect } from 'react'
import { useVerifyQuery } from '../auth.api'
import { useNavigate, useParams } from 'react-router-dom'

export const Verify = () => {
  const { verificationLink } = useParams()
  const navigate = useNavigate()

  const { data: error } = useVerifyQuery(verificationLink)

  useEffect(() => {
    if (verificationLink) {
      navigate('/login')
    } else if (error) {
      console.log(error)
    }
  }, [verificationLink])

  return (
    <div>
      <h1>Your account is verified successfully</h1>
    </div>
  )
}
