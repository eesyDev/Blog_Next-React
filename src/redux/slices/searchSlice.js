import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  searchData: null,
  filteredPosts: null,
  query: '',
  loading: false,
  error: null,
};

export const fetchSearchData = createAsyncThunk(
    'search/fetchSearchData',
    async (query) => {
      const response = await axios.get(`http://127.0.0.1:8000/api/v1/search/?q=${query}`);
      return response.data;
    }
);

export const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
      updateQuery: (state, action) => {
        state.query = action.payload;
      },
      updateFilteredPosts: (state, action) => {
        state.filteredPosts = action.payload;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchSearchData.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchSearchData.fulfilled, (state, action) => {
          state.searchData = action.payload;
          state.loading = false;
          state.error = null;
        })
        .addCase(fetchSearchData.rejected, (state, action) => {
          state.searchData = null;
          state.loading = false;
          state.error = action.error;
        });
    },
  });
  export const { updateQuery, updateFilteredPosts } = searchSlice.actions;
  export default searchSlice.reducer;
