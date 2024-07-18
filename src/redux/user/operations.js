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
      console.log(error);
      return thunkAPI.rejectWithValue(error.message);
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
      return thunkAPI.rejectWithValue(error.message);
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

export const refreshUserToken = createAsyncThunk(
  'user/refreshUserToken',
  async (_, thunkAPI) => {
    const {
      user: { refreshToken },
    } = thunkAPI.getState();

    const { data } = await instance.get('/api/users/refresh', {
      headers: { Authorization: `Bearer ${refreshToken}` },
    });

    setAuthHeader(data.accessToken);

    return data;
  },
  {
    condition: (_, { getState }) => {
      const {
        user: { refreshToken },
      } = getState();

      return refreshToken !== null;
    },
  },
);

export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async (_, thunkAPI) => {
    try {
      const { data } = await instance.get(`/api/users/current`);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (userData, thunkAPI) => {
    console.log(userData);
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

export const updateAvatar = createAsyncThunk(
  'user/updateAvatar',
  async (avatarFile, thunkAPI) => {
    try {
      const {
        user: { user },
      } = thunkAPI.getState();
      const { data } = await instance.put(
        `/api/users/${user._id}`,
        avatarFile,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
