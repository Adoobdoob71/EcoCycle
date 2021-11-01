import React, { createContext } from 'react';
import { LightAppTheme } from '../utils/Theme';

const ThemeContext = createContext({
  theme: LightAppTheme,
  isThemeDark: false,
  toggleTheme: () => {},
});

export {
  ThemeContext
}