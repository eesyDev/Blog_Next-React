import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  subcategoryData: null,
  loading: false,
  error: null,
};

export const fetchSubcategoryData = createAsyncThunk(
    'subcategory/fetchSubcategoryData',
    async (subcategorySlug) => {
      const response = await axios.get(`http://127.0.0.1:8000/api/v1/subcategory/${subcategorySlug}`);
      return response.data;
    }
);

  
  export const subcategorySlice = createSlice({
    name: 'subcategory',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchSubcategoryData.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchSubcategoryData.fulfilled, (state, action) => {
          state.subcategoryData = action.payload;
          state.loading = false;
          state.error = null;
        })
        .addCase(fetchSubcategoryData.rejected, (state, action) => {
          state.subcategoryData = null;
          state.loading = false;
          state.error = action.error;
        });
    },
  });
  
  export default subcategorySlice.reducer;