import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import DrawerNavigator from './DrawerNavigator';
import ScanQR from '../screens/ScanQR';
import Profile from '../screens/Profile';
import Search from '../screens/Search';
import {useNavigation} from '@react-navigation/native';
import Scans from '../screens/Scans';
import Guide from '../screens/Guide';

const Stack = createStackNavigator();

const StackNavigator: React.FC = () => {
  const navigation = useNavigation();

  React.useEffect(() => {
    navigation.addListener('beforeRemove', e => e.preventDefault());
  }, []);

  return (
    <Stack.Navigator
      initialRouteName="DrawerNavigator"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} />
      <Stack.Screen name="ScanScreen" component={ScanQR} />
      <Stack.Screen name="ProfileScreen" component={Profile} />
      <Stack.Screen name="SearchScreen" component={Search} />
      <Stack.Screen name="ScansScreen" component={Scans} />
      <Stack.Screen name="GuideScreen" component={Guide} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
