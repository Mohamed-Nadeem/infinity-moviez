import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import HomePage from '../HomePage';
import { Provider } from "react-redux";
import { store } from "../redux/store";

// Test suite for HomePage component
describe('HomePage', () => {
  // Test case to check if the HomePage component renders without crashing
  it('renders without crashing', () => {
    render(
      <Provider store={store}>
      <HomePage />
    </Provider>);
  });

  // Test case to check if the main heading is rendered
  it('renders the main heading', () => {
    render(
      <Provider store={store}>
      <HomePage />
    </Provider>
    );
    const headingElement = screen.getByRole('h1', { name: "Infinity Moviez" });
    expect(headingElement).toBeInTheDocument();
  });

  // Test case to check if a specific button is rendered
  it('renders the specific button', () => {
    render(
      <Provider store={store}>
      <HomePage />
    </Provider>
    );
    const buttonElement = screen.getByRole('button', { name: "Action" });
    expect(buttonElement).toBeInTheDocument();
  });
});
