import { useMantineTheme } from "@mantine/core";
import { FC } from "react";
import { VegaLite } from "react-vega";
import { US_DATA } from "../data/us-10m";
import { useEarthquakes } from "../data/state";

const MapVisualization: FC = () => {
  const earthquakes = useEarthquakes((state) => state.earthquakes);
  const setSelected = useEarthquakes((state) => state.setSelectedEarthquake);
  const theme = useMantineTheme();

  return (
    <>
      {earthquakes ? (
        <>
          <VegaLite
            onNewView={(v) => {
              v.addEventListener("click", (event, item) => {
                if (
                  item &&
                  item.datum &&
                  item.datum.geometry?.type === "Point"
                ) {
                  setSelected(item.datum);
                }
              });
            }}
            actions={false}
            width={800}
            height={400}
            renderer="svg"
            spec={{
              background:
                theme.colorScheme === "dark" ? theme.colors.dark[7] : "#fff",
              layer: [
                {
                  data: {
                    values: US_DATA,
                    format: {
                      type: "topojson",
                      feature: "states",
                    },
                  },
                  projection: {
                    type: "albersUsa",
                  },
                  mark: {
                    type: "geoshape",
                    fill:
                      theme.colorScheme === "dark"
                        ? theme.colors.dark[7]
                        : "lightgray",
                    stroke: "white",
                  },
                },
                {
                  data: {
                    values: earthquakes.features,
                  },
                  projection: {
                    type: "albersUsa",
                  },
                  mark: "circle",
                  encoding: {
                    longitude: {
                      field: "geometry.coordinates[0]",
                      type: "quantitative",
                    },
                    latitude: {
                      field: "geometry.coordinates[1]",
                      type: "quantitative",
                    },
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
                    size: { field: "properties.mag", legend: null },
                    color: {
                      field: "properties.mag",
                      type: "quantitative",
                      legend: null,
                      scale: {
                        rangeMin: 0,
                        rangeMax: 10,
                        scheme: ["green", "yellow", "red"],
                      },
                    },
                  },
                },
              ],
            }}
          />
        </>
      ) : null}
    </>
  );
};

export default MapVisualization;
