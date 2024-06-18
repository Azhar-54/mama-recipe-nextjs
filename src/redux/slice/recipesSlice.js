import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPopularRecipes = createAsyncThunk(
  'recipes/fetchPopularRecipes',
  async (page) => {
    const RECIPES_PER_PAGE = 6;
    const response = await axios.get(`https://pijar-mama-recipe.vercel.app/v1/recipes`, {
      params: { page, limit: RECIPES_PER_PAGE }
    });
    return response.data.data;
  }
);

const initialState = {
  popularRecipes: [],
  loading: false,
  error: null,
  currentPage: 1,
};

const recipesSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPopularRecipes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPopularRecipes.fulfilled, (state, action) => {
        state.loading = false;
        state.popularRecipes = action.payload;
      })
      .addCase(fetchPopularRecipes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setCurrentPage } = recipesSlice.actions;
export default recipesSlice.reducer;
