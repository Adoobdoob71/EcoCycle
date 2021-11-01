import {
  DrawerContentComponentProps,
  DrawerContentOptions,
} from '@react-navigation/drawer';
import React, {useContext} from 'react';
import {SafeAreaView, Image, StyleSheet, Text} from 'react-native';
import {IconButton} from 'react-native-paper';
import {Column, DrawerItem, Row} from '../components';
import {ScrollView} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import {useAuth} from '../hooks/useAuth';
import {ThemeContext} from '../context/Theme';

const DrawerFragment: React.FC<
  DrawerContentComponentProps<DrawerContentOptions>
> = props => {
  const {theme, toggleTheme, isThemeDark} = useContext(ThemeContext);
  const styles = classes(theme.colors);

  const {currentUser} = useAuth();

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
              uri: currentUser?.photoURL,
            }}
            style={styles.photo}
          />
          <Column style={{flex: 1, marginHorizontal: 10}}>
            <Text style={styles.name}>{currentUser?.displayName}</Text>
            <Text style={styles.email}>{currentUser?.email}</Text>
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
          params={{id: currentUser?.uid}}
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
          size={21}
          style={{marginHorizontal: 8}}
        />
        <IconButton icon="cog" onPress={navigateToSettings} size={21} />
      </Row>
    </SafeAreaView>
  );
};

function classes(colors: ReactNativePaper.ThemeColors) {
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
