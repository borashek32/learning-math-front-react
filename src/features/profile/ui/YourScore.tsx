import { useDispatch } from "react-redux"
import { GoTo } from "../../../common/components/goTo/GoTo"
import { Header } from "../../../common/components/header/Header"
import { useAppSelector } from "../../../common/hooks/useAppSelector/useAppSelector"
import styles from './../Profile.module.sass'
import { selectTotalUserScore } from "../profile.selectors"
import { useTranslation } from "react-i18next"
import { Score } from "../../../common/components/score/Score"

export const YourScore = () => {
  const totalUserScore = useAppSelector(selectTotalUserScore)
  
  const { t } = useTranslation()
  
  return (
    <>
      {/* {isLoading && <Loader />} */}
      <GoTo address='/home/profile' name={t('links.back')} />

      <div className={styles.container}>
        {totalUserScore && <Score score={totalUserScore} />}
      </div>
    </>
  )
}