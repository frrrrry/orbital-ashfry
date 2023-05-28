import { Tabs } from "expo-router";
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function HomeScreen() {
    return (
        <Tabs screenOptions={{ tabBarShowLabel: false, tabBarActiveTintColor: 'black', headerShown: false}}>
            
            <Tabs.Screen 
              name="index" 
              options={{ tabBarIcon: ({color}) => ( 
                <Ionicons name="home" size={20} color= {color}/> 
                )
              }}  
            />

            <Tabs.Screen 
              name="subwallet" 
              options={{ tabBarIcon: ({color}) => ( 
                <Ionicons name="wallet" size={20} color={color}/> 
                )
              }} 
            />

            <Tabs.Screen 
              name="transaction" 
              options={{ tabBarIcon: ({color}) => ( 
              <Ionicons name="book" size={20} color={color}/> 
                )
              }} 
            />

            <Tabs.Screen 
              name="profile" 
              options={{ tabBarIcon: ({color}) => ( 
              <Ionicons name="ios-person-circle-outline" size={20} color={color}/> 
                )
              }} 
            />

        </Tabs>

    );
}