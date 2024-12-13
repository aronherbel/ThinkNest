"use client"

import React, { useState, useEffect } from "react";
import { DateSelectArg, EventApi, EventContentArg } from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import "./calendarstyle.scss";
import HeaderTitle from "@/components/HeaderTitle";
import MyEvents from "./components/MyEvents";

const Calendar: React.FC = () => {
  const [currentEvents, setCurrentEvents] = useState<EventApi[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [newEventTitle, setNewEventTitle] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<DateSelectArg | null>(null);
  const [contextMenu, setContextMenu] = useState<{
    visible: boolean;
    x: number;
    y: number;
    event: EventApi | null;
  }>({ visible: false, x: 0, y: 0, event: null });
  const [isAllDay, setIsAllDay] = useState<boolean>(false); // Zustand für All-Day Event
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedEvents = localStorage.getItem("events");
      if (savedEvents) {
        setCurrentEvents(JSON.parse(savedEvents));
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("events", JSON.stringify(currentEvents));
    }
  }, [currentEvents]);

  const handleDateClick = (selected: DateSelectArg) => {
    setSelectedDate(selected);
    setStartDate(selected.start.toISOString().slice(0, 16)); // Format für datetime-local
    setEndDate(selected.end?.toISOString().slice(0, 16) || ""); // Optional: Ende kann leer sein
    setIsDialogOpen(true);
  };

  const handleRightClick = (event: EventApi | null, e: React.MouseEvent) => {
    e.preventDefault();
    if (event) {
      setContextMenu({ visible: true, x: e.clientX, y: e.clientY, event });
    } else {
      setContextMenu({ visible: false, x: 0, y: 0, event: null });
    }
  };

  const handleDeleteEvent = () => {
    if (contextMenu?.event) {
      try {
        contextMenu.event.remove();
        setContextMenu({ visible: false, x: 0, y: 0, event: null });
      } catch (error) {
        console.error("Fehler beim Löschen des Events", error);
      }
    }
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setNewEventTitle("");
    setIsAllDay(false); // Setze All-Day zurück
  };

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (newEventTitle && (isAllDay || (startDate && endDate))) {
      const calendarApi = selectedDate?.view.calendar;
      calendarApi?.unselect();

      const newEvent = {
        id: `${startDate}-${newEventTitle}`,
        title: newEventTitle,
        start: isAllDay ? new Date(startDate).setHours(0, 0, 0, 0) : new Date(startDate),
        end: isAllDay ? new Date(endDate).setHours(23, 59, 59, 999) : new Date(endDate),
        allDay: isAllDay,
      };

      calendarApi?.addEvent(newEvent);
      handleCloseDialog();
    }
  };

  return (
    <>
      <HeaderTitle title="Calendar" />
      <MyEvents />

      <div className="bg-white rounded-xl p-8">
        <FullCalendar
          height={"85vh"}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          initialView="timeGridWeek"
          firstDay={1}
          editable={true}
          selectable={true}
          scrollTime={new Date().toISOString().slice(11, 19)}
          selectMirror={true}
          dayMaxEvents={true}
          select={handleDateClick}
          eventsSet={(events) => setCurrentEvents(events)}
          initialEvents={
            typeof window !== "undefined"
              ? JSON.parse(localStorage.getItem("events") || "[]")
              : []
          }
          nowIndicator={true}
          slotDuration="00:30:00"
          slotLabelInterval="01:00:00"
          slotLabelFormat={{
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          }}
          views={{
            timeGridWeek: {
              nowIndicator: true,
            },
            timeGridDay: {
              nowIndicator: true,
            },
          }}
          locale={{
            code: "de",
            allDayText: "",
          }}
          titleFormat={{
            year: "numeric",
            month: "long",
          }}
          eventContent={(args: EventContentArg) => {
            const { event } = args;
          
            if (!event?.start || !event?.end) {
              return (
                <div className="cursor-context-menu relative">
                  No Event Details
                </div>
              );
            }
          
            const startDate = event.allDay
              ? new Date(event.start).toLocaleDateString("de-DE")
              : new Date(event.start).toLocaleString("de-DE", {
                  hour: "2-digit",
                  minute: "2-digit",
                });
          
            const endDate = event.allDay
              ? new Date(event.end).toLocaleDateString("de-DE")
              : new Date(event.end).toLocaleString("de-DE", {
                  hour: "2-digit",
                  minute: "2-digit",
                });
          
            // Beide Fälle behandeln, All-Day und normale Events
            return (
              <div
                onContextMenu={(e) => handleRightClick(event, e)}
                className="cursor-context-menu relative"
              >
                <div className="flex flex-col justify-start text-black">
                  <div className="text-md font-medium">{event.title}</div> {/* Sicherstellen, dass der Titel angezeigt wird */}
                  {!event.allDay && (
                    <div className="text-sm">{`${startDate} - ${endDate}`}</div>
                  )}
                </div>
              </div>
            );
          }}
        />
      </div>

      {/* Context Menu for deleting events */}
      {contextMenu.visible && (
        <div
          className="absolute bg-white border border-gray-300 rounded-md shadow-md z-50 p-2"
          style={{
            top: contextMenu.y,
            left: contextMenu.x,
          }}
        >
          <button
            onClick={handleDeleteEvent}
            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 cursor-pointer"
          >
            Delete Event
          </button>
        </div>
      )}

      {/* Dialog for adding new events */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Event Details</DialogTitle>
          </DialogHeader>
          <form className="space-y-4" onSubmit={handleAddEvent}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Event Title
              </label>
              <input
                type="text"
                placeholder="Event Title"
                value={newEventTitle}
                onChange={(e) => setNewEventTitle(e.target.value)}
                required
                className="border border-gray-300 px-3 py-2 rounded-md text-md focus:outline-none focus:ring-2 focus:ring-[#28AD5E] w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Date & Time
              </label>
              <div className="flex gap-4">
                <input
                  type="date"
                  value={startDate.split("T")[0]} // Nur das Datum extrahieren
                  onChange={(e) =>
                    setStartDate(
                      `${e.target.value}T${startDate.split("T")[1] || "00:00"}`
                    )
                  }
                  required
                  className="border border-gray-300 px-3 py-2 rounded-md text-md focus:outline-none focus:ring-2 focus:ring-[#28AD5E] w-full"
                />
                {!isAllDay && (
                  <input
                    type="time"
                    value={startDate.slice(11, 16)} // Nur die Uhrzeit extrahieren
                    onChange={(e) =>
                      setStartDate(`${startDate.split("T")[0]}T${e.target.value}`)
                    }
                    required
                    className="border border-gray-300 px-3 py-2 rounded-md text-md focus:outline-none focus:ring-2 focus:ring-[#28AD5E] w-full"
                  />
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Date & Time
              </label>
              <div className="flex gap-4">
                <input
                  type="date"
                  value={endDate.split("T")[0]} // Nur das Datum extrahieren
                  onChange={(e) =>
                    setEndDate(
                      `${e.target.value}T${endDate.split("T")[1] || "00:00"}`
                    )
                  }
                  required
                  className="border border-gray-300 px-3 py-2 rounded-md text-md focus:outline-none focus:ring-2 focus:ring-[#28AD5E] w-full"
                />
                {!isAllDay && (
                  <input
                    type="time"
                    value={endDate.slice(11, 16)} // Nur die Uhrzeit extrahieren
                    onChange={(e) =>
                      setEndDate(`${endDate.split("T")[0]}T${e.target.value}`)
                    }
                    required
                    className="border border-gray-300 px-3 py-2 rounded-md text-md focus:outline-none focus:ring-2 focus:ring-[#28AD5E] w-full"
                  />
                )}
              </div>
            </div>

            <div>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={isAllDay}
                  onChange={() => setIsAllDay(!isAllDay)}
                />
                <span>All Day Event</span>
              </label>
            </div>

            <div className="mt-6 flex gap-4">
              <button
                type="button"
                onClick={handleCloseDialog}
                className="w-full text-white bg-gray-500 py-2 px-4 rounded-md"
              >
                Close
              </button>
              <button
                type="submit"
                className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
              >
                Add Event
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Calendar;
