import React from 'react';
import {
  RefreshControl,
  SafeAreaView,
  SectionList,
  StyleSheet,
  Text,
} from 'react-native';
import {useTheme} from 'react-native-paper';
import {Header, IconButton, ScanItem} from '../components';
import {RecyclingDataType} from '../utils/Types';
import firebase from 'firebase/app';
import {AuthContext} from '../utils/Auth';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {useNavigation} from '@react-navigation/core';
import ToRecycleFragment from '../fragments/ToRecycleFragment';
import AlreadyRecycledFragment from '../fragments/AlreadyScannedFragment';

const Tab = createMaterialTopTabNavigator();

const Scans: React.FC = () => {
  const {colors} = useTheme();
  const navigation = useNavigation();
  const goBack = () => navigation.goBack();
  return (
    <>
      <Header
        left={<IconButton icon="arrow-left" onPress={goBack} borderless />}
        title="My Scans"
      />
      <Tab.Navigator
        initialRouteName="To Recycle"
        style={{backgroundColor: colors.surface}}>
        <Tab.Screen name="To Recycle" component={ToRecycleFragment} />
        <Tab.Screen
          name="Already Recycled"
          component={AlreadyRecycledFragment}
        />
      </Tab.Navigator>
    </>
  );
};

function classes(colors: ReactNativePaper.ThemeColors) {
  return StyleSheet.create({
    background: {
      flex: 1,
      backgroundColor: colors.background,
    },
  });
}

export default Scans;
