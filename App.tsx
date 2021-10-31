import 'react-native-gesture-handler';
import * as React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {Provider as PaperProvider} from 'react-native-paper';
import AuthNavigator from './src/navigation/AuthNavigator';
import {TourGuideProvider} from 'rn-tourguide';
import Tooltip from './src/components/Tooltip';
import {useCustomTheme} from './src/hooks/useCustomTheme';

export default function App() {
  const {theme, isThemeDark} = useCustomTheme();

  return (
    <>
      <StatusBar
        backgroundColor={theme.colors.background}
        translucent={false}
        barStyle={isThemeDark ? 'light-content' : 'dark-content'}
        animated
      />
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
    </>
  );
}
