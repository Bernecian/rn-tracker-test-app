import { TextStyle } from 'react-native';

export const Colors = {
  base: {
    primary: {
      [700]: '#10AC84',
      [800]: '#099572',
    },
    gray: {
      [50]: '#f3f3f3',
      [100]: '#d5d5d5',
      [300]: '#333333',
    },
  },
  light: {
    text: '#212121',
    background: '#fff',
  },
  dark: {
    text: '#212121',
    background: '#fff',
  },
};

export const Typography = {
  heading1: {
    fontSize: 32,
    fontWeight: 700,
    lineHeight: 36,
  },
  heading2: {
    fontSize: 24,
    fontWeight: 700,
    lineHeight: 28,
  },
  p: {
    fontSize: 16,
    lineHeight: 24,
  },
  base: {
    fontSize: 16,
    lineHeight: 20,
  },
};

export const theme = {
  typography: Typography,
  colors: {
    ...Colors.base,
    ...Colors.light,
    ...Colors.dark,
  },
};

export const ThemedColors = theme.colors;

export type Theme = typeof theme;
