import React from 'react';
import ReactDOM from 'react-dom';
import BadRequest from './BadRequest';
import { render, cleanup } from '@testing-library/react';

afterEach(cleanup);

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<BadRequest />, div);
});

it('mathes snapshot', () => {
  const { asFragment } = render(<BadRequest />);
  expect(asFragment()).toMatchSnapshot();
})