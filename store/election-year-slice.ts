import { ElectionYearType } from '@/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Props {
  value: ElectionYearType;
}

const initialState: Props = {
  value: {
    id: undefined,
    created_at: undefined,
    year: undefined,
    voting_starts: undefined,
    voting_ends: undefined,
  },
};

const electionYearSlice = createSlice({
  name: 'election_year',
  initialState,
  reducers: {
    setElectionYear(state, action: PayloadAction<ElectionYearType>) {
      state.value = action.payload;
    },
  },
});

export const electionYearActions = electionYearSlice.actions;

export default electionYearSlice;
