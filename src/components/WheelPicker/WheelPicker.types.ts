import type { FlatListProps } from 'react-native';
import { ReactNode } from 'react';

export type ItemType = { label: string; value: any };
export type RenderItemProps = {
  fontSize: number;
  label: string;
  fontColor: string;
  textAlign: 'center' | 'auto' | 'left' | 'right' | 'justify';
};

export interface IPickerProps {
  items: ItemType[];
  onChange: (item: { index: number; item: ItemType }) => void;
  initialSelectedIndex?: number;
  height?: number;
  width?: any;
  flatListProps?: Partial<FlatListProps<ItemType>>;
  backgroundColor?: string;
  selectedStyle?: {
    borderColor?: string;
    borderWidth?: number;
  };
  renderItem?: (props: RenderItemProps) => ReactNode;
  haptics?: boolean;
}
