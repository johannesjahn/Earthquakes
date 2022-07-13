import { LoadingOverlay } from "@mantine/core";
import { FC, useRef, useEffect } from "react";
import { VegaLite } from "react-vega";
import { EarthquakeData } from "./model";
import { useEarthquakes } from "./state";

const MapVisualization: FC = () => {
  const loading = useEarthquakes((state) => state.loading);
  const earthquakes = useEarthquakes((state) => state.earthquakes);

  return (
    <div
      style={{
        flexGrow: 1,
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <LoadingOverlay visible={loading} />
      {earthquakes ? (
        <VegaLite
          actions={false}
          width={800}
          height={400}
          renderer="svg"
          spec={{
            layer: [
              {
                data: {
                  url: "https://raw.githubusercontent.com/d3/d3-geo/main/test/data/us-10m.json",
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
                  fill: "lightgray",
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
                  tooltip: { field: "properties.place", type: "nominal" },
                  size: { field: "properties.mag", legend: null },
                  color: {
                    field: "properties.mag",
                    type: "ordinal",
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
      ) : null}
    </div>
  );
};

export default MapVisualization;
