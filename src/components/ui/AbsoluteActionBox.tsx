import React, { ReactNode } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import makeStyles from '@/utils/makeStyles';
import { WINDOW_WIDTH } from '@/utils/device.utils';

interface Props {
  children?: ReactNode;
  style?: ViewStyle;
}

export const AbsoluteActionBox = ({ children, style }: Props) => {
  const styles = useStyles();
  return <View style={StyleSheet.compose(styles.self, style)}>{children}</View>;
};

const useStyles = makeStyles(({ colors }) => ({
  self: {
    position: 'absolute',
    bottom: 0,
    left: -10,
    right: 0,
    paddingHorizontal: 26,
    paddingVertical: 17,
    height: 90,
    width: WINDOW_WIDTH,
    elevation: 5,
    backgroundColor: colors.background,
    borderTopColor: colors.gray['100'],
    borderTopWidth: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: 1,
  },
}));
