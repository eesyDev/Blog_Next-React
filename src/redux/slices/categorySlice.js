import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  categoryData: null,
  loading: false,
  error: null,
};

export const fetchCategoryData = createAsyncThunk(
    'category/fetchCategoryData',
    async (categorySlug) => {
      const response = await axios.get(`http://127.0.0.1:8000/api/v1/category/${categorySlug}`);
      return response.data;
    }
);

  
  export const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchCategoryData.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchCategoryData.fulfilled, (state, action) => {
          state.categoryData = action.payload;
          state.loading = false;
          state.error = null;
        })
        .addCase(fetchCategoryData.rejected, (state, action) => {
          state.categoryData = null;
          state.loading = false;
          state.error = action.error;
        });
    },
  });
  
  export default categorySlice.reducer;