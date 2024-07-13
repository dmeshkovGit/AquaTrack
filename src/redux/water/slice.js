import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'water',
  initialState: {
    dayWater: [],
  },
  extraReducers: builder => builder,
});

export default slice.reducer;
