import React from 'react';
import { render, screen } from '@testing-library/react';
import Contact from './Contact'; // Ensure the correct import statement
import '@testing-library/jest-dom'; 


test('render checks if page contains email add of the company', () => {
    render(<Contact />); // Render the Contact component

    // Use getByRole to check for the header text
    const headerElement = screen.getByText(/if you have any problems, email us at customersupport@fabric.com/i);

    // Assert that the header text matches the expected string
    expect(headerElement).toBeInTheDocument();
});