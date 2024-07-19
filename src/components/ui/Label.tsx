import { Text, TextInputProps } from 'react-native';
import makeStyles from '@/utils/makeStyles';

interface Props extends TextInputProps {
  text?: string;
}

const useStyles = makeStyles(({ typography }) => ({
  label: {
    ...typography.p,
    marginBottom: 5,
  },
}));

export const Label = (props: Props) => {
  const styles = useStyles();
  return props.text ? <Text style={styles.label}>{props.text}</Text> : null;
};
