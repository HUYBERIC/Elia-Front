import React, { useState } from "react";

const SwitchRequestModal = ({ isOpen, onClose, onSubmit }) => {
  const [urgency, setUrgency] = useState(1);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleOverlayClick = (event) => {
    if (event.target.classList.contains("modal-overlay")) {
      onClose();
    }
  };

  const handleSubmit = async () => {
    if (!startDate || !endDate) {
      alert("Please select both start and end dates.");
      return;
    }

    const requestData = {
      urgency,
      startDate,
      endDate,
    };

    try {
      const response = await fetch("/api/switch-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });
      if (response.ok) {
        alert("Switch request submitted successfully.");
        onClose();
      } else {
        alert("Failed to submit switch request.");
      }
    } catch (error) {
      console.error("Error submitting switch request:", error);
      alert("An error occurred. Please try again.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <h2>Switch Request</h2>
        <label>
          Urgency Level:
          <select
            className="field"
            value={urgency}
            onChange={(e) => setUrgency(Number(e.target.value))}
          >
            <option className="urgency green" value={1}>
              Low
            </option>
            <option className="urgency orange" value={2}>
              Medium
            </option>
            <option className="urgency red" value={3}>
              High
            </option>
          </select>
        </label>
        <label>
          Start:
          <input
            className="field"
            type="datetime-local"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </label>
        <label>
          End:
          <input
            className="field"
            type="datetime-local"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </label>
        <button className="submit-button" onClick={handleSubmit}>
          Submit Request
        </button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default SwitchRequestModal;
