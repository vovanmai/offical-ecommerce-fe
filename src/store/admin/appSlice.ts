import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from './store'

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    theme: {
    },
    colorPrimary: 'rgb(20 184 166)',
  },
  reducers: {
    setTheme: (state, action) => {
      state.theme = {...state.theme, ...action.payload}
    }
  },
})

export const { setTheme } = appSlice.actions

export const getTheme = (state: RootState) => state.app.theme
export const getPrimaryColor = (state: RootState) => state.app.colorPrimary

export default appSlice.reducer