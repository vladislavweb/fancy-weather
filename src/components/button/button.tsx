import { ButtonHTMLAttributes, FC, ReactNode } from "react";
import classNames from "classnames";
import "./button.scss";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
}

const Button: FC<ButtonProps> = ({ children, className, ...restProps }) => (
  <button className={classNames("custom-button", className)} {...restProps}>
    {children}
  </button>
);

export default Button;
