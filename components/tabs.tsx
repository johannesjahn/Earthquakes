import { LoadingOverlay, Modal, Tabs } from "@mantine/core";
import { FC } from "react";
import { ChartBubble, Map } from "tabler-icons-react";
import { useEarthquakes } from "../service/state";
import EarthquakeDetail from "./earthquakeDetail";
import ScatterVisualization from "./scatterVisualization";
import MapVisualization from "./mapVisualization";

const TabsHolder: FC = () => {
  const loading = useEarthquakes((state) => state.loading);

  const selected = useEarthquakes((state) => state.selectedEarthquake);
  const setSelected = useEarthquakes((state) => state.setSelectedEarthquake);

  return (
    <div
      style={{
        flexGrow: 1,
        display: "flex",
        justifyContent: "start",
        flexDirection: "column",
      }}
    >
      <LoadingOverlay visible={loading} />
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
      <Tabs style={{ width: 800 }}>
        <Tabs.Tab label="Map" icon={<Map />}>
          <MapVisualization />
        </Tabs.Tab>
        <Tabs.Tab label="Scatter" icon={<ChartBubble />}>
          <ScatterVisualization />
        </Tabs.Tab>
      </Tabs>
    </div>
  );
};

export default TabsHolder;
