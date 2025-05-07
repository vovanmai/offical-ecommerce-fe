import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// Khởi tạo state
const initialState: any = {
  carts: [],
};

// Tạo slice
export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCarts: (state, action: PayloadAction<any>) => {
      state.carts = action.payload;
    },
  },
});

export const { setCarts } = cartSlice.actions;

// Export reducer
export default cartSlice.reducer;
