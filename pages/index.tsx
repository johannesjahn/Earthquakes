import { useMantineTheme } from "@mantine/core";
import axios from "axios";
import type { NextPage } from "next";
import { useEffect } from "react";
import TabsHolder from "../components/tabs";
import Timer from "../components/timer";
import { EARTHQUAKE_URL } from "../service/constants";
import { EarthquakeData } from "../service/model";
import { useEarthquakes } from "../service/state";

const Home: NextPage<{ data: EarthquakeData }> = () => {
  const earthquakes = useEarthquakes((state) => state.earthquakes);
  const setEarthquakes = useEarthquakes((state) => state.setEarthquakes);
  const setLoading = useEarthquakes((state) => state.setLoading);
  const theme = useMantineTheme();

  // Load earthquakes data on mount
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
        alignItems: "center",
        background:
          theme.colorScheme === "dark" ? theme.colors.dark[7] : "#fff",
      }}
    >
      <div style={{ position: "relative", width: "100%" }}>
        <Timer />
        <h1
          style={{
            textAlign: "center",
            color: theme.colorScheme === "dark" ? "white" : "black",
          }}
        >
          Earthquakes in the USA
        </h1>
      </div>
      {earthquakes ? <TabsHolder /> : null}
    </div>
  );
};

export default Home;
