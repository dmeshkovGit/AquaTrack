import { createAsyncThunk } from '@reduxjs/toolkit';
import instance from '../../API/axiosInstance';

export const getDayWater = createAsyncThunk(
  'water/DayWater',
  async (date, thunkAPI) => {
    try {
      if (new Date(date).getTime() > new Date().getTime()) {
        return [];
      }
      if (
        new Date(date).getTime() <
        new Date('2023-01-01T00:00:00.000Z').getTime()
      ) {
        return [];
      }
      const response = await instance.get(`api/water/day/${date}`);
      return response.data.WaterData;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.message);
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
      console.log(error);
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const editWater = createAsyncThunk(
  'water/editWater',
  async ({ id, newNote }, thunkAPI) => {
    try {
      const response = await instance.put(`api/water/${id}`, newNote);
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export default { deleteWater, getDayWater, addWater };
