import { useNavigate } from 'react-router-dom'
import styles from './Close.module.sass'
import { Props } from './Close.types'

export const Close = ({ open, setOpen }: Props) => {
const navigate = useNavigate()

  const handleClose = () => {
    setOpen(!open)
    navigate(-1)
  }

  return (
    <div className={styles.close} onClick={handleClose}>
      <div className={styles.closeLine}></div>
    </div>
  )
}