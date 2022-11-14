import { FC, InputHTMLAttributes } from "react";
import classNames from "classnames";

type Props = InputHTMLAttributes<HTMLInputElement>;

const Input: FC<Props> = ({ className, ...restProps }) => (
  <input className={classNames("input", className)} {...restProps} />
);

export default Input;
