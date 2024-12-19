"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

interface Todo {
  task: string;
  event: {
    name: string;
    color: string;
  };
  date: string;
  completed: boolean;
}

const TodoStat = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [collapsedCategories, setCollapsedCategories] = useState<string[]>([]);

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos") || "[]");
    setTodos(savedTodos);
  }, []);

  // Toggle für Kategorien
  const toggleCategory = (category: string) => {
    setCollapsedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((cat) => cat !== category)
        : [...prev, category]
    );
  };

  // Gruppiere Todos nach Kategorien
  const groupedTodos = todos.reduce((acc, todo) => {
    if (!acc[todo.event.name]) {
      acc[todo.event.name] = [];
    }
    acc[todo.event.name].push(todo);
    return acc;
  }, {} as Record<string, Todo[]>);

  return (
    <div className="bg-white rounded-xl min-w-[35rem] relative">
      <div className="px-8 py-8">
        <div className="flex justify-between text-semibold mb-4 text-lg">
          <p>To Do</p>
          <Image
            src="/assets/icons/lilmenu_icon.svg"
            alt="menu_icon"
            width={4}
            height={4}
            className="cursor-pointer"
          />
        </div>
        <p className="text-sm text-[#9A9A9A] font-semibold mb-6">To Dos</p>

        {/* Kategorien und Aufgaben */}
        <div className="space-y-6">
          {Object.keys(groupedTodos).map((category) => (
            <div key={category} className="border-b-[0.5px] border-[#F1F1F1] pb-4">
              <div
                className="flex justify-between items-center cursor-pointer p-3 rounded-lg text-white"
                style={{ backgroundColor: groupedTodos[category][0].event.color }}
                onClick={() => toggleCategory(category)}
              >
                <p className="text-sm font-semibold">{category}</p>
                <Image
                  src={
                    collapsedCategories.includes(category)
                      ? "/assets/icons/arrow_drop_down_icon.svg"
                      : "/assets/icons/arrow_drop_up_icon.svg"
                  }
                  alt="toggle_icon"
                  width={12}
                  height={12}
                />
              </div>
              {!collapsedCategories.includes(category) && (
                <div className="space-y-3 mt-3">
                  {groupedTodos[category].map((todo, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-gray-50 p-2 rounded-md"
                    >
                      <p className="text-sm font-medium">{todo.task}</p>
                      <p className="text-gray-500 text-xs">{todo.date}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* View All Button */}
      <div className="flex justify-end pr-8 pb-8">
        <Link href="/todo">
          <button className="py-2 px-6 bg-black text-white text-xs font-medium rounded-lg">
            View All
          </button>
        </Link>
      </div>
    </div>
  );
};

export default TodoStat;
