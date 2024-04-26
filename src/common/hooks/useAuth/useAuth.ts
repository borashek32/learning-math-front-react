import { useEffect } from 'react'
import { useMeQuery } from '../../../features/auth/auth.api'
import { useDispatch } from 'react-redux'
import { removeUserInfo, setUserInfo } from '../../../features/auth/auth.slice'
import { useAppSelector } from '../useAppSelector/useAppSelector'
import { selectIsLoggedIn } from '../../../features/auth/auth.selectors'
import { setTotalUserScore } from '../../../features/profile/profile.slice'
import { useGetTotalUserScoreQuery } from '../../../features/profile/profile.api'

export const useAuth = () => {
  const { data, isLoading, error } = useMeQuery()
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  const { data: scoreData } = useGetTotalUserScoreQuery(data?._id)
  const dispatch = useDispatch()
  
  // console.log('useAuth', isLoggedIn, 'data me', data, 'error me', error)

  useEffect(() => {
    if (data) {
      dispatch(setUserInfo(data))
      if (scoreData && scoreData.score !== undefined) {
        dispatch(setTotalUserScore(scoreData.score))
      }
    }
  }, [data, scoreData, dispatch])
  
  useEffect(() => { 
    if (data) {
      dispatch(setUserInfo(data))
    } 
    if (error) {
      dispatch(removeUserInfo())
    }
  }, [data, error, dispatch])

  return { isLoggedIn, isLoading }
}
