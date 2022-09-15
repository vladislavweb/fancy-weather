import { FC, InputHTMLAttributes } from 'react';
import './input.css';

type Props = InputHTMLAttributes<HTMLInputElement>;

const Input: FC<Props> = (props) => {
  return (
    <input {...props} className='search-input' />
  )
};

export default Input;
