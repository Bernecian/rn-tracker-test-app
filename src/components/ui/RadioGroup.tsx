import { Text, View } from 'react-native';
import { ForwardedRef, forwardRef } from 'react';
import makeStyles from '@/utils/makeStyles';
import { Label } from '@/components/ui/Label';
import RadioButton from '@/components/ui/RadioButton';
import { IOption } from '@/types/app.types';

interface Props {
  label?: string;
  error?: string;
  options?: IOption[];
  selected?: string;
  onSelect?: (value: string) => void;
}

export const RadioGroup = forwardRef((props: Props, ref: ForwardedRef<View>) => {
  const styles = useStyles();
  const { error, label, options, selected, onSelect } = props;

  return (
    <View style={styles.self} ref={ref}>
      <Label text={label} />
      <View>
        {options?.map((item) => (
          <RadioButton
            key={item.value}
            label={item.label}
            selected={selected === item.value}
            onSelect={() => onSelect?.(item.value)}
          />
        ))}
      </View>
      <View style={styles.bottom}>{error && <Text style={styles.errorText}>{error}</Text>}</View>
    </View>
  );
});

const useStyles = makeStyles(() => ({
  self: {
    gap: 5,
  },
  errorText: {
    fontSize: 12,
    paddingHorizontal: 5,
    color: 'red',
  },
  bottom: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
}));
