import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type NetworkProps = {
  isOnline: boolean;
};

const initState: NetworkProps = {
  isOnline: true,
};

const networkSlice = createSlice({
  name: 'network',
  initialState: initState,
  reducers: {
    updateNetworkStatus(state, action: PayloadAction<{ isOnline: boolean }>) {
      state.isOnline = action.payload.isOnline;
    },
  },
});

export const networkActions = networkSlice.actions;

export default networkSlice;
