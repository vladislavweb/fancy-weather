import { FC, ReactNode } from 'react';
import './layout.css';

type Props = {
  children?: ReactNode
}

const Layout: FC<Props> = ({ children }) => (
  <div className='layout'>
    {children}
  </div>
)

export default Layout;
