import { FC } from "react";
import { Layout, Header, Main } from "./containers";
import { LocalizationProvider, SettingsProvider, DataProivder } from "./providers";
import { Store } from "./service";
import { Language, LocalWeather, Scale } from "./types";

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
  <SettingsProvider>
    <DataProivder>
      <LocalizationProvider>
        <Layout>
          <Header />
          <Main />
        </Layout>
      </LocalizationProvider>
    </DataProivder>
  </SettingsProvider>
);

export default App;
