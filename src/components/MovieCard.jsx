import PropTypes from "prop-types";

const MovieCard = ({ movie }) => (
  <div className="bg-gray-700 p-4 rounded-lg shadow-md">
    <img
      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
      alt={movie.title}
      className="w-full h-64 object-cover rounded-md"
    />
    <h2 className="text-lg font-semibold mt-2">{movie.title}</h2>
    <p className="text-sm text-gray-400">Rating: {movie.vote_average}/10</p>
  </div>
);

MovieCard.propTypes = {
  movie: PropTypes.shape({
    poster_path: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    vote_average: PropTypes.number.isRequired,
  }).isRequired,
};

export default MovieCard;
