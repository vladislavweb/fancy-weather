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
import { Language, Scale } from "./types";

const queryClient = new QueryClient();

const App: FC = () => {
  const localTouched = new Store<boolean>("touched");

  if (!localTouched.read()) {
    localTouched.write(true);
    new Store<Language>("language").write(Language.EN);
    new Store<Scale>("scale").write(Scale.CEL);
    new Store<number>("volume").write(1);
  }

  return (
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
};

export default App;
