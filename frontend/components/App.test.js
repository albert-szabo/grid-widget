// Write your tests here

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import AppClass from './AppClass';

test('Sanity check', () => {
  expect(99 * 99).toEqual(9801);
});

test('Renders without errors', () => {
  render(<AppClass />);
});

test('Renders an initial coordinates message', () => {
  render(<AppClass />);

  const initialCoordinatesMessage = screen.queryByText(/Coordinates/i);

  expect(initialCoordinatesMessage).toBeInTheDocument();
  expect(initialCoordinatesMessage).toBeTruthy();
  expect(initialCoordinatesMessage).toHaveTextContent(/Coordinates/i);
});

test('Renders the correct initial movement message', () => {
  render(<AppClass />);

  const initialMovementMessage = screen.queryByText(/You moved 0 times/i);

  expect(initialMovementMessage).toBeInTheDocument();
  expect(initialMovementMessage).toBeTruthy();
  expect(initialMovementMessage).toHaveTextContent(/You moved 0 times/i);
});

test('Moving up once changes movement log correctly', () => {
  render(<AppClass />);

  const upButton = document.querySelector('#up');
  fireEvent.click(upButton);

  const movementCounter = screen.queryByText(/You moved 1 time/i);

  expect(movementCounter).toBeInTheDocument();
  expect(movementCounter).toBeTruthy();
  expect(movementCounter).toHaveTextContent(/You moved 1 time/i);
});

test('Moving left twice changes movement log correctly', () => {
  render(<AppClass />);

  const leftButton = document.querySelector('#left');
  fireEvent.click(leftButton);
  fireEvent.click(leftButton);

  const movementCounter = screen.queryByText(/You moved 1 time/i);

  expect(movementCounter).toBeInTheDocument();
  expect(movementCounter).toBeTruthy();
  expect(movementCounter).toHaveTextContent(/You moved 1 time/i);
});

test('Typing in the email field correctly updates its value', () => {
  render(<AppClass />);

  const emailInput = document.querySelector('#email');
  fireEvent.change(emailInput, { target: { value: 'we@w.e' } });

  expect(emailInput).toBeTruthy();
  expect(emailInput).not.toBeFalsy();
  expect(emailInput).toHaveValue('we@w.e');
});
