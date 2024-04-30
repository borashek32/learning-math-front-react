import { useTranslation } from "react-i18next"
import { GoTo } from "../../../common/components/goTo/GoTo"
import { Header } from "../../../common/components/header/Header"
import styles from './../../math-examples/MathExamples.module.sass'
import { BlueButton } from "../../../common/components/buttons/BlueButton"
import { PRIVATE_PATHS } from "../../../common/constants/paths/privatePaths"

export const PreSchool = () => {
  const { t } = useTranslation()
  return (
    <>
      <GoTo address={PRIVATE_PATHS.HOME} name={t('links.back')} />
      <Header title={t('screens.preSchool')}  />
    
      <ul className={styles.listItems}>
        <li className={styles.item}>
          <BlueButton 
            name={t('preSchool.numbers.title')} 
            type={'button'} 
            path={PRIVATE_PATHS.NUMBERS} 
          />
        </li>
      </ul>
    </>
  )
}