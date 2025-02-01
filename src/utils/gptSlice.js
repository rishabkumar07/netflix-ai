import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
  name: 'gpt',
  initialState : {
    showGPTSearchView : false,
    error: null,
    movieNames: null,
    movieResults: null
  },
  reducers: {
    toggleGPTSearch : (state) => {
      state.showGPTSearchView = !state.showGPTSearchView;
    },
    addGptMovies: (state, action) => {
      const { movieNames, movieResults } = action.payload;
      state.movieNames = movieNames;
      state.movieResults = movieResults;
    },
    removeGptMovies: (state) => {
      state.movieNames = null;
      state.movieResults = null;
    },
    showError: (state, action) => {
      state.error = action.payload;
    }
  }
});

export const { toggleGPTSearch, addGptMovies, removeGptMovies, showError } = gptSlice.actions;
export default gptSlice.reducer;