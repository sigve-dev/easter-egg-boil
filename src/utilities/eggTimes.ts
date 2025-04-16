// Objekt som holder styr på hvor mange minutter eggne skal koke.
export const eggTimes = {
    soft: 6,
    medium: 8,
    hard: 10,
};
  
export type EggType = keyof typeof eggTimes;
  