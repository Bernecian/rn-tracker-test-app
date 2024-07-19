import { ColorValue, StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';
import { ForwardedRef, forwardRef, useCallback } from 'react';
import makeStyles from '@/utils/makeStyles';
import { Label } from '@/components/ui/Label';

export interface CustomInputProps extends TextInputProps {
  label?: string;
  error?: string;
  note?: string;
  disabled?: boolean;
  type?: 'text' | 'number';
}

export const Input = forwardRef((props: CustomInputProps, ref: ForwardedRef<TextInput>) => {
  const styles = useStyles();
  const { note, error, label, disabled, type, onChangeText, ...inputProps } = props;

  const handleChange = useCallback(
    (text: string) => {
      if (type === 'number') {
        onChangeText?.(text.replace(/[^0-9]/g, ''));
      } else {
        onChangeText?.(text);
      }
    },
    [type]
  );

  return (
    <View style={styles.self}>
      <Label text={label} />
      <TextInput
        ref={ref}
        {...inputProps}
        onChangeText={handleChange}
        textContentType='none'
        style={[
          styles.input,
          disabled ? styles.inputDisabled : {},
          error ? styles.invalidInput : {},
        ]}
      />
      <View style={styles.inputBottom}>
        {error && <Text style={styles.errorText}>{error}</Text>}
        {note && <View style={styles.noteContainer}>{note}</View>}
      </View>
    </View>
  );
});

const useStyles = makeStyles(({ typography, colors }) => ({
  self: {
    gap: 5,
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    color: colors.gray['300'],
    borderColor: colors.gray['100'],
    ...typography.base,
  },
  invalidInput: {
    borderColor: 'red',
  },
  inputDisabled: {
    color: colors.gray['100'],
  },
  errorText: {
    marginTop: 5,
    fontSize: 12,
    paddingHorizontal: 5,
    color: 'red',
  },
  inputBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  noteContainer: {
    marginTop: 6,
    flex: 2,
  },
}));
