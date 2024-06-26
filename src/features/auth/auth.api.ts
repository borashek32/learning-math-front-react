import { BaseQueryFn, FetchArgs, FetchBaseQueryError, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { baseURL } from '../../common/baseUrl/baseUrl'
import { 
  ForgotPasswordType, 
  RegistedUserType, 
  RegisterType, 
  PasswordRecoveryType,
  UserType,
  NewPasswordType,
  NewEmailType,
  LogoutType,
} from './auth.api.types'
import { algByDecodingToken } from '../../common/utils/string/algByDecodingToken'
import { removeUserInfo, setUserInfo } from './auth.slice'
import { useNavigate } from 'react-router-dom'

type RefreshDataType = {
  refreshToken: string
  accessToken: string
  user: UserType
}

const baseQuery = fetchBaseQuery({
  baseUrl: baseURL,
  method: 'POST',
  // mode: 'no-cors',
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

export const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  let result = await baseQuery(args, api, extraOptions)

  if (result.error && result.error.status === 401) {
    const accessToken = localStorage.getItem('accessToken')
    
    if (!accessToken) {
      throw new Error('Token not found')
    }

    const { isExpirationTimeLongerThanCurrent } = algByDecodingToken(accessToken)

    if (!isExpirationTimeLongerThanCurrent) {
      const refreshResult = await baseQuery({ 
        method: 'GET', 
        url: `${baseURL}refresh` 
      }, api, extraOptions)
      
      if (
        refreshResult.data &&
        typeof refreshResult.data === 'object' &&
        'accessToken' in refreshResult.data
      ) {
        let refreshData = refreshResult.data as RefreshDataType
        api.dispatch(setUserInfo(refreshData.user))
        localStorage.setItem('accessToken', refreshResult.data.accessToken as string)
        result = await baseQuery(args, api, extraOptions)
      } else {
        api.dispatch(removeUserInfo())
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
  tagTypes: ['me'],
  endpoints: build => {
    return {
      login: build.mutation<RegistedUserType, RegisterType>({
        query: ({ email, password, rememberMe }: RegisterType) => {
          return {
            method: 'POST',
            url: 'login',
            body: {
              email,
              password,
              rememberMe,
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
      logout: build.mutation<void, LogoutType>({
        query: (data: LogoutType) => {
          return {
            method: 'POST',
            url: 'logout',
            body: {
              accessToken: data.accessToken
            }
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
      saveNewPassword: build.mutation<any, PasswordRecoveryType>({
        query: ({ email, password }: PasswordRecoveryType) => {
          return {
            url: `save-new-password`,
            method: 'POST',
            body: {
              password,
              email
            }
          }
        },
      }),
      me: build.query<UserType | null, void>({
        query: () => {
          return {
            method: 'GET',
            url: 'me',
          }
        },
        providesTags: ['me'],
      }),
      changePassword: build.mutation<UserType, NewPasswordType>({
        query: (data: NewPasswordType) => { 
          return {
            method: 'POST',
            url: 'change-password',
            body: {
              userId: data.userId,
              password: data.password,
              newPassword: data.newPassword,
            }
          }
        }
      }),
      changeEmail: build.mutation<UserType, NewEmailType>({
        query: (data: NewEmailType) => {
          return {
            method: 'POST',
            url: 'change-email',
            body: {
              userId: data.userId,
              newEmail: data.newEmail
            }
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
  useSaveNewPasswordMutation,
  useMeQuery,
  useChangePasswordMutation,
  useChangeEmailMutation,
} = authApi