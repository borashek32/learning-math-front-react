import { RootState } from "./../common/providers/model/store"

const selectIsInitialized = (state: RootState) => state.app.isInitialized
const selectAppLang = (state: RootState) => state.app.appLang

export {
  selectIsInitialized,
  selectAppLang
}