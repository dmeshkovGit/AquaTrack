export const selectDayWater = state => state.water.dayWater.water || [];
export const selectIsLoading = state => state.water.loading;
export const selectActiveDay = state => state.water.activeDay;
export const selectCurrentDayWater = state => state.water.currentDay;
export const selectMonthWater = state => state.water.mounthWater;
export default { selectDayWater };
