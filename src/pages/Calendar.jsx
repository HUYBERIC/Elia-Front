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
        setEvents(
          data.map((event) => ({
            id: event.id,
            title: event.title || "Sans titre",
            start: new Date(event.start).toISOString(), // ✅ Transformation en format ISO
            end: new Date(event.end).toISOString(), // ✅ Correction du format
          }))
        ); // 🔍 Debug console
      })
      .catch((err) => console.error("Erreur lors du chargement", err));
  }, []);

  // Ajouter un nouvel événement
  const handleDateClick = async (info) => {
    const title = prompt("Nom de l'événement ?");
    if (!title) return;

    console.log(info);

    const newEvent = {
      title,
      startTime: info.dateStr, //
      endTime: info.dateStr, //
    };

    try {
      const response = await fetch("http://localhost:5000/api/duties", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEvent),
      });

      const data = await response.json();

      if (response.ok) {
        setEvents([
          ...events,
          {
            id: data._id,
            title,
            start: info.dateStr,
            end: info.dateStr,
          },
        ]); // ✅ Mise à jour immédiate
        console.log(info.dateStr);
      } else {
        console.error("Erreur lors de l'ajout");
      }
    } catch (error) {
      console.error("Erreur réseau", error);
    }
  };

  const handleEventClick = async (clickInfo) => {
    console.log(clickInfo);

    if (window.confirm(`Supprimer "${clickInfo.event.title}" ?`)) {
      await fetch(`http://localhost:5000/api/duties/${clickInfo.event.id}`, {
        method: "DELETE",
      });

      setEvents(events.filter((event) => event.id !== clickInfo.event.id));
    }
  };

  return (
    <div>
      <Navbar />
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
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
        firstDay={4}
        eventColor="#e75420"
      />
    </div>
  );
};

export default Calendar;
