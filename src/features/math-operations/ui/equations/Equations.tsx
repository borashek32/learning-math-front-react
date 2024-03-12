import { useTranslation } from 'react-i18next'
import { AppLayout } from '../../../../common/components/layouts/AppLayout'
import { BlueButton } from '../../../../common/components/buttons/BlueButton'
import { PATHS } from '../../../../common/constants/paths'

export const Equations = () => {
  const { t } = useTranslation()

  return (
    <AppLayout title={t('screens.equations')}>
      <>
        <BlueButton
          type={'button'}
          name={t('mathOperations.equationsWithX')}
          path={PATHS.EQUATIONS_X}
        />
        <BlueButton
          type={'button'}
          name={t('mathOperations.equationsWithXY')}
          path={PATHS.DIFF}
        />
      </>
    </AppLayout>
  )
}