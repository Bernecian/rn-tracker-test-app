import React from 'react';
import { Modal, View, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BottomSheetProps } from '@/components/BottomSheet/BottomSheet.types';

/**
 * Overlay Modal that displays content from the bottom of the screen.
 */

export const BottomSheet = ({
  containerStyle,
  backdropStyle,
  onBackdropPress = () => null,
  isVisible = false,
  modalProps = {},
  children,
  ...rest
}: BottomSheetProps) => {
  return (
    <Modal
      animationType='slide'
      onRequestClose={onBackdropPress}
      transparent={true}
      visible={isVisible}
      {...modalProps}
    >
      <Pressable
        onPress={onBackdropPress}
        style={StyleSheet.flatten([StyleSheet.absoluteFill, backdropStyle])}
      />
      <SafeAreaView
        style={StyleSheet.flatten([styles.safeAreaView, containerStyle && containerStyle])}
        pointerEvents='box-none'
        {...rest}
      >
        <View>{children}</View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)',
    flexDirection: 'column-reverse',
  },
});
