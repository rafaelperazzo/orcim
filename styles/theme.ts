import { MD3LightTheme as DefaultTheme } from 'react-native-paper';
import { colors } from './colors';

export const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: colors.lightBrown,
      secondary: colors.blue,
    },
  };