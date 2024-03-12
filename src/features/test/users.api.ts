import { BaseQueryFn, FetchArgs, FetchBaseQueryError, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { baseURL } from '../../common/baseUrl/baseUrl'
import { UserType } from '../auth/auth.api.types'
import { algByDecodingToken } from '../../common/utils/string/algByDecodingToken'

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

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: baseQueryWithReauth,
  endpoints: build => {
    return {
      users: build.query<UserType[], void>({
        query: () => ({
          // headers: {
          //   Authorization: `Bearer ${localStorage.getItem('accessToken') as string}`,
          // },
          method: 'GET',
          url: 'users',
        }),
      }),
    }
  },
})

export const { useUsersQuery } = usersApi
