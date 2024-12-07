"use client";

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

import "./calendarstyle.css"; 

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
    setIsDialogOpen(true);
  };

  const handleRightClick = (event: EventApi, e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenu({ visible: true, x: e.clientX, y: e.clientY, event });
  };

  const handleDeleteEvent = () => {
    if (contextMenu.event) {
      contextMenu.event.remove();
    }
    setContextMenu({ visible: false, x: 0, y: 0, event: null });
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setNewEventTitle("");
  };

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (newEventTitle && selectedDate) {
      const calendarApi = selectedDate.view.calendar;
      calendarApi.unselect();

      const newEvent = {
        id: `${selectedDate.start.toISOString()}-${newEventTitle}`,
        title: newEventTitle,
        start: selectedDate.start,
        end: selectedDate.end,
        allDay: selectedDate.allDay,
      };

      calendarApi.addEvent(newEvent);
      handleCloseDialog();
    }
  };

  return (
    <>
      <div>
        <FullCalendar
          height={"85vh"}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          initialView="timeGridWeek"
          editable={true}
          selectable={true}
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
          eventContent={(args: EventContentArg) => {
            const { event } = args;
            return (
              <div
                onContextMenu={(e) => handleRightClick(event, e)}
                className="cursor-context-menu relative"
              >
                {event.title}
              </div>
            );
          }}
          dayHeaderContent={(args) => {
            const date = args.date;
            const weekday = new Intl.DateTimeFormat("de-DE", {
              weekday: "long",
            }).format(date);
            const day = new Intl.DateTimeFormat("de-DE", { day: "numeric" }).format(date);

            return (
              <div className="text-center">
                <div>{weekday}</div>
                <div>{day}</div>
              </div>
            );
          }}
          slotLabelFormat={{
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
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
            <DialogTitle>Add New Event Details</DialogTitle>
          </DialogHeader>
          <form className="space-x-3 mb-4" onSubmit={handleAddEvent}>
            <input
              type="text"
              placeholder="Event Title"
              value={newEventTitle}
              onChange={(e) => setNewEventTitle(e.target.value)}
              required
              className="border border-gray-300 px-3 py-2 rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 cursor-pointer"
              type="submit"
            >
              Add
            </button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Calendar;
