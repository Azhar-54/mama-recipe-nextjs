import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  recipe: null,
  loading: false,
  error: null,
  liked: false,
  saved: false,
};

export const fetchRecipe = createAsyncThunk('recipe/fetchRecipe', async (id) => {
  const response = await axios.get(`https://pijar-mama-recipe.vercel.app/v1/recipes/${id}`);
  return response.data.data;
});

export const toggleLike = createAsyncThunk('recipe/toggleLike', async ({ id, token, liked }) => {
  if (liked) {
    await axios.delete(`https://pijar-mama-recipe.vercel.app/v1/recipes/like/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } else {
    await axios.post(
      'https://pijar-mama-recipe.vercel.app/v1/recipes/like',
      { recipe_id: id },
      { headers: { Authorization: `Bearer ${token}` } }
    );
  }
  return !liked;
});

export const saveRecipe = createAsyncThunk('recipe/saveRecipe', async ({ id, token, saved }) => {
  if (saved) {
    await axios.delete(`https://pijar-mama-recipe.vercel.app/v1/recipes/save/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } else {
    await axios.post(
      'https://pijar-mama-recipe.vercel.app/v1/recipes/save',
      { recipe_id: id },
      { headers: { Authorization: `Bearer ${token}` } }
    );
  }
  return !saved;
});

const recipeSlice = createSlice({
  name: 'recipe',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipe.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRecipe.fulfilled, (state, action) => {
        state.loading = false;
        state.recipe = action.payload;
      })
      .addCase(fetchRecipe.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(toggleLike.fulfilled, (state, action) => {
        state.liked = action.payload;
      })
      .addCase(saveRecipe.fulfilled, (state, action) => {
        state.saved = action.payload;
      })
      .addCase(saveRecipe.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export default recipeSlice.reducer;
