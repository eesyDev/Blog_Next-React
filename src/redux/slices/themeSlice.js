import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  mode: 'light',
};

const themeSlice = createSlice({
  name: 'mode',
  initialState,
  reducers: {
    setMode: (state, action) => {
      state.mode = action.payload;
    },
  },
});

export const { setMode } = themeSlice.actions;

export default themeSlice.reducer;
