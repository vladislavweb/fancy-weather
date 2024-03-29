import { Language } from "./settings";

export enum MapBoxRequestTypes {
  country = "country",
  place = "place",
}

interface Map {
  id: string;
  language: Language;
  type: string;
  text: string;
  place_name: string;
  place_type: MapBoxRequestTypes[];
}

export interface MapBoxResponse {
  type: string;
  query: string[];
  features: Map[];
  attribution: string;
}
