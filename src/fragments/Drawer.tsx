import {
  DrawerContentComponentProps,
  DrawerContentOptions,
} from '@react-navigation/drawer';
import React from 'react';
import {SafeAreaView, Image, StyleSheet, Text, Linking} from 'react-native';
import {useTheme} from 'react-native-paper';
import {Column, DrawerItem, IconButton, Row} from '../components';
import {PreferencesContext} from '../utils/Theme';
import {ScrollView} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import {AuthContext} from '../utils/Auth';

const DrawerFragment: React.FC<
  DrawerContentComponentProps<DrawerContentOptions>
> = props => {
  const {colors} = useTheme();
  const styles = classes(colors);
  const {toggleTheme, isThemeDark} = React.useContext(PreferencesContext);

  const {userInfo} = React.useContext(AuthContext);

  const navigation = useNavigation();
  const navigateToSettings = () => navigation.navigate('Settings');
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView
        style={{flex: 1}}
        stickyHeaderIndices={[0]}
        showsVerticalScrollIndicator={false}
        bounces={false}
        overScrollMode="never">
        <Row
          style={{
            alignItems: 'center',
            paddingHorizontal: 12,
            paddingVertical: 21,
          }}>
          <Image
            source={{
              uri: userInfo?.user.photo,
            }}
            style={styles.photo}
          />
          <Column style={{flex: 1, marginHorizontal: 10}}>
            <Text style={styles.name}>{userInfo?.user.name}</Text>
            <Text style={styles.email}>{userInfo?.user.email}</Text>
          </Column>
        </Row>
        <DrawerItem
          text="Home"
          whereTo="Home"
          outerStyle={{margin: 8}}
          currentIndex={props.state.index}
          index={0}
        />
        <DrawerItem
          text="Friends"
          whereTo="Friends"
          outerStyle={{margin: 8}}
          currentIndex={props.state.index}
          index={1}
        />
        <DrawerItem
          text="My Profile"
          whereTo="ProfileScreen"
          outerStyle={{margin: 8}}
          params={{id: userInfo?.user.id}}
          currentIndex={props.state.index}
          index={2}
        />
        <DrawerItem
          text="About"
          whereTo="About"
          outerStyle={{margin: 8}}
          currentIndex={props.state.index}
          index={3}
        />
      </ScrollView>
      <Row
        style={{
          alignItems: 'center',
          alignSelf: 'flex-end',
          marginTop: 'auto',
          marginBottom: 8,
          marginHorizontal: 8,
        }}>
        <IconButton
          icon={isThemeDark ? 'weather-night' : 'white-balance-sunny'}
          onPress={toggleTheme}
          style={{marginHorizontal: 8}}
          borderless
        />
        <IconButton icon="cog" onPress={navigateToSettings} borderless />
      </Row>
    </SafeAreaView>
  );
};

function classes(colors: any) {
  return StyleSheet.create({
    photo: {
      borderRadius: 25,
      width: 50,
      height: 50,
    },
    name: {
      fontSize: 18,
      color: colors.text,
      fontWeight: 'bold',
    },
    email: {
      fontSize: 16,
      color: colors.placeholder,
    },
  });
}

export default DrawerFragment;
