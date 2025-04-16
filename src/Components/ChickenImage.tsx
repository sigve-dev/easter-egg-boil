import { useState } from "react";

type ImageType = {
    isStarted: boolean;
    time: number | null;
  };
  
  export const ChickenImage = ({ isStarted, time }: ImageType) => {
    const [isHovered, setIsHovered] = useState(false);
    const base = "/easter-egg-boil";
  
    let image = `${base}/images/chicken_idle.png`;
    if (time === 0) image = `${base}/images/egg_chicken.png`;
    else if (isStarted) image = `${base}/images/impatient_chicken.png`;
    else if (isHovered) image = `${base}/images/curious_chicken.png`;
  
    return (
        <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <img src={image} alt="chicken" className="chicken-image" />
        </div>
    );
  };
  