import { useCallback, useState } from 'react';
import moment from 'moment';
import Button from '@/components/ui/Button';
import { yupResolver } from '@hookform/resolvers/yup';
import makeStyles from '@/utils/makeStyles';
import { createField } from '@/utils/form.utils';
import Snapshot from '@/components/Snapshot/Snapshot';
import {
  municipalInspectionFields,
  serviceProviderFields,
} from '@/components/forms/ReportForm/ReportForm.constants';
import { AbsoluteActionBox } from '@/components/ui/AbsoluteActionBox';
import { SubmitHandler, useForm } from 'react-hook-form';
import { reportFormSchema } from '@/components/forms/ReportForm/ReportForm.config';
import { KeyboardAvoidingView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { IReportForm, ReportFormType } from '@/components/forms/ReportForm/ReportForm.types';
import { ThemedColors } from '@/theme/theme';

interface Props {
  formType?: ReportFormType;
  onSubmit?: (data: IReportForm, photo?: Blob) => void;
}

const fields = {
  [ReportFormType.INSPECTION]: municipalInspectionFields,
  [ReportFormType.SERVICES]: serviceProviderFields,
};

export const ReportForm = ({ onSubmit, formType = ReportFormType.INSPECTION }: Props) => {
  const styles = useStyles();
  const [photo, setPhoto] = useState<{ image: Blob; name: string } | null>(null);
  const { control, handleSubmit } = useForm<IReportForm>({
    defaultValues: {
      formType,
      date: moment().format('DD/MM/YYYY'),
      time: moment().format('hh:mm A'),
    },
    mode: 'onChange',
    resolver: yupResolver(reportFormSchema),
  });

  const onValidSubmission: SubmitHandler<IReportForm> = useCallback(
    (formValues) => {
      onSubmit?.(formValues, photo?.image);
    },
    [photo?.image]
  );

  return (
    <KeyboardAvoidingView behavior='padding' style={styles.self}>
      <Text style={styles.formTitle}>Create Report</Text>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollableContent}
      >
        <View style={styles.fields}>
          {fields[formType].map((item) => createField(item, control))}
          {photo && (
            <View style={styles.imageRow}>
              <Text numberOfLines={1} ellipsizeMode='head' style={{ width: '60%' }}>
                {photo.name}
              </Text>
              <TouchableOpacity onPress={() => setPhoto(null)}>
                <Text style={{ color: 'red' }}>Delete</Text>
              </TouchableOpacity>
            </View>
          )}
          <Snapshot onCapture={setPhoto} />
        </View>
      </ScrollView>
      <AbsoluteActionBox style={styles.action}>
        <Button
          color={ThemedColors.primary['700']}
          title='Create Report'
          onPress={handleSubmit(onValidSubmission)}
        />
      </AbsoluteActionBox>
    </KeyboardAvoidingView>
  );
};

const useStyles = makeStyles(({ typography }) => ({
  self: {
    flex: 1,
    paddingHorizontal: 30,
  },
  fields: {
    gap: 5,
  },
  formTitle: {
    ...typography.heading2,
    marginVertical: 20,
  },
  row: {
    width: '100%',
    gap: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  scrollableContent: {
    paddingBottom: 150,
  },
  imageRow: {
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  action: {
    justifyContent: 'center',
  },
}));
