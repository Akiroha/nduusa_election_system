import { configureStore } from '@reduxjs/toolkit';
import userSlice from './user-slice';
import orgSlice from './org-slice';

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    org: orgSlice.reducer,
  },
});

export type StateType = ReturnType<typeof store.getState>;

export type DispatchType = typeof store.dispatch;

export default store;
