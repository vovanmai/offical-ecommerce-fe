import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@/store/admin/store'


const initialState = {
  currentUser: null,
};

// Tạo slice
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<any>) => {
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
