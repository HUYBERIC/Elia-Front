import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

const Dashboard = () => {
  const [requests, setRequests] = useState([]);
  const [replacements, setReplacements] = useState([]);

  useEffect(() => {
    // Fonction pour récupérer les demandes
    const fetchRequests = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/requests", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });

        if (!response.ok) throw new Error("Failed to fetch requests");

        const data = await response.json();
        setRequests(data);
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    };

    // Fonction pour récupérer les remplacements
    const fetchReplacements = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/replacements", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });

        if (!response.ok) throw new Error("Failed to fetch replacements");

        const data = await response.json();
        setReplacements(data);
      } catch (error) {
        console.error("Error fetching replacements:", error);
      }
    };

    fetchRequests();
    fetchReplacements();
  }, []);

  return (
    <div className="feed-container">
      <div className="title">
        <h3>Replacements</h3>
      </div>
      <div className="notifs">
        {replacements.length === 0 ? (
          <p>No replacements</p>
        ) : (
          replacements
            .slice()
            .reverse()
            .map(
              (replacement) =>
                new Date() - new Date(replacement.startTime) <
                  24 * 60 * 60 * 1000 && (
                  <div key={replacement._id} className="notif">
                    <p className="notif-content">
                      <span className="user">
                        {replacement.replacingUserId?.firstName}
                      </span>{" "}
                      replaces{" "}
                      <span className="user">
                        {replacement.replacedUserId?.firstName}
                      </span>{" "}
                      <br></br>
                      <span className="from-to">from</span> :{" "}
                      <span className="bold">
                        {new Date(replacement.startTime).toLocaleDateString(
                          "fr-FR"
                        )}
                      </span>{" "}
                      - {" "}
                      <span className="bold">
                        {new Date(replacement.startTime).toLocaleTimeString(
                          "fr-FR",
                          { hour: "2-digit", minute: "2-digit", hour12: false }
                        )}
                      </span>{" "}
                      <br></br>
                      <span className="from-to">to</span> :{" "}
                      <span className="bold">
                        {new Date(replacement.endTime).toLocaleDateString(
                          "fr-FR"
                        )}
                      </span>{" "}
                      - {" "}
                      <span className="bold">
                        {new Date(replacement.endTime).toLocaleTimeString(
                          "fr-FR",
                          { hour: "2-digit", minute: "2-digit", hour12: false }
                        )}
                      </span>
                      .
                    </p>
                  </div>
                )
            )
        )}
      </div>
      <Navbar />
    </div>
  );
};

export default Dashboard;
