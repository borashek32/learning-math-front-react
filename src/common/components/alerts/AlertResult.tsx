import styles from "./Alert.module.sass"
import { Props } from "./Alert.types"
import { DefaultButton } from "../buttons/DefaultButton"
import { Header } from "../header/Header"

export const AlertResult = ({ right, wrong, onClick, title }: Props) => {

  return (
    <div>
      {right && 
        <div 
          className={styles.alertWrapper + ' ' + styles.alertGreen}
          onClick={onClick}
        >
          <Header title='Yeah, you are right' />
          <div>
            <DefaultButton
              type={'button'}
              name={title}
              onClick={onClick}
            />
          </div>
        </div>
      }
      {wrong && 
        <div 
          className={styles.alertWrapper + ' ' + styles.alertRed}
          onClick={onClick}
        >
          <Header title='Oh, nooooo. Please, try again' />
          <div>
            <DefaultButton
              type={'button'}
              name='Try again'
              onClick={onClick}
            />
          </div>
        </div>
      }
    </div>
  )
}