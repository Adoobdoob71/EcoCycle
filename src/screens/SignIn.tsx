import React from 'react';
import {SafeAreaView, StyleSheet, View, Text} from 'react-native';
import {useTheme} from 'react-native-paper';
import {Header, IconButton} from '../components';
import {ScrollView} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/core';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
  User,
} from '@react-native-google-signin/google-signin';
import {AuthContext} from '../utils/Auth';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {PreferencesContext} from '../utils/Theme';

const SignIn: React.FC = () => {
  const [isSigninInProgress, setIsSigninInProgress] = React.useState(false);

  const {updateUserInfo, userInfo} = React.useContext(AuthContext);
  const {isThemeDark} = React.useContext(PreferencesContext);

  const {colors} = useTheme();
  const styles = classes(colors);

  const navigation = useNavigation();
  const goBack = () => navigation.goBack();

  const signIntoAccount = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const newUserInfo = await GoogleSignin.signIn();
      updateUserInfo(newUserInfo);
      const googleCredential = auth.GoogleAuthProvider.credential(
        newUserInfo.idToken,
      );
      await auth().signInWithCredential(googleCredential);
      await signAccountDataIntoDB(newUserInfo);
      console.log('Success!');
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
      const reference = firestore().collection('users');
      console.log(reference.path);
      let result = await reference.doc(newUser.user.id).get();
      console.log(result);
      if (result.exists)
        await reference.doc(newUser.user.id).update(newUser.user);
      else await reference.doc(newUser.user.id).set(newUser.user);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <SafeAreaView style={styles.background}>
      <ScrollView
        stickyHeaderIndices={[0]}
        bounces={false}
        showsVerticalScrollIndicator={false}
        style={{flex: 1}}>
        <Header
          left={<IconButton icon="close" onPress={goBack} borderless />}
          backgroundStyle={{backgroundColor: 'transparent'}}
        />
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
            disabled={isSigninInProgress}
          />
        </View>
      </ScrollView>
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
      alignItems: 'center',
      justifyContent: 'space-around',
      paddingVertical: 64,
    },
    caption: {
      fontSize: 28,
      color: colors.text,
      fontWeight: 'bold',
    },
  });
}

export default SignIn;
