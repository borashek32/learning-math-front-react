import { GoTo } from "../../../common/components/goTo/GoTo"
import { Header } from "../../../common/components/header/Header"
import styles from './../Profile.module.sass'

export const YourScore = () => {

  return (
    <>
      <GoTo address='/home/profile' name='Back to profile' />
      <Header title='Your total score' />

      <div className={styles.container}>
        {/* <YourScore /> */}
      </div>
    </>
  )
}