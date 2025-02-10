import React, { useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

const Calendar = () => {
  const [events, setEvents] = useState([]);
  const [currentView, setCurrentView] = useState("dayGridMonth");
  const [currentDate, setCurrentDate] = useState(new Date());
  const calendarRef = useRef(null);

  // Fetch events
  useEffect(() => {
    fetch("http://elia-back.onrender.com/api/duties")
      .then((res) => res.json())
      .then((data) => {
        setEvents(
          data.map((event) => ({
            id: event.id,
            title: event.title || "Sans titre",
            start: new Date(event.start).toISOString(),
            end: new Date(event.end).toISOString(),
          }))
        );
      })
      .catch((err) => console.error("Erreur lors du chargement", err));
  }, []);

  // Ajouter un événement
  const handleDateClick = async (info) => {
    const title = prompt("Nom de l'événement ?");
    if (!title) return;

    const newEvent = { title, startTime: info.dateStr, endTime: info.dateStr };

    try {
      const response = await fetch("http://elia-back.onrender.com/api/duties", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEvent),
      });

      const data = await response.json();

      if (response.ok) {
        setEvents([...events, { id: data._id, title, start: info.dateStr, end: info.dateStr }]);
      } else {
        console.error("Erreur lors de l'ajout");
      }
    } catch (error) {
      console.error("Erreur réseau", error);
    }
  };

  // Supprimer un événement
  const handleEventClick = async (clickInfo) => {
    if (window.confirm(`Supprimer "${clickInfo.event.title}" ?`)) {
      await fetch(`http://elia-back.onrender.com/api/duties/${clickInfo.event.id}`, { method: "DELETE" });
      setEvents(events.filter((event) => event.id !== clickInfo.event.id));
    }
  };

  // Navigation
  const goToPrev = () => calendarRef.current.getApi().prev();
  const goToNext = () => calendarRef.current.getApi().next();
  const goToToday = () => calendarRef.current.getApi().today();

  // Changer de vue
  const changeView = (view) => {
    setCurrentView(view);
    calendarRef.current.getApi().changeView(view);
  };

  // Mise à jour de la date affichée
  const handleDatesSet = (info) => {
    setCurrentDate(info.view.currentStart);
  };

  // Calcul de la semaine selon ISO 8601
  const getISOWeek = (date) => {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    const startOfYear = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    const weekNumber = Math.ceil(((d - startOfYear) / 86400000 + 1) / 7);
    return weekNumber;
  };

  // Titre dynamique
  const getDisplayTitle = () => {
    if (currentView === "dayGridMonth") {
      return currentDate.toLocaleString("fr-FR", { month: "long", year: "numeric" });
    }
    if (currentView === "timeGridWeek") {
      return `Semaine ${getISOWeek(currentDate)} - ${currentDate.getFullYear()}`;
    }
    if (currentView === "timeGridDay") {
      return currentDate.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
    }
  };

  return (
    <div className="calendar-container">
      <Navbar />
      
      {/* Bouton Today */}
      <button className="today-button" onClick={goToToday}>Today</button>

      {/* Titre dynamique */}
      <div className="calendar-header">{getDisplayTitle()}</div>

      {/* FullCalendar Wrapper */}
      <div className="fullcalendar-wrapper">
        <FullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView={currentView}
          headerToolbar={false}
          events={events}
          dateClick={handleDateClick}
          editable
          selectable
          eventClick={handleEventClick}
          firstDay={1}
          eventColor="#e75420"
          datesSet={handleDatesSet}
        />
      </div>

      {/* Navigation */}
      <div className="calendar-footer">
        <button onClick={goToPrev}>{"<"}</button>
        <button className={currentView === "dayGridMonth" ? "active" : ""} onClick={() => changeView("dayGridMonth")}>Month</button>
        <button className={currentView === "timeGridWeek" ? "active" : ""} onClick={() => changeView("timeGridWeek")}>Week</button>
        <button className={currentView === "timeGridDay" ? "active" : ""} onClick={() => changeView("timeGridDay")}>Day</button>
        <button onClick={goToNext}>{">"}</button>
      </div>
    </div>
  );
};

export default Calendar;
