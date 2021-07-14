import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SignIn from '../screens/SignIn';
import StackNavigator from './StackNavigator';

const Stack = createStackNavigator();

const AuthNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="SigninScreen"
      screenOptions={{headerShown: false, animationEnabled: false}}>
      <Stack.Screen name="SigninScreen" component={SignIn} />
      <Stack.Screen name="StackNavigator" component={StackNavigator} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
