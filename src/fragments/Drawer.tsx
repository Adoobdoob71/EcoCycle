import {
  DrawerContentComponentProps,
  DrawerContentOptions,
} from '@react-navigation/drawer';
import React from 'react';
import {
  SafeAreaView,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {useTheme} from 'react-native-paper';
import {DrawerItem, IconButton, Row} from '../components';
import {PreferencesContext} from '../utils/Theme';
import {ScrollView} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';

const DrawerFragment: React.FC<
  DrawerContentComponentProps<DrawerContentOptions>
> = props => {
  const {colors} = useTheme();
  const styles = classes(colors);
  const {toggleTheme} = React.useContext(PreferencesContext);

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
            marginVertical: 12,
            padding: 12,
          }}>
          <TouchableOpacity onPress={() => {}}>
            <Image
              source={{
                uri: 'https://i.pinimg.com/originals/08/87/33/088733465f7c684a6cdd242eb463b5bf.jpg',
              }}
              style={styles.appIcon}
            />
          </TouchableOpacity>
          <Text style={styles.appName}>EcoCycle</Text>
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
          icon="palette"
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
    appIcon: {
      borderRadius: 8,
      width: 50,
      height: 50,
      borderWidth: 1,
      borderColor: colors.text,
    },
    appName: {
      fontSize: 32,
      color: colors.text,
      fontWeight: 'bold',
      marginHorizontal: 16,
    },
  });
}

export default DrawerFragment;
