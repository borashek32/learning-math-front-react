import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserType } from './auth.types'

interface UserInfoState {
  user: UserType | null
}

const initialState: UserInfoState = {
  user: null,
} as UserInfoState

const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    setUserInfo(state, action: PayloadAction<UserType>) {
      state.user = action.payload
      const userEmail = action.payload.email
      const userId = action.payload.id
      localStorage.setItem('userEmail', userEmail)
      localStorage.setItem('userId', userId)
    },
    removeUserInfo(state) {
      state.user = null
      localStorage.removeItem('userEmail')
      localStorage.removeItem('userId')
    }
  },
})

export const { setUserInfo, removeUserInfo } = userInfoSlice.actions
export default userInfoSlice.reducer