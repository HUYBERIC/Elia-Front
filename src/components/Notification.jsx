import React, { useEffect, useState } from "react";

const Notification = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/requests", {
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
        `http://localhost:5000/api/requests/${requestId}/accept`,
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
        alert("Failed to accept request");
      }
    } catch (error) {
      console.error("Error accepting request:", error);
    }
  };

  const handleDecline = async (requestId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/requests/${requestId}/decline`,
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

  return (
    <div className="notification-container">
      {requests.length === 0 ? (
        <p>No new notifications</p>
      ) : (
        requests.map((request) => (
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
                stroke="#e75420"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
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
                    {new Date(request.askedStartTime).toLocaleString()}
                  </span>{" "}
                  to{" "}
                  <span className="notification-date">
                    {new Date(request.askedEndTime).toLocaleString()}
                  </span>
                  .
                </p>
                <p className="time">
                  {timeSince(new Date(request.createdAt))} ago
                </p>
                <p>
                  Emergency Level: <strong>{request.emergencyLevel}</strong>
                </p>
              </div>
              <div className="notification-actions">
                <button
                  className="btn primary"
                  onClick={() => handleAccept(request._id)}
                >
                  Accept
                </button>
                <button
                  className="btn outline"
                  onClick={() => handleDecline(request._id)}
                >
                  Decline
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
  const seconds = Math.floor((new Date() - date) / 1000);
  let interval = Math.floor(seconds / 3600);
  if (interval > 1) return `${interval} hours`;
  interval = Math.floor(seconds / 60);
  if (interval > 1) return `${interval} minutes`;
  return `${seconds} seconds`;
};

export default Notification;
