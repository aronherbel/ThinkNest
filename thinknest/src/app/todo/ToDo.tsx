"use client";

import HeaderTitle from "@/components/HeaderTitle";
import { useState, useEffect } from "react";
import { getCalendarEvents } from "@/app/calendar/Calendar" // Importiere Events aus Calendar

const ToDo = () => {
  const [calendarEvents, setCalendarEvents] = useState<string[]>([]);
  const [todos, setTodos] = useState<
    { task: string; event: string; date: string }[]
  >([]);
  const [inputValue, setInputValue] = useState("");
  const [selectedEvent, setSelectedEvent] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    const events = getCalendarEvents().map((e: any) => e.title);
    setCalendarEvents(events);
  }, []);

  const addTodo = () => {
    if (inputValue && selectedEvent && selectedDate) {
      setTodos([
        ...todos,
        { task: inputValue, event: selectedEvent, date: selectedDate },
      ]);
      setInputValue("");
      setSelectedEvent("");
      setSelectedDate("");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <HeaderTitle title="To Do" />
      <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">To-Do List</h2>
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <input
            type="text"
            placeholder="Add a new to-do"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg flex-grow"
          />
          <select
            value={selectedEvent}
            onChange={(e) => setSelectedEvent(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg"
          >
            <option value="" disabled>
              Select Event
            </option>
            {calendarEvents.map((event, index) => (
              <option key={index} value={event}>
                {event}
              </option>
            ))}
          </select>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg"
          />
          <button
            onClick={addTodo}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
            disabled={!inputValue || !selectedEvent || !selectedDate}
          >
            Add
          </button>
        </div>
        <ul>
          {todos.map((todo, index) => (
            <li
              key={index}
              className="bg-gray-100 p-3 rounded-lg mb-2 flex justify-between"
            >
              <div>
                <span className="font-semibold">{todo.task}</span>{" "}
                <span className="text-gray-500">({todo.event})</span>
              </div>
              <div className="text-gray-500 text-sm">{todo.date}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ToDo;
