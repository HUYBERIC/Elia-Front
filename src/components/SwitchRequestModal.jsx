import React, { useState } from "react";

const SwitchRequestModal = ({ isOpen, onClose, onSubmit }) => {
  const [urgency, setUrgency] = useState(1);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

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
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Request a Switch</h2>
        <label>
          Urgency Level:
          <select value={urgency} onChange={(e) => setUrgency(Number(e.target.value))}>
            <option value={1}>1 - Nice to have</option>
            <option value={2}>2 - Medium urgency</option>
            <option value={3}>3 - Very urgent</option>
          </select>
        </label>
        <label>
          Start Date & Time:
          <input type="datetime-local" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        </label>
        <label>
          End Date & Time:
          <input type="datetime-local" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        </label>
        <button onClick={handleSubmit}>Submit Request</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default SwitchRequestModal;