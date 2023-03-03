import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  allPostsData: null,
  loading: false,
  error: null,
};

export const fetchAllPostsData = createAsyncThunk(
    'posts/fetchAllPostsData',
    async () => {
      const response = await axios.get(`http://127.0.0.1:8000/api/v1/posts/`);
      return response.data;
    }
);

  
  export const allPostsSlice = createSlice({
    name: 'allPosts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchAllPostsData.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchAllPostsData.fulfilled, (state, action) => {
          state.allPostsData = action.payload;
          state.loading = false;
          state.error = null;
        })
        .addCase(fetchAllPostsData.rejected, (state, action) => {
          state.allPostsData = null;
          state.loading = false;
          state.error = action.error;
        });
    },
  });
  
  export default allPostsSlice.reducer;