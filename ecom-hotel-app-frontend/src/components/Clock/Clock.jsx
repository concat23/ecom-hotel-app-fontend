import React, { useState, useEffect } from 'react';
import '../Clock/style.css';
const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const hours = time.getHours().toString().padStart(2, '0');
  const minutes = time.getMinutes().toString().padStart(2, '0');
  const seconds = time.getSeconds().toString().padStart(2, '0');

  
  return (
    <div className="clock">
      <div className="time">
        {hours}:{minutes}:{seconds}
      </div>
      <div className="date">{time.toDateString()}</div>
    </div>
  );
};

export default Clock;
