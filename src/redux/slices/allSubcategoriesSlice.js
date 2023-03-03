import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  allSubcategoriesData: null,
  loading: false,
  error: null,
};

export const fetchAllSubcategoriesData = createAsyncThunk(
    'subcategories/fetchAllSubcategoriesData',
    async () => {
      const response = await axios.get(`http://127.0.0.1:8000/api/v1/subcategory`);
      return response.data;
    }
);

  
  export const allSubcategoriesSlice = createSlice({
    name: 'allSubcategories',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchAllSubcategoriesData.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchAllSubcategoriesData.fulfilled, (state, action) => {
          state.allSubcategoriesData = action.payload;
          state.loading = false;
          state.error = null;
        })
        .addCase(fetchAllSubcategoriesData.rejected, (state, action) => {
          state.allSubcategoriesData = null;
          state.loading = false;
          state.error = action.error;
        });
    },
  });
  
  export default allSubcategoriesSlice.reducer;