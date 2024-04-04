import { useTranslation } from "react-i18next"
import { GoTo } from "../../../../common/components/goTo/GoTo"
import { Header } from "../../../../common/components/header/Header"

export const SecondGrade = () => {
  const { t } = useTranslation()

  return (
    <>
      {/* <GoTo address='/home' name={t('links.back')} /> */}
      <GoTo address='/' name={t('links.back')} />
      <Header title={t('schoolProgram.secondGrade')}  />
    </>
  )
}