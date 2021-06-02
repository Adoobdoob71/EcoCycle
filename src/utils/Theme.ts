import * as React from 'react';
import { DefaultTheme, DarkTheme } from 'react-native-paper';

// Light Theme - White
const LightAppTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#8bff71",
    accent: "#e571ff",
    surface: "#FFFFFF",
    backdrop: "#00000088",
    placeholder: "#959595",
    onPrimaryColor: "#000000"
  }
} 


// Dark theme - Black
const DarkAppTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: "#8bff71",
    accent: "#e571ff",
    surface: "#202020",
    background: "#151515",
    backdrop: "#00000088",
    placeholder: "#959595",
    onPrimaryColor: "#000000"
  }
}

const PreferencesContext = React.createContext({
  toggleTheme: () => {},
  isThemeDark: false
})

export {
  LightAppTheme,
  DarkAppTheme,
  PreferencesContext
}