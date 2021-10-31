import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
} from 'react-native';
import {useTheme} from 'react-native-paper';
import {useNavigation} from '@react-navigation/core';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import {useAuth} from '../hooks/useAuth';
import {useCustomTheme} from '../hooks/useCustomTheme';

const SignIn: React.FC = () => {
  const [isSigninInProgress, setIsSigninInProgress] = React.useState(true);

  const {colors} = useTheme();
  const styles = classes(colors);

  const navigation = useNavigation();

  React.useEffect(() => {
    navigation.addListener('beforeRemove', e => e.preventDefault());
    signInSilently();
  });

  const signInSilently = async () => {
    try {
      await GoogleSignin.signInSilently();
      navigation.navigate('StackNavigator');
    } catch (errror) {
      setIsSigninInProgress(false);
    }
  };

  const {signIntoAccount} = useAuth();
  const {isThemeDark} = useCustomTheme();

  return isSigninInProgress ? (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.background,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <ActivityIndicator size="large" color={colors.primary} />
    </SafeAreaView>
  ) : (
    <SafeAreaView style={styles.background}>
      <View style={styles.contentView}>
        <Text style={styles.caption}>Sign into EcoCycle</Text>
        <GoogleSigninButton
          style={{width: 192, height: 48, marginTop: 120}}
          size={GoogleSigninButton.Size.Wide}
          color={
            isThemeDark
              ? GoogleSigninButton.Color.Light
              : GoogleSigninButton.Color.Dark
          }
          onPress={signIntoAccount}
        />
      </View>
    </SafeAreaView>
  );
};

function classes(colors: ReactNativePaper.ThemeColors) {
  return StyleSheet.create({
    background: {
      flex: 1,
      backgroundColor: colors.background,
    },
    contentView: {
      flex: 1,
      justifyContent: 'space-evenly',
      alignItems: 'center',
    },
    caption: {
      fontSize: 28,
      color: colors.text,
      fontWeight: 'bold',
    },
  });
}

export default SignIn;
