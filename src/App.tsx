import { FC } from "react";
import { Layout, Header, Main } from "./containers";
import { LocalizationProvider, SettingsProvider, DataProivder } from "./providers";

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
