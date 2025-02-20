import { useState } from "react";
import Navbar from "../components/Navbar";
import SwitchRequestModal from "../components/SwitchRequestModal";
import Notification from "../components/Notification";

const Alerts = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="alertsContainer">
      <Navbar />        
        <div className="headAlert">
          <button
            onClick={() => setIsModalOpen(true)}
            className="requestButton"
          >
            Request a switch
          </button>
        </div>
      <div className="alerts-container">
        <Notification />        
      </div>
        <SwitchRequestModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
    </div>
  );
};

export default Alerts;
