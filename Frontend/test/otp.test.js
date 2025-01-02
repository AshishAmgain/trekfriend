import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import ForgotPassword from './ForgotPassword';
import { toast } from 'react-toastify';

jest.mock('axios');

jest.mock('react-toastify', () => ({
    toast: {
        success: jest.fn(),
        error: jest.fn(),
    }
}));

describe('ForgotPassword Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders ForgotPassword component', () => {
        render(<ForgotPassword />);
        expect(screen.getByText('Forgot Password')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Enter your valid number')).toBeInTheDocument();
        expect(screen.getByText('Send OTP')).toBeInTheDocument();
    });

    test('handles successful OTP sending', async () => {
        axios.post.mockResolvedValueOnce({
            status: 200,
            data: { message: 'OTP sent successfully' }
        });

        render(<ForgotPassword />);

        const phoneInput = screen.getByPlaceholderText('Enter your valid number');
        fireEvent.change(phoneInput, { target: { value: '9812345678' } });

        const sendOtpButton = screen.getByText('Send OTP');
        fireEvent.click(sendOtpButton);

        await waitFor(() => {
            expect(toast.success).toHaveBeenCalledWith('OTP sent successfully');
            expect(screen.getByText('OTP has been sent to 9812345678 ✅')).toBeInTheDocument();
        });
    });

    test('handles OTP sending failure', async () => {
        axios.post.mockRejectedValueOnce({
            response: { status: 400, data: { message: 'Failed to send OTP' } }
        });

        render(<ForgotPassword />);

        const phoneInput = screen.getByPlaceholderText('Enter your valid number');
        fireEvent.change(phoneInput, { target: { value: '9812345678' } });

        const sendOtpButton = screen.getByText('Send OTP');
        fireEvent.click(sendOtpButton);

        await waitFor(() => {
            expect(toast.error).toHaveBeenCalledWith('Failed to send OTP');
        });
    });

    test('handles OTP verification and password reset', async () => {
        axios.post
            .mockResolvedValueOnce({
                status: 200,
                data: { message: 'OTP sent successfully' }
            })
            .mockResolvedValueOnce({
                status: 200,
                data: { message: 'Password reset successfully' }
            });

        render(<ForgotPassword />);

        const phoneInput = screen.getByPlaceholderText('Enter your valid number');
        fireEvent.change(phoneInput, { target: { value: '9812345678' } });

        const sendOtpButton = screen.getByText('Send OTP');
        fireEvent.click(sendOtpButton);

        await waitFor(() => {
            expect(toast.success).toHaveBeenCalledWith('OTP sent successfully');
            expect(screen.getByText('OTP has been sent to 9812345678 ✅')).toBeInTheDocument();
        });

        const otpInput = screen.getByPlaceholderText('Enter valid OTP');
        const passwordInput = screen.getByPlaceholderText('Set new Password');
        const verifyButton = screen.getByText('Verify OTP & Set Password');

        fireEvent.change(otpInput, { target: { value: '123456' } });
        fireEvent.change(passwordInput, { target: { value: 'newpassword123' } });
        fireEvent.click(verifyButton);

        await waitFor(() => {
            expect(toast.success).toHaveBeenCalledWith('Password reset successfully');
        });
    });

    test('handles OTP verification failure', async () => {
        axios.post
            .mockResolvedValueOnce({
                status: 200,
                data: { message: 'OTP sent successfully' }
            })
            .mockRejectedValueOnce({
                response: { status: 400, data: { message: 'Failed to verify OTP' } }
            });

        render(<ForgotPassword />);

        const phoneInput = screen.getByPlaceholderText('Enter your valid number');
        fireEvent.change(phoneInput, { target: { value: '9812345678' } });

        const sendOtpButton = screen.getByText('Send OTP');
        fireEvent.click(sendOtpButton);

        await waitFor(() => {
            expect(toast.success).toHaveBeenCalledWith('OTP sent successfully');
            expect(screen.getByText('OTP has been sent to 9812345678 ✅')).toBeInTheDocument();
        });

        const otpInput = screen.getByPlaceholderText('Enter valid OTP');
        const passwordInput = screen.getByPlaceholderText('Set new Password');
        const verifyButton = screen.getByText('Verify OTP & Set Password');

        fireEvent.change(otpInput, { target: { value: '123456' } });
        fireEvent.change(passwordInput, { target: { value: 'newpassword123' } });
        fireEvent.click(verifyButton);

        await waitFor(() => {
            expect(toast.error).toHaveBeenCalledWith('Failed to verify OTP');
        });
    });
});
