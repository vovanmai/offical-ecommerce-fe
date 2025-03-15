import { configureStore } from '@reduxjs/toolkit'
import appReducer from "@/store/admin/appSlice"
import authReducer from '@/store/admin/authSlice'

// Cấu hình store
const store = configureStore({
  reducer: {
    app: appReducer,
    auth: authReducer, // Đảm bảo authReducer được đăng ký đúng
  },
})

// Export kiểu RootState và Dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
