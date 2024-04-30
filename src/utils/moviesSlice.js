import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
  name : 'movies',
  initialState: {
    nowPlaying : null,
    trailerVideo : null,
    popular: null
  },
  reducers: {
    addNowPlayingMovies: (state, action) => {
      state.nowPlaying = action.payload;
    },
    addMovieTrailer : (state, action) => {
      state.trailerVideo = action.payload;
    },
    addPopularMovies: (state, action) => {
      state.popular = action.payload;
    }
  }
});

export const { addNowPlayingMovies, addMovieTrailer, addPopularMovies } = moviesSlice.actions;
export default moviesSlice.reducer;