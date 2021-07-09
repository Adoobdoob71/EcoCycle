import React from 'react';
import {StyleSheet} from 'react-native';
import {Header, IconButton} from '../components';
import {ScrollView} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/core';

const Settings: React.FC = () => {
  const navigation = useNavigation();
  const goBack = () => navigation.goBack();

  return (
    <ScrollView
      style={{flex: 1}}
      stickyHeaderIndices={[0]}
      showsVerticalScrollIndicator={false}
      bounces={false}
      overScrollMode="never">
      <Header
        left={<IconButton icon="arrow-left" onPress={goBack} borderless />}
        title="Settings"
      />
    </ScrollView>
  );
};

function classes(colors: any) {
  return StyleSheet.create({});
}

export default Settings;
