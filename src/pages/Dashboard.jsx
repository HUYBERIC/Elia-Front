import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

const Dashboard = () => {
  const [replacements, setReplacements] = useState([]);

  useEffect(() => {    
    const fetchApprovedRequests = async () => {
      try {
        const response = await fetch(
          "https://tema-eduty-backend.torvalds.be/api/requests/accepted",
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          }
        );

        if (!response.ok) throw new Error("Failed to fetch approved requests");

        const approvedRequests = await response.json();

        let detectedReplacements = [];

        approvedRequests.forEach((request) => {
          if (request.shift && request.shift.segments) {
            request.shift.segments.forEach((segment) => {              
              if (
                new Date(segment.startTime).getTime() ===
                  new Date(request.askedStartTime).getTime() &&
                new Date(segment.endTime).getTime() ===
                  new Date(request.askedEndTime).getTime()
              ) {
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
                <span className="user">{replacement.replacingUser}</span>{" "}
                replaces{" "}
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
                    timeZone: "UTC",
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
                    timeZone: "UTC",
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
