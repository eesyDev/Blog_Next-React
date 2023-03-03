import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  postData: null,
  loading: false,
  error: null,
};

export const fetchPostData = createAsyncThunk(
    'posts/fetchPostData',
    async (postSlug) => {
      const response = await axios.get(`http://127.0.0.1:8000/api/v1/posts/${postSlug}`);
      return response.data;
    }
);

  
  export const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchPostData.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchPostData.fulfilled, (state, action) => {
          state.postData = action.payload;
          state.loading = false;
          state.error = null;
        })
        .addCase(fetchPostData.rejected, (state, action) => {
          state.postData = null;
          state.loading = false;
          state.error = action.error;
        });
    },
  });
  
  export default postSlice.reducer;