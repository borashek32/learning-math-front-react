import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { baseURL } from '../../common/baseUrl'
import { RegistedUserType, RegisterType, UserType } from './auth.types'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: baseURL,
    credentials: 'same-origin',
    prepareHeaders: headers => {
      const token = localStorage.getItem('accessToken')

      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }

      return headers
    },
  }),
  endpoints: build => {
    return {
      login: build.mutation<UserType, any>({
        query: ({ email, password }) => {
          return {
            method: 'POST',
            url: 'auth/login',
            body: {
              email,
              password,
            },
          }
        },
      }),
      register: build.mutation<RegistedUserType, RegisterType>({
        query: ({ email, password }: RegisterType) => {
          return {
            method: 'POST',
            url: 'registration',
            body: {
              email,
              password,
            },
          }
        },
      }),
      logout: build.mutation<any, void>({
        query: () => ({
          method: 'POST',
          url: 'auth/logout',
        }),
      }),
    }
  },
})

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
} = authApi