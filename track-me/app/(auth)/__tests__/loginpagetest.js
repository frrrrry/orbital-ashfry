import React from 'react';
import renderer from "react-test-renderer";
import { fireEvent, render } from '@testing-library/react-native';
// import LoginPage from '../login';

describe('login screen', () => {

    it ("renders", () => {
      // const {getAllByText} = render(<LoginPage />);
    })

    it ("should go to home page on login", () => {
      /*
        const login = {handleLogin: () => {}}
        spyOn(login, "handleLogin");
        const page = render(<LoginPage />);
        const loginButton = page.getByTestId('signinButton');
        
        fireEvent.press(loginButton);
        // expect(login.handleLogin).toHaveBeenCalledWith("");
      */
    })

    it ('should navigate to forget password page when forget password button pressed', () => {

    })

    it ('should navigate to register page when create account button pressed', () => {
      
    })
})