import { configureStore } from '@reduxjs/toolkit';
import testStringReducer from './StringSlice';

export const store = configureStore({
  reducer: {
    testString: testStringReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
