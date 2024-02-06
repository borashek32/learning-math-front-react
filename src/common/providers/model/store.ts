import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit'
import { authApi } from '../../../features/auth/auth.api'
import { usersApi } from '../../../features/test/users.api'
import { setupListeners } from '@reduxjs/toolkit/query'
import userInfoReducer from './../../../features/auth/auth.slice'
 
export const store = configureStore({
  reducer: {
    userInfo: userInfoReducer,
    [authApi.reducerPath]: authApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware()
    .concat(authApi.middleware)
    .concat(usersApi.middleware),
})

setupListeners(store.dispatch)

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>