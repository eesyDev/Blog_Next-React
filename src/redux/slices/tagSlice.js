import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  tagData: null,
  loading: false,
  error: null,
};

export const fetchTagData = createAsyncThunk(
    'tags/fetchTagData',
    async (tagSlug) => {
      const response = await axios.get(`http://127.0.0.1:8000/api/v1/tags/${tagSlug}`);
      return response.data;
    }
);

  
  export const tagSlice = createSlice({
    name: 'tag',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchTagData.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchTagData.fulfilled, (state, action) => {
          state.tagData = action.payload;
          state.loading = false;
          state.error = null;
        })
        .addCase(fetchTagData.rejected, (state, action) => {
          state.tagData = null;
          state.loading = false;
          state.error = action.error;
        });
    },
  });
  
  export default tagSlice.reducer;