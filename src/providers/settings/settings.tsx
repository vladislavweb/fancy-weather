import { createContext, FC, ReactNode, useState } from "react";
import { Language, Scale } from "../../types";

type Props = FC<{ children?: ReactNode }>;

interface SettingsProviderInterface {
  scale: Scale;
  language: Language;
  changeScale: (scale: Scale) => void;
  changeLanguage: (language: Language) => void;
}

export const Context = createContext<SettingsProviderInterface>({
  scale: Scale.FAR,
  language: Language.EN,
  changeScale: () => undefined,
  changeLanguage: () => undefined,
});

export const SettingsProvider: Props = ({ children }) => {
  const [scale, setScale] = useState((localStorage.getItem("scale") as Scale) || Scale.FAR);
  const [language, setLanguage] = useState(
    (localStorage.getItem("language") as Language) || Language.EN,
  );

  const changeScale = (scale: Scale) => setScale(scale);
  const changeLanguage = (language: Language) => setLanguage(language);

  return (
    <Context.Provider value={{ scale, language, changeScale, changeLanguage }}>
      {children}
    </Context.Provider>
  );
};
