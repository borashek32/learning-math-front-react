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
    },
    // removeUserInfo(state) {
    //   state.user = null
    // }
  },
})

export const { setUserInfo } = userInfoSlice.actions
export default userInfoSlice.reducer