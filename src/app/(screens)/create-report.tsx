import BaseLayout from '@/common/layouts/BaseLayout';
import { ReportForm } from '@/components/forms/ReportForm/ReportForm';
import { useLocalSearchParams } from 'expo-router';
import { IReportForm, ReportFormType } from '@/components/forms/ReportForm/ReportForm.types';
import { createReport } from '@/services/report.services';
import { ICreateReport, ICreateReportFields } from '@/types/report.types';
import DeviceInfo from 'react-native-device-info';
import useLocation from '@/hooks/useLocation';
import { useCallback, useState } from 'react';
import { Alert } from 'react-native';

const CreateReport = () => {
  const [loading, setLoading] = useState(false);
  const { location, errorMessage, ready } = useLocation();
  const params = useLocalSearchParams<{ type: ReportFormType }>();

  const handleCreateReport = useCallback(
    async (data: IReportForm, photo?: Blob): Promise<void> => {
      const deviceId = await DeviceInfo.getUniqueId();
      const report: ICreateReportFields = {
        ...data,
        deviceId,
        location: {
          latitude: location?.coords.latitude,
          longitude: location?.coords.longitude,
        },
      };
      setLoading(true);
      await createReport({ data: report, photo })
        .then((result) => {
          //
        })
        .catch((e) => Alert.alert(`Failed to create report: ${e}`))
        .finally(() => {
          setLoading(false);
        });
    },
    [location]
  );

  return (
    <BaseLayout processing={!ready || loading}>
      <ReportForm formType={params.type} onSubmit={handleCreateReport} />
    </BaseLayout>
  );
};

export default CreateReport;
