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

  const [refresh, setRefresh] = useState(false); // 🔄 Force le rechargement après un changement

  // Fetch events
  useEffect(() => {
    fetch("https://eduty-backend.torvalds.be/api/duties")
      .then((res) => res.json())
      .then((data) => {
             

        const formattedEvents = [];

        data.forEach((duty) => {
          duty.segments.forEach((segment) => {
                 

            // Formatage du prénom et du nom (3 premières lettres + 1 lettre)
            const firstNameShort = segment.user?.firstName
              ? segment.user.firstName.substring(0, 3)
              : "???";
            const lastNameShort = segment.user?.lastName
              ? segment.user.lastName.substring(0, 1) + "."
              : "";

            formattedEvents.push({
              id: segment.id,
              title: `${firstNameShort} ${lastNameShort}`, // ✅ Format du nom ajusté
              start: new Date(segment.startTime).toISOString(),
              end: new Date(segment.endTime).toISOString(),
              color: segment.user.id == duty.mainUserId ? "#F48329" : "#1F2528",
            });
          });
        });

             
        setEvents(formattedEvents);
      })
      .catch((err) => console.error("Erreur lors du chargement", err));
  }, [refresh]);

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
    const d = new Date(
      Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
    );
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    const startOfYear = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    const weekNumber = Math.ceil(((d - startOfYear) / 86400000 + 1) / 7);
    return weekNumber;
  };

  // Titre dynamique
  const getDisplayTitle = () => {
    if (currentView === "dayGridMonth") {
      return currentDate.toLocaleString("en-GB", {
        month: "long",
        year: "numeric",
      });
    }
    if (currentView === "timeGridWeek") {
      return `Week ${getISOWeek(currentDate)} - ${currentDate.toLocaleString("en-GB", {
        month: "long",        
      })} ${currentDate.getFullYear()}`;
    }
    if (currentView === "timeGridDay") {
      return currentDate.toLocaleDateString("en-GB", {
        weekday: "short",
        day: "numeric",
        month: "numeric",
        year: "numeric",
      });
    }
  };

  const handleAcceptRequest = async (requestId) => {
    try {
      const res = await fetch(
        `https://eduty-backend.torvalds.be/api/requests/${requestId}/accept`,
        {
          method: "POST",
        }
      );

      if (!res.ok)
        throw new Error("Erreur lors de l'acceptation de la requête");

      const result = await res.json();
           

      setRefresh((prev) => !prev); // 🔄 Déclenche un re-render en inversant refresh
    } catch (error) {
      console.error("Erreur lors de l'acceptation de la requête", error);
    }
  };

  return (
    <div className="calendar-container">
      <Navbar />

      {/* Bouton Today */}
      <button className="today-button" onClick={goToToday}>
        Today
      </button>

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
          editable={false}
          selectable
          firstDay={1}
          nowIndicator={true}
          eventColor="#f48329"
          datesSet={handleDatesSet}
          locale="en-GB"
          slotLabelFormat={{
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          }}
          eventTimeFormat={{
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          }}
          views={{
            dayGridMonth: {
              dayHeaderFormat: { weekday: "short" },
              displayEventTime: false, // ✅ Supprime l'affichage de l'heure dans Month
            },
            timeGridWeek: {
              allDaySlot: false,
              dayHeaderFormat: {
                weekday: "narrow", // Show "M", "T", etc. in Week View
                day: "2-digit",
              },
            },
            timeGridDay: {
              allDaySlot: false,
              dayHeaders: false, // ✅ Hides header in day view
            },
          }}
        />
      </div>

      {/* Navigation */}
      <div className="calendar-footer">
        <button onClick={goToPrev}>{"<"}</button>
        <button
          className={currentView === "dayGridMonth" ? "active" : ""}
          onClick={() => changeView("dayGridMonth")}
        >
          Month
        </button>
        <button
          className={currentView === "timeGridWeek" ? "active" : ""}
          onClick={() => changeView("timeGridWeek")}
        >
          Week
        </button>
        <button
          className={currentView === "timeGridDay" ? "active" : ""}
          onClick={() => changeView("timeGridDay")}
        >
          Day
        </button>
        <button onClick={goToNext}>{">"}</button>
      </div>
    </div>
  );
};

export default Calendar;
