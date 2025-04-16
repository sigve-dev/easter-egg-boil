import { useEffect, useState } from "react";

const useEggTimer = (initialTime: number | null, isStarted: boolean) => {
  const [time, setTime] = useState<number | null>(initialTime);

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
      const audio = new Audio("audio/ding.mp3");
      audio.play();
    }
  }, [time]);
  
  return { time, setTime };
};

export default useEggTimer;