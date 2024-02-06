import { createSlice } from '@reduxjs/toolkit'

type Props = {
  userId: string
  userEmail: string
  isAuthenticated: boolean
}

const userInfoSlice = createSlice({
  name: 'generalInfo',
  initialState: <Props>{
    userId: '',
    userEmail: '',
  },
  reducers: {
    setUserInfo(state, action) {
      state.userId = action.payload.user.id
      state.userEmail = action.payload.user.email
      state.isAuthenticated = true
    },
  },
})

export const { setUserInfo } = userInfoSlice.actions
export default userInfoSlice.reducer