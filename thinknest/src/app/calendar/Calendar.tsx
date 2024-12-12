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

            const startDate = new Date(event.start).toLocaleString("de-DE", {
              hour: "2-digit",
              minute: "2-digit",
            });
            const endDate = new Date(event.end).toLocaleString("de-DE", {
              hour: "2-digit",
              minute: "2-digit",
            });

            if (event.allDay) {
              return (
                <div
                  onContextMenu={(e) => handleRightClick(event, e)}
                  className="cursor-context-menu relative"
                >
                  <div className="flex flex-col justify-start text-black">
                    <div className="text-md font-medium">{event.title}</div>
                  </div>
                </div>
              );
            }

            return (
              <div
                onContextMenu={(e) => handleRightClick(event, e)}
                className="cursor-context-menu relative"
              >
                <div className="flex flex-col justify-start text-black">
                  <div className="text-md font-medium">{event.title}</div>
                  <div className="text-sm">{`${startDate} - ${endDate}`}</div>
                </div>
              </div>
            );
          }}
          dayHeaderContent={(args) => {
            const date = args.date;
            const today = new Date();
            const isToday =
              date.getFullYear() === today.getFullYear() &&
              date.getMonth() === today.getMonth() &&
              date.getDate() === today.getDate();

            const weekdayShort = new Intl.DateTimeFormat("en-US", {
              weekday: "short",
            }).format(date);

            const day = new Intl.DateTimeFormat("de-DE", {
              day: "numeric",
            }).format(date);

            return (
              <div className="text-center day-header">
                <div>{weekdayShort.toUpperCase()}</div>
                {isToday ? (
                  <div className="day-number">{day}</div>
                ) : (
                  <div>{day}</div>
                )}
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
          <form className="space-x-3" onSubmit={handleAddEvent}>
            <input
              type="text"
              placeholder="Event Title"
              value={newEventTitle}
              onChange={(e) => setNewEventTitle(e.target.value)}
              required
              className="border border-gray-300 px-3 py-2 rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-[#28AD5E]"
            />
            <button
              className="bg-black text-white py-2 px-4 rounded cursor-pointer"
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
