import React from 'react';
import ReactDOM from 'react-dom';
import Button from './Button';
import { render, cleanup } from '@testing-library/react';

afterEach(cleanup);

const click = () => console.log('click');

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Button text='default' class='default' click={() => click}/>, div);
});

it('renders button correctly', () => {
  const { getByText } = render(<Button class='lang-en' text='EN' click={() => click}></Button>);
  expect(getByText('EN')).toHaveClass('btn lang-en');
});

it('renders button correctly', () => {
  const { getByText } = render(<Button class='lang-ru' text='RU' click={() => click}></Button>);
  expect(getByText('RU')).toHaveClass('btn lang-ru');
});

it('renders button correctly', () => {
  const { getByText } = render(<Button class='lang-be' text='BE' click={() => click}></Button>);
  expect(getByText('BE')).toHaveClass('btn lang-be');
});

it('renders button correctly', () => {
  const { getByText } = render(<Button class='scale-far' text='°F' click={() => click}></Button>);
  expect(getByText('°F')).toHaveClass('btn scale-far');
});

it('renders button correctly', () => {
  const { getByText } = render(<Button class='scale-cel' text='°C' click={() => click}></Button>);
  expect(getByText('°C')).toHaveClass('btn scale-cel');
});

it('mathes snapshot', () => {
  const { asFragment } = render(<Button class='lang-ru' type='button' text='RU' click={() => click}></Button>);
  expect(asFragment()).toMatchSnapshot();
});