import { FC, ReactNode } from "react";
import "./layout.scss";

type Props = {
  children?: ReactNode;
};

const Layout: FC<Props> = ({ children }) => <div className="layout">{children}</div>;

export default Layout;
