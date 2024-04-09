import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import { useDispatch } from 'react-redux';
import companiesSlice from './companiesSlice';

const store = configureStore({
    reducer: {
        user: userReducer,
        companies: companiesSlice,
    },
});

export type AppDispatch = typeof store.dispatch;
export default store;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export type RootState = ReturnType<typeof store.getState>;