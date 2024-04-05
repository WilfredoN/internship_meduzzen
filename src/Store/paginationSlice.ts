import { createSlice } from '@reduxjs/toolkit';

const paginationSlice = createSlice({
    name: 'pagination',
    initialState: {
        page: 1,
    },
    reducers: {
        updatePage: (state, action) => {
            state.page = action.payload;
        },
    },
});

export const { updatePage } = paginationSlice.actions;

export default paginationSlice.reducer;