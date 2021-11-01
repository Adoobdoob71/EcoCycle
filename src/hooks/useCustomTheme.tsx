import React, {FC, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import {DarkAppTheme, LightAppTheme} from '../utils/Theme';

function useCustomTheme() {
  const [isThemeDark, setIsThemeDark] = useState(false);

  const theme = isThemeDark ? DarkAppTheme : LightAppTheme;

  useEffect(() => {
    AsyncStorage.getItem('theme-status').then(state => {
      if (state === 'dark') setIsThemeDark(true);
    });
  }, []);

  const toggleTheme = async () => {
    try {
      await AsyncStorage.setItem(
        'theme-status',
        isThemeDark ? 'light' : 'dark',
      );
      setIsThemeDark(isThemeDark => {
        changeNavigationBarColor(
          isThemeDark
            ? LightAppTheme.colors.background
            : DarkAppTheme.colors.background,
          isThemeDark,
          true,
        );
        return !isThemeDark;
      });
    } catch (error) {
      console.error(error);
    }
  };

  return {theme, isThemeDark, toggleTheme};
}

export {useCustomTheme};
