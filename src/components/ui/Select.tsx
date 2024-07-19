import React, { ForwardedRef, forwardRef, useCallback, useMemo, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { BottomSheet } from '@/components/BottomSheet/BottomSheet';
import { CustomInputProps, Input } from '@/components/ui/Input';
import { IOption } from '@/types/app.types';
import makeStyles from '@/utils/makeStyles';
import WheelPicker from '@/components/WheelPicker/WheelPicker';

interface Props {
  options: IOption[];
  selected?: string;
  onSelect: (value: string) => void;
  inputProps?: CustomInputProps;
}

const useStyles = makeStyles(({ typography, colors }) => ({
  heading: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: colors.gray['50'],
  },
  actionSheet: {
    paddingVertical: 10,
    backgroundColor: colors.background,
  },
  pickerWrapper: {
    maxHeight: 200,
  },
  picker: {
    height: 50,
    backgroundColor: 'red',
    width: '100%',
  },
  pickerItem: { ...typography.p, color: 'black' },
}));

export const Select = forwardRef(
  ({ options, selected, onSelect, inputProps }: Props, ref: ForwardedRef<TextInput>) => {
    const styles = useStyles();
    const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
    const [innerValue, setInnerValue] = useState<string | undefined>(selected);
    const handleBlur = useCallback(() => {
      if (options.length === 0) {
        return;
      }

      onSelect(innerValue ? innerValue : options[0].value);
      setBottomSheetVisible(false);
    }, [innerValue]);

    const selectedOption = useMemo(() => {
      return options.find((option) => option.value === selected);
    }, [options, selected]);

    return (
      <View>
        <Input
          {...inputProps}
          value={selectedOption?.label}
          editable={false}
          onPress={() => setBottomSheetVisible(!!options.length)}
        />
        <BottomSheet
          isVisible={bottomSheetVisible}
          onBackdropPress={() => setBottomSheetVisible(false)}
        >
          <View style={styles.heading}>
            <TouchableOpacity>
              <Text style={{ color: 'blue' }} onPress={handleBlur}>
                Done
              </Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal={true} style={styles.pickerWrapper}>
            <WheelPicker
              items={options}
              onChange={(el) => setInnerValue(el.item.value)}
              initialSelectedIndex={
                innerValue ? options.findIndex((item) => item.value === innerValue) : 0
              }
              renderItem={(item) => (
                <Text key={item.label} style={styles.pickerItem}>
                  {item.label}
                </Text>
              )}
              haptics
            />
          </ScrollView>
        </BottomSheet>
      </View>
    );
  }
);
