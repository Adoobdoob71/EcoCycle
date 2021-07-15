import 'react-native-gesture-handler';
import * as React from 'react';
import {Appearance, StatusBar} from 'react-native';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {Provider as PaperProvider} from 'react-native-paper';
import {
  DarkAppTheme,
  LightAppTheme,
  PreferencesContext,
} from './src/utils/Theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  User,
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {AuthContext} from './src/utils/Auth';
import AuthNavigator from './src/navigation/AuthNavigator';
import {TourGuideProvider} from 'rn-tourguide';
import Tooltip from './src/components/Tooltip';

export default function App() {
  const [isThemeDark, setIsThemeDark] = React.useState<boolean>(true);
  const [userInfo, setUserInfo] = React.useState<User | null>(null);

  let theme = isThemeDark ? DarkAppTheme : LightAppTheme;
  // const navigation = useNavigation();

  React.useEffect(() => {
    loadTheme().then(result => {
      setIsThemeDark(result === 'dark' ? true : false);
    });
  }, []);

  const loadTheme = async () => {
    let result = await AsyncStorage.getItem('theme-status');
    return result;
  };

  const toggleTheme = React.useCallback(async () => {
    await AsyncStorage.setItem('theme-status', isThemeDark ? 'light' : 'dark');
    return setIsThemeDark(!isThemeDark);
  }, [isThemeDark]);

  const preferencers = React.useMemo(
    () => ({
      toggleTheme,
      isThemeDark,
    }),
    [toggleTheme, isThemeDark],
  );

  if (Appearance.getColorScheme() === 'dark') toggleTheme();

  const updateUserInfo = React.useCallback((newUserInfo: User | null) => {
    return setUserInfo(newUserInfo);
  }, []);

  const auth = React.useMemo(
    () => ({
      userInfo,
      updateUserInfo,
    }),
    [updateUserInfo, userInfo],
  );

  return (
    <>
      <StatusBar
        backgroundColor={theme.colors.background}
        translucent={false}
        barStyle={isThemeDark ? 'light-content' : 'dark-content'}
        animated
      />
      <AuthContext.Provider value={auth}>
        <PreferencesContext.Provider value={preferencers}>
          <NavigationContainer theme={theme}>
            <PaperProvider theme={theme}>
              <TourGuideProvider
                androidStatusBarVisible={false}
                backdropColor={theme.colors.backdrop}
                tooltipComponent={Tooltip}
                verticalOffset={StatusBar.currentHeight}>
                <AuthNavigator />
              </TourGuideProvider>
            </PaperProvider>
          </NavigationContainer>
        </PreferencesContext.Provider>
      </AuthContext.Provider>
    </>
  );
}
