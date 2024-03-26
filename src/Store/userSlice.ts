import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: { user: null, isAuth: false, loading: true },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            state.isAuth = true;
            state.loading = false;
        },
        resetUser: (state) => {
            state.user = null;
            state.isAuth = false;
            state.loading = false;
        },
        setIsAuth: (state, action) => {
            state.isAuth = action.payload;
            state.loading = false;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
    },
});

export const { setUser, resetUser, setIsAuth, setLoading } = userSlice.actions;

export default userSlice.reducer;