import { createSlice } from '@reduxjs/toolkit';
import { fetchUser, logout, updateUser } from './operations';

const handlePending = state => {
  state.isLoading = true;
};

const handleRejected = state => {
  state.isLoading = false;
};

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: {
      id: '',
      name: '',
      email: '',
      avatarURL: '',
      gender: '',
      weight: 0,
      activeTime: 0,
      liters: 0,
    },
    token: null,
    isLoggedIn: false,
    isRefreshing: false,
    isLoading: false,
  },
  extraReducers: builder =>
    builder
      .addCase(fetchUser.pending, handlePending)
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, handleRejected)
      .addCase(updateUser.pending, handlePending)
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(updateUser.rejected, handleRejected)
      .addCase(logout.pending, handlePending)
      .addCase(logout.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = {
          id: '',
          name: '',
          email: '',
          avatarURL: '',
          gender: '',
          weight: 0,
          activeTime: 0,
          liters: 0,
        };
        state.token = null;
        state.isLoggedIn = false;
        state.isRefreshing = false;
      })
      .addCase(logout.rejected, handleRejected),
});

export default userSlice.reducer;
