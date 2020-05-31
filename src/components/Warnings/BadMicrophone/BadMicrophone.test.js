import React from 'react';
import ReactDOM from 'react-dom';
import BadMicrophone from './BadMicrophone';
import { render, cleanup } from '@testing-library/react';

afterEach(cleanup);

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<BadMicrophone />, div);
});

it('mathes snapshot', () => {
  const { asFragment } = render(<BadMicrophone />);
  expect(asFragment()).toMatchSnapshot();
})