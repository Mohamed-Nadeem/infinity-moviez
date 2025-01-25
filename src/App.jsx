import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies } from "./features/movieSlice";
import Navbar from "./components/Navbar";
import MovieCard from "./components/MovieCard";
import "./index.css";

const App = () => {
  const dispatch = useDispatch();
  const { movies, status } = useSelector((state) => state.movie);
  console.log({ movies, status });

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <Navbar />
      <div className="bg-gray-900 text-white p-4">
        Welcome to Infinity Moviez!
      </div>
      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {status === "loading" ? (
          <p>Loading movies...</p>
        ) : (
          movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)
        )}
      </div>
    </div>
  );
};

export default App;
