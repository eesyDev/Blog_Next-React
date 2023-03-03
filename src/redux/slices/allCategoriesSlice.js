import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  allCategoriesData: null,
  loading: false,
  error: null,
};

export const fetchAllCategoriesData = createAsyncThunk(
  'allCategories/fetchAllCategoriesData',
  async () => {
    const response = await axios.get('http://127.0.0.1:8000/api/v1/category');
    return response.data;
  }
);

export const allCategoriesSlice = createSlice({
  name: 'allCategories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCategoriesData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllCategoriesData.fulfilled, (state, action) => {
        state.allCategoriesData = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchAllCategoriesData.rejected, (state, action) => {
        state.allCategoriesData = null;
        state.loading = false;
        state.error = action.error;
      });
  },
});

export default allCategoriesSlice.reducer;
