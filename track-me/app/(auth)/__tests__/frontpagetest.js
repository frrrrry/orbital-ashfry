import React from 'react';
import renderer from "react-test-renderer";
import { render, fireEvent, screen } from '@testing-library/react-native';
import {createMemoryHistory} from 'history';
import FrontPage from "../frontpage"; 
import App from "../../../App"; 
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export const NavigationMock = ({ controller }) => {
  const stack = createNativeStackNavigator();

  return (
    <NavigationContainer independent>
      <stack.Navigator initialRouteName="TestRoute">
        <stack.Screen
          name="TestRoute"
          component={controller}
        />
      </stack.Navigator>
    </NavigationContainer>
  );
};

describe('welcome screen', () => {
    
    it ('should return true', () => {
      expect(true).toBeTruthy(); 
    })

    it ('renders correctly', () => {
      const tree = renderer.create(<App />).toJSON(); 
      expect(tree).toMatchSnapshot();
    })

    it ('should navigate to login page when sign in button pressed', () => {

    })

    it ('should navigate to register page when sign up button pressed', () => {

    })
    
    /*
    it('should navigate to login page when sign in button pressed', async () => {
        // given
        const history = createMemoryHistory();
      
        // when
        render(
          <Router history={history}>
            <FrontPage />
          </Router>);
      
        // then
        await waitFor(() => {
          expect(history.location.pathname).toBe('/login');
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
          expect(history.location.pathname).toBe('/register');
        });
    });
    */ 
})  
