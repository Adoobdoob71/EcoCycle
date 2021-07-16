import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {useTheme} from 'react-native-paper';
import Home from '../screens/Home';
import Friends from '../screens/Friends';
import DrawerFragment from '../fragments/Drawer';
import Settings from '../screens/Settings';
import About from '../screens/About';

const Drawer = createDrawerNavigator();

const DrawerNavigator: React.FC = () => {
  const {colors} = useTheme();
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerType="back"
      drawerContent={props => <DrawerFragment {...props} />}>
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Friends" component={Friends} />
      <Drawer.Screen name="Settings" component={Settings} />
      <Drawer.Screen name="About" component={About} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
