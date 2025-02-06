import { useState } from "react";
import Navbar from "../components/Navbar";
import SwitchRequestModal from "../components/SwitchRequestModal";

const Alerts = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <Navbar />
      {/* Opening modal button */}
      <button onClick={() => setIsModalOpen(true)}>Ask for switch</button>

      {/* Modal */}
      <SwitchRequestModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      Alerts
    </div>
  );
};

export default Alerts;
