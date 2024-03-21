import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { AvatarType, ScoreType } from './profile.api.types'
import { UserType } from '../auth/auth.api.types'
import { baseQueryWithReauth } from '../auth/auth.api'

export const profileApi = createApi({
  reducerPath: 'profileApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: [],
  endpoints: build => {
    return {
      updateScore: build.mutation<{ data: ScoreType }, ScoreType>({
        query: (data: ScoreType) => {
          return {
            method: 'POST',
            url: '/update-user-score',
            body: {
              score: data.score,
              userId: data.userId,
              date: data.date
            },
          }
        },
      }),
      getTotalUserScore: build.query<ScoreType, string | undefined>({
        query: (userId) => {
          return {
            method: 'GET',
            url: `get-total-user-score/${userId}`,
          }
        }
      }),
      updateAvatar: build.mutation<UserType, AvatarType>({
        query: (data: AvatarType) => {
          return {
            method: 'POST',
            url: 'update-user-avatar',
            body: {
              userId: data.userId,
              avatarPath: data.avatarPath,
              avatarName: data.avatarName
            }
          }
        }
      }),
    }
  },
})

export const {
  useUpdateScoreMutation,
  useGetTotalUserScoreQuery,
  useUpdateAvatarMutation,
} = profileApi