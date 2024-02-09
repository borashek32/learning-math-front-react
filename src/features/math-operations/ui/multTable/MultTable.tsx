import { useNavigate } from 'react-router-dom'
import { DefaultButton } from '../../../../common/components/button/DefaultButton'
import { GoTo } from '../../../../common/components/goTo/GoTo'
import { Header } from '../../../../common/components/header/Header'
import styles from './../../MathOperations.module.sass'
import { Props } from './MultTable.types'
import { useTranslation } from 'react-i18next'
import { Note } from '../../../../common/components/note/Note'

export const MultTable = ({}: Props) => {
  const navigate = useNavigate()
  const digits: Array<number> = [2, 3, 4, 5, 6, 7, 8, 9]

  const { t } = useTranslation()

  return (
    <div className={styles.container}>
      <GoTo address='/home/math-operations' name={t('links.back')} />
      <Header title={t('mathOperations.multTable')} />
      <Note text={t('mathOperations.common.choose')} />

      <div className={styles.container}>
        {digits.map(digit => {
          return (
            <DefaultButton
              key={digit}
              type='button'
              name={digit.toString()}
              onClick={() => navigate(`/home/math-operations/multiplication-table/${digit}`)}
            />
          )
        })}
      </div>
    </div>
  )
}