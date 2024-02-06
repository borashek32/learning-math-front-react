import { RootState } from "../../common/providers/model/store"

export const selectUserId = (state: RootState) => state.userInfo.userId
export const selectUserEmail = (state: RootState) => state.userInfo.userEmail
export const selectIsAuthenticated = (state: RootState) => state.userInfo.isAuthenticated