import { useState, useEffect } from "react";
import { TimerControls } from "./Components/TimerControls";
import { TimerDisplay } from "./Components/TimerDisplay";
import "./App.css";

// Objekt som holder styr på hvor mange minutter eggne skal koke.
const eggTimes = {
  soft: 6,
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
  const base = "/easter-egg-boil"; 

  if (time === 0) return `${base}/images/egg_chicken.png`;
  if (isStarted) return `${base}/images/impatient_chicken.png`;
  if (isHovered) return `${base}/images/curious_chicken.png`;
  return `${base}/images/chicken_idle.png`;
};

  return (
    <div className="app-container">
      <div className="card">
        <h1 className="title">Easter Egg Boil Alarm</h1>

        <img src={getChickenImage()} alt="chicken" className="chicken-image"/>

        <p className="boil-text">Boil water and once you put the eggs in, click one of the buttons!</p>

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
