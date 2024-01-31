import { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { baseURL } from '../../common/baseUrl'
import { ForgotPasswordType, RegistedUserType, RegisterType, PasswordRecoveryType, UserType } from './auth.types'
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

  if (
    api.endpoint === 'me' &&
    result.data &&
    typeof result.data === 'object' &&
    'accessToken' in result.data
  ) {
    localStorage.getItem('accessToken')
  }

  if (api.endpoint === 'logout') {
    localStorage.removeItem('accessToken')
  }

  return result
}

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['me'],
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
        invalidatesTags: ['me'],
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
      verify: build.query<string, string | undefined>({
        query: verificationLink => `verify/${verificationLink}`,
      }),
      logout: build.mutation<any, void>({
        query: () => ({
          method: 'POST',
          url: 'logout',
        }),
        invalidatesTags: ['me'],
      }),
      emailSent: build.mutation<any, ForgotPasswordType>({
        query: ({ email }: ForgotPasswordType) => {
          return {
            url: 'forgot-password',
            method: 'POST',
            body: {
              email
            },
          }
        },
      }),
      createNewPassword: build.mutation<any, PasswordRecoveryType>({
        query: ({ email, password }: PasswordRecoveryType) => {
          return {
            url: `create-new-password`,
            method: 'POST',
            body: {
              password,
              email
            }
          }
        },
      }),
      me: build.query<RegistedUserType, void>({
        query: () => {
          return {
            method: 'GET',
            url: 'me',
          }
        },
        providesTags: ['me'],
      }),
    }
  },
})

export const {
  useLoginMutation,
  useSignUpMutation,
  useVerifyQuery,
  useLogoutMutation,
  useEmailSentMutation,
  useCreateNewPasswordMutation,
  useMeQuery,
} = authApi