import { createAsyncThunk } from '@reduxjs/toolkit';
import instance from '../../API/axiosInstance';
import toast from 'react-hot-toast';

export const getDayWater = createAsyncThunk(
  'water/DayWater',
  async (date, thunkAPI) => {
    try {
      const response = await instance.get(`api/water/day/1704844800000`);
      return response.data.WaterData;
    } catch (error) {
      const response = {
        message: error.response.data.message,
        statusCode: error.response.status,
      };

      if (response.statusCode === 404) {
        toast.error('Data not found');
      } else {
        toast.error('Failed to fetch data');
      }

      return thunkAPI.rejectWithValue(response);
    }
  },
);

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

export const deleteWater = createAsyncThunk(
  'water/deleteWater',
  async (id, thunkAPI) => {
    try {
      const response = await instance.delete(`api/water/${id}`);
      return response.data;
    } catch (error) {
      const response = {
        message: error.response.data.message,
        statusCode: error.response.status,
      };

      if (response.statusCode === 404) {
        toast.error('Data not found');
      } else {
        toast.error('Failed to delete data');
      }

      return thunkAPI.rejectWithValue(response);
    }
  },
);

export default { deleteWater, getDayWater, addWater };
