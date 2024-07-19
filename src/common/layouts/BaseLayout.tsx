import { ReactNode } from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import makeStyles from '@/utils/makeStyles';
import absoluteFillObject = StyleSheet.absoluteFillObject;
import { WINDOW_HEIGHT, WINDOW_WIDTH } from '@/utils/device.utils';

interface Props {
  children?: ReactNode;
  contentStyle?: StyleProp<ViewStyle>;
  processing?: boolean;
}

const BaseLayout = ({ children, processing, contentStyle = {} }: Props) => {
  const styles = useStyles();

  return (
    <SafeAreaView style={[styles.self, { paddingTop: StatusBar.currentHeight }]}>
      <View style={StyleSheet.compose(styles.content, contentStyle)}>{children}</View>
      {processing && (
        <View style={styles.activityIndicatorLayer}>
          <ActivityIndicator color='white' size='small' />
        </View>
      )}
    </SafeAreaView>
  );
};

const useStyles = makeStyles(({ colors }) => ({
  self: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: 10,
  },
  activityIndicatorLayer: {
    ...absoluteFillObject,
    height: WINDOW_HEIGHT,
    width: WINDOW_WIDTH,
    alignItems: 'center',
    zIndex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'center',
  },
}));

export default BaseLayout;
