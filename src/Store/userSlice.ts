import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: { user: null, isAuth: false },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            state.isAuth = true;
        },
        resetUser: (state) => {
            state.user = null;
            state.isAuth = false;
        },
        setIsAuth: (state, action) => {
            state.isAuth = action.payload;
        },
    },
});

export const { setUser, resetUser, setIsAuth } = userSlice.actions;

export default userSlice.reducer;