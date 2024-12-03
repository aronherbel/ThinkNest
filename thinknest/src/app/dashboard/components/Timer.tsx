import React, { useEffect, useState } from "react";

const Timer = () => {
  /* TODO: Der Timer sollte vom Calender die aktuellen werte bzw. Zeit ausgeben 
             wie lange ein jetziges Event nocht braucht bis es fertig ist
    */

  const [timer, setTimer] = useState<number | null>(null);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  useEffect(() => {
    if (timer === 0) {
      setIsTimerRunning(false);
    } else if (timer && isTimerRunning) {
      const countdown = setInterval(() => {
        setTimer((prev) => (prev !== null ? prev - 1 : null));
      }, 1000);
      return () => clearInterval(countdown);
    }
  }, [timer, isTimerRunning]);

  const startTimer = () => {
    setTimer(45 * 60); // 45 Minuten in Sekunden (Hard-coded)
    setIsTimerRunning(true);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <>
      <div className="flex items-center space-x-4 bg-white p-3 rounded-xl">
        <div className="flex items-center justify-center text-black text-sm mr-3 ml-3">
          {isTimerRunning && timer !== null ? formatTime(timer) : "Start Timer"}
        </div>
        <button
          onClick={startTimer}
          disabled={isTimerRunning}
          className={`${
            isTimerRunning ? "bg-red-500" : "bg-[#28AD5E]"
          } p-3 text-white rounded-xl flex items-center justify-center`}
        >
          <img
            src="/assets/icons/play_icon.svg"
            alt="play_icon"
            className="w-4 h-4 m-1"
          />
        </button>
      </div>
    </>
  );
};

export default Timer;
