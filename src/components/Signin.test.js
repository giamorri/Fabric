import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Signin from "./Signin";
import "@testing-library/jest-dom";
import { signInWithEmailAndPassword } from "../firebase"; // Mocked Firebase method


// Mock Firebase methods
jest.mock("../firebase", () => ({
  auth: {}, //added auth object to manage authentication in signing in
  signInWithEmailAndPassword: jest.fn(),
}));

const renderSignin = () => {
  render(
    <Router>
      <Signin />
    </Router>
  );
};

describe("Signin component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders form fields", () => {
    renderSignin();
    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
  });

  test("calls signInWithEmailAndPassword on form submit", async () => {
    renderSignin();

    // Enter email and password
    fireEvent.change(screen.getByPlaceholderText(/email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: "password123" },
    });

    // Click the sign-in button
    fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

    // Wait for the signInWithEmailAndPassword to be called
    await waitFor(() =>
      expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
        expect.anything(), // The auth object
        "test@example.com",
        "password123"
      )
    );
  });
});