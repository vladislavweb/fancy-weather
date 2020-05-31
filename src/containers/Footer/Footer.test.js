import React from "react";
import ReactDOM from 'react-dom';
import Footer from './Footer';
import { render, cleanup } from '@testing-library/react';

afterEach(cleanup);

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Footer />, div);
});

it('mathes snapshot', () => {
  const { asFragment } = render(<Footer/>);
  expect(asFragment()).toMatchSnapshot();
});