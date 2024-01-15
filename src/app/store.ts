import { configureStore } from '@reduxjs/toolkit'
import { authApi } from '../features/auth/auth.api'
import { usersApi } from '../features/test/users.api'
 
export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware()
    .concat(authApi.middleware)
    .concat(usersApi.middleware),
})