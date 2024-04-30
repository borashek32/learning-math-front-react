import { GoTo } from '../../../common/components/goTo/GoTo'
import { Header } from '../../../common/components/header/Header'
import styles from './../../math-examples/MathExamples.module.sass'
import { useTranslation } from 'react-i18next'
import { BlueButton } from '../../../common/components/buttons/BlueButton'
import { PRIVATE_PATHS } from '../../../common/constants/paths/privatePaths'

export const SchoolProgram = () => {
  const { t } = useTranslation()

  return (
    <>
      <GoTo address={PRIVATE_PATHS.HOME} name={t('links.back')} />
      <Header title={t('screens.schoolProgram')}  />
    
      <ul className={styles.listItems}>
        <li className={styles.item}>
          <BlueButton 
            name={t('schoolProgram.firstGrade')} 
            type={'button'} 
            path={PRIVATE_PATHS.FIRST_GRADE} 
          />
        </li>
        <li className={styles.item}>
          <BlueButton 
            name={t('schoolProgram.secondGrade')} 
            type={'button'} 
            path={PRIVATE_PATHS.SECOND_GRADE} 
          />
        </li>
        <li className={styles.item}>
        <BlueButton 
            name={t('schoolProgram.thirdGrade')} 
            type={'button'} 
            path={PRIVATE_PATHS.THIRD_GRADE} 
          />
        </li>
      </ul>
    </>
  )
}