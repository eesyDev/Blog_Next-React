import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  sidebarCategoryData: null,
  loading: false,
  error: null,
};

export const fetchSidebarCategoryData = createAsyncThunk(
  'sidebarCategory/fetchSidebarCategoryData',
  async () => {
    const response = await axios.get('http://127.0.0.1:8000/api/v1/subcategory/stocks');
    return response.data;
  }
);

export const sidebarCategorySlice = createSlice({
  name: 'sidebarCategory',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSidebarCategoryData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSidebarCategoryData.fulfilled, (state, action) => {
        state.sidebarCategoryData = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchSidebarCategoryData.rejected, (state, action) => {
        state.sidebarCategoryData = null;
        state.loading = false;
        state.error = action.error;
      });
  },
});

export default sidebarCategorySlice.reducer;
