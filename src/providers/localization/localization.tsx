import { FC, ReactNode, useContext, useEffect, useState } from "react";
import { IntlProvider } from "react-intl";
import { SettingsContext } from "../settings";
import { Language } from "../../types";

type Props = FC<{ children?: ReactNode }>;

export const LocalizationProvider: Props = ({ children }) => {
  const { language } = useContext(SettingsContext);
  const [intlProps, setIntlProps] = useState({
    locale: Language.EN,
    messages: {},
  });

  const loadMessages = async () => {
    switch (language) {
      case Language.RU: {
        return import("../../compiled-lang/ru.json");
      }
      case Language.UK: {
        return import("../../compiled-lang/uk.json");
      }
      default: {
        return import("../../compiled-lang/en.json");
      }
    }
  };

  const changeIntlProps = async () => {
    loadMessages().then((data) => {
      setIntlProps({
        locale: language,
        messages: data,
      });
    });
  };

  useEffect(() => {
    changeIntlProps();
  }, [language]);

  return (
    <IntlProvider defaultLocale={Language.EN} {...intlProps}>
      {children}
    </IntlProvider>
  );
};
