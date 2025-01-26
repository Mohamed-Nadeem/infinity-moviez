import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// TMDB API Key
const API_KEY = "15ff4b4d4b4e86b16795f529edd47022";

// Initial State
const initialState = {
  popularMovies: [],
  recentMovies: [],
  genres: [],
  loading: false,
  error: null,
};

// Async Thunks
export const fetchPopularMovies = createAsyncThunk(
  "movies/fetchPopularMovies",
  async () => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
    );
    return response.data.results;
  }
);

export const fetchRecentMovies = createAsyncThunk(
  "movies/fetchRecentMovies",
  async () => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}`
    );
    return response.data.results;
  }
);

export const fetchGenres = createAsyncThunk(
  "movies/fetchGenres",
  async () => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`
    );
    return response.data.genres;
  }
);

// Slice Definition
const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Popular Movies
      .addCase(fetchPopularMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPopularMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.popularMovies = action.payload;
      })
      .addCase(fetchPopularMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Recent Movies
      .addCase(fetchRecentMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRecentMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.recentMovies = action.payload;
      })
      .addCase(fetchRecentMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Genres
      .addCase(fetchGenres.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGenres.fulfilled, (state, action) => {
        state.loading = false;
        state.genres = action.payload;
      })
      .addCase(fetchGenres.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// Export Reducer
export default movieSlice.reducer;
