import { GoTo } from '../../../common/components/goTo/GoTo'
import { Header } from '../../../common/components/header/Header'
import styles from './../../../common/styles/App.module.sass'

export const PrivateDocs = () => {

  return (
    <>
      <GoTo address='/home/math-operations' name='Back to Math operations' />
      <Header title='Extended Instructions' />
    </>
  )
}