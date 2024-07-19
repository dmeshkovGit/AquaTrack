import { createSlice } from '@reduxjs/toolkit';
import { addWater, getDayWater, deleteWater } from './operations';

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
      })
      .addCase(getDayWater.pending, state => {
        state.loading = true;
      })
      .addCase(getDayWater.fulfilled, (state, action) => {
        state.loading = false;
        state.dayWater = action.payload.flat();
      })
      .addCase(getDayWater.rejected, state => {
        state.loading = false;
      })
      .addCase(deleteWater.pending, state => {
        state.loading = true;
      })
      .addCase(deleteWater.fulfilled, (state, action) => {
        state.loading = false;
        state.dayWater = state.dayWater.filter(
          item => item._id !== action.payload._id,
        );
      })
      .addCase(deleteWater.rejected, state => {
        state.loading = false;
      }),
});

export default slice.reducer;
