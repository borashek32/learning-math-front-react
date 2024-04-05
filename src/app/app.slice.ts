import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AppState {
  isInitialized: boolean
  appLang: string
}

const initialState: AppState = {
  isInitialized: false,
  appLang: 'ru'
} as AppState

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setIsInitialized(state, action: PayloadAction<AppState>) {
      state.isInitialized = action.payload.isInitialized
      state.appLang = action.payload.appLang
    },
    setAppLang(state, action: PayloadAction<string>) {
      state.appLang = action.payload
    }
  },
})

export const { setIsInitialized, setAppLang } = appSlice.actions
export const appReducer = appSlice.reducer