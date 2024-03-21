import { useTranslation } from 'react-i18next'
import { AppLayout } from '../../../../common/components/layouts/AppLayout'
import { BlueButton } from '../../../../common/components/buttons/BlueButton'
import { GoTo } from '../../../../common/components/goTo/GoTo'
import { Header } from '../../../../common/components/header/Header'

export const Equations = () => {
  const { t } = useTranslation()

  return (
      <>
      <GoTo address='/home/math-operations' name={t('links.back')} />
      <Header title={t('mathOperations.equations')} />
        <BlueButton
          type={'button'}
          name={t('mathOperations.equationsWithX')}
          path={"/home/math-operations/equations/with-one-unknown"}
        />
        <BlueButton
          type={'button'}
          name={t('mathOperations.equationsWithXY')}
          path={''}
        />
      </>
  )
}