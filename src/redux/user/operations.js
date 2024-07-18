import { createAsyncThunk } from '@reduxjs/toolkit';
import instance from '../../API/axiosInstance';
import toast from 'react-hot-toast';

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
      const response = {
        message: error.response.data.message,
        statusCode: error.response.status,
      };
      console.log('Response.statusCode Type: ', typeof response.statusCode);
      if (response.statusCode === 401) {
        toast.error('Email or password is wrong');
      } else {
        toast.error('Login failed');
      }
      return thunkAPI.rejectWithValue(response);
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
      const response = {
        message: error.response.data.message,
        statusCode: error.response.status,
      };
      if (response.statusCode === 409) {
        toast.error('This email is already used');
      }
      return thunkAPI.rejectWithValue(response);
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
      const response = {
        message: error.response.data.message,
        statusCode: error.response.status,
      };
      return thunkAPI.rejectWithValue(response);
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
      const response = {
        message: error.response.data.message,
        statusCode: error.response.status,
      };
      return thunkAPI.rejectWithValue(response);
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
