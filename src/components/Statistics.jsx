import { FaCheck } from "react-icons/fa";
import { CgUnavailable } from "react-icons/cg";

const Statistics = () => {
  return (
    <div className="statistics-container">
      <h3>Real-time availability</h3>
      <div className="stats-grid">
        {/* Available Users */}
        <div className="column-available">
          <FaCheck className="icon" />
          <p>Bart</p>
          <p>Rico</p>
          <p>Jousè</p>
          <p>Clothaire</p>
          <p>Selçuk</p>
        </div>

        {/* Unavailable Users */}
        <div className="column-unavailable">
          <CgUnavailable className="icon" />
          <p>Claude</p>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
