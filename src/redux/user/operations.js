import { createAsyncThunk } from '@reduxjs/toolkit';
import instance from '../../API/axiosInstance';

const setAuthHeader = token => {
  instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};
const clearAuthHeader = () => {
  instance.defaults.headers.common['Authorization'] = '';
};

export const login = createAsyncThunk(
  'user/login',
  async (userInfo, thunkAPI) => {
    try {
      const { data } = await instance.post('/api/users/login', userInfo);
      setAuthHeader(data.token);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const register = createAsyncThunk(
  'user/register',
  async (userInfo, thunkAPI) => {
    try {
      const { data } = await instance.post('/api/users/register', userInfo);
      setAuthHeader(data.token);
      login(userInfo);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const logout = createAsyncThunk('user/logout', async (_, thunkAPI) => {
  try {
    const { data } = await instance.post('/api/users/logout');
    clearAuthHeader();
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const refreshUser = createAsyncThunk(
  'user/refresh',
  async (_, thunkAPI) => {
    const {
      user: { token },
    } = thunkAPI.getState();

    setAuthHeader(token);
    const { data } = await instance.get('/api/users/refresh');

    return data;
  },
  {
    condition: (_, { getState }) => {
      const {
        user: { token },
      } = getState();

      return token !== null;
    },
  },
);

export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async (id, thunkAPI) => {
    try {
      const { data } = await instance.get(`/api/users/${id}`);
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
      const { data } = await instance.put(
        `/api/users/${userData._id}`,
        userData,
      );
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
