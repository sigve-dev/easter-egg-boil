import { useState } from "react";
import TimerControls from "./Components/TimerControls";
import TimerDisplay from "./Components/TimerDisplay";
import { Darkmode } from "./Components/Darkmode";
import { ChickenImage } from "./Components/ChickenImage";
import useEggTimer from "./hooks/useEggTimer";
import { eggTimes, EggType } from "./utilities/eggTimes";
import EggSizeSelector from "./Components/EggSizeSelector";
import "./App.css";

function EggTimerApp() {
    const [boilType, setBoilType] = useState<"soft" | "medium" | "hard" | null>(null);
    const [isStarted, setIsStarted] = useState(false);
    const { time, setTime } = useEggTimer(boilType ? eggTimes[boilType] * 60 : null, isStarted);
    const [eggSize, setEggSize] = useState<"small" | "medium" | "large">("medium");

    // Legger på ekstra tid dersom størrelsen på egget er mindre eller større enn vanlig.
    const getSizeModifier = (size: "small" | "medium" | "large") => {
      if (size === "small") return -60;
      if (size === "large") return 60;
      return 0;
    };
    
    // Når bruker velger eggtype, settes typen, timeren og isStarted === true;
    const startTimer = (type: EggType) => {
      const baseTime = eggTimes[type] * 60;
      const adjustedTime = baseTime + getSizeModifier(eggSize);
      setBoilType(type);
      setTime(adjustedTime);
      setIsStarted(true);
    };
    
  
    const resetTimer = () => {
        setBoilType(null);
        setTime(null);
        setIsStarted(false);
    };

    return (
        <div className="app-container">
            <div className="card">

            <Darkmode/>

            <h1 className="title">Easter Egg Boil Alarm</h1>

            <ChickenImage isStarted={isStarted} time={time} />

            {!isStarted && (
                <EggSizeSelector eggSize={eggSize} onSelect={setEggSize} />
            )}

            {/* Dersom timeren ikke er isStarted, vises knappene  */}
            {!isStarted ? (
                <>
                    <p className="boil-text">Boil water and once you put the eggs in, click one of the buttons!</p>
                    <TimerControls onSelect={startTimer} />   
                </>                 

            ) : (
                /* Dersom timeren er isStarted, vises timeren  */
                <TimerDisplay boilType={boilType} time={time} eggSize={eggSize} onReset={resetTimer} />
            )}
            </div>
        </div>
    );
} 

export default EggTimerApp;
