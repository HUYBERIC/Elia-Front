import React, { useState, useEffect } from "react";
import ConfirmationModal from "../components/ConfirmationModal";

const SwitchRequestModal = ({ isOpen, onClose }) => {
  const [emergencyLevel, setEmergencyLevel] = useState(1);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isClosing, setIsClosing] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  // Updating the text color of the selector based on the selected emergency
  useEffect(() => {
    const selectElement = document.getElementById("emergency-select");
    if (selectElement) {
      switch (emergencyLevel) {
        case 1:
          selectElement.style.setProperty("--select-color", "green");
          break;
        case 2:
          selectElement.style.setProperty("--select-color", "orange");
          break;
        case 3:
          selectElement.style.setProperty("--select-color", "red");
          break;
        default:
          selectElement.style.setProperty("--select-color", "black");
      }
    }
  }, [emergencyLevel]);

  // Triggers the closing animation before removing the modal from the DOM
  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 300);
  };

  // Closes the modal if the overlay is clicked
  const handleOverlayClick = (event) => {
    if (event.target.classList.contains("modal-overlay")) {
      handleClose();
    }
  };

  // Handles form submission
  const handleConfirmSubmit = async () => {
    if (!startDate || !endDate) {
      alert("Please provide a start and end date");
      return;
    }

    const emergencyMapping = {
      1: "low",
      2: "medium",
      3: "high",
    };
    const requestData = {
      emergencyLevel: emergencyMapping[emergencyLevel],
      startDate,
      endDate,
    };

    console.log("Sending request data:", requestData); // Debugging

    try {
      const response = await fetch("http://localhost:5000/api/requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(requestData),
      });
      if (response.ok) {
        alert("Submission successful");
        handleClose();
        window.location.reload();
      } else {
        alert("Submission failed");
      }
    } catch (error) {
      console.error("Submission failed :", error);
      alert("Error. Try again.");
    }
  };

  // Do not display the modal until it is open or closing
  if (!isOpen && !isClosing) return null;

  const getCurrentDateTime = () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    return now.toISOString().slice(0, 16);
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className={`modal-content ${isClosing ? "fade-out" : "fade-in"}`}>
        <h2>Switch request</h2>
        <label>
          Emergency level :
          <select
            id="emergency-select"
            className={`field emergency-select ${
              emergencyLevel === 3
                ? "red"
                : emergencyLevel === 2
                ? "orange"
                : "green"
            }`}
            value={emergencyLevel}
            onChange={(e) => setEmergencyLevel(Number(e.target.value))}
            required
          >
            <option className="green" value={1}>
              Low
            </option>
            <option className="orange" value={2}>
              Medium
            </option>
            <option className="red" value={3}>
              High
            </option>
          </select>
        </label>
        <label>
          Start :
          <input
            className="field"
            type="datetime-local"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            min={getCurrentDateTime()}
          />
        </label>
        <label>
          End :
          <input
            className="field"
            type="datetime-local"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            min={getCurrentDateTime()}
          />
        </label>
        <button
          className="submit-button"
          onClick={() => setIsConfirmModalOpen(true)}
        >
          Submit
        </button>
        <button onClick={handleClose}>Cancel</button>
      </div>
      <ConfirmationModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={handleConfirmSubmit}
        message="Are you sure you want to submit this switch request?"
      />
    </div>
  );
};

export default SwitchRequestModal;
