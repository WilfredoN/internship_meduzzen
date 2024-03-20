import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface StringSliceState {
  value: string;
}

const initialState: StringSliceState = {
  value: '',
};

const stringSlice = createSlice({
  name: 'string',
  initialState,
  reducers: {
    setStringValue: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { setStringValue } = stringSlice.actions;

export default stringSlice.reducer;
