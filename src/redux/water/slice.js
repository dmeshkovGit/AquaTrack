import { createSlice } from '@reduxjs/toolkit';
import { addWater } from './operations';

const slice = createSlice({
  name: 'water',
  initialState: {
    dayWater: [],
    loading: false,
  },
  extraReducers: builder =>
    builder
      .addCase(addWater.pending, state => {
        state.loading = true;
      })
      .addCase(addWater.fulfilled, (state, action) => {
        state.loading = false;
        state.dayWater.push(action.payload);
      })
      .addCase(addWater.rejected, state => {
        state.loading = false;
      }),
});

export default slice.reducer;
