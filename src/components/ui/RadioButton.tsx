import { Text, TouchableOpacity } from 'react-native';
import makeStyles from '@/utils/makeStyles';

const useStyles = makeStyles(({ typography, colors }) => ({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  radioButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginVertical: 8,
    borderWidth: 1,
    flex: 1,
    borderColor: colors.primary['700'],
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  activeButton: {
    backgroundColor: colors.primary['700'],
  },
  activeText: {
    color: '#fff',
  },
  radioButtonText: {
    ...typography.base,
  },
}));

interface Props {
  label: string;
  selected: boolean;
  onSelect: () => void;
}

const RadioButton = ({ label, selected, onSelect }: Props) => {
  const styles = useStyles();

  return (
    <TouchableOpacity
      style={[styles.radioButton, selected && styles.activeButton]}
      onPress={onSelect}
    >
      <Text style={[styles.radioButtonText, selected && styles.activeText]}>{label}</Text>
    </TouchableOpacity>
  );
};

export default RadioButton;
