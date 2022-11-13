export interface ApplicationConfig {
  openWeatherMap: {
    url: string;
    key: string;
  };
  mapQuestApi: {
    url: string;
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
