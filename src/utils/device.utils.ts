import { Dimensions, Platform } from 'react-native';

export const { width: WINDOW_WIDTH, height: WINDOW_HEIGHT } = Dimensions.get('window');

export const PLATFORM = Platform.OS;
