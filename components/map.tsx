import { LoadingOverlay, Modal } from "@mantine/core";
import { FC, useState } from "react";
import { VegaLite } from "react-vega";
import { EarthquakeFeature } from "../service/model";
import { useEarthquakes } from "../service/state";
import EarthquakeDetail from "./earthquakeDetail";

const MapVisualization: FC = () => {
  const loading = useEarthquakes((state) => state.loading);
  const earthquakes = useEarthquakes((state) => state.earthquakes);
  const [selected, setSelected]: [EarthquakeFeature?, any?] = useState();

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
        <>
          <Modal
            overlayBlur={5}
            overlayColor="transparent"
            overflow="outside"
            opened={!!selected}
            onClose={() => {
              setSelected(undefined);
            }}
          >
            {selected ? <EarthquakeDetail earthquake={selected} /> : null}
          </Modal>
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
              layer: [
                {
                  data: {
                    url: "/us-10m.json",
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
                        type: "ordinal",
                        title: "Magnitude",
                      },
                    ],
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
        </>
      ) : null}
    </div>
  );
};

export default MapVisualization;
