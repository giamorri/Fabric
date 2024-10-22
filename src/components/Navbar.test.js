import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./Navbar";
import '@testing-library/jest-dom';  // Import jest-dom for custom matchers

const renderNavbar = () => {
  render(
    <Router>
      <Navbar />
    </Router>
  );
};

beforeAll(() => {
  delete window.location;
  window.location = { href: jest.fn() };
});

describe("Navbar component", () => {
  test("renders logo", () => {
    renderNavbar();
    const logo = screen.getByAltText("");
    expect(logo).toBeInTheDocument();
  });

  test("renders navigation links", () => {
    renderNavbar();
    const homeLink = screen.getByText(/home/i);
    const profileLink = screen.getByText(/profile/i);
    const closetLink = screen.getByText(/closet/i);
    const settingsLink = screen.getByText(/settings/i);

    expect(homeLink).toBeInTheDocument();
    expect(profileLink).toBeInTheDocument();
    expect(closetLink).toBeInTheDocument();
    expect(settingsLink).toBeInTheDocument();
  });

  test("renders login dropdown when not logged in", () => {
    renderNavbar();
    const loginLink = screen.getByText(/login/i);
    expect(loginLink).toBeInTheDocument();

    fireEvent.mouseEnter(loginLink);
    const signinLink = screen.getByText(/sign in/i);
    const signupLink = screen.getByText(/sign up/i);
    
    expect(signinLink).toBeInTheDocument();
    expect(signupLink).toBeInTheDocument();
  });

  test("renders logout button when logged in", () => {
    localStorage.setItem('username', 'testuser');
    
    renderNavbar();
    const logoutButton = screen.getByText(/logout/i);
    expect(logoutButton).toBeInTheDocument();

    localStorage.removeItem('username');
  });

});
