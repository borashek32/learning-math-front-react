import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { baseURL } from '../../common/baseUrl'
import { algByDecodingToken } from '../../common/utils/algByDecodingToken'
import { ScoreType } from './profile.api.types'

const baseQuery = fetchBaseQuery({
  baseUrl: baseURL,
  method: 'POST',
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json',
    Cookie: document.cookie,
  },
  prepareHeaders: headers => {
    const token = localStorage.getItem('accessToken')

    if (token) {
      headers.set('Authorization', `Bearer ${token}`)
      algByDecodingToken(token)
    }

    return headers
  },
})

export const profileApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQuery,
  tagTypes: ['me'],
  endpoints: build => {
    return {
      // saveScore: build.mutation<ScoreType, { value: number }>({
        // query: ({ value }: number) => {
        //   return {
        //     method: 'POST',
        //     url: 'login',
        //     body: {
        //       score: value
        //     },
        //   }
        // },
        // invalidatesTags: ['me'],
      // }),
    }
  },
})

export const {
  
} = profileApi