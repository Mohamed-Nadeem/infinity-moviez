import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// TMDB API Key
const API_KEY = "15ff4b4d4b4e86b16795f529edd47022";

// Initial State
const initialState = {
  popularMovies: [],
  recentMovies: [],
  topRatedMovies: [],
  genres: [],
  genreMovies: [],
  trailers: {},
  loading: false,
  error: null,
};

// Fetch most popular movies
export const fetchPopularMovies = createAsyncThunk(
  "movies/fetchPopularMovies",
  async () => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
    );
    return response.data.results;
  }
);

// Fetch most recent movies
export const fetchRecentMovies = createAsyncThunk(
  "movies/fetchRecentMovies",
  async () => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}`
    );
    return response.data.results;
  }
);

// Fetch all-time highest-rated movies
export const fetchTopRatedMovies = createAsyncThunk(
  "movies/fetchTopRatedMovies",
  async () => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/discover/movie`,
      {
        params: {
          api_key: API_KEY,
          sort_by: "vote_average.desc", // Sort by highest ratings
          "vote_count.gte": 1000, // Include movies with at least 1000 votes
        },
      }
    );
    return response.data.results;
  }
);

// Fetch all genres
export const fetchGenres = createAsyncThunk("movies/fetchGenres", async () => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`
  );
  return response.data.genres;
});

// Fetch trailers by id
export const fetchMovieTrailers = createAsyncThunk(
  "movies/fetchMovieTrailers",
  async (movieId) => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API_KEY}`
    );
    const trailer = response.data.results.find(
      (video) => video.type === "Trailer" && video.site === "YouTube"
    );
    return trailer ? `https://www.youtube.com/embed/${trailer.key}` : null;
  }
);

// Fetch movies by genre
export const fetchMoviesByGenre = createAsyncThunk(
  "movies/fetchMoviesByGenre",
  async (genreId) => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${genreId}`
    );
    return response.data.results;
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
      // Top Rated Movies
      .addCase(fetchTopRatedMovies.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTopRatedMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.topRatedMovies = action.payload;
      })
      .addCase(fetchTopRatedMovies.rejected, (state, action) => {
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
      })
      //Trailer
      .addCase(fetchMovieTrailers.fulfilled, (state, action) => {
        state.loading = false;
        state.trailers[action.meta.arg] = action.payload;
      })
      .addCase(fetchMovieTrailers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Movies by Genre
      .addCase(fetchMoviesByGenre.fulfilled, (state, action) => {
        state.genreMovies = action.payload;
        state.loading = false;
      })
      .addCase(fetchMoviesByGenre.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default movieSlice.reducer;
