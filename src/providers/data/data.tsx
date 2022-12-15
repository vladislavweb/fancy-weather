import { createContext, FC, ReactNode, useContext, useState } from "react";
import { DataResponse, fetchData, FetchDataParams } from "../../api";
import { setBackgroundImage } from "../../utils";
import { SettingsContext } from "../settings";

type Props = FC<{ children?: ReactNode }>;

type GetDataParams = Omit<FetchDataParams, "language">;

interface DataProviderInterface {
  searchString: string;
  backgroundImageIsLoading: boolean;
  data?: DataResponse;
  dataIsLoading: boolean;
  changeSearchString: (str: string) => void;
  changeBackgroundImageIsLoading: (isLoading: boolean) => void;
  getData: (params: GetDataParams) => void;
}

export const Context = createContext<DataProviderInterface>({
  searchString: "",
  backgroundImageIsLoading: false,
  dataIsLoading: false,
  changeSearchString: () => undefined,
  changeBackgroundImageIsLoading: () => undefined,
  getData: () => undefined,
});

export const DataProivder: Props = ({ children }) => {
  const { language } = useContext(SettingsContext);
  const [data, setData] = useState<DataResponse>();
  const [searchString, setSearchString] = useState("");
  const [dataIsLoading, setDataIsLoading] = useState(false);
  const [backgroundImageIsLoading, setBackgroundImageIsLoading] = useState(false);

  const changeSearchString = (str: string) => {
    setSearchString(str);
  };

  const changeBackgroundImageIsLoading = (isLoading: boolean) => {
    setBackgroundImageIsLoading(isLoading);
  };

  const getData = (params: GetDataParams) => {
    setDataIsLoading(true);

    fetchData({ language, ...params })
      .then((res) => {
        setData(res);

        if (res?.backgroundData) {
          setBackgroundImage({
            imageData: res.backgroundData,
            onStart: () => setBackgroundImageIsLoading(true),
            onEnd: () => setBackgroundImageIsLoading(false),
          });
        }
      })
      .finally(() => {
        setDataIsLoading(false);
      });
  };

  return (
    <Context.Provider
      value={{
        data,
        dataIsLoading,
        searchString,
        changeSearchString,
        backgroundImageIsLoading,
        changeBackgroundImageIsLoading,
        getData,
      }}
    >
      {children}
    </Context.Provider>
  );
};
