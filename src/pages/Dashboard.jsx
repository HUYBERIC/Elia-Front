import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

const Dashboard = () => {
  const [replacements, setReplacements] = useState([]);

  useEffect(() => {
    const fetchApprovedRequests = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/requests/accepted", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });

        if (!response.ok) throw new Error("Failed to fetch approved requests");

        const approvedRequests = await response.json();
        let detectedReplacements = [];
        const now = new Date(); // Date actuelle

        approvedRequests.forEach((request) => {
          if (request.shift && request.shift.segments) {
            request.shift.segments.forEach((segment) => {
              const startTime = new Date(segment.startTime);
              const endTime = new Date(segment.endTime);

              if (
                startTime.getTime() === new Date(request.askedStartTime).getTime() &&
                endTime.getTime() === new Date(request.askedEndTime).getTime()
              ) {
                // Vérifier que le shift a commencé il y a moins de 24h
                if (now - startTime < 24 * 60 * 60 * 1000) {
                  detectedReplacements.push({
                    id: segment.id,
                    replacingUser: request.receiverId
                      ? `${request.receiverId.firstName} ${request.receiverId.lastName}`
                      : "Utilisateur inconnu",
                    replacedUser: request.requesterId
                      ? `${request.requesterId.firstName} ${request.requesterId.lastName}`
                      : "Utilisateur inconnu",
                    startTime: segment.startTime,
                    endTime: segment.endTime,
                  });
                }
              }
            });
          }
        });

        setReplacements(detectedReplacements);
      } catch (error) {
        console.error("Error fetching approved requests:", error);
      }
    };

    fetchApprovedRequests();
  }, []);

  return (
    <div className="feed-container">
      <div className="title">
        <h3>Approved Replacements</h3>
      </div>
      <div className="notifs">
        {replacements.length === 0 ? (
          <p>No approved replacements</p>
        ) : (
          replacements.map((replacement) => (
            <div
              key={`${replacement.replacingUser}-${replacement.replacedUser}-${replacement.startTime}`}
              className="notif"
            >
              <p className="notif-content">
                <span className="user">{replacement.replacingUser}</span> replaces{" "}
                <span className="user">{replacement.replacedUser}</span> <br />
                <span className="from-to">from</span> :{" "}
                <span className="bold">
                  {new Date(replacement.startTime).toLocaleDateString("fr-FR")}
                </span>{" "}
                -{" "}
                <span className="bold">
                  {new Date(replacement.startTime).toLocaleTimeString("fr-FR", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                  })}
                </span>{" "}
                <br />
                <span className="from-to">to</span> :{" "}
                <span className="bold">
                  {new Date(replacement.endTime).toLocaleDateString("fr-FR")}
                </span>{" "}
                -{" "}
                <span className="bold">
                  {new Date(replacement.endTime).toLocaleTimeString("fr-FR", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                  })}
                </span>
                .
              </p>
            </div>
          ))
        )}
      </div>
      <Navbar />
    </div>
  );
};

export default Dashboard;
