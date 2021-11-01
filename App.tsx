import 'react-native-gesture-handler';
import * as React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {Provider as PaperProvider} from 'react-native-paper';
import AuthNavigator from './src/navigation/AuthNavigator';
import {useCustomTheme} from './src/hooks/useCustomTheme';
import {useAuth} from './src/hooks/useAuth';
import {AuthContext} from './src/context/Auth';
import {ThemeContext} from './src/context/Theme';

export default function App() {
  const {theme, isThemeDark, toggleTheme} = useCustomTheme();
  const {currentUser} = useAuth();

  const themeValue = {
    theme,
    isThemeDark,
    toggleTheme,
  };

  const authValue = {
    currentUser,
  };

  return (
    <>
      <StatusBar
        backgroundColor={theme.colors.background}
        translucent={false}
        barStyle={isThemeDark ? 'light-content' : 'dark-content'}
        animated
      />
      <AuthContext.Provider value={authValue}>
        <ThemeContext.Provider value={themeValue}>
          <NavigationContainer theme={theme}>
            <PaperProvider theme={theme}>
              <AuthNavigator />
            </PaperProvider>
          </NavigationContainer>
        </ThemeContext.Provider>
      </AuthContext.Provider>
    </>
  );
}
