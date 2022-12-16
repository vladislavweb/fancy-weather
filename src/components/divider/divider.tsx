import { FC } from "react";
import classNames from "classnames";
import "./divider.scss";

interface Props {
  type?: "vertical" | "horizontal";
}

const Divider: FC<Props> = ({ type = "vertical" }) => {
  return (
    <div
      className={classNames("divider", {
        divider_vertical: type === "vertical",
        divider_horizontal: type === "horizontal",
      })}
    ></div>
  );
};

export default Divider;
