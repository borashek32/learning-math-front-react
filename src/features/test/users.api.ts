import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseURL } from '../../common/baseUrl';
import { UserType } from '../auth/auth.types';

// Получаем токен из localStorage
const token = localStorage.getItem('accessToken');

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: baseURL,
    credentials: 'same-origin',
    headers: { Authorization: `Bearer ${token}` }, // Используем токен здесь
    prepareHeaders: headers => {
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: build => {
    return {
      users: build.query<UserType, void>({
        query: () => 'users',
      }),
    };
  },
});

export const { useUsersQuery } = usersApi;
