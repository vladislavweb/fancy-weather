import { FC } from "react";
import ControlPanel from "../../components/controlPanel";
import SearchPanel from "../../components/searchPanel";
import "./header.css";

const Header: FC = () => (
  <header className="header">
    <ControlPanel />
    <SearchPanel />
  </header>
);

export default Header;
