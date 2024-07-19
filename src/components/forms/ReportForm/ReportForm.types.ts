export interface IReportForm {
  activity: string;
  date: string;
  time: string;
  name: string;
  formType: ReportFormType;
  serviceSpecificFields: IServiceSpecificField | {};
}

export interface IServiceSpecificField {
  servicesPlanned: string;
  servicesCompleted: string;
  additionalComments: string;
  jobStatus: string;
  name2: string;
  gallonsPumped: string;
}

export enum ReportFormType {
  'INSPECTION' = 'INSPECTION',
  'SERVICES' = 'SERVICES',
}
