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
  statusCodes,
  User,
} from '@react-native-google-signin/google-signin';
import {AuthContext} from '../utils/Auth';
import {PreferencesContext} from '../utils/Theme';
import firebase from 'firebase/app';

const SignIn: React.FC = () => {
  const [isSigninInProgress, setIsSigninInProgress] = React.useState(true);

  const {updateUserInfo} = React.useContext(AuthContext);
  const {isThemeDark} = React.useContext(PreferencesContext);

  const {colors} = useTheme();
  const styles = classes(colors);

  const navigation = useNavigation();
  const goBack = () => navigation.goBack();

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

  const signIntoAccount = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const newUserInfo = await GoogleSignin.signIn();
      updateUserInfo(newUserInfo);
      const googleCredential = firebase.auth.GoogleAuthProvider.credential(
        newUserInfo.idToken,
      );
      await firebase.auth().signInWithCredential(googleCredential);
      await signAccountDataIntoDB(newUserInfo);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  const signAccountDataIntoDB = async (newUser: User) => {
    try {
      const reference = firebase.database().ref('users');
      let result = await reference.child(newUser.user.id).get();
      if (result.exists())
        await reference.child(newUser.user.id).update(newUser.user);
      else
        await reference.child(newUser.user.id).set({
          ...newUser.user,
          recycling_brief: {
            bottlesToRecycleAmount: 0,
            bottlesRecycledAmount: 0,
            itemsToRecycleAmount: 0,
            itemsRecycledAmount: 0,
          },
        });
    } catch (error) {
      console.error(error.message);
    }
  };

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

function classes(colors: any) {
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
