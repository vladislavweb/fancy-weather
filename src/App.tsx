import { FC } from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Layout, Header, Main } from "./containers";
import {
  BackgroundProvider,
  ConfigProvider,
  LocalizationProvider,
  MapBoxProvider,
  MapQuestProvider,
  SettingsProvider,
  WeatherProvider,
} from "./providers";
import { Store } from "./service";
import { Language, LocalWeather, Scale } from "./types";

const queryClient = new QueryClient();

const localLanguage = new Store<Language>("language");
const localScale = new Store<Scale>("scale");
const localVolume = new Store<number>("volume");
const localWeather = new Store<LocalWeather>("weather");

if (!localLanguage.read() || !localScale.read() || !localVolume.read() || !localWeather.read()) {
  localLanguage.write(Language.EN);
  localScale.write(Scale.CEL);
  localVolume.write(1);
  localWeather.write({ language: Language.EN, weather: "" });
}

const App: FC = () => (
  <QueryClientProvider client={queryClient}>
    <ConfigProvider>
      <SettingsProvider>
        <MapQuestProvider>
          <MapBoxProvider>
            <WeatherProvider>
              <BackgroundProvider>
                <LocalizationProvider>
                  <Layout>
                    <Header />
                    <Main />
                  </Layout>
                </LocalizationProvider>
              </BackgroundProvider>
            </WeatherProvider>
          </MapBoxProvider>
        </MapQuestProvider>
      </SettingsProvider>
    </ConfigProvider>
  </QueryClientProvider>
);

export default App;
