import { useState } from "react";
import Navbar from "../components/Navbar";
import SwitchRequestModal from "../components/SwitchRequestModal";

const Alerts = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <Navbar />
      <div className="alerts-container">
        {/* Opening modal button */}
        <button onClick={() => setIsModalOpen(true)}>Request a switch</button>
        
        {/* Modal */}
        <SwitchRequestModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
    </div>
  );
};

export default Alerts;
