import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import IntroScreen from '../screens/AppIntro';
import ConnectWallet from '../screens/connectwallet';
import Home from '../screens/HomeTab';
import HomeTab from '../screens/HomeTab';
import ViewProduct from './ViewProductNavigator'; // Import the ViewProduct stack
import HomePageNavigate from './HomeStackNavigator';

const Stack = createNativeStackNavigator();

function AppNavigator(initialRouteName) {
  return (
    <Stack.Navigator initialRouteName={initialRouteName}>
      <Stack.Screen
        name="IntroScreen"
        component={IntroScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ConnectWallet"
        component={ConnectWallet}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="HomeTab"
        component={HomeTab}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
      {/*
      <Stack.Screen
        name="ViewProduct"
        component={ViewProduct}
        options={{headerShown: false}} // Adjust options as needed
      /> */}
    </Stack.Navigator>
  );
}
export default AppNavigator;
