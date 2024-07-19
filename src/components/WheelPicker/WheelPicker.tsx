import React, { useState, useEffect, useRef, memo, useCallback, ReactNode } from 'react';
import {
  FlatList,
  Text,
  StyleSheet,
  View,
  Platform,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { adaptiveColor, setAlphaColor } from './WheelPicker.utils';
import type { ItemType, IPickerProps, RenderItemProps } from './WheelPicker.types';
import * as Haptics from 'expo-haptics';
import { theme } from '@/theme/theme';

const WINDOW_WIDTH = Dimensions.get('window').width;

const WheelPicker = ({
  items = [],
  width = WINDOW_WIDTH,
  haptics = false,
  height,
  backgroundColor = '#FFFFFF',
  initialSelectedIndex,
  flatListProps,
  onChange,
  renderItem,
}: IPickerProps) => {
  const flatListRef = useRef<FlatList>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [itemHeight, setItemHeight] = useState(40);
  const [listHeight, setListHeight] = useState(200);
  const [data, setData] = useState<ItemType[]>([]);
  const [userTouch, setUserTouch] = useState(false);
  const bgColor = setAlphaColor(backgroundColor, 1);

  useEffect(() => {
    setData(updateData());
  }, [items]);

  useEffect(() => {
    if (height) {
      const newItemHeight = height / 5;
      setItemHeight(newItemHeight);
      setListHeight(height);
    }
  }, [height]);

  const updateData = useCallback(() => {
    if (items.length) {
      const additionalItem = { label: '', value: null };
      return [
        additionalItem,
        additionalItem,
        ...items,
        additionalItem,
        additionalItem,
      ] as ItemType[];
    }
    return [];
  }, [items]);

  const gradientColor = Platform.select({
    ios: setAlphaColor(bgColor, 0.2),
    android: setAlphaColor(bgColor, 0.4),
    web: setAlphaColor(bgColor, 0.4),
  }) as string;

  const gradientContainerStyle = [
    { height: 2 * itemHeight, borderColor: theme.colors.gray['100'] },
    styles.gradientContainer,
  ];

  const handleOnSelect = useCallback(
    (index: number) => {
      const newIndex = Math.abs(index);

      if (newIndex >= 0 && newIndex <= items.length - 1) {
        if (haptics && userTouch && newIndex !== selectedIndex) {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }
        setSelectedIndex(newIndex);
        onChange && onChange({ index: newIndex, item: items[newIndex] });
      }
    },
    [haptics, userTouch, selectedIndex, items, onChange]
  );

  const handleOnPressItem = useCallback(
    (index: number) => {
      if (index >= 0 && index <= items.length - 1) {
        flatListRef.current?.scrollToIndex({ animated: true, index });
      }
    },
    [items]
  );

  if (!data.length) return null;

  return (
    <View style={{ height: listHeight, width, backgroundColor: bgColor }}>
      <FlatList
        keyExtractor={(_, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={(options) =>
          PickerItem(
            options,
            selectedIndex,
            {
              ...styles.listItem,
              backgroundColor: bgColor,
              fontSize: itemHeight / 2,
              height: itemHeight,
            },
            handleOnPressItem,
            renderItem
          )
        }
        {...flatListProps}
        onTouchStart={(e) => {
          setUserTouch(true);
          flatListProps?.onTouchStart && flatListProps.onTouchStart(e);
        }}
        ref={flatListRef}
        initialScrollIndex={initialSelectedIndex}
        data={data}
        onScroll={(event) => {
          const index = Math.round(event.nativeEvent.contentOffset.y / itemHeight);
          handleOnSelect(index);
        }}
        getItemLayout={(_, index) => ({
          length: itemHeight,
          offset: index * itemHeight,
          index,
        })}
        snapToInterval={itemHeight}
      />
      <View
        style={[gradientContainerStyle, styles.topGradient, { borderBottomWidth: 1 }]}
        pointerEvents='none'
      >
        <LinearGradient style={styles.linearGradient} colors={[bgColor, gradientColor]} />
      </View>
      <View
        style={[gradientContainerStyle, styles.bottomGradient, { borderTopWidth: 1 }]}
        pointerEvents='none'
      >
        <LinearGradient style={styles.linearGradient} colors={[gradientColor, bgColor]} />
      </View>
    </View>
  );
};

const Item = memo(({ fontSize, label, fontColor, textAlign }: RenderItemProps) => (
  <Text style={{ fontSize, color: fontColor, textAlign }}>{label}</Text>
));

const PickerItem = (
  { item, index }: any,
  indexSelected: number,
  style: any,
  onPress: (index: number) => void,
  renderItem?: (props: RenderItemProps) => ReactNode
) => {
  const gap = Math.abs(index - (indexSelected + 2));
  const sizeText = [style.fontSize, style.fontSize / 1.5, style.fontSize / 2];

  const fontSize = gap > 1 ? sizeText[2] : sizeText[gap];
  const fontColor = adaptiveColor(style.backgroundColor);
  const textAlign = 'center';

  return (
    <TouchableOpacity activeOpacity={1} onPress={() => onPress(index - 2)}>
      <View style={style}>
        {typeof renderItem === 'function' &&
          renderItem({ fontSize, fontColor, label: item.label, textAlign })}
        {!renderItem && (
          <Item
            fontSize={fontSize}
            fontColor={fontColor}
            textAlign={textAlign}
            label={item.label}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  listItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  gradientContainer: {
    position: 'absolute',
    width: '100%',
  },
  linearGradient: { flex: 1 },
  topGradient: { top: 0 },
  bottomGradient: { bottom: 0 },
});

export default WheelPicker;
