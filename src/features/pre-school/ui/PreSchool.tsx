import { useTranslation } from "react-i18next"
import { GoTo } from "../../../common/components/goTo/GoTo"
import { Header } from "../../../common/components/header/Header"
import styles from './../../math-examples/MathOperations.module.sass'
import { BlueButton } from "../../../common/components/buttons/BlueButton"

export const PreSchool = () => {
  const { t } = useTranslation()
  return (
    <>
      {/* <GoTo address='/home' name={t('links.back')} /> */}
      <GoTo address='/' name={t('links.back')} />
      <Header title={t('screens.preSchool')}  />
    
      <ul className={styles.listItems}>
        <li className={styles.item}>
          <BlueButton 
            name={t('preSchool.numbers')} 
            type={'button'} 
            path={'/home/pre-school/numbers'} 
          />
        </li>
      </ul>
    </>
  )
}