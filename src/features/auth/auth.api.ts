import { BaseQueryFn, FetchArgs, FetchBaseQueryError, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { baseURL } from '../../common/baseUrl'
import { 
  ForgotPasswordType, 
  RegistedUserType, 
  RegisterType, 
  PasswordRecoveryType,
} from './auth.types'
import { algByDecodingToken } from '../../common/utils/algByDecodingToken'

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

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  let result = await baseQuery(args, api, extraOptions)

  console.log(result)

  if (result.error && result.error.status === 401) {
    console.log(result)

    const token = localStorage.getItem('accessToken')

    if (!token) {
      console.log('Token not found')
      throw new Error('Token not found')
    }

    const { isExpirationTimeLongerThanCurrent } = algByDecodingToken(token)

    if (!isExpirationTimeLongerThanCurrent) {
      console.log('access token expired')

      const refreshResult = await baseQuery({ 
          method: 'GET', 
          url: `${baseURL}refresh`,
        }, 
        api, 
        extraOptions
      )
      console.log('refreshResult', refreshResult)

      if (
        refreshResult.data &&
        typeof refreshResult.data === 'object' &&
        'accessToken' in refreshResult.data &&
        'refreshToken' in refreshResult.data
      ) {
        localStorage.setItem('accessToken', refreshResult.data.accessToken as string)
        document.cookie = `
          refreshToken=${refreshResult.data.refreshToken}; 
          Secure; 
          SameSite=None; 
          Max-Age='30d'; 
          Path=/;
        `
      }
    }
  }

  if (
    (api.endpoint === 'login' || api.endpoint === 'refresh') &&
    result.data &&
    typeof result.data === 'object' &&
    'accessToken' in result.data &&
    'refreshToken' in result.data
  ) {
    localStorage.setItem('accessToken', result.data.accessToken as string)
    document.cookie = `
      refreshToken=${result.data.refreshToken}; 
      Secure; 
      SameSite=None; 
      Max-Age='30d'; 
      Path=/;
    `
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
        query: () => {

          console.log('logout api')

          return {
            method: 'POST',
            url: 'logout',
          }
        },  
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
      // me: build.query<RegistedUserType, void>({
      //   query: () => {
      //     console.log('me')
      //     return {
      //       method: 'GET',
      //       url: 'me',
      //     }
      //   },
      //   providesTags: ['me'],
      // }),
      refresh: build.query<any, void>({
        query: () => {
          return {
            method: 'GET',
            url: 'refresh'
          }
        }
      })
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
  // useMeQuery,
  useRefreshQuery,
} = authApi