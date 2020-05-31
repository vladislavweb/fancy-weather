import React from 'react';
import ReactDOM from 'react-dom';
import VirtualKeyboard from './VirtualKeyboard';
import { render, cleanup } from '@testing-library/react';

afterEach(cleanup);

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<VirtualKeyboard />, div);
});

it('mathes snapshot', () => {
  const { asFragment } = render(<VirtualKeyboard />);
  expect(asFragment()).toMatchSnapshot();
});