import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Home from '../screens/Home';
import {useTheme} from 'react-native-paper';

const Drawer = createDrawerNavigator();

const DrawerNavigator: React.FC = () => {
  const {colors} = useTheme();
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerType="back"
      drawerStyle={{backgroundColor: colors.background}}>
      <Drawer.Screen name="Home" component={Home} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
