import axios from "axios";
import type { NextPage } from "next";
import { useEffect, useRef } from "react";
import MapVisualization from "../components/map";
import { EarthquakeData } from "../components/model";
import { useEarthquakes } from "../components/state";
import Timer from "../components/timer";

const Home: NextPage<{ data: EarthquakeData }> = () => {
  const earthquakes = useEarthquakes((state) => state.earthquakes);
  const setEarthquakes = useEarthquakes((state) => state.setEarthquakes);

  useEffect(() => {
    axios
      .get(
        "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson"
      )
      .then((d) => setEarthquakes(d.data));
  }, []);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
        alignItems: "center",
      }}
    >
      <div>
        <Timer />
      </div>
      {earthquakes ? <MapVisualization earthquakedata={earthquakes} /> : null}
    </div>
  );
};

export default Home;
