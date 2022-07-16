import { Button, Progress } from "@mantine/core";
import axios from "axios";
import { FC, useEffect, useState } from "react";
import { EARTHQUAKE_URL } from "../data/constants";
import { useEarthquakes } from "../data/state";

const TIMEOUT = 1000 * 60;

const Timer: FC = () => {
  const [updatedAt, setUpdatedAt] = useState(new Date());
  const [progress, setProgress] = useState(0);

  const [canRefresh, setCanRefresh] = useState(false);

  const setEarthquakes = useEarthquakes((state) => state.setEarthquakes);
  const setLoading = useEarthquakes((state) => state.setLoading);

  useEffect(() => {
    const interval = setInterval(async () => {
      const diff = new Date().getTime() - updatedAt.getTime();
      if (diff >= TIMEOUT) {
        setProgress(100);
      } else {
        setProgress(Math.floor((diff / TIMEOUT) * 100));
      }

      if (!canRefresh && diff > TIMEOUT) {
        setCanRefresh(true);
      }
    }, 10);
    return () => {
      clearInterval(interval);
    };
  }, [canRefresh, updatedAt]);

  return (
    <div style={{ position: "absolute", top: 20, right: 20 }}>
      {progress >= 100 ? (
        <Button
          style={{ width: 100, height: 30 }}
          onClick={async () => {
            setLoading(true);
            try {
              const data = await axios.get(EARTHQUAKE_URL);
              setEarthquakes(data.data);
              setUpdatedAt(new Date());
              setCanRefresh(false);
            } finally {
              setLoading(false);
            }
          }}
          disabled={!canRefresh}
        >
          Refresh
        </Button>
      ) : (
        <Progress
          style={{ width: 100, height: 30 }}
          value={progress}
          striped={false}
        />
      )}
    </div>
  );
};

export default Timer;
