import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaSearch } from "react-icons/fa";
import {
  fetchPopularMovies,
  fetchRecentMovies,
  fetchTopRatedMovies,
  fetchGenres,
  fetchMovieTrailers,
  fetchMoviesByGenre,
} from "./redux/movieSlice";
import MoviePopup from "./components/MoviePopup";
import MovieSlider from "./components/MovieSlider";
import TopRatedMoviesChart from "./components/TopRatedMoviesChart";
import "./index.css";

const HomePage = () => {
  const dispatch = useDispatch();
   // Access the global state from Redux state
  const {
    popularMovies,
    recentMovies,
    topRatedMovies,
    genres,
    trailers,
    genreMovies,
    loading,
    error,
  } = useSelector((state) => state.movies);

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState("Select a Genre...");

  // Fetch data on component mount
  useEffect(() => {
    dispatch(fetchPopularMovies());
    dispatch(fetchRecentMovies());
    dispatch(fetchGenres());
    dispatch(fetchTopRatedMovies());
  }, [dispatch]);

  // Filter movies based on search query
  useEffect(() => {
    if (searchQuery) {
      const combinedMovies = [...popularMovies, ...recentMovies, ...topRatedMovies];
      
      // Remove duplicates based on movie ID
      const uniqueMovies = Array.from(
        new Map(combinedMovies.map((movie) => [movie.id, movie])).values()
      );
  
      // Filter the uniqueMovies by the search query
      const results = uniqueMovies.filter((movie) =>
        movie.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
  
      setFilteredMovies(results);
    } else {
      setFilteredMovies([]);
    }
  }, [searchQuery, popularMovies, recentMovies, genreMovies, topRatedMovies]);

  // Handle movie click event for Popup
  const handleMovieClick = (movie) => {
    setSelectedMovie(movie); // Open the popup with movie details
    if (!trailers[movie.id]) {
      dispatch(fetchMovieTrailers(movie.id));
    }
  };

   // Close the popup
  const closePopup = () => {
    setSelectedMovie(null); 
  };

 // Handle genre click event
  const handleGenreClick = (genre) => {
    setSelectedGenre(genre.name);
    dispatch(fetchMoviesByGenre(genre.id));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="bg-gray-900 text-white min-h-screen p-4 ">
      <header className="flex justify-between items-center p-4 bg-gray-900 text-white mb-8">
        <div className="flex items-center">
          <img src="/logo.png" alt="Logo" className="w-12 h-12 mr-2" />
          <h1 className="text-2xl font-bold">Infinity Moviez</h1>
        </div>
        <div className="relative">
          <input
            type="text"
            placeholder="Search movies..."
            className="px-4 py-2 rounded-full bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring focus:ring-gray-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <FaSearch className="absolute right-4 top-3 text-gray-500" />
        </div>
      </header>

      {/* Show Search Results */}
      {searchQuery && (
        <div>
          <h2 className="text-2xl font-bold mb-2">Search Results</h2>
          {filteredMovies.length > 0 ? (
            <MovieSlider
              movies={filteredMovies}
              onMovieClick={handleMovieClick}
            />
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
            <MovieSlider
              movies={popularMovies}
              onMovieClick={handleMovieClick}
            />
          </section>

          {/* Recent Movies Slider */}
          <section>
            <h2 className="text-2xl font-bold mb-2">Recent Movies</h2>
            <MovieSlider
              movies={recentMovies}
              onMovieClick={handleMovieClick}
            />
          </section>

           {/* Top Rated Movies Chart */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">All Time Top Rated Movies</h2>
            {topRatedMovies.length > 0 ? (
              <TopRatedMoviesChart movies={topRatedMovies.slice(0, 20)} />
            ) : (
              <p>No top-rated movies available...</p>
            )}
          </section>

          {/* Genre Categories */}
          <section>
            <div className="genres">
              <h2 className="text-2xl font-bold mb-4">Genres</h2>
              <div className="flex flex-wrap gap-4">
                {genres.map((genre) => (
                  <button
                    key={genre.id}
                    onClick={() => handleGenreClick(genre)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-800"
                  >
                    {genre.name}
                  </button>
                ))}
              </div>

              {/* Genre Movies Slider */}
              <div className="genre-slider mt-6">
                {loading ? (
                  <p>Loading...</p>
                ) : (
                  <section>
                    <h2 className="text-2xl font-bold mb-2">{selectedGenre}</h2>
                    <MovieSlider
                      movies={genreMovies}
                      onMovieClick={handleMovieClick}
                    />
                  </section>
                )}
              </div>
            </div>
          </section>
        </>
      )}
      {/* Popup Component */}
      {selectedMovie && (
        <div>
          <div className="frosted-background" onClick={closePopup}></div>
          <div className="popup-content">
            <MoviePopup
              movie={{
                ...selectedMovie,
                trailer: trailers[selectedMovie.id] || null,
              }}
              onClose={closePopup}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
