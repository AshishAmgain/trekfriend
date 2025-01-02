import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import Login from './Login';
import { toast } from "react-toastify";
import { loginUserApi } from "../../apis/Api";
import { BrowserRouter } from 'react-router-dom';

// Mock the API.JS file
jest.mock('../../apis/Api');

// Mock the toast notifications
jest.mock("react-toastify", () => ({
  toast: {
    error: jest.fn(),
    success: jest.fn(),
  },
}));

// List of test cases
describe('Login Component', () => {

  // Clearing all mock tests
  afterEach(() => {
    jest.clearAllMocks();
  });

  // Test 1: Display error when email and password are empty
  it('Should display validation errors when email and password are empty', async () => {

    // Render login component
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    // Find the login button and click it without entering data
    const loginBtn = screen.getByText('Login');
    fireEvent.click(loginBtn);

    // Check if validation errors are displayed
    expect(screen.getByText('Email is empty or invalid')).toBeInTheDocument();
    expect(screen.getByText('Password is empty')).toBeInTheDocument();
  });

  // Test 2: Display error toast message on login failure
  it('Should display error toast message on login failure', async () => {

    // Render login component
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    // Mock response for failed login
    const mockResponse = {
      data: {
        success: false,
        message: 'Incorrect Password!'
      }
    };

    // Configure mock API response
    loginUserApi.mockResolvedValue(mockResponse);

    // Find email, password, and login button
    const email = await screen.findByPlaceholderText('Enter your email address');
    const password = await screen.findByPlaceholderText('Enter your password');
    const loginBtn = screen.getByText('Login');

    // Simulate filling input fields
    fireEvent.change(email, {
      target: { value: 'test@gmail.com' }
    });
    fireEvent.change(password, {
      target: { value: 'test123' }
    });

    // Click login button
    fireEvent.click(loginBtn);

    // Wait for the API call and validate
    await waitFor(() => {
      // Expect API call with correct data
      expect(loginUserApi).toHaveBeenCalledWith({ email: 'test@gmail.com', password: 'test123' });

      // Check if error toast is called
      expect(toast.error).toHaveBeenCalledWith('Incorrect Password!');
    });
  });

  // Test 3: Successful login should navigate and store user data
  it('Should store user data and navigate on successful login', async () => {

    // Render login component
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    // Mock response for successful login
    const mockResponse = {
      data: {
        success: true,
        message: 'Login successful!',
        userData: {
          firstName: 'John',
          lastName: 'Doe',
          email: 'test@gmail.com',
          phone: '1234567890'
        },
        token: 'abc123'
      }
    };

    // Configure mock API response
    loginUserApi.mockResolvedValue(mockResponse);

    // Find email, password, and login button
    const email = await screen.findByPlaceholderText('Enter your email address');
    const password = await screen.findByPlaceholderText('Enter your password');
    const loginBtn = screen.getByText('Login');

    // Simulate filling input fields
    fireEvent.change(email, {
      target: { value: 'test@gmail.com' }
    });
    fireEvent.change(password, {
      target: { value: 'test123' }
    });

    // Click login button
    fireEvent.click(loginBtn);

    // Wait for the API call and validate
    await waitFor(() => {
      // Expect API call with correct data
      expect(loginUserApi).toHaveBeenCalledWith({ email: 'test@gmail.com', password: 'test123' });

      // Check if success toast is called
      expect(toast.success).toHaveBeenCalledWith('Login successful!');

      // Check if user data is stored in localStorage
      expect(localStorage.setItem).toHaveBeenCalledWith('user', JSON.stringify(mockResponse.data.userData));
      expect(localStorage.setItem).toHaveBeenCalledWith('token', mockResponse.data.token);

      // Check if navigation was triggered
      expect(window.location.reload).toHaveBeenCalled();
    });
  });

  // Test 4: Should redirect to home if already logged in
  it('Should redirect to home if user is already logged in', () => {
    // Mock localStorage to return a user
    localStorage.setItem('user', JSON.stringify({ email: 'test@gmail.com' }));

    // Render login component
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    // Check if navigation to home occurred
    expect(window.location.href).toBe('/');
  });
});
