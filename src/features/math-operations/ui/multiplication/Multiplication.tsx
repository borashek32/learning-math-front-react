import { PATHS } from '../../../../common/constants/paths'
import { useTranslation } from 'react-i18next'
import { ButtonsLayout } from '../../../../common/components/layouts/ButtonsLayout'
import { BlueButton } from '../../../../common/components/buttons/BlueButton'
import { Header } from '../../../../common/components/header/Header'
import { MathExampleLayout } from '../../../../common/components/layouts/MathExamlpeLayout'
import { GoTo } from '../../../../common/components/goTo/GoTo'
import { AppText } from '../../../../common/components/text/AppText'

export const Multiplication = () => {
  const { t } = useTranslation('translation')

  const digits: Array<number> = [2, 3, 4, 5, 6, 7, 8, 9]

  return (
    <>
      <GoTo address='/home/math-operations' name={t('links.back')} />
      <Header title={t('mathOperations.multTable')} />

      <ButtonsLayout>
        <BlueButton
          name={t('mathOperations.multCheck')}
          path={'/home/math-operations/multiplication/check-knowledge'}
        />
        <BlueButton
          name={t('mathOperations.multNulls')}
          path={'/home/math-operations/multiplication/multiplication-table/numbers-with-nulls'}
        />
        <AppText desc={t('mathOperations.common.choose')} link={false} />
        <MathExampleLayout>
          {digits.map(digit => (
            <BlueButton 
              key={digit}
              name={digit.toString()}
              path={`/home/math-operations/multiplication/multiplication-table/${digit}`}
            />
          ))}
        </MathExampleLayout>
      </ButtonsLayout>
    </>
  )
}