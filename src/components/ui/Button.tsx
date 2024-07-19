import { forwardRef } from 'react';
import {
  ColorValue,
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import makeStyles from '@/utils/makeStyles';
import { ThemedColors } from '@/theme/theme';

interface Props extends Omit<PressableProps, 'style'> {
  title: string;
  style?: StyleProp<ViewStyle>;
  color?: ColorValue;
  textColor?: ColorValue;
}

const Button = forwardRef<View, Props>(
  (
    {
      title,
      style = {},
      color = ThemedColors.primary['700'],
      textColor = '#fff',
      ...pressableProps
    },
    ref
  ) => {
    const styles = useStyles();

    return (
      <Pressable
        ref={ref}
        {...pressableProps}
        style={[StyleSheet.compose(styles.self, style), { backgroundColor: color }]}
      >
        <Text style={StyleSheet.compose(styles.title, { color: textColor })}>{title}</Text>
      </Pressable>
    );
  }
);

const useStyles = makeStyles(() => ({
  self: {
    width: '100%',
    borderRadius: 10,
    paddingVertical: 13,
    backgroundColor: '#fff',
    cursor: 'pointer',
  },
  title: {
    fontSize: 18,
    textAlign: 'center',
  },
}));

export default Button;
