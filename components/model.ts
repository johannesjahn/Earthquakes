export interface EarthquakeData {
  type: "FeatureCollection";
  metadata: EarthquakeMetadata;
  features: EarthquakeFeature[];
  bbox: [number, number, number, number, number, number];
}

export interface EarthquakeMetadata {
  generated: number;
  url: string;
  title: string;
  api: string;
  count: number;
  status: number;
}

export interface EarthquakeFeature {
  id: string;
  type: "Feature";
  properties: EarthquakeFeatureProperties;
  geometry: EarthquakeGeometry;
}

export interface EarthquakeFeatureProperties {
  type: string;
  mag: number;
  place: string;
  time: number;
  updated: number;
  tz: number;
  url: string;
  detail: string;
  felt: number;
  cdi: number;
  mmi: number;
  alert: string;
  status: string;
  tsunami: number;
  sig: number;
  net: string;
  code: string;
  ids: string;
  sources: string;
  types: string;
  nst: number;
  dmin: number;
  rms: number;
  gap: number;
  magType: string;
}

export interface EarthquakeGeometry {
  type: "Point";
  coordinates: [number, number, number];
}
