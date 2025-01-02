import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import Register from './Register';
import { toast } from "react-toastify";
import { registerUserApi } from "../../apis/Api";

// Mock the API and toast
jest.mock('../../apis/Api');
jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

describe('Register Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should display validation errors if fields are empty or invalid', async () => {
    render(<Register />);

    const createAccountButton = screen.getByText('Create Account');

    fireEvent.click(createAccountButton);

    await waitFor(() => {
      expect(screen.getByText('Firstname is Required')).toBeInTheDocument();
      expect(screen.getByText('Lastname is Required')).toBeInTheDocument();
      expect(screen.getByText('Email is Required')).toBeInTheDocument();
      expect(screen.getByText('Password is Required')).toBeInTheDocument();
      expect(screen.getByText('Confirm Password is Required')).toBeInTheDocument();
      expect(screen.getByText('Phone number is required')).toBeInTheDocument();
    });
  });

  it('should display an error if passwords do not match', async () => {
    render(<Register />);

    fireEvent.change(screen.getByPlaceholderText('Enter your password'), { target: { value: 'password1' } });
    fireEvent.change(screen.getByPlaceholderText('Enter your confirm password'), { target: { value: 'password2' } });

    const createAccountButton = screen.getByText('Create Account');
    fireEvent.click(createAccountButton);

    await waitFor(() => {
      expect(screen.getByText('Password does not match')).toBeInTheDocument();
    });
  });

  it('should display a success toast message and navigate to login on successful registration', async () => {
    const mockResponse = {
      data: {
        success: true,
        message: 'Registration successful!',
      },
    };

    registerUserApi.mockResolvedValue(mockResponse);

    render(<Register />);

    fireEvent.change(screen.getByPlaceholderText('Enter your first name'), { target: { value: 'John' } });
    fireEvent.change(screen.getByPlaceholderText('Enter your last name'), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByPlaceholderText('Enter your email address'), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Enter your phone number'), { target: { value: '1234567890' } });
    fireEvent.change(screen.getByPlaceholderText('Enter your password'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByPlaceholderText('Enter your confirm password'), { target: { value: 'password123' } });

    const createAccountButton = screen.getByText('Create Account');
    fireEvent.click(createAccountButton);

    await waitFor(() => {
      expect(registerUserApi).toHaveBeenCalledWith({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        password: 'password123',
        phone: '1234567890',
      });

      expect(toast.success).toHaveBeenCalledWith('Registration successful!');
      expect(window.location.href).toContain('/login');
    });
  });

  it('should display an error toast message on registration failure', async () => {
    const mockResponse = {
      data: {
        success: false,
        message: 'Registration failed!',
      },
    };

    registerUserApi.mockResolvedValue(mockResponse);

    render(<Register />);

    fireEvent.change(screen.getByPlaceholderText('Enter your first name'), { target: { value: 'John' } });
    fireEvent.change(screen.getByPlaceholderText('Enter your last name'), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByPlaceholderText('Enter your email address'), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Enter your phone number'), { target: { value: '1234567890' } });
    fireEvent.change(screen.getByPlaceholderText('Enter your password'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByPlaceholderText('Enter your confirm password'), { target: { value: 'password123' } });

    const createAccountButton = screen.getByText('Create Account');
    fireEvent.click(createAccountButton);

    await waitFor(() => {
      expect(registerUserApi).toHaveBeenCalledWith({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        password: 'password123',
        phone: '1234567890',
      });

      expect(toast.error).toHaveBeenCalledWith('Registration failed!');
    });
  });
});
