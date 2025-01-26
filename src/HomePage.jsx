import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPopularMovies,
  fetchRecentMovies,
  fetchGenres,
} from "./redux/movieSlice";
import MovieSlider from "./components/MovieSlider";

const App = () => {
  const dispatch = useDispatch();
  const { popularMovies, recentMovies, genres, loading, error } = useSelector(
    (state) => state.movies
  );

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredMovies, setFilteredMovies] = useState([]);

  // Fetch data on component mount
  useEffect(() => {
    dispatch(fetchPopularMovies());
    dispatch(fetchRecentMovies());
    dispatch(fetchGenres());
  }, [dispatch]);

  // Filter movies based on search query
  useEffect(() => {
    if (searchQuery) {
      const combinedMovies = [...popularMovies, ...recentMovies];
      const results = combinedMovies.filter((movie) =>
        movie.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredMovies(results);
    } else {
      setFilteredMovies([]);
    }
  }, [searchQuery, popularMovies, recentMovies]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="bg-gray-900 text-white min-h-screen p-4">
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Infinity Moviez</h1>
        <input
          type="text"
          placeholder="Search movies..."
          className="bg-gray-800 text-white p-2 rounded"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </header>

      {/* Show Search Results */}
      {searchQuery && (
        <div>
          <h2 className="text-2xl font-bold mb-2">Search Results</h2>
          {filteredMovies.length > 0 ? (
            <MovieSlider movies={filteredMovies} />
          ) : (
            <p>No movies found for &quot;{searchQuery}&quot;</p>
          )}
        </div>
      )}

      {/* Popular Movies Slider */}
      {!searchQuery && (
        <>
          <section>
            <h2 className="text-2xl font-bold mb-2">Popular Movies</h2>
            <MovieSlider movies={popularMovies} />
          </section>

          {/* Recent Movies Slider */}
          <section>
            <h2 className="text-2xl font-bold mb-2">Recent Movies</h2>
            <MovieSlider movies={recentMovies} />
          </section>

          {/* Genre Categories (Optional) */}
          <section>
            <h2 className="text-2xl font-bold mb-2">Genres</h2>
            <div className="flex flex-wrap gap-2">
              {genres.map((genre) => (
                <span
                  key={genre.id}
                  className="bg-gray-700 px-4 py-2 rounded text-sm"
                >
                  {genre.name}
                </span>
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default App;
