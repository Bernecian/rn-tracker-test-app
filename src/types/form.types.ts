import { IOption } from '@/types/app.types';
import { CustomInputProps } from '@/components/ui/Input';

export type FormField<T> = {
  name: T;
  label: string;
  readonly?: boolean;
  options?: IOption[];
  inputProps?: CustomInputProps;
  type: 'radio' | 'select' | 'input';
};
