import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {useTheme} from 'react-native-paper';
import Home from '../screens/Home';
import Friends from '../screens/Friends';

const Drawer = createDrawerNavigator();

const DrawerNavigator: React.FC = () => {
  const {colors} = useTheme();
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerType="back"
      drawerStyle={{backgroundColor: colors.background}}>
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Friends" component={Friends} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
