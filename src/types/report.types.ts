import { IReportForm } from '@/components/forms/ReportForm/ReportForm.types';

export interface ICreateReportFields extends IReportForm {
  deviceId: string;
  location: {
    latitude?: number;
    longitude?: number;
  };
}

export interface ICreateReport {
  photo?: Blob;
  data: ICreateReportFields;
}
