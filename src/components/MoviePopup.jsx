import PropTypes from "prop-types";
import { useEffect } from "react";
const MoviePopup = ({ movie, onClose }) => {
  useEffect(() => {
    if (movie?.id) {
      console.log("Fetching genres for movie:", movie?.id);
    }
  }, [movie?.id]);

  if (!movie) return null;

  const {
    title,
    overview,
    vote_average,
    original_language,
    release_date,
    trailer,
  } = movie;

  return (
    <div
      className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-gray-900 text-white rounded-2xl shadow-lg w-11/12 md:w-3/4 lg:w-1/2 p-6 relative"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
      >
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-300"
          onClick={onClose}
        >
          ✖
        </button>
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <p className="text-sm text-gray-400 mb-4">{overview}</p>
        <p className="text-gray-400">
          <strong>Rating:</strong> {vote_average} ⭐
        </p>
        <p className="text-gray-400">
          <strong>Release Date:</strong> {release_date}
        </p>
        <p className="text-gray-400">
          <strong>Language:</strong> {original_language}
        </p>
        <div className="genre-list mt-4">
          <strong>Genres:</strong>{" "}
        </div>
        <div className="mt-4">
          {trailer ? (
            <div className="mb-4">
              <iframe
                width="100%"
                height="315"
                src={trailer}
                title={`${title} Trailer`}
                frameBorder="0"
                className="rounded-lg"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          ) : (
            <p className="text-gray-500">Sorry! Trailer not available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

MoviePopup.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string,
    overview: PropTypes.string,
    vote_average: PropTypes.number,
    original_language: PropTypes.string,
    release_date: PropTypes.string,
    trailer: PropTypes.string,
    id: PropTypes.number,
  }),
  onClose: PropTypes.func.isRequired,
};

export default MoviePopup;
