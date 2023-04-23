import { createSlice } from '@reduxjs/toolkit';

export const mainPageSlice = createSlice({
    name: 'MainPage',
    initialState: {
        selectedFilter: ['react'],
    },

    reducers: {
        setSelectedFilter: (state, action) => {
            state.selectedFilter = action.payload;
        },
    },
});

export const {
    setSelectedFilter,
} = mainPageSlice.actions;

export default mainPageSlice.reducer;
