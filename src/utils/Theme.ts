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
  }
} 


// Dark theme - Black
const DarkAppTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: "#ff8e71",
    accent: "#ffaa9c",
    surface: "#202020",
    background: "#151515",
    backdrop: "#00000088",
    placeholder: "#959595",
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