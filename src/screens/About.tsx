import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  Image,
  Linking,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useTheme} from 'react-native-paper';
import {Header, IconButton, RippleButton} from '../components';

const About: React.FC = () => {
  const {colors} = useTheme();
  const styles = classes(colors);

  const navigation = useNavigation<any>();
  const openDrawer = () => navigation.openDrawer();

  const openGithubProfile = () =>
    Linking.openURL('https://github.com/Adoobdoob71');
  const openGithubRepo = () =>
    Linking.openURL('https://github.com/Adoobdoob71/EcoCycle');

  return (
    <SafeAreaView style={styles.background}>
      <Header
        left={<IconButton icon="menu" onPress={openDrawer} borderless />}
        title="About the developer"
      />
      <View style={styles.contentView}>
        <View style={{alignItems: 'center'}}>
          <Image
            source={{
              uri: 'https://avatars.githubusercontent.com/u/46420655?v=4',
            }}
            style={styles.photo}
          />
          <Text style={styles.name}>Elad Mekonen</Text>
        </View>
        <View style={{alignItems: 'center'}}>
          <RippleButton
            onPress={openGithubProfile}
            rippleColor={colors.primary}
            borderRadius={8}
            outerStyle={{marginBottom: 16}}>
            <Text style={styles.buttonCaption}>
              Open Developer's Github Profile
            </Text>
          </RippleButton>
          <RippleButton
            onPress={openGithubRepo}
            rippleColor={colors.primary}
            borderRadius={8}
            outerStyle={{marginBottom: 16}}>
            <Text style={styles.buttonCaption}>Open Project Repository</Text>
          </RippleButton>
        </View>
      </View>
    </SafeAreaView>
  );
};

function classes(colors: ReactNativePaper.ThemeColors) {
  return StyleSheet.create({
    background: {
      backgroundColor: colors.background,
      flex: 1,
    },
    contentView: {
      flex: 1,
      justifyContent: 'space-evenly',
      alignItems: 'center',
    },
    photo: {
      width: 150,
      height: 150,
      borderRadius: 75,
      marginBottom: 21,
    },
    name: {
      fontSize: 24,
      color: colors.text,
      fontWeight: 'bold',
    },
    buttonCaption: {
      color: colors.primary,
      fontSize: 18,
      fontWeight: 'bold',
      paddingHorizontal: 12,
      paddingVertical: 8,
    },
  });
}

export default About;
