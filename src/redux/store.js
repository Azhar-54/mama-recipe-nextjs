import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slice/authSlice';
import formReducer from './slice/formSlice.js'
import recipesReducer from './slice/recipesSlice.js'
import recipeReducer from './slice/feature/recipeSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    form: formReducer,
    recipes: recipesReducer,
    recipe: recipeReducer,

  },
});

export default store;
