import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
  name : 'movies',
  initialState: {
    nowPlaying : null,
    trailerVideo : null,
    popular: null,
    topRated: null,
    upcoming: null,
    loadingOrErrorState: true
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
    },
    addTopRatedMovies: (state, action) => {
      state.topRated = action.payload;
    },
    addUpcomingMovies: (state, action) => {
      state.upcoming = action.payload;
    },
    addLoadingOrErrorState: (state, action) => {
      state.loadingOrErrorState = action.payload;
    }
  }
});

export const { addNowPlayingMovies, addMovieTrailer, 
  addPopularMovies, addTopRatedMovies, addUpcomingMovies, addLoadingOrErrorState } = moviesSlice.actions;
export default moviesSlice.reducer;