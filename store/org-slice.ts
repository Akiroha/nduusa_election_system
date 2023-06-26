import { OrgType } from '@/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Props {
  value: OrgType;
}

const initialState: Props = {
  value: {
    id: undefined,
    created_at: undefined,
    voting_starts: undefined,
    voting_ends: undefined,
    voting_open: undefined,
  },
};

const orgSlice = createSlice({
  name: 'org',
  initialState,
  reducers: {
    setOrg(state, action: PayloadAction<OrgType>) {
      state.value = action.payload;
    },
  },
});

export const orgActions = orgSlice.actions;

export default orgSlice;
