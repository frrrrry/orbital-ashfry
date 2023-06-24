import React from 'react';
import LoginPage from '../login';
import { fireEvent, render } from '@testing-library/react-native';

describe('login screen', () => {

    it ("renders", () => {
        const {getAllByText} = render(<LoginPage />);
    })

    it ("should go to home page on login", () => {
        const login = {handleLogin: () => {}}
        spyOn(login, "handleLogin");
        const page = render(<LoginPage />);
        const loginButton = page.getByTestId('signinButton');
        
        fireEvent.press(loginButton);
        // expect(login.handleLogin).toHaveBeenCalledWith("");
    })

    // shows empty username and password message

    // shows invalid input message
    // shows invalid username error message
    // shows invalid password message
})