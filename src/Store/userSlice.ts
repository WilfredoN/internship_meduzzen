import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: null,
    reducers: {
        setUser: (state, action) => action.payload,
        resetUser: () => null,
    },
});

export const { setUser, resetUser } = userSlice.actions;

export default userSlice.reducer;