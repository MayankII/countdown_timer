import React, { useEffect, useState, useRef } from "react";
import "./App.css";
function App() {
  const [time, setTime] = useState({
    hour: 0,
    minute: 0,
    second: 0,
  });
  const [running, setRunning] = useState(false);
  const [change, setChange] = useState(false);
  const [timer, setTimer] = useState(0);
  const intervalRef = useRef();
  const handleChange = (e) => {
    setChange(true);
    const { id, value } = e.target;
    setTime((prev) => {
      return {
        ...prev,
        [id]: value,
      };
    });
  };
  const startTimer = () => {
    setRunning(true);
    if (timer === 0 || change) {
      setChange(false);
      clearInterval(intervalRef.current);
      const hour =
        time.hour === "" ? 0 : Math.floor(Number(time.hour)) * 60 * 60;
      const minute =
        time.minute === "" ? 0 : Math.floor(Number(time.minute)) * 60;
      const second = time.second === "" ? 0 : Math.floor(Number(time.second));
      const totalSeconds = Number(hour) + Number(minute) + Number(second);

      setTimer(totalSeconds);
      setTime({
        hour: 0,
        minute: 0,
        second: 0,
      });
    }
    intervalRef.current = setInterval(() => {
      setTimer((prev) => {
        if (prev > 0) {
          return prev - 1;
        } else {
          clearInterval(intervalRef.current);
          return 0;
        }
      });
    }, 1000);
  };
  const stopTimer = () => {
    clearInterval(intervalRef.current);
    setRunning(false);
  };
  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);
  return (
    <>
      <div>
        <h2>Countdown Timer</h2>
        <h4>HOURS</h4>
        <input
          type="number"
          value={time.hour}
          disabled={running}
          onChange={handleChange}
          id="hour"
        />
        <h4>MINUTES</h4>
        <input
          type="number"
          value={time.minute}
          disabled={running}
          onChange={handleChange}
          id="minute"
        />
        <h4>SECONDS</h4>
        <input
          type="number"
          disabled={running}
          value={time.second}
          onChange={handleChange}
          id="second"
        />

        <h1>{`${Math.floor(timer / 3600)} : ${Math.floor(
          (timer % 3600) / 60
        )} : ${timer % 60}`}</h1>
        <button disabled={running} onClick={startTimer}>
          Start Timer
        </button>
        <button disabled={!running} onClick={stopTimer}>
          Stop Timer
        </button>
      </div>
    </>
  );
}

export default App;
