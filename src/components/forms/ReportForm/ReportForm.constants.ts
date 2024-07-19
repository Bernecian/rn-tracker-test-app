import { activities, comments, jobStatuses, services } from '@/constants/report.constants';
import type { FormField } from '@/types/form.types';

const baseFields: Array<FormField<string>> = [
  { label: 'Activity', type: 'radio', options: activities, name: 'activity' },
  { label: 'Date', type: 'input', readonly: true, name: 'date' },
  { label: 'Time', type: 'input', readonly: true, name: 'time' },
];

export const serviceProviderFields: Array<FormField<string>> = [
  ...baseFields,
  {
    label: 'Services Planned',
    type: 'select',
    name: 'serviceSpecificFields.servicesPlanned',
    options: services,
  },
  { label: 'Your Name', type: 'input', name: 'name' },
  {
    label: 'Service Completed',
    type: 'select',
    name: 'serviceSpecificFields.servicesCompleted',
    options: services,
  },
  {
    label: 'Job Status',
    type: 'select',
    name: 'serviceSpecificFields.jobStatus',
    options: jobStatuses,
  },
  {
    label: 'Additional Comments',
    type: 'select',
    name: 'serviceSpecificFields.additionalComments',
    options: comments,
  },
  {
    label: '# of gallons pumped',
    type: 'input',
    name: 'serviceSpecificFields.gallonsPumped',
    inputProps: { keyboardType: 'number-pad', type: 'number' },
  },
  { label: 'Your Name #2', type: 'input', name: 'serviceSpecificFields.name2' },
];

export const municipalInspectionFields: Array<FormField<string>> = [
  ...baseFields,
  { label: 'Inspector Name', type: 'input', name: 'name' },
];
