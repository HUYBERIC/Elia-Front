import Navbar from "../components/Navbar";

const Dashboard = () => {
  return (
    <div className="feed-container">
      <div className="feed">
        <p>User1 requested duty switch @day-month-year (status: accepted)</p>
        <p>User5 accepted request from User1</p>
        <p>User1's request has been completed</p>
        <p>User3 requested duty switch @day-month-year (status: pending)</p>
      </div>
      <Navbar />
    </div>
  );
};

export default Dashboard;
