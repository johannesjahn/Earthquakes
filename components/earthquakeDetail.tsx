import { Table } from "@mantine/core";
import { FC } from "react";
import { EarthquakeFeature } from "../service/model";

const EarthquakeDetail: FC<{ earthquake: EarthquakeFeature }> = ({
  earthquake,
}) => {
  return (
    <div>
      <h2>{earthquake.properties.title}</h2>
      <Table>
        <tbody>
          {Object.entries(earthquake.properties).map(([key, value]) => {
            if (!value) return null;
            return (
              <tr key={key}>
                <td>{key}</td>
                <td>{value}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default EarthquakeDetail;
