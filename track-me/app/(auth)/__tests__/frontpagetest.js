
import React from 'react';
import FrontPage from "../frontpage"; 
import { render } from '@testing-library/react-native';

describe('welcome screen', () => {
    /*
    it('renders default elements', () => {
        render(<FrontPage />);
    })
    */
    it ('should return false', () => {
      expect(false).toBeTruthy(); 
    })

    it('should navigate to login page when sign in button pressed', async () => {
        // given
        const history = createMemoryHistory();
      
        // when
        render(<Router history={history}><FrontPage /></Router>);
      
        // then
        await waitFor(() => {
          expect(history.location.pathname).toBe('../login');
        });
      });

    // should navigate to register page
    it('should navigate to sign up page when sign up button pressed', async () => {
        // given
        const history = createMemoryHistory();
      
        // when
        render(<Router history={history}><FrontPage /></Router>);
      
        // then
        await waitFor(() => {
          expect(history.location.pathname).toBe('../signup');
        });
    });
})
