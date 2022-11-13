import { FC, ReactNode, useContext, useEffect } from "react";
import { BackgroundContext } from "../../providers/background";
import "./layout.css";

type Props = {
  children?: ReactNode;
};

const Layout: FC<Props> = ({ children }) => {
  const { changeImageInformation } = useContext(BackgroundContext);

  useEffect(() => {
    changeImageInformation({ timeOfDay: "day", weather: "rain" });
  }, []);

  return <div className="layout">{children}</div>;
};

export default Layout;
