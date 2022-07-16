import { useMantineTheme } from "@mantine/core";
import { FC } from "react";
import { VegaLite } from "react-vega";
import { useEarthquakes } from "../data/state";

const ScatterVisualization: FC = () => {
  const earthquakes = useEarthquakes((state) => state.earthquakes);
  const setSelected = useEarthquakes((state) => state.setSelectedEarthquake);
  const theme = useMantineTheme();

  return (
    <>
      {earthquakes ? (
        <VegaLite
          onNewView={(v) => {
            v.addEventListener("click", (event, item) => {
              if (item && item.datum && item.datum.geometry?.type === "Point") {
                setSelected(item.datum);
              }
            });
          }}
          width={760}
          height={400}
          actions={false}
          config={{
            text: { color: theme.colorScheme === "dark" ? "white" : "black" },
          }}
          spec={{
            data: { values: earthquakes.features },
            background:
              theme.colorScheme === "dark" ? theme.colors.dark[7] : "#fff",
            mark: "circle",
            config: {},
            encoding: {
              tooltip: [
                {
                  field: "properties.place",
                  type: "nominal",
                  title: "Place",
                },
                {
                  field: "properties.time",
                  type: "temporal",
                  title: "Date",
                },
                {
                  field: "properties.mag",
                  type: "quantitative",
                  title: "Magnitude",
                },
              ],
              x: {
                field: "properties.time",
                type: "temporal",
                timeUnit: "hours",
                axis: {
                  grid: false,
                  title: "Hours",
                  labelColor: theme.colorScheme === "dark" ? "white" : "black",
                  titleColor: theme.colorScheme === "dark" ? "white" : "black",
                },
              },
              y: {
                field: "properties.mag",
                type: "quantitative",
                axis: {
                  grid: false,
                  title: "Magnitude",
                  labelColor: theme.colorScheme === "dark" ? "white" : "black",
                  titleColor: theme.colorScheme === "dark" ? "white" : "black",
                },
              },
              size: { field: "properties.mag", legend: null },
              color: {
                field: "properties.mag",
                type: "ordinal",
                scale: {
                  rangeMin: 0,
                  rangeMax: 10,
                  // @ts-ignore: Unreachable code error
                  scheme: ["green", "yellow", "red"],
                },
              },
            },
          }}
        />
      ) : null}
    </>
  );
};

export default ScatterVisualization;
