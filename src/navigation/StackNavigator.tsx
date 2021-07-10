import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import DrawerNavigator from './DrawerNavigator';
import ScanQR from '../screens/ScanQR';
import Profile from '../screens/Profile';
import SignIn from '../screens/SignIn';

const Stack = createStackNavigator();

const StackNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="DrawerNavigator"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} />
      <Stack.Screen name="ScanScreen" component={ScanQR} />
      <Stack.Screen name="ProfileScreen" component={Profile} />
      <Stack.Screen name="SigninScreen" component={SignIn} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
