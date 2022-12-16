import { FC, InputHTMLAttributes } from "react";
import classNames from "classnames";
import "./input.scss";

type Props = InputHTMLAttributes<HTMLInputElement>;

const Input: FC<Props> = ({ className, ...restProps }) => (
  <input className={classNames("custom-input", className)} {...restProps} />
);

export default Input;
