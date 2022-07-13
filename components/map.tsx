import { FC, useRef, useEffect } from "react";
import { VegaLite } from "react-vega";
import { EarthquakeData } from "./model";

const MapVisualization: FC<{ earthquakedata: EarthquakeData }> = ({
  earthquakedata,
}) => {
  return (
    <div
      style={{
        flexGrow: 1,
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <VegaLite
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
                values: earthquakedata.features,
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
                size: { value: 20 },
                color: { value: "steelblue" },
              },
            },
            {
              data: {
                values: earthquakedata.features,
              },
              projection: {
                type: "albersUsa",
              },
              mark: {
                type: "text",
                dy: -10,
              },
              encoding: {
                longitude: {
                  field: "geometry.coordinates[0]",
                  type: "quantitative",
                },
                latitude: {
                  field: "geometry.coordinates[1]",
                  type: "quantitative",
                },
                text: { field: "properties.mag", type: "quantitative" },
              },
            },
          ],
        }}
      />
    </div>
  );
};

export default MapVisualization;
