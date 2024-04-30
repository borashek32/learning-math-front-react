import { useTranslation } from 'react-i18next'
import { useAppSelector } from '../../../../../common/hooks/useAppSelector/useAppSelector'
import { selectIsLoggedIn } from '../../../../auth/auth.selectors'
import { GoTo } from '../../../../../common/components/goTo/GoTo'
import { PRIVATE_PATHS } from '../../../../../common/constants/paths/privatePaths'
import { PUBLIC_PATHS } from '../../../../../common/constants/paths/publicPaths'
import { Header } from '../../../../../common/components/header/Header'
import { ButtonsLayout } from '../../../../../common/components/layouts/ButtonsLayout'
import { BlueButton } from '../../../../../common/components/buttons/BlueButton'
import { AppText } from '../../../../../common/components/text/AppText'
import { MathExampleLayout } from '../../../../../common/components/layouts/MathExampleLayout'

export const MultiplicationTable = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  const digits: Array<number> = [2, 3, 4, 5, 6, 7, 8, 9]

  const { t } = useTranslation('translation')

  return (
    <>
      <GoTo address={isLoggedIn ? PRIVATE_PATHS.MULTIPLICATION : PUBLIC_PATHS.MULTIPLICATION} name={t('links.back')} />
      <Header title={t('mathOperations.multTable')} />

      <ButtonsLayout>
        <BlueButton
          name={t('mathOperations.multCheck')}
          path={isLoggedIn 
            ? `${PRIVATE_PATHS.MULTIPLICATION_TABLE}/divide`
            : `${PUBLIC_PATHS.MULTIPLICATION_TABLE}/divide`
          }
        />
        <AppText desc={t('mathOperations.common.choose')} link={false} />
        <MathExampleLayout>
          {digits.map(digit => (
            <BlueButton 
              key={digit}
              name={digit.toString()}
              path={isLoggedIn 
                ? `${PRIVATE_PATHS.MULTIPLICATION_TABLE}/multiply/${digit}`
                : `${PUBLIC_PATHS.MULTIPLICATION_TABLE}/multiply/${digit}`
              }
            />
          ))}
        </MathExampleLayout>
      </ButtonsLayout>
    </>
  )
}