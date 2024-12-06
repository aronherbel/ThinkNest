import React from "react";
import Image from "next/image";
import Link from "next/link";

const TodoStat = () => {
  return (
    <div className="bg-white rounded-xl min-w-[28rem] relative">
      <div className="px-4 py-4">
        <div className="flex justify-between text-md mb-3">
          <p>To Do</p>
          <Image
            src="/assets/icons/lilmenu_icon.svg"
            alt="menu_icon"
            width={3}
            height={3}
          />
        </div>
        <p className="text-xs text-[#9A9A9A] font-semibold">To Dos</p>

        {/* Task List */}
        <div className="space-y-4 pt-4">
          {/* Task 1 */}
          <div className="border-[0.5px] border-[#F1F1F1] rounded-xl">
            <div className="flex items-center justify-between p-2">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-100 text-green-600 flex items-center justify-center rounded-full">
                  <Image
                    src="/assets/icons/folder_icon.svg"
                    alt="todo_icon"
                    width={15}
                    height={15}
                  />
                </div>
                <p className="text-xs font-medium">Creating Wireframe</p>
              </div>
              <div className="w-36">
                <div className="bg-gray-200 rounded-full">
                  <div className="h-1 bg-green-500 rounded-full w-4/5"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute right-4 bottom-4">
          <Link href="/todo">
            <button className="py-3 px-4 bg-black text-white text-xs font-medium rounded-lg">
              View All
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TodoStat;
