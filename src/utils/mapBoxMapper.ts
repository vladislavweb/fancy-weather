import { MapBoxRequestTypes, MapBoxResponse } from "../types";

interface Response {
  country: string;
  place: string;
}

export const mapBoxMapper = (mapBoxData?: MapBoxResponse): Response => {
  const response: Response = {
    country: "",
    place: "",
  };

  let countryIndex = -1;
  let placeIndex = -1;

  if (mapBoxData) {
    for (let i = 0; i < mapBoxData.features.length; i++) {
      if (mapBoxData.features[i].place_type.includes(MapBoxRequestTypes.country)) {
        countryIndex = i;
      }

      if (mapBoxData.features[i].place_type.includes(MapBoxRequestTypes.place)) {
        placeIndex = i;
      }
    }
  }

  if (mapBoxData?.features.length) {
    if (countryIndex >= 0) {
      response.country = mapBoxData.features[countryIndex].place_name;
    }

    if (placeIndex >= 0) {
      response.place = mapBoxData.features[placeIndex].place_name;
    }
  }

  return response;
};
