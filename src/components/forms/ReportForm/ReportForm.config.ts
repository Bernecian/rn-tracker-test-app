import * as yup from 'yup';
import { IReportForm, ReportFormType } from '@/components/forms/ReportForm/ReportForm.types';

export const reportFormSchema: yup.ObjectSchema<IReportForm> = yup.object().shape({
  formType: yup.mixed<ReportFormType>().required('Field is required'),
  serviceSpecificFields: yup.object().when('formType', ([formType]) => {
    if (formType === ReportFormType.SERVICES) {
      return yup
        .object()
        .shape({
          servicesPlanned: yup.string().required('Field is required'),
          servicesCompleted: yup.string().required('Field is required'),
          additionalComments: yup.string().required('Field is required'),
          jobStatus: yup.string().required('Field is required'),
          name2: yup.string().required('Field is required'),
          gallonsPumped: yup.string().required('Field is required'),
        })
        .required('Field is required');
    } else {
      return yup.object();
    }
  }),
  activity: yup.string().required('Field is required'),
  name: yup.string().required('Field is required'),
  date: yup.string().required('Field is required'),
  time: yup.string().required('Field is required'),
});
