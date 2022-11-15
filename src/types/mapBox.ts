interface Map {
  id: string;
  type: string;
  text: string;
  place_name: string;
  matching_text: string;
  matching_place_name: string;
}

export interface MapBoxResponse {
  type: string;
  query: string[];
  features: Map[];
  attribution: string;
}
