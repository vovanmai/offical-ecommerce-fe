import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '@/store/user/store'
import { USER_PRIMARY_COLOR } from '@/constants/common'

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    theme: {
    },
    colorPrimary: USER_PRIMARY_COLOR,
    productCategories: [],
    postCategories: [],
    pages: [],
  },
  reducers: {
    setTheme: (state, action) => {
      state.theme = {...state.theme, ...action.payload}
    },
    setProductCategories: (state, action) => {
      state.productCategories = action.payload
    },
    setPostCategories: (state, action) => {
      state.postCategories = action.payload
    },
    setPages: (state, action) => {
      state.pages = action.payload
    }
  },
})

export const { setTheme,  setProductCategories, setPostCategories,setPages } = appSlice.actions

export const getTheme = (state: RootState) => state.app.theme
export const getPrimaryColor = (state: RootState) => state.app.colorPrimary

export default appSlice.reducer