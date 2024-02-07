import { RootState } from "../../common/providers/model/store"

export const selectUserId = (state: RootState) => state.userInfo.user?.id
export const selectUserEmail = (state: RootState) => state.userInfo.user?.email