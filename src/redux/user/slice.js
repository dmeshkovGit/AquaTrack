import { createSlice } from '@reduxjs/toolkit';
import {
  fetchUser,
  login,
  logout,
  refreshUser,
  register,
  updateUser,
} from './operations';

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
      .addCase(register.pending, handlePending)
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload.token;
        state.user.email = action.payload.user.email;
        state.user.id = action.payload.user.id;
        state.isLoggedIn = true;
      })
      .addCase(register.rejected, handleRejected)
      .addCase(login.pending, handlePending)
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.isLoggedIn = true;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, handleRejected)
      .addCase(refreshUser.pending, state => {
        state.isLoading = true;
        state.isRefreshing = true;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isRefreshing = false;
        state.isLoggedIn = true;
      })
      .addCase(refreshUser.rejected, state => {
        state.isLoading = false;
        state.isRefreshing = false;
      })
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
      .addCase(logout.rejected, handleRejected)
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
      .addCase(updateUser.rejected, handleRejected),
});

export default userSlice.reducer;
