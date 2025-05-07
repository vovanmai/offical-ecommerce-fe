import { configureStore } from '@reduxjs/toolkit'
import appReducer from "@/store/user/appSlice"
import authReducer from '@/store/user/authSlice'
import cartReducer from '@/store/user/cartSlice'

// Cấu hình store
const store = configureStore({
  reducer: {
    app: appReducer,
    auth: authReducer,
    cart: cartReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
