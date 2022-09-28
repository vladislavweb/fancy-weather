import { createContext, FC, ReactNode } from "react";
import { ApplicationConfig } from "../../types";
import config from "../../application.json";

type Props = FC<{ children?: ReactNode }>;

export const Context = createContext<ApplicationConfig>(config);

export const ConfigProvider: Props = ({ children }) => <Context.Provider value={config}>{children}</Context.Provider>;
