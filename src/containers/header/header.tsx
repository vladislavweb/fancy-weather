import ControlPanel from "../../components/controlPanel";
import SearchPanel from "../../components/searchPanel";
import "./header.css";

const Header = () => (
  <header className="header">
    <ControlPanel />
    <SearchPanel />
  </header>
);

export default Header;
