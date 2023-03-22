import { createSlice } from "@reduxjs/toolkit";

export const notFoundSlice = createSlice({
    name: 'notFound',
    initialState: false,
    reducers: {
        setNotFound: (state, action) => action.payload,
    },
});

export const {setNotFound} = notFoundSlice.actions;

export default notFoundSlice.reducer;