import React from 'react';
import {StyleSheet} from 'react-native';
import {Header, IconButton} from '../components';
import {ScrollView, Switch} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/core';
import {List} from 'react-native-paper';
import {useTheme} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNRestart from 'react-native-restart/src';
import {useAuth} from '../hooks/useAuth';
import {useCustomTheme} from '../hooks/useCustomTheme';

const Settings: React.FC = () => {
  const navigation = useNavigation();
  const goBack = () => navigation.goBack();

  const {colors} = useTheme();

  const {signOut} = useAuth();
  const {toggleTheme, isThemeDark} = useCustomTheme();

  const openGuide = async () => {
    await AsyncStorage.removeItem('already_launched');
    RNRestart.Restart();
  };

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
      <List.Section title="Appearance">
        <List.Item
          title="Theme"
          description="Toggle the theme of the app"
          right={() => (
            <Switch
              value={isThemeDark}
              onValueChange={toggleTheme}
              thumbColor={colors.primary}
            />
          )}
        />
      </List.Section>
      <List.Section title="Account">
        <List.Item
          title="Sign Out"
          description="Sign out of your account"
          onPress={signOut}
        />
      </List.Section>
      <List.Section title="Miscellaneous">
        <List.Item
          title="Guide"
          description="Show guide of the app"
          onPress={openGuide}
        />
      </List.Section>
    </ScrollView>
  );
};

function classes(colors: ReactNativePaper.ThemeColors) {
  return StyleSheet.create({});
}

export default Settings;
