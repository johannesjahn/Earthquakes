import create from "zustand";
import { EarthquakeData } from "./model";

export const useEarthquakes = create<{
  earthquakes?: EarthquakeData;
  setEarthquakes: (earthquakes: EarthquakeData) => void;
}>((set) => ({
  setEarthquakes: (earthquakes: EarthquakeData) =>
    set((state) => ({ earthquakes })),
}));
