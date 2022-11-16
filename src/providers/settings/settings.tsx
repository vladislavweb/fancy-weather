import { createContext, FC, ReactNode, useState } from "react";
import { Store } from "../../service";
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
  const localScale = new Store<Scale>("scale");
  const localLanguage = new Store<Language>("language");

  const [scale, setScale] = useState(localScale.read() || Scale.FAR);
  const [language, setLanguage] = useState(localLanguage.read() || Language.EN);

  const changeScale = (scale: Scale) => {
    localScale.write(scale);
    setScale(scale);
  };

  const changeLanguage = (language: Language) => {
    localLanguage.write(language);
    setLanguage(language);
  };

  return (
    <Context.Provider value={{ scale, language, changeScale, changeLanguage }}>
      {children}
    </Context.Provider>
  );
};
