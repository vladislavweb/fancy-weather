import { ButtonHTMLAttributes, FC, ReactNode } from "react";
import classNames from "classnames";
import "./button.scss";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
}

const Button: FC<Props> = ({ children, className, ...restProps }) => (
  <button className={classNames("btn", className)} {...restProps}>
    {children}
  </button>
);

export default Button;
