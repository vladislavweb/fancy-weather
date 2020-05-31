import React from 'react';
import ReactDOM from 'react-dom';
import Input from './Input';
import { render, cleanup } from '@testing-library/react';

afterEach(cleanup);

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Input/>, div);
});

it('mathes snapshot', () => {
  const { asFragment } = render(<Input/>);
  expect(asFragment()).toMatchSnapshot();
});