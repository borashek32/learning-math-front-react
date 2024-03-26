import { useTranslation } from "react-i18next"
import { GoTo } from "../../../common/components/goTo/GoTo"
import { Header } from "../../../common/components/header/Header"

export const Instructions = () => {
  const { t } = useTranslation()
  
  return (
    <>
      <GoTo address="/home/profile" name={t('links.back')} />
      <Header title={t('screens.instructions')} />
    </>
  )
}