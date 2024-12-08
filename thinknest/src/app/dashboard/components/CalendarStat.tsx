import React from "react";
import Image from "next/image";
import Link from "next/link"; // Link importieren

const CalendarStat = () => {
  return (
    <>
      <div className="bg-white rounded-xl min-w-[35rem] relative"> 
        <div className="px-8 py-8">
          <div className="flex justify-between text-semibold mb-4 text-lg">
            <p>Calendar</p>
            <Image
              src="/assets/icons/lilmenu_icon.svg"
              alt="menu_icon"
              width={4} 
              height={4}
              className="cursor-pointer"
            />
          </div>
          <p className="text-sm text-[#9A9A9A] font-semibold">Today</p>
          <div className="pl-5 pt-5">
            <div className="space-y-4 mt-2">
              {/* Zeitblock 1 */}
              <div className="flex items-start space-x-4">
                <div className="text-[#9A9A9A] text-xs">07:00</div>
                <div className="flex-grow border-solid border-[2px] border-[#F1F1F1] rounded-lg h-14">
                  {/* Event from Calendar */}
                </div>
              </div>
              {/* Zeitblock 2 */}
              <div className="flex items-start space-x-4">
                <div className="text-[#9A9A9A] text-xs">07:30</div>
                <div className="flex-grow border-solid border-[2px] border-[#F1F1F1] rounded-lg h-14">
                  {/* Event from Calendar */}
                </div>
              </div>
              {/* Zeitblock 3 */}
              <div className="flex items-start space-x-4">
                <div className="text-[#9A9A9A] text-xs">08:00</div>
                <div className="flex-grow border-solid border-[2px] border-[#F1F1F1] rounded-lg h-14">
                  {/* Event from Calendar */}
                </div>
              </div>
              {/* Zeitblock 4 */}
              <div className="flex items-start space-x-4">
                <div className="text-[#9A9A9A] text-xs">08:30</div>
                <div className="flex-grow border-solid border-[2px] border-[#F1F1F1] rounded-lg h-14">
                  {/* Event from Calendar */}
                </div>
              </div>
              <div className=" flex justify-end">
                <Link href="/calendar">
                  <button className="py-3 px-4 bg-black text-white text-xs font-medium rounded-lg">
                    View All
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CalendarStat;