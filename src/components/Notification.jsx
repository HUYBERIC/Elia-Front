import React, { useEffect, useState } from "react";

const Notification = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch("https://elia-back.vercel.app/api/requests", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // Si besoin d'authentification avec cookies
        });

        if (!response.ok) {
          throw new Error("Failed to fetch requests");
        }

        const data = await response.json();
        setRequests(data);
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    };

    fetchRequests();
  }, []);

  const handleAccept = async (requestId) => {
    try {
      const response = await fetch(
        `https://elia-back.vercel.app/api/requests/accept/${requestId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ requestId }),
        }
      );

      if (response.ok) {
        setRequests(requests.filter((request) => request._id !== requestId));
      } else {
        alert("Failed to accept request");
      }
    } catch (error) {
      console.error("Error accepting request:", error);
    }
  };

  const handleDecline = async (requestId) => {
    try {
      const response = await fetch(
        `https://elia-back.vercel.app/api/requests/${requestId}/decline`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (response.ok) {
        setRequests(requests.filter((request) => request._id !== requestId));
      } else {
        alert("Failed to decline request");
      }
    } catch (error) {
      console.error("Error declining request:", error);
    }
  };

  const getEmergencyClass = (level) => {
    switch (level) {
      case "low":
        return "emergency-low";
      case "medium":
        return "emergency-medium";
      case "high":
        return "emergency-high";
      default:
        return "";
    }
  };

  return (
    <div className="notification-container">
      {requests.length === 0 ? (
        <p>No new notifications</p>
      ) : (
        requests
          .slice()
          .reverse()
          .map((request) => (
            <div key={request._id} className="notification-content">
              <svg
                width="40px"
                height="40px"
                viewBox="-0.5 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18.2202 21.25H5.78015C5.14217 21.2775 4.50834 21.1347 3.94373 20.8364C3.37911 20.5381 2.90402 20.095 2.56714 19.5526C2.23026 19.0101 2.04372 18.3877 2.02667 17.7494C2.00963 17.111 2.1627 16.4797 2.47015 15.92L8.69013 5.10999C9.03495 4.54078 9.52077 4.07013 10.1006 3.74347C10.6804 3.41681 11.3346 3.24518 12.0001 3.24518C12.6656 3.24518 13.3199 3.41681 13.8997 3.74347C14.4795 4.07013 14.9654 4.54078 15.3102 5.10999L21.5302 15.92C21.8376 16.4797 21.9907 17.111 21.9736 17.7494C21.9566 18.3877 21.7701 19.0101 21.4332 19.5526C21.0963 20.095 20.6211 20.5381 20.0565 20.8364C19.4919 21.1347 18.8581 21.2775 18.2202 21.25V21.25Z"
                  stroke="red"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10.8809 17.15C10.8809 17.0021 10.9102 16.8556 10.9671 16.7191C11.024 16.5825 11.1074 16.4586 11.2125 16.3545C11.3175 16.2504 11.4422 16.1681 11.5792 16.1124C11.7163 16.0567 11.8629 16.0287 12.0109 16.03C12.2291 16.034 12.4413 16.1021 12.621 16.226C12.8006 16.3499 12.9398 16.5241 13.0211 16.7266C13.1023 16.9292 13.122 17.1512 13.0778 17.3649C13.0335 17.5786 12.9272 17.7745 12.7722 17.9282C12.6172 18.0818 12.4203 18.1863 12.2062 18.2287C11.9921 18.2711 11.7703 18.2494 11.5685 18.1663C11.3666 18.0833 11.1938 17.9426 11.0715 17.7618C10.9492 17.5811 10.8829 17.3683 10.8809 17.15ZM11.2409 14.42L11.1009 9.20001C11.0876 9.07453 11.1008 8.94766 11.1398 8.82764C11.1787 8.70761 11.2424 8.5971 11.3268 8.5033C11.4112 8.40949 11.5144 8.33449 11.6296 8.28314C11.7449 8.2318 11.8697 8.20526 11.9959 8.20526C12.1221 8.20526 12.2469 8.2318 12.3621 8.28314C12.4774 8.33449 12.5805 8.40949 12.6649 8.5033C12.7493 8.5971 12.8131 8.70761 12.852 8.82764C12.8909 8.94766 12.9042 9.07453 12.8909 9.20001L12.7609 14.42C12.7609 14.6215 12.6808 14.8149 12.5383 14.9574C12.3957 15.0999 12.2024 15.18 12.0009 15.18C11.7993 15.18 11.606 15.0999 11.4635 14.9574C11.321 14.8149 11.2409 14.6215 11.2409 14.42Z"
                  fill="red"
                />
              </svg>
              <div className="notification-text">
                <div className="notification-message">
                  <p>
                    <span className="notification-user">
                      {`${request.requesterId.firstName} ${request.requesterId.lastName}`}
                    </span>{" "}
                    requests a replacement from{" "}
                    <span className="notification-date">
                      {new Date(request.askedStartTime).toLocaleString(
                        "fr-FR",
                        {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: false,
                          timeZone: "Europe/Paris",
                        }
                      )}
                    </span>{" "}
                    to{" "}
                    <span className="notification-date">
                      {new Date(request.askedEndTime).toLocaleString("fr-FR", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false,
                        timeZone: "Europe/Paris",
                      })}
                    </span>
                    .
                  </p>
                  <p>
                    Emergency Level:{" "}
                    <strong
                      className={getEmergencyClass(request.emergencyLevel)}
                    >
                      {request.emergencyLevel}
                    </strong>
                  </p>
                  <p className="time">
                    {timeSince(new Date(request.createdAt))}
                  </p>
                </div>
                <div className="notification-actions">
                  <button
                    className="btn primary"
                    onClick={() => handleAccept(request._id)}
                  >
                    Accept
                  </button>
                </div>
              </div>
            </div>
          ))
      )}
    </div>
  );
};

// Fonction pour calculer le temps écoulé depuis la création
const timeSince = (date) => {
  const now = new Date();
  const targetDate = new Date(date);

  // Conversion en timestamps pour éviter les erreurs de fuseau horaire
  const nowUTC = now.getTime();
  const targetDateUTC = targetDate.getTime();

  // Calcul de la différence en secondes
  const seconds = Math.floor((nowUTC - targetDateUTC + 3600000) / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  if (minutes < 1) return "Just now"; // Empêche l'affichage de valeurs négatives

  if (hours >= 1) return `${hours} ${hours === 1 ? "hour ago" : "hours ago"}`;
  return `${minutes} ${minutes === 1 ? "minute ago" : "minutes ago"}`;
};

export default Notification;
