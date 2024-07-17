import { createAsyncThunk } from '@reduxjs/toolkit';
import instance from '../../API/axiosInstance';

export const addWater = createAsyncThunk(
  'water/addWater',
  async (newNote, thunkAPI) => {
    try {
      const response = await instance.post('api/water', newNote);
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
