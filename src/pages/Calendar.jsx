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
    fetch("http://localhost:5000/api/duties")
      .then((res) => res.json())
      .then((data) => {
        console.log("Événements récupérés :", data); // 🔍 Debug console
        setEvents(data.map(event => ({
          id: event._id,
          title: event.title || "Sans titre", // ✅ Correction pour éviter "undefined"
          start: event.start, // ✅ Garder tel quel
          end: event.end, // ✅ Garder tel quel
          allDay: event.allDay ?? true, // ✅ Sécurise la valeur de allDay
        })));
      })
      .catch(err => console.error("Erreur lors du chargement", err));
  }, []);

  // Ajouter un nouvel événement
  const handleDateClick = async (info) => {
    const title = prompt("Nom de l'événement ?");
    if (!title) return;
  
    const newEvent = {
      title,
      startTime: info.dateStr, // 
      endTime: info.dateStr,   // 
    };
  
    try {
      const response = await fetch("http://localhost:5000/api/duties", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEvent),
      });
  
      if (response.ok) {
        const addedEvent = await response.json();
        setEvents([...events, { ...addedEvent, id: addedEvent._id }]); // ✅ Mise à jour immédiate
      } else {
        console.error("Erreur lors de l'ajout");
      }
    } catch (error) {
      console.error("Erreur réseau", error);
    }
  };
  

  const handleEventClick = async (clickInfo) => {
    if (window.confirm(`Supprimer "${clickInfo.event.title}" ?`)) {
      await fetch(`http://localhost:5000/api/duties/${clickInfo.event.id}`, {
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
