import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Home from '../screens/Home';

const Tab = createMaterialBottomTabNavigator();

const BottomNavigator: React.FC = () => {
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen name="Home" component={Home} />
    </Tab.Navigator>
  );
};

export default BottomNavigator;
