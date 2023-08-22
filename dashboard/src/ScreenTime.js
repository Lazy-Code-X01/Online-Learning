import React, { useEffect, useState } from 'react';

const ScreenTimeTracker = () => {
  const [screenTime, setScreenTime] = useState(0);

  useEffect(() => {
    const startTime = Date.now();
    let timer;

    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = '';
    };

    const calculateScreenTime = () => {
      const currentTime = Date.now();
      const diff = currentTime - startTime;
      setScreenTime((prevScreenTime) => prevScreenTime + diff);
      timer = setTimeout(calculateScreenTime, 1000); // Update every second
    };

    calculateScreenTime();

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  const save = screenTime / 1000
  console.log(save);

  return (
    <div>
      <h1>Screen Time Tracker</h1>
      <p>Total Screen Time: {screenTime / 1000} seconds</p>
    </div>
  );
};

export default ScreenTimeTracker;
