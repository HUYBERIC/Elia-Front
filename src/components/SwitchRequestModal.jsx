import React, { useState, useEffect } from "react";

const SwitchRequestModal = ({ isOpen, onClose }) => {
  const [urgency, setUrgency] = useState(1);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isClosing, setIsClosing] = useState(false); // Handle fadeOut animation

  // Updating the text color of the selector based on the selected urgency
  useEffect(() => {
    const selectElement = document.getElementById("urgency-select");
    if (selectElement) {
      switch (urgency) {
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
  }, [urgency]);

  // Triggers the closing animation before removing the modal from the DOM
  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 300); // Corresponds to the duration of the CSS animation
  };

  // Closes the modal if the overlay is clicked
  const handleOverlayClick = (event) => {
    if (event.target.classList.contains("modal-overlay")) {
      handleClose();
    }
  };

  // Handles form submission
  const handleSubmit = async () => {
    if (!startDate || !endDate) {
      alert("Please provide a start and end date");
      return;
    }

    const requestData = { urgency, startDate, endDate };

    try {
      const response = await fetch("/api/switch-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
      });
      if (response.ok) {
        alert("Submission successful");
        handleClose();
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

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className={`modal-content ${isClosing ? "fade-out" : "fade-in"}`}>
        <h2>Switch request</h2>
        <label>
          Emergency level :
          <select
            id="urgency-select"
            className="field urgency-select"
            value={urgency}
            onChange={(e) => setUrgency(Number(e.target.value))}
          >
            <option className="green" value={1}>Low</option>
            <option className="orange" value={2}>Medium</option>
            <option className="red" value={3}>High</option>
          </select>
        </label>
        <label>
          Start :
          <input
            className="field"
            type="datetime-local"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </label>
        <label>
          End :
          <input
            className="field"
            type="datetime-local"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </label>
        <button className="submit-button" onClick={handleSubmit}>Submit</button>
        <button onClick={handleClose}>Cancel</button>
      </div>
    </div>
  );
};

export default SwitchRequestModal;
