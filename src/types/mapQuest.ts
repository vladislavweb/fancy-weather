export interface MapQuestResponse {
  info: {
    statuscode: 0;
    copyright: {
      text: string;
      imageUrl: string;
      imageAltText: string;
    };
    messages: [];
  };
  options: {
    maxResults: number;
    thumbMaps: boolean;
    ignoreLatLngInput: boolean;
  };
  results: [
    {
      providedLocation: {
        location: string;
      };
      locations: [
        {
          street: string;
          adminArea6: string;
          adminArea6Type: string;
          adminArea5: string;
          adminArea5Type: string;
          adminArea4: string;
          adminArea4Type: string;
          adminArea3: string;
          adminArea3Type: string;
          adminArea1: string;
          adminArea1Type: string;
          postalCode: string;
          geocodeQualityCode: string;
          geocodeQuality: string;
          dragPoint: false;
          sideOfStreet: "N";
          linkId: number;
          unknownInput: string;
          type: "s";
          latLng: {
            lat: number;
            lng: number;
          };
          displayLatLng: {
            lat: number;
            lng: number;
          };
          mapUrl: string;
        },
      ];
    },
  ];
}
