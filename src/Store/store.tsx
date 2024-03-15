import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the initial state
const initialState: { value: string } = { value: '' };

// Define the slice
const testStringSlice = createSlice({
  name: 'testStringValue',
  initialState,
  reducers: {
    setTestString: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { setTestString } = testStringSlice.actions;

export default testStringSlice.reducer;
