import { ModalProps, StyleProp, ViewStyle } from 'react-native';
import { ReactNode } from 'react';

export interface BottomSheetProps {
  /** Style of the bottom sheet's container. Use this to change the color of the underlay. */
  containerStyle?: StyleProp<ViewStyle>;

  /** Additional props handed to the `Modal`. */
  modalProps?: ModalProps;

  /** Style of the backdrop container. */
  backdropStyle?: StyleProp<ViewStyle>;

  /** Handler for backdrop press. */
  onBackdropPress?(): void;

  /** Is the modal component shown. */
  isVisible?: boolean;

  children?: ReactNode;
}
