import { useDispatch } from "react-redux"
import { GoTo } from "../../../common/components/goTo/GoTo"
import { Header } from "../../../common/components/header/Header"
import { useAppSelector } from "../../../common/hooks/useAppSelector"
import styles from './../Profile.module.sass'
import { selectTotalUserScore } from "../profile.selectors"
import { selectUser, selectUserId } from "../../auth/auth.selectors"
import { useGetTotalUserScoreQuery } from "../profile.api"
import { useEffect } from "react"
import { setTotalUserScore } from "../profile.slice"
import { useTranslation } from "react-i18next"
import { Score } from "../../../common/components/score/Score"
import { Loader } from "../../../common/components/loaders/CircularLoader"

export const YourScore = () => {
  const totalUserScore = useAppSelector(selectTotalUserScore)
  const dispatch = useDispatch()
  const userId = useAppSelector(selectUserId)
  const { data: userScoreData, isLoading } = useGetTotalUserScoreQuery(userId || '')
  console.log('userScoreData', userScoreData, 'selectjr', totalUserScore)

  useEffect(() => {
    userScoreData && dispatch(setTotalUserScore(userScoreData.score))
  }, [userScoreData, dispatch])
  
  const { t } = useTranslation()
  
  return (
    <>
      {isLoading && <Loader />}
      <GoTo address='/home/profile' name={t('links.back')} />

      <div className={styles.container}>
        {totalUserScore && <Score score={totalUserScore} />}
      </div>
    </>
  )
}