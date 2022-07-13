import axios from "axios";
import type { NextPage } from "next";
import { useEffect } from "react";
import MapVisualization from "../components/map";
import Timer from "../components/timer";
import { EARTHQUAKE_URL } from "../service/constants";
import { EarthquakeData } from "../service/model";
import { useEarthquakes } from "../service/state";

const Home: NextPage<{ data: EarthquakeData }> = () => {
  const earthquakes = useEarthquakes((state) => state.earthquakes);
  const setEarthquakes = useEarthquakes((state) => state.setEarthquakes);
  const setLoading = useEarthquakes((state) => state.setLoading);

  useEffect(() => {
    setLoading(true);
    axios
      .get(EARTHQUAKE_URL)
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
        <h1 style={{ textAlign: "center" }}>Earthquakes in the USA</h1>
      </div>
      {earthquakes ? <MapVisualization /> : null}
    </div>
  );
};

export default Home;
