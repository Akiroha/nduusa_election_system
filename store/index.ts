import { configureStore } from '@reduxjs/toolkit';
import userSlice from './user-slice';
import snackSlice from './snack-slice';
import networkSlice from './network-slice';
import electionYearSlice from './election-year-slice';

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    snack: snackSlice.reducer,
    network: networkSlice.reducer,
    election_year: electionYearSlice.reducer,
  },
});

export type StateType = ReturnType<typeof store.getState>;

export type DispatchType = typeof store.dispatch;

export default store;
