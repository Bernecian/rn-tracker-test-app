import { useMemo } from 'react';
import { useColorScheme, StyleSheet } from 'react-native';
import { Colors, theme, Theme } from '@/theme/theme';

type StylesCallback<T> = (theme: Theme) => StyleSheet.NamedStyles<T>;

const makeStyles = <T extends StyleSheet.NamedStyles<T>>(styles: StylesCallback<T>) => {
  return () => {
    const colorScheme = useColorScheme() ?? 'light';
    const currentTheme = {
      ...theme,
      colors: { ...theme.colors, ...Colors[colorScheme] },
    };
    return useMemo(() => StyleSheet.create(styles(currentTheme)), [styles, currentTheme]);
  };
};

export default makeStyles;
