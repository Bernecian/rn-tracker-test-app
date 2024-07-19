import { Text, View } from 'react-native';
import { Label } from '@/components/ui/Label';
import RadioButton from '@/components/ui/RadioButton';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { FormField } from '@/types/form.types';
import { RadioGroup } from '@/components/ui/RadioGroup';

export const createField = <T extends FieldValues = FieldValues>(
  fieldProps: FormField<keyof T | string>,
  control: Control<T>
) => {
  const name = fieldProps.name as Path<T>;
  const key = fieldProps.name.toString();

  return (
    <Controller
      key={key}
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        switch (fieldProps.type) {
          case 'radio':
            return (
              <RadioGroup
                {...fieldProps}
                selected={field.value}
                error={error?.message}
                onSelect={field.onChange}
              />
            );
          case 'input':
            return (
              <Input
                {...field}
                {...fieldProps.inputProps}
                disabled={fieldProps.readonly}
                editable={!fieldProps.readonly}
                label={fieldProps.label}
                onChangeText={field.onChange}
                error={error?.message}
              />
            );
          case 'select':
            return (
              <View>
                <Select
                  inputProps={{ ...field, label: fieldProps.label, error: error?.message }}
                  selected={field.value}
                  onSelect={field.onChange}
                  options={fieldProps.options ?? []}
                />
                <Text></Text>
              </View>
            );
          default:
            return <Text />;
        }
      }}
    />
  );
};
