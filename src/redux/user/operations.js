import { createAsyncThunk } from '@reduxjs/toolkit';
import instance from '../../API/axiosInstance';

const setAuthHeader = token => {
  instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};
const clearAuthHeader = () => {
  instance.defaults.headers.common['Authorization'] = '';
};

export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async (id, thunkAPI) => {
    try {
      const data = await axios.get(`/${id}`);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (userData, thunkAPI) => {
    try {
      const data = await axios.put(`/api/users/${userData.id}`, userData);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const logout = createAsyncThunk('user/logout', async (_, thunkAPI) => {
  try {
    const { data } = await axios.post('/api/users/logout');
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});
