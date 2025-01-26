import PropTypes from 'prop-types';

const MoviePopup = ({ movie, onClose }) => {
  if (!movie) return null;

  const {
    title,
    description,
    rating,
    awards,
    nominations,
    language,
    country,
    trailer,
  } = movie;

  return (
    <div
      className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-lg w-11/12 md:w-3/4 lg:w-1/2 p-6 relative"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
      >
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
          onClick={onClose}
        >
          ✖
        </button>
        <h2 className="text-2xl font-bold mb-4 text-black">{title}</h2>
        <p className="text-sm text-gray-700 mb-4">{description}</p>
        <p className="text-gray-600">
          <strong>Rating:</strong> {rating}
        </p>
        <p className="text-gray-600">
          <strong>Awards:</strong> {awards || "N/A"}
        </p>
        <p className="text-gray-600">
          <strong>Nominations:</strong> {nominations || "N/A"}
        </p>
        <p className="text-gray-600">
          <strong>Language:</strong> {language}
        </p>
        <p className="text-gray-600">
          <strong>Country:</strong> {country}
        </p>
        {trailer && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Trailer:</h3>
            <iframe
              width="100%"
              height="300px"
              src={trailer}
              title={`${title} Trailer`}
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
        )}
      </div>
    </div>
  );
};

MoviePopup.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    rating: PropTypes.number,
    awards: PropTypes.string,
    nominations: PropTypes.string,
    language: PropTypes.string,
    country: PropTypes.string,
    trailer: PropTypes.string,
  }),
  onClose: PropTypes.func.isRequired,
};

export default MoviePopup;
