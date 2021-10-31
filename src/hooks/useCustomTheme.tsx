import React, {FC, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import {DarkAppTheme, LightAppTheme} from '../utils/Theme';

function useCustomTheme() {
  const [isThemeDark, setIsThemeDark] = useState(false);

  let theme = isThemeDark ? DarkAppTheme : LightAppTheme;

  const toggleTheme = async () => {
    try {
      await AsyncStorage.setItem(
        'theme-status',
        isThemeDark ? 'light' : 'dark',
      );
      changeNavigationBarColor(theme.colors.background, !isThemeDark, true);
    } catch (error) {
      console.error(error);
    }
  };

  return {theme, isThemeDark, toggleTheme};
}

export {useCustomTheme};
