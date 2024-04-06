import { GoTo } from '../../../common/components/goTo/GoTo'
import { Header } from '../../../common/components/header/Header'
import styles from './../../math-examples/MathOperations.module.sass'
import { useTranslation } from 'react-i18next'
import { BlueButton } from '../../../common/components/buttons/BlueButton'

export const SchoolProgramm = () => {
  const { t } = useTranslation()

  return (
    <>
      {/* <GoTo address='/home' name={t('links.back')} /> */}
      <GoTo address='/' name={t('links.back')} />
      <Header title={t('screens.schoolProgram')}  />
    
      <ul className={styles.listItems}>
        <li className={styles.item}>
          <BlueButton 
            name={t('schoolProgram.firstGrade')} 
            type={'button'} 
            path={`/home/school-program/first-grade`} 
          />
        </li>
        <li className={styles.item}>
          <BlueButton 
            name={t('schoolProgram.secondGrade')} 
            type={'button'} 
            path={`/home/school-program/second-grade`} 
          />
        </li>
        <li className={styles.item}>
        <BlueButton 
            name={t('schoolProgram.thirdGrade')} 
            type={'button'} 
            path={`/home/school-program/third-grade`} 
          />
        </li>
      </ul>
    </>
  )
}