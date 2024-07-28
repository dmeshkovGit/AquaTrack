import { createAsyncThunk } from '@reduxjs/toolkit';
import instance from '../../API/axiosInstance';
import toastMaker from '../../shared/helpers/toastMaker/toastMaker';

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
    if (newNote.date > new Date().getTime()) {
      toastMaker("You can't drink water in the future", 'error');
      return;
    }

    if (newNote.date < 1672524000) {
      toastMaker('You cannot select a date before 01.01.2023', 'error');
      return;
    }

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

export const getMonthInfo = createAsyncThunk(
  'water/getMonthInfo',
  async (date, thunkAPI) => {
    try {
      const { data } = await instance.get(`api/water/month/${date}`);
      return data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export default { deleteWater, getDayWater, addWater };
