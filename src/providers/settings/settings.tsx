import { createContext, FC, ReactNode, useState } from "react";
import { LanguageStore, ScaleStore, VolumeStore, WeatherStore } from "services";
import { Language, LocalWeather, Scale } from "types";

type Props = FC<{ children?: ReactNode }>;

interface SettingsProviderInterface {
  scale: Scale;
  language: Language;
  volume: number;
  localWeather: LocalWeather;
  changeScale: (scale: Scale) => void;
  changeLanguage: (language: Language) => void;
  changeVolume: (volume: number) => void;
  changeLocalWeather: (weather: LocalWeather) => void;
}

export const Context = createContext<SettingsProviderInterface>({
  language: Language.EN,
  scale: Scale.FAR,
  volume: 1,
  localWeather: { language: Language.EN, weather: "" },
  changeLanguage: () => undefined,
  changeScale: () => undefined,
  changeVolume: () => undefined,
  changeLocalWeather: () => undefined,
});

export const SettingsProvider: Props = ({ children }) => {
  const [scale, setScale] = useState(ScaleStore.read() || ScaleStore.setDefaultValue());
  const [language, setLanguage] = useState(LanguageStore.read() || LanguageStore.setDefaultValue());
  const [volume, setVolume] = useState(VolumeStore.read() || VolumeStore.setDefaultValue());
  const [localWeather, setLocalWeather] = useState(
    WeatherStore.read() || WeatherStore.setDefaultValue(),
  );

  const changeLanguage = (value: Language) => {
    LanguageStore.write(value);
    setLanguage(value);
  };

  const changeScale = (value: Scale) => {
    ScaleStore.write(value);
    setScale(value);
  };

  const changeVolume = (value: number) => {
    VolumeStore.write(value);
    setVolume(value);
  };

  const changeLocalWeather = (value: LocalWeather) => {
    WeatherStore.write(value);
    setLocalWeather(value);
  };

  return (
    <Context.Provider
      value={{
        language,
        scale,
        volume,
        localWeather,
        changeLanguage,
        changeScale,
        changeVolume,
        changeLocalWeather,
      }}
    >
      {children}
    </Context.Provider>
  );
};
