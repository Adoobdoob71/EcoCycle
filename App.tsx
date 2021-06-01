import 'react-native-gesture-handler';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider as PaperProvider} from 'react-native-paper';

export default function App() {
  return (
    <NavigationContainer>
      <PaperProvider></PaperProvider>
    </NavigationContainer>
  );
}
