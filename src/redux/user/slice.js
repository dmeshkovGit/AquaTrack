import { createSlice } from '@reduxjs/toolkit';
import {
  fetchUser,
  login,
  logout,
  refreshUserToken,
  register,
  updateAvatar,
  updateUser,
} from './operations';

const handlePending = state => {
  state.isLoading = true;
};

const handleRejected = state => {
  state.isLoading = false;
};

const slice = createSlice({
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
      theme: '',
    },
    token: null,
    refreshToken: null,
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
        state.refreshToken = action.payload.refreshToken;
        state.user = action.payload.user;
      })
      .addCase(register.rejected, handleRejected)
      .addCase(login.pending, handlePending)
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.refreshToken = action.payload.refreshToken;
      })
      .addCase(login.rejected, handleRejected)
      .addCase(refreshUserToken.pending, state => {
        state.isLoading = true;
        state.isRefreshing = true;
      })
      .addCase(refreshUserToken.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.isRefreshing = false;
        state.isLoggedIn = true;
      })
      .addCase(refreshUserToken.rejected, state => {
        state.isLoading = false;
        state.isRefreshing = false;
      })
      .addCase(logout.pending, handlePending)
      .addCase(logout.fulfilled, state => {
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
        state.refreshToken = null;
        state.isLoggedIn = false;
        state.isRefreshing = false;
      })
      .addCase(logout.rejected, handleRejected)
      .addCase(fetchUser.pending, handlePending, state => {
        state.isRefreshing = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
        state.isRefreshing = false;
      })
      .addCase(fetchUser.rejected, handleRejected, state => {
        state.isRefreshing = false;
      })
      .addCase(updateUser.pending, handlePending)
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(updateUser.rejected, handleRejected)
      .addCase(updateAvatar.pending, handlePending)
      .addCase(updateAvatar.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user.avatarURL = action.payload.avatarURL;
      })
      .addCase(updateAvatar.rejected, handleRejected),
});

export default slice.reducer;
