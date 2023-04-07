import { FC } from "react";
import { ControlPanel, SearchPanel } from "components";
import "./header.scss";

const Header: FC = () => (
  <header className="header">
    <ControlPanel />
    <SearchPanel />
  </header>
);

export default Header;
