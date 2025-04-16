import { motion } from "framer-motion";
import "../App.css";

type TimerDisplayType = {
  boilType: "soft" | "hard" | null;
  time: number | null;
  eggSize: "small" | "medium" | "large";
  onReset: () => void;
};

const TimerDisplay = ({ boilType, time, eggSize, onReset }: TimerDisplayType) => {
  const formatTime = (seconds: number) => {
    
    // Henter antall hele minutter
    const min = Math.floor(seconds / 60);

    // Henter antall sekunder
    const sec = seconds % 60;
    // .padStart sørger for at det alltid er to siffer i sekundene.
    return `${min}:${sec.toString().padStart(2, "0")}`;
  };

  // Motion brukes fra framer-motion som tilbyr animasjoner som fade-in, slide osv. 
  // Brukes her hvor opacity starter med y = 10 og glir oppover til y = 0.
  // Samtidig endres opacity fra 0 til 1.
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="timer-display"
    >
      <p className="boil-text">Boiling a <strong>{eggSize} {boilType}-boiled</strong> egg...</p>
      <p className="time-text">
        {time !== null ? formatTime(time) : "00:00"}
      </p>
      {time === 0 ? (
        <>
          <p className="done-text">Done! 🛎️</p>
          <div className="button-group">
            <button className="button reset" onClick={onReset}>
             Start Over
            </button>
          </div>
        </>
      ) : (
        <div className="button-group">
          <button className="button stop" onClick={onReset}>
            🛑 Stop
          </button>
        </div>
      )}
    </motion.div>
  )
}

export default TimerDisplay;
