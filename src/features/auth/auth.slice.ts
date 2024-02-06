import { createSlice } from '@reduxjs/toolkit'

type Props = {
  userId: string
  userEmail: string
}

const userInfoSlice = createSlice({
  name: 'generalInfo',
  initialState: <Props>{
    userId: '',
    userEmail: '',
  },
  reducers: {
    setUserInfo(state, action) {
      console.log('payload', action.payload)
      state.userId = action.payload.user.id
      state.userEmail = action.payload.user.email
    },
  },
})

export const { setUserInfo } = userInfoSlice.actions
export default userInfoSlice.reducer