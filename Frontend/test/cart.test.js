import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import axiosMock from 'axios-mock-adapter';
import Cart from './Cart';
import { BrowserRouter } from 'react-router-dom';
import { toast } from 'react-toastify';

// Create a mock for axios
const mock = new axiosMock(axios);

jest.mock('react-toastify', () => ({
    toast: {
        success: jest.fn(),
        error: jest.fn(),
    }
}));

const userMock = { _id: '123' };
localStorage.setItem('user', JSON.stringify(userMock));

describe('Cart Component', () => {
    afterEach(() => {
        mock.reset();
    });

    test('renders Cart component', async () => {
        mock.onGet(`/api/user/get_cart/123`).reply(200, {
            success: true,
            cart: [
                {
                    product: {
                        _id: 'prod1',
                        productName: 'Product 1',
                        productPrice: '100',
                        productImage: 'product1.jpg',
                    },
                    quantity: 2,
                },
            ],
        });

        render(
            <BrowserRouter>
                <Cart />
            </BrowserRouter>
        );

        // Wait for the cart items to be rendered
        await waitFor(() => expect(screen.getByText('Your Cart')).toBeInTheDocument());
        expect(screen.getByText('Product 1')).toBeInTheDocument();
        expect(screen.getByText('200')).toBeInTheDocument(); // Price should be 2 * 100
    });

    test('removes item from the cart', async () => {
        mock.onGet(`/api/user/get_cart/123`).reply(200, {
            success: true,
            cart: [
                {
                    product: {
                        _id: 'prod1',
                        productName: 'Product 1',
                        productPrice: '100',
                        productImage: 'product1.jpg',
                    },
                    quantity: 2,
                },
            ],
        });

        mock.onPost(`/api/user/remove_from_cart`).reply(200, {
            success: true,
        });

        render(
            <BrowserRouter>
                <Cart />
            </BrowserRouter>
        );

        // Wait for the cart items to be rendered
        await waitFor(() => screen.getByText('Product 1'));

        // Click on the remove button
        fireEvent.click(screen.getByRole('button', { name: /remove/i }));

        // Wait for the removeFromCart function to be called
        await waitFor(() => {
            expect(toast.success).toHaveBeenCalledWith('product removed sucessfully from cart');
        });

        // Assuming the cart item is removed, you should check if the list is empty or if it calls the API correctly
    });

    test('handles error when removing item fails', async () => {
        mock.onGet(`/api/user/get_cart/123`).reply(200, {
            success: true,
            cart: [
                {
                    product: {
                        _id: 'prod1',
                        productName: 'Product 1',
                        productPrice: '100',
                        productImage: 'product1.jpg',
                    },
                    quantity: 2,
                },
            ],
        });

        mock.onPost(`/api/user/remove_from_cart`).reply(400, {
            success: false,
        });

        render(
            <BrowserRouter>
                <Cart />
            </BrowserRouter>
        );

        // Wait for the cart items to be rendered
        await waitFor(() => screen.getByText('Product 1'));

        // Click on the remove button
        fireEvent.click(screen.getByRole('button', { name: /remove/i }));

        // Wait for the removeFromCart function to be called
        await waitFor(() => {
            expect(toast.error).toHaveBeenCalledWith('failed to remove product from cart');
        });
    });
});
