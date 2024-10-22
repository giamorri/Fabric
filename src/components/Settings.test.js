import React from 'react';
import { render, screen } from '@testing-library/react';
import Settings from './Settings'; // Adjust the import path as necessary
import "@testing-library/jest-dom";

// Mock for localStorage
const mockSetItem = jest.fn();
const mockGetItem = jest.spyOn(Storage.prototype, 'getItem');
const mockLocalStorage = {
  getItem: mockGetItem,
  setItem: mockSetItem,
};

// Mock for onImageChange function
const mockOnImageChange = jest.fn();

beforeEach(() => {
  jest.clearAllMocks(); // Clear mock history before each test
  Object.defineProperty(window, 'localStorage', { value: mockLocalStorage });
});

describe('Settings component', () => {
  test('renders without crashing and displays the title', () => {
    render(<Settings onImageChange={mockOnImageChange} />);
    expect(screen.getByText(/settings/i)).toBeInTheDocument();
  });

  test('loads saved background image from localStorage on mount', () => {
    const savedImage = require('../background/2.webp');
    mockGetItem.mockReturnValue(savedImage);

    render(<Settings onImageChange={mockOnImageChange} />);

    expect(mockOnImageChange).toHaveBeenCalledWith(savedImage);
    expect(document.body.style.backgroundImage).toBe(`url(${savedImage})`);
  });
});
