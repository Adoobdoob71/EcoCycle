import { DefaultTheme, DarkTheme } from 'react-native-paper';

// Light Theme - White
const LightAppTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#00b37a",
    accent: "#01A7C2",
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
    primary: "#44ffc1",
    accent: "#01A7C2",
    surface: "#202020",
    background: "#151515",
    backdrop: "#00000088",
    placeholder: "#959595",
    onPrimaryColor: "#000000"
  }
}

export {
  LightAppTheme,
  DarkAppTheme,
}