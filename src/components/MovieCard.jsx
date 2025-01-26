import PropTypes from 'prop-types';

const MovieCard = ({ movie }) => {
  return (
    <div className="bg-gray-800 p-2 rounded shadow hover:shadow-lg transition">
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className="w-full h-72 object-cover rounded"
      />
      <h3 className="text-sm mt-2">{movie.title}</h3>
    </div>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    poster_path: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default MovieCard;
