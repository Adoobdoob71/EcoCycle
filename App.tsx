import 'react-native-gesture-handler';
import * as React from 'react';
import {Appearance, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {Provider as PaperProvider} from 'react-native-paper';
import StackNavigator from './src/navigation/StackNavigator';
import {
  DarkAppTheme,
  LightAppTheme,
  PreferencesContext,
} from './src/utils/Theme';

export default function App() {
  const [isThemeDark, setIsThemeDark] = React.useState<boolean>(true);

  let theme = isThemeDark ? DarkAppTheme : LightAppTheme;

  // React.useEffect(() => {
  //   loadTheme().then((result) => {
  //     setIsThemeDark(result === "dark" ? true : false);
  //   });
  // }, []);

  // const loadTheme = async () => {
  //   let result = await AsyncStorage.getItem("theme-status");
  //   return result;
  // };

  const toggleTheme = React.useCallback(async () => {
    // await AsyncStorage.setItem("theme-status", isThemeDark ? "light" : "dark");
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

  return (
    <>
      <StatusBar
        backgroundColor={theme.colors.background}
        translucent={false}
        barStyle={isThemeDark ? 'light-content' : 'dark-content'}
        animated
      />
      <PreferencesContext.Provider value={preferencers}>
        <NavigationContainer theme={theme}>
          <PaperProvider theme={theme}>
            <StackNavigator />
          </PaperProvider>
        </NavigationContainer>
      </PreferencesContext.Provider>
    </>
  );
}
