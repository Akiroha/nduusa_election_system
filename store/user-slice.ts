import { UserType } from '@/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Props {
  value: UserType;
}

const initialState: Props = {
  value: {
    id: undefined,
    active: undefined,
    branch: undefined,
    created_at: undefined,
    phone: undefined,
    name: undefined,
    password: undefined,
    type: undefined,
    voted: undefined,
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserType>) {
      state.value = action.payload;
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice;
