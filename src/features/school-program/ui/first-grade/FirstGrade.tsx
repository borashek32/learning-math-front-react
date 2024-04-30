import { useTranslation } from "react-i18next"
import { GoTo } from "../../../../common/components/goTo/GoTo"
import { Header } from "../../../../common/components/header/Header"
import { PRIVATE_PATHS } from "../../../../common/constants/paths/privatePaths"

export const FirstGrade = () => {
  const { t } = useTranslation()

  return (
    <>
      <GoTo address={PRIVATE_PATHS.SCHOOL_PROGRAM} name={t('links.back')} />
      <Header title={t('schoolProgram.firstGrade')}  />
    </>
  )
}