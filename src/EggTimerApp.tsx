import { useState, useEffect } from "react";
import { TimerControls } from "./Components/TimerControls";
import { TimerDisplay } from "./Components/timerDisplay";
import "./App.css";

// Objekt som holder styr på hvor mange minutter eggne skal koke.
const eggTimes = {
  soft: 1,
  hard: 10,
};

export default function EggTimerApp() {
  const [boilType, setBoilType] = useState<"soft" | "hard" | null>(null);
  const [time, setTime] = useState<number | null>(null);
  const [isStarted, setIsStarted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Effekten kjører hvert sekund sålenge isStarted === true. 
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isStarted && time && time > 0) {
      timer = setTimeout(() => setTime((t) => (t ? t - 1 : t)), 1000);
    }
    return () => clearTimeout(timer);
  }, [time, isStarted]);

  useEffect(() => {
    if (time === 0) {
      const audio = new Audio("/ding.mp3");
      audio.play();
    }
  }, [time]);

  // Når bruker velger eggtype, settes typen, timeren og isStarted === true;
  const startTimer = (type: "soft" | "hard") => {
    setBoilType(type);
    setTime(eggTimes[type] * 60);
    setIsStarted(true);
  };

  const resetTimer = () => {
    setBoilType(null);
    setTime(null);
    setIsStarted(false);
  };
  
  const getChickenImage = () => {
    if (time === 0) return "../public/images/egg_chicken.png";
    if (isStarted) return "../public/images/impatient_chicken.png";
    if (isHovered) return "../public/images/curious_chicken.png";
    return "../public/images/chicken_idle.png";
  };

  return (
    <div className="app-container">
      <div className="card">
        <h1 className="title">Easter Egg Boil Alarm</h1>

        <img src={getChickenImage()} alt="chicken" className="chicken-image"/>

        {/* Dersom timeren ikke er isStarted, vises knappene  */}
        {!isStarted ? (
          <div onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            <TimerControls onSelect={startTimer} />
          </div>
        ) : (
          /* Dersom timeren er isStarted, vises timeren  */
          <TimerDisplay boilType={boilType} time={time} onReset={resetTimer} />
        )}
      </div>
    </div>
  );
}
