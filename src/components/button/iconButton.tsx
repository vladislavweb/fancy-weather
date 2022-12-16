import { FC } from "react";
import classNames from "classnames";
import Button, { ButtonProps } from "./button";

const IconButton: FC<ButtonProps> = ({ children, className, ...restProps }) => (
  <Button className={classNames("custom-icon-button", "center", className)} {...restProps}>
    {children}
  </Button>
);

export default IconButton;
