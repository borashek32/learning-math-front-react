import { setTotalUserScore } from "../../../features/profile/profile.slice"
import { ScoreType } from "./../../../features/profile/profile.api.types"
import { Resolver, SubmitHandler, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { useAppSelector } from '../useAppSelector/useAppSelector'
import { selectUserId } from '../../../features/auth/auth.selectors'
import { useFormSchema } from '../../utils/math/validationSchemaMathOperations'
import { useDispatch } from 'react-redux'
import { useUpdateScoreMutation } from '../../../features/profile/profile.api'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'

export const useAppForm = (score: number) => {
  const dispatch = useDispatch()
  const [updateScore, { isLoading }] = useUpdateScoreMutation()
  const formSchema = useFormSchema()
  const userId = useAppSelector(selectUserId)
  const [serverError, setServerError] = useState('')

  const { t } = useTranslation('translation')

  const { reset } = useForm<ScoreType>({
    defaultValues: {
      score: score,
      userId, 
      date: new Date()
    },
    mode: 'onChange',
    resolver: yupResolver(formSchema) as Resolver<ScoreType>,
  })

  const onSubmit: SubmitHandler<ScoreType> = (data: ScoreType) => {
    setServerError('')
    updateScore(data)
      .unwrap()
      .then(response => {
        reset()
        dispatch(setTotalUserScore(response.data.score))
      })
      .catch((e: any) => {
        if (e.status === 'FETCH_ERROR') setServerError(t('errors.serverError'))
      })
  }
  return { isLoading, serverError, onSubmit }
}