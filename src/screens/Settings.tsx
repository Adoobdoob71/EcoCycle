import React from 'react';
import {StyleSheet} from 'react-native';
import {Header, IconButton} from '../components';
import {ScrollView, Switch} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/core';
import {List} from 'react-native-paper';
import {PreferencesContext} from '../utils/Theme';
import {useTheme} from 'react-native-paper';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {AuthContext} from '../utils/Auth';
import firebase from 'firebase/app';
import {DevSettings} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Settings: React.FC = () => {
  const navigation = useNavigation();
  const goBack = () => navigation.goBack();

  const {colors} = useTheme();

  const {toggleTheme, isThemeDark} = React.useContext(PreferencesContext);
  const {updateUserInfo} = React.useContext(AuthContext);

  const signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      await firebase.auth().signOut();
      updateUserInfo(null);
      DevSettings.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const showGuide = async () => {
    await AsyncStorage.removeItem('already_launched');
    DevSettings.reload();
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
          left={() => <List.Icon icon="palette" color={colors.text} />}
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
          left={() => <List.Icon icon="close" color={colors.error} />}
          onPress={signOut}
        />
      </List.Section>
      <List.Section title="Miscellaneous">
        <List.Item
          title="Guide"
          description="Show guide of the app"
          left={() => <List.Icon icon="information" color={colors.text} />}
          onPress={showGuide}
        />
      </List.Section>
    </ScrollView>
  );
};

function classes(colors: any) {
  return StyleSheet.create({});
}

export default Settings;
