import React from 'react';
import {StyleSheet} from 'react-native';
import {useTheme} from 'react-native-paper';
import {Header, IconButton} from '../components';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import RecieptScanner from '../fragments/RecieptScanner';
import {useNavigation} from '@react-navigation/native';
import NFCScanner from '../fragments/NFCScanner';

const Tab = createMaterialTopTabNavigator();

const ScanQR: React.FC = () => {
  const {colors} = useTheme();
  const styles = classes(colors);
  const navigation = useNavigation();
  const goBack = () => navigation.goBack();
  return (
    <>
      <Header
        left={<IconButton icon="arrow-left" onPress={goBack} borderless />}
        title="Scan"
      />
      <Tab.Navigator
        initialRouteName="Reciepts"
        style={{backgroundColor: colors.surface}}>
        <Tab.Screen component={RecieptScanner} name="Reciepts" />
        <Tab.Screen component={NFCScanner} name="NFC" />
      </Tab.Navigator>
    </>
  );
};

function classes(colors: ReactNativePaper.ThemeColors) {
  return StyleSheet.create({
    background: {
      backgroundColor: colors.background,
    },
  });
}

export default ScanQR;
