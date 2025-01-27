import { Bar } from "react-chartjs-2";
import PropTypes from "prop-types";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register required chart components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const TopRatedMoviesChart = ({ movies }) => {
  const labels = movies.map((movie) => movie.title);
  const votes = movies.map((movie) => movie.vote_average);

  const data = {
    labels,
    datasets: [
      {
        label: "Rating",
        data: votes,
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 2,
        hoverBackgroundColor: "rgba(255, 99, 132, 0.8)",
        hoverBorderColor: "rgba(255, 99, 132, 1)",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        enabled: true,
        usePointStyle: true,
        external: (context) => {
          // Custom external tooltip using HTML
          const tooltipEl = document.getElementById("chartjs-tooltip");
          const tooltipModel = context.tooltip;

          if (tooltipModel.opacity === 0) {
            tooltipEl.style.opacity = 0;
            return;
          }

          // Set custom content
          const movieIndex = tooltipModel.dataPoints[0].dataIndex;
          const movie = movies[movieIndex];
          tooltipEl.innerHTML = `
            <div style="text-align: center; padding: 8px; color: #fff;">
              <strong>${movie.title}</strong><br/>
              Language: ${movie.original_language}<br/>
              Rating: ${movie.vote_average} ⭐<br/>
              ${
                movie.poster_path
                  ? `<img 
                      src="https://image.tmdb.org/t/p/w200${movie.poster_path}" 
                      alt="Poster" 
                      style="width: 80px; height: auto; margin-top: 8px; border-radius: 5px; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);" 
                    />`
                  : "Poster not available."
              }
            </div>
          `;

          // Position tooltip
          const position = context.chart.canvas.getBoundingClientRect();
          tooltipEl.style.opacity = 1;
          tooltipEl.style.left =
            position.left + window.pageXOffset + tooltipModel.caretX + "px";
          tooltipEl.style.top =
            position.top + window.pageYOffset + tooltipModel.caretY + "px";
          tooltipEl.style.pointerEvents = "none";
        },
      },
      legend: {
        position: "top",
        labels: {
          color: "#ffffff",
        },
      },
      title: {
        display: true,
        text: "Top 20 Highest-Rated Movies",
        color: "#ffffff",
        font: {
          size: 20,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#ffffff",
          autoSkip: false,
          maxRotation: 45,
          minRotation: 0,
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: "#ffffff",
        },
        title: {
          display: true,
          text: "Rating",
          color: "#ffffff",
        },
      },
    },
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg mb-8 overflow-x-auto">
      <div id="chartjs-tooltip" style={{ position: "absolute", opacity: 0 }}></div>
      <div
        style={{
          minWidth: "500px", // Ensures the chart doesn't get too small on mobile
          height: "400px",
        }}
      >
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

TopRatedMoviesChart.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      vote_average: PropTypes.number.isRequired,
      original_language: PropTypes.string.isRequired,
      poster_path: PropTypes.string,
    })
  ).isRequired,
};

export default TopRatedMoviesChart;
