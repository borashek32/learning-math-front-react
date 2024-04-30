import { useTranslation } from 'react-i18next'
import { ButtonsLayout } from '../../../../common/components/layouts/ButtonsLayout'
import { BlueButton } from '../../../../common/components/buttons/BlueButton'
import { Header } from '../../../../common/components/header/Header'
import { MathExampleLayout } from '../../../../common/components/layouts/MathExampleLayout'
import { GoTo } from '../../../../common/components/goTo/GoTo'
import { AppText } from '../../../../common/components/text/AppText'
import { PUBLIC_PATHS } from '../../../../common/constants/paths/publicPaths'
import { useAppSelector } from '../../../../common/hooks/useAppSelector/useAppSelector'
import { selectIsLoggedIn } from '../../../auth/auth.selectors'
import { PRIVATE_PATHS } from '../../../../common/constants/paths/privatePaths'

export const Multiplication = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn)

  const { t } = useTranslation('translation')

  return (
    <>
      <GoTo address='/math-operations' name={t('links.back')} />
      <Header title={t('mathOperations.multiplication')} />

      <ButtonsLayout>
        <BlueButton
          name={t('mathOperations.multTable')}
          path={isLoggedIn 
            ? PRIVATE_PATHS.MULTIPLICATION_TABLE 
            : PUBLIC_PATHS.MULTIPLICATION_TABLE
          }
        />
        <BlueButton
          name={t('mathOperations.multNulls')}
          path={isLoggedIn 
            ? `${PRIVATE_PATHS.MULTIPLICATION}/multiply/numbers-with-nulls`
            : `${PUBLIC_PATHS.MULTIPLICATION}/multiply/numbers-with-nulls`
          }
        />
      </ButtonsLayout>
    </>
  )
}