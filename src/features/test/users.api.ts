import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { baseURL } from '../../common/baseUrl'
import { UserType } from '../auth/auth.types'
import { algByDecodingToken } from '../../common/utils/algByDecodingToken'

const token = localStorage.getItem('accessToken')

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: baseURL,
    credentials: 'same-origin',
    prepareHeaders: headers => {
      const token = localStorage.getItem('accessToken')
  
      if (token) {
        const bearerToken = token.split(' ')
        headers.set('Authorization', `Bearer ${bearerToken}`)
        // algByDecodingToken(token)
      }
  
      return headers
    },
  }),
  endpoints: build => {
    console.log(token)
    return {
      users: build.query<UserType[], void>({
        query: () => ({
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken') as string}`,
          },
          method: 'GET',
          url: 'users',
        }),
      }),
    }
  },
})

export const { useUsersQuery } = usersApi
