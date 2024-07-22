export const selectDayWater = state => state.water.dayWater.water || [];
export const selectIsLoading = state => state.water.loading;
export const selectActiveDay = state => state.water.activeDay;
export default { selectDayWater };
