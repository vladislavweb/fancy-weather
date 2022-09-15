import { ButtonHTMLAttributes, FC, ReactNode } from 'react';
import './button.css';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
}

const Button: FC<Props> = ({children, ...props}) => (
  <button {...props}>
    {children}
  </button>
);

export default Button;
