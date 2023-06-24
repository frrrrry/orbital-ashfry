import React from 'react';
import { render } from '@testing-library/react-native';
import FrontPage from '../frontpage';
import { it } from 'date-fns/locale';

describe('welcome screen', () => {

    it('renders default elements', () => {
        render(<FrontPage />);
    })

    // should navigate to login page
    it('should navigate to login page when sign in button pressed', () => {

    })

    // should navigate to register page
    it('should navigate to sign up page when sign up button pressed', () => {

    })
})