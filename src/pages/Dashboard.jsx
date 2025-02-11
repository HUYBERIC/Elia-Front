import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

const Dashboard = () => {
  const [requests, setRequests] = useState([]);
  const [replacements, setReplacements] = useState([]);

  useEffect(() => {
    // Fonction pour récupérer les demandes
    const fetchRequests = async () => {
      try {
        const response = await fetch("https://elia-back.vercel.app/api/requests", {
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
        const response = await fetch("https://elia-back.vercel.app/api/replacements", {
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
      <div className="feed">
        

        <h3>Replacements</h3>
        {replacements.length === 0 ? (
          <p>No replacements</p>
        ) : (
          replacements.slice().reverse().map((replacement) => (
            <p key={replacement._id}>
              <strong>{replacement.replacingUserId?.firstName}</strong> remplace
              le shift de{" "}  
              <strong>{replacement.replacedUserId?.firstName}</strong> le{" "}
              {new Date(replacement.startTime).toLocaleDateString()} de{" "}
              {new Date(replacement.startTime).toLocaleTimeString()} jusqu'au{" "}
              {new Date(replacement.endTime).toLocaleDateString()} à{" "}
              {new Date(replacement.endTime).toLocaleTimeString()}.
            </p>
          ))
        )}
      </div>
      <Navbar />
    </div>
  );
};

export default Dashboard;

