import { configureStore } from '@reduxjs/toolkit';
import userSlice from './user-slice';
import orgSlice from './org-slice';
import snackSlice from './snack-slice';
import networkSlice from './network-slice';

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    org: orgSlice.reducer,
    snack: snackSlice.reducer,
    network: networkSlice.reducer,
  },
});

export type StateType = ReturnType<typeof store.getState>;

export type DispatchType = typeof store.dispatch;

export default store;
