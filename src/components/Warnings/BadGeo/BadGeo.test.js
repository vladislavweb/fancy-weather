import React from 'react';
import ReactDOM from 'react-dom';
import BadGeo from './BadGeo';
import { render, cleanup } from '@testing-library/react';

afterEach(cleanup);

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<BadGeo />, div);
});

it('mathes snapshot', () => {
  const { asFragment } = render(<BadGeo />);
  expect(asFragment()).toMatchSnapshot();
})