import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@/store/admin/store'

// Định nghĩa kiểu dữ liệu cho currentUser
interface User {
  id: number | null;
  name: string | null;
}

interface AuthState {
  currentUser: User | null;
}

// Khởi tạo state
const initialState: AuthState = {
  currentUser: null,
};

// Tạo slice
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<User | null>) => {
      state.currentUser = action.payload;
    },
  },
});

// Export actions
export const { setCurrentUser } = authSlice.actions;

// Selector để lấy currentUser
export const selectCurrentUser = (state: RootState) => state.auth.currentUser;


// Export reducer
export default authSlice.reducer;
