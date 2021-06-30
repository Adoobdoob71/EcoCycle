import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import DrawerNavigator from './DrawerNavigator';

const Stack = createStackNavigator();

const StackNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="DrawerNavigator"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
