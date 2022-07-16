import create from "zustand";
import { EarthquakeData, EarthquakeFeature } from "./model";

export const useEarthquakes = create<{
  earthquakes?: EarthquakeData;
  setEarthquakes: (earthquakes: EarthquakeData) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  selectedEarthquake?: EarthquakeFeature;
  setSelectedEarthquake: (feature?: EarthquakeFeature) => void;
}>((set) => ({
  setEarthquakes: (earthquakes: EarthquakeData) =>
    set((state) => ({ earthquakes })),
  setLoading: (loading: boolean) => set((state) => ({ loading })),
  loading: false,
  setSelectedEarthquake: (selectedEarthquake?: EarthquakeFeature) => {
    set((state) => ({ selectedEarthquake }));
  },
}));
