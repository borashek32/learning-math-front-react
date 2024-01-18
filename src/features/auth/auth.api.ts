import { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { baseURL } from '../../common/baseUrl'
import { RegistedUserType, RegisterType } from './auth.types'
import { algByDecodingToken } from '../../common/utils/algByDecodingToken'

const baseQuery = fetchBaseQuery({
  baseUrl: baseURL,
  method: 'POST',
  credentials: 'same-origin',
  prepareHeaders: headers => {
    const token = localStorage.getItem('accessToken')

    if (token) {
      headers.set('Authorization', `Bearer ${token}`)
      algByDecodingToken(token)
    }

    return headers
  },
})

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  let result = await baseQuery(args, api, extraOptions)

  if (result.error && result.error.status === 401) {
    const token = localStorage.getItem('accessToken')

    if (!token) {
      throw new Error('Token not found')
    }

    const { isExpirationTimeLongerThanCurrent } = algByDecodingToken(token)

    if (!isExpirationTimeLongerThanCurrent) {
      const refreshResult = await baseQuery(`${baseURL}auth/update-tokens`, api, extraOptions)

      if (
        refreshResult.data &&
        typeof refreshResult.data === 'object' &&
        'accessToken' in refreshResult.data
      ) {
        localStorage.setItem('accessToken', refreshResult.data.accessToken as string)
      }
    }
  }

  if (
    api.endpoint === 'login' &&
    result.data &&
    typeof result.data === 'object' &&
    'accessToken' in result.data
  ) {
    localStorage.setItem('accessToken', result.data.accessToken as string)
  }

  if (api.endpoint === 'logout') {
    localStorage.removeItem('accessToken')
  }

  return result
}

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryWithReauth,
  endpoints: build => {
    return {
      login: build.mutation<RegistedUserType, RegisterType>({
        query: ({ email, password }: RegisterType) => {
          return {
            method: 'POST',
            url: 'login',
            body: {
              email,
              password,
            },
          }
        },
      }),
      signUp: build.mutation<RegistedUserType, RegisterType>({
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
      verify: build.query<any, string | undefined>({
        query: verificationLink => `verify/${verificationLink}`,
      }),
      logout: build.mutation<any, void>({
        query: () => ({
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken') as string}`,
          },
          method: 'POST',
          url: 'logout',
        }),
      }),
      me: build.query<any, any>({
        query: () => `refresh`
      }),
    }
  },
})

export const {
  useLoginMutation,
  useSignUpMutation,
  useVerifyQuery,
  useLogoutMutation,
} = authApi