import axios from "axios";
import { FC, useEffect, useState } from "react";
import { useEarthquakes } from "./state";

const Timer: FC = () => {
  const [time, setTime] = useState(new Date());
  const [ctime, setCTime] = useState(new Date());
  const [cvalue, setCValue] = useState(0);

  const setEarthquakes = useEarthquakes((state) => state.setEarthquakes);
  const earth = useEarthquakes((state) => state.earthquakes);

  useEffect(() => {
    const interval = setInterval(async () => {
      setTime(new Date());
      const data = await axios.get(
        "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson"
      );
      setEarthquakes(data.data);
      //   console.log(data.data.metadata.generated != cvalue);
      if (cvalue != data.data.metadata.generated) {
        console.log(data.data.metadata.generated);
        console.log(cvalue);
        console.log(
          "Changed after " + (new Date().getTime() - ctime.getTime())
        );

        setCTime(new Date());
        setCValue(data.data.metadata.generated ?? 0);
      }
    }, 1000 * 60);
    return () => {
      clearInterval(interval);
    };
  }, [cvalue]);

  return <button>{time.getSeconds()}</button>;
};

export default Timer;
