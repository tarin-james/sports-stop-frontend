import React, { useState, useEffect } from "react";

const CountdownTimer = ({ targetDate, durationInHours, setTimerExpired }) => {
  const calculateRemainingTime = () => {
    const targetTime = new Date(targetDate).getTime() + durationInHours * 60 * 60 * 1000; // adding durationInHours to target date in milliseconds
    const currentTime = new Date().getTime();
    const timeDiff = targetTime - currentTime;

    if (timeDiff <= 0) {
      return { hours: 0, minutes: 0, seconds: 0 };
    }

    // Calculate remaining hours, minutes, and seconds
    const totalMinutes = Math.floor(timeDiff / (1000 * 60));
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

    return { hours, minutes, seconds };
  };

  const [remainingTime, setRemainingTime] = useState(calculateRemainingTime);

  useEffect(() => {
    const interval = setInterval(() => {
      const newRemainingTime = calculateRemainingTime();
      setRemainingTime(newRemainingTime);

      // If the timer runs out, call the setter function with true
      if (newRemainingTime.hours === 0 && newRemainingTime.minutes === 0 && newRemainingTime.seconds === 0) {
        if (setTimerExpired) {
          setTimerExpired(true);
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [setTimerExpired]);

  return (
    <div className="border p-4 rounded-lg shadow-md my-1">
      <h6 className="text-1xl font-bold">Time Left to Bid</h6>
      <p className="text-lg mt-2">
        {remainingTime.hours < 10 ? `0${remainingTime.hours}` : remainingTime.hours}:
        {remainingTime.minutes < 10 ? `0${remainingTime.minutes}` : remainingTime.minutes}:
        {remainingTime.seconds < 10 ? `0${remainingTime.seconds}` : remainingTime.seconds}
      </p>
    </div>
  );
};

export default CountdownTimer;
