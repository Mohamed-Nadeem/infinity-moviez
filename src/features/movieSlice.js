import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://api.themoviedb.org/3";
const API_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNWZmNGI0ZDRiNGU4NmIxNjc5NWY1MjllZGQ0NzAyMiIsIm5iZiI6MTczNzcxODMyMS41NTAwMDAyLCJzdWIiOiI2NzkzN2EzMTBhMzBkNmQwNTkyMzkzMmUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.BOq6rR-WzbdwEYo0lh0V9j0Ekkfr-m9heHY3IUWqhPY";

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: { Authorization: `Bearer ${API_TOKEN}` },
});

export const fetchMovies = createAsyncThunk("movie/fetchMovies", async () => {
  console.log("Fetching movies...");
  const response = await axiosInstance.get("/movie/popular");
  return response.data.results;
});

const movieSlice = createSlice({
  name: "movie",
  initialState: { movies: [], status: "idle" },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.movies = action.payload;
      })
      .addCase(fetchMovies.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default movieSlice.reducer;
