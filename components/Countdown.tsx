
import React, { useState, useEffect } from 'react';
import { COMPLIANCE_DEADLINE } from '../constants';

const Countdown: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const difference = COMPLIANCE_DEADLINE.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-red-600 text-white p-4 rounded-lg shadow-lg text-center my-6 animate-pulse">
      <h3 className="text-xl font-bold mb-2">🚨 ÉCHÉANCE IMMINENTE ! 🚨</h3>
      <p className="text-lg">Temps restant pour être en conformité :</p>
      <div className="flex justify-center items-center space-x-2 md:space-x-4 mt-2 text-2xl md:text-4xl font-mono">
        <div className="flex flex-col items-center p-2 bg-red-700 rounded-md">
          <span>{timeLeft.days}</span>
          <span className="text-xs">Jours</span>
        </div>
        <div className="flex flex-col items-center p-2 bg-red-700 rounded-md">
          <span>{timeLeft.hours}</span>
          <span className="text-xs">Heures</span>
        </div>
        <div className="flex flex-col items-center p-2 bg-red-700 rounded-md">
          <span>{timeLeft.minutes}</span>
          <span className="text-xs">Min</span>
        </div>
        <div className="flex flex-col items-center p-2 bg-red-700 rounded-md">
          <span>{timeLeft.seconds}</span>
          <span className="text-xs">Sec</span>
        </div>
      </div>
    </div>
  );
};

export default Countdown;
