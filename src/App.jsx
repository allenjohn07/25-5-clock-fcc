import React, { useState, useEffect } from 'react';
import Length from './Length';
import './App.css';
import sound from './assets/BeepSound.mp3'

function App() {
  const [displayTime, setDisplayTime] = useState(25 * 60);
  const [breakTime, setBreakTime] = useState(5 * 60);
  const [sessionTime, setSessionTime] = useState(25 * 60);
  const [timerOn, setTimerOn] = useState(false);
  const [onBreak, setOnBreak] = useState(false);
  const [breakAudio] = useState(new Audio(sound));

  const playBreakSound = () => {
    breakAudio.currentTime = 0;
    breakAudio.play();
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return (
      (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds)
    );
  };

  const changeTime = (amount, type) => {
    if (type === 'break') {
      if (breakTime <= 60 && amount < 0) {
        return;
      }
      setBreakTime((prev) => prev + amount);
    } else {
      if (sessionTime <= 60 && amount < 0) {
        return;
      }
      setSessionTime((prev) => prev + amount);
      if (!timerOn) {
        setDisplayTime(sessionTime + amount);
      }
    }
  };

  useEffect(() => {
    if (timerOn) {
      const interval = setInterval(() => {
        setDisplayTime((prev) => {
          if (prev <= 0 && !onBreak) {
            playBreakSound();
            setOnBreak(true);
            return breakTime;
          } else if (prev <= 0 && onBreak) {
            playBreakSound();
            setOnBreak(false);
            return sessionTime;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [timerOn, breakTime, sessionTime, onBreak]);

  const controlTime = () => {
    setTimerOn(!timerOn);
  };

  const resetTime = () => {
    setDisplayTime(25 * 60);
    setBreakTime(5 * 60);
    setSessionTime(25 * 60);
    setTimerOn(false);
    setOnBreak(false);
  };

  return (
    <div style={{ marginBottom: '100px' }} className='text-center container mt-5'>
      <h1>25 + 5 Clock <br /> FreeCodeCamp</h1>
      <div style={{ marginTop: '100px' }} className='dual-container d-flex align-items-center justify-content-center flex-wrap gap-5'>
        <Length title={"Break Length"} changeTime={changeTime} type={"break"} time={breakTime} formatTime={formatTime} />
        <Length title={"Session Length"} changeTime={changeTime} type={"session"} time={sessionTime} formatTime={formatTime} />
      </div>
      <h3 className='mt-5'>{onBreak ? "Break" : "Session"}</h3>
      <h1 style={{ fontSize: '80px', fontFamily: 'monospace' }} className='mt-2'>{formatTime(displayTime)}</h1>
      <button onClick={controlTime} style={{ width: '100px' }} className='btn btn-primary'>
        {timerOn ? 'Pause' : 'Play'}&nbsp;
        {timerOn ? (<i className="fa-solid fa-pause"></i>) : (<i className="fa-solid fa-play"></i>)}
      </button>
      <button onClick={resetTime} style={{ width: '100px', marginLeft: '10px' }} className='btn btn-primary'>Reset&nbsp;
        <i className="fa-solid fa-repeat"></i>
      </button>
    </div>
  );
}

export default App;
