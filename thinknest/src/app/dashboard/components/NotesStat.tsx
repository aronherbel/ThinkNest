import React from "react";
import Image from "next/image";
import Link from "next/link";

const NotesStat = () => {
  return (
    <div className="bg-white rounded-xl min-w-[35rem] relative flex flex-col justify-between  dark:bg-sky-950 transition-colors duration-300">
      <div className="px-8 py-8">
        <div className="flex justify-between text-semibold mb-4 text-lg">
          <p>Notes</p>
          <Image
            src="/assets/icons/lilmenu_icon.svg"
            alt="menu_icon"
            width={4}
            height={4}
            className="cursor-pointer"
          />
        </div>
        <p className="text-sm text-[#9A9A9A] font-semibold">Note</p>

        {/* Task List */}
        <div className="space-y-4 pt-6">
          {/* Task 1 */}
          <div className="border-[0.5px] border-[#F1F1F1] rounded-xl">
            <div className="flex items-center justify-between p-2">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-100 text-green-600 flex items-center justify-center rounded-full">
                  <Image
                    src="/assets/icons/notes_icon_active.svg"
                    alt="todo_icon"
                    width={12}
                    height={12}
                  />
                </div>
                <p className="text-xs font-medium">category</p>
              </div>
              <div className="w-36"></div>
            </div>
          </div>
        </div>
      </div>

      {/* View All Button */}
      <div className="flex justify-end items-end pr-8 pb-8">
        <Link href="/notes">
          <button className="py-3 px-4 bg-black text-white text-xs font-medium rounded-lg">
            View All
          </button>
        </Link>
      </div>
    </div>
  );
};

export default NotesStat;
