import { ICreateReport } from '@/types/report.types';
import axiosInstance from '@/services/axios.service';
import { API } from '@/constants/api.constants';

export const createReport = async ({ data, photo }: ICreateReport) => {
  try {
    const formData = new FormData();
    if (photo) {
      formData.append('photo', photo);
      formData.append('report', JSON.stringify(data));
    }
    const response = await axiosInstance.post(API.REPORT, { data: formData });

    return response.data;
  } catch (error) {
    await Promise.reject(error);
  }
};
