import { useTranslation } from 'react-i18next'
import { AppLayout } from '../../../../common/components/layouts/AppLayout'
import { BlueButton } from '../../../../common/components/buttons/BlueButton'
import { GoTo } from '../../../../common/components/goTo/GoTo'
import { Header } from '../../../../common/components/header/Header'
import { useAppSelector } from '../../../../common/hooks/useAppSelector/useAppSelector'
import { selectIsLoggedIn } from '../../../auth/auth.selectors'
import { PRIVATE_PATHS } from '../../../../common/constants/paths/privatePaths'
import { PUBLIC_PATHS } from '../../../../common/constants/paths/publicPaths'

export const Equations = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn)

  const { t } = useTranslation()

  return (
      <>
      <GoTo address={PRIVATE_PATHS.HOME} name={t('links.back')} />
      <Header title={t('mathOperations.equations')} />
        <BlueButton
          type={'button'}
          name={t('mathOperations.equationsWithX')}
          path={isLoggedIn ? PRIVATE_PATHS.EQUATIONS_WITH_X : PUBLIC_PATHS.EQUATIONS_WITH_X}
        />
        <BlueButton
          type={'button'}
          name={t('mathOperations.equationsWithXY')}
          path={isLoggedIn ? PRIVATE_PATHS.EQUATIONS_WITH_XY : PUBLIC_PATHS.EQUATIONS_WITH_XY}
        />
      </>
  )
}