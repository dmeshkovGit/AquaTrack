import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    isLoggedIn: false,
    isRefreshing: false,
    isLoading: false,
  },
});

export default authSlice.reducer;
