import { FaCheck } from "react-icons/fa";
import { CgUnavailable } from "react-icons/cg";
import ChartStats from "./ChartStats";
import BarChart from "./BarChart";

const Statistics = () => {
  return (
    <div className="statistics-container">
      <h3>Real-time availability</h3>
      <div className="stats-grid">
        {/* Available Users */}
        <div className="column-available">
          <FaCheck className="icon" />
          <p>Tib</p>
          <p>Rico</p>
          <p>Tony</p>
          <p>Maxou</p>
          <p>Bart</p>
        </div>

        {/* Unavailable Users */}
        <div className="column-unavailable">
          <CgUnavailable className="icon" />
          <p>Jeff</p>
        </div>
      </div><ChartStats />
      <BarChart />
    </div>
  );
};

export default Statistics;
