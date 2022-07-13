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
  const setLoading = useEarthquakes((state) => state.setLoading);

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson"
      )
      .then((d) => {
        setEarthquakes(d.data);
      })
      .finally(() => {
        setLoading(false);
      });
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
      <div style={{ position: "relative", width: "100%" }}>
        <Timer />
        <h1 style={{ textAlign: "center" }}>Earthquake Visualization System</h1>
      </div>
      {earthquakes ? <MapVisualization /> : null}
    </div>
  );
};

export default Home;
