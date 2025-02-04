import Navbar from "../components/Navbar";

import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

const Calendar = () => {
  const [events, setEvents] = useState([]);

  // Récupérer les shifts depuis le backend
  useEffect(() => {
    fetch("http://localhost:5000/api/dutyshifts")
      .then((res) => res.json())
      .then((data) => setEvents(data.map(event => ({
        id: event._id,
        title: event.title,
        start: event.start,
        end: event.end,
        allDay: event.allDay
      }))))
      .catch(err => console.error("Erreur lors du chargement", err));
  }, []);

  // Ajouter un nouvel événement
  const handleDateClick = async (info) => {
    const title = prompt("Nom de l'événement ?");
    if (!title) return;

    const newEvent = {
      title,
      start: info.dateStr,
      end: info.dateStr,
      allDay: true
    };

    // Sauvegarde dans la base de données
    const response = await fetch("http://localhost:5000/api/dutyshifts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newEvent),
    });

    if (response.ok) {
      const addedEvent = await response.json();
      setEvents([...events, { ...addedEvent, id: addedEvent._id }]);
    }
  };

  const handleEventClick = async (clickInfo) => {
    if (window.confirm(`Supprimer "${clickInfo.event.title}" ?`)) {
      await fetch(`http://localhost:5000/api/dutyshifts/${clickInfo.event.id}`, {
        method: "DELETE",
      });
  
      setEvents(events.filter(event => event.id !== clickInfo.event.id));
    }
  };  

  return (
    <div>
      <h1>eDuty - Planning</h1>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        events={events}
        dateClick={handleDateClick}
        editable={true}
        selectable={true}
        eventClick={handleEventClick}
      />
    </div>
  );
};

export default Calendar;
