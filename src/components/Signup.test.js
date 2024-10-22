import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Signup from "./Signup"; // Adjust the path based on your project structure
import { createUserWithEmailAndPassword } from "../firebase"; // Import the Firebase methods
import "@testing-library/jest-dom"  //imports jest 


// Mock Firebase methods
jest.mock("../firebase", () => ({
  createUserWithEmailAndPassword: jest.fn(),
}));

const renderSignup = () => {
  render(
    <Router>
      <Signup />
    </Router>
  );
};

describe("Signup component", () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear mocks before each test
  });

  test("renders form fields", () => {
    renderSignup();
    expect(screen.getByPlaceholderText(/username/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
  });


  test("signup fails with error message", async () => {
    // Mock the Firebase method to simulate an error during signup
    createUserWithEmailAndPassword.mockRejectedValueOnce(new Error("Signup failed"));

    renderSignup();

    // Fill out the form
    fireEvent.change(screen.getByPlaceholderText(/username/i), {
      target: { value: "testuser" },
    });
    fireEvent.change(screen.getByPlaceholderText(/email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: "password123" },
    });

    // Submit the form
    fireEvent.click(screen.getByRole("button", { name: /sign up/i }));

    // Check for error message
    await waitFor(() => expect(screen.getByText(/Error: Signup failed/i)).toBeInTheDocument());
  });
});
