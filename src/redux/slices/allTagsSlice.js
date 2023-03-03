import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  allTagsData: null,
  loading: false,
  error: null,
};

export const fetchAllTagsData = createAsyncThunk(
    'tags/fetchAllTagsData',
    async () => {
      const response = await axios.get(`http://127.0.0.1:8000/api/v1/tags`);
      return response.data;
    }
);

  
  export const allTagSlice = createSlice({
    name: 'allTags',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchAllTagsData.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchAllTagsData.fulfilled, (state, action) => {
          state.allTagsData = action.payload;
          state.loading = false;
          state.error = null;
        })
        .addCase(fetchAllTagsData.rejected, (state, action) => {
          state.allTagsData = null;
          state.loading = false;
          state.error = action.error;
        });
    },
  });
  
  export default allTagSlice.reducer;