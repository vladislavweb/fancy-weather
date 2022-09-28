export interface ApplicationConfig {
  openWeatherMap: {
    url: string;
    key: string;
  };
  mapQuestApi: {
    url: {
      geocoding: string;
      reverse: string;
    };
    token: string;
  };
  mapBox: {
    url: string;
    token: string;
  };
  unsplash: {
    url: string;
    key: string;
  };
}
