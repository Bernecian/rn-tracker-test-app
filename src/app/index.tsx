import { useCallback } from 'react';
import { router } from 'expo-router';
import { Text, View } from 'react-native';
import Button from '@/components/ui/Button';
import makeStyles from '@/utils/makeStyles';
import { ThemedColors } from '@/theme/theme';
import BaseLayout from '@/common/layouts/BaseLayout';
import { ReportFormType } from '@/components/forms/ReportForm/ReportForm.types';

const Home = () => {
  const styles = useStyles();

  const navigateToCreateReport = useCallback((type: ReportFormType) => {
    router.push({
      pathname: '/create-report',
      params: { type },
    });
  }, []);

  return (
    <BaseLayout contentStyle={styles.content}>
      <View style={styles.centered}>
        <Text style={styles.text}>
          Please select the type of report you want to create for{' '}
          <Text style={styles.bold}>
            Shoshaku establishment in Great Neck Water Pollution Control District
          </Text>{' '}
          Municipality
        </Text>
        <View style={styles.buttonsWrapper}>
          <Button
            title='Inspection Report'
            color={ThemedColors.primary[700]}
            onPress={navigateToCreateReport.bind(this, ReportFormType.INSPECTION)}
          />
          <Button
            title='Service Report'
            color={ThemedColors.primary[800]}
            onPress={navigateToCreateReport.bind(this, ReportFormType.SERVICES)}
          />
        </View>
      </View>
    </BaseLayout>
  );
};

const useStyles = makeStyles(({ colors, typography }) => ({
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centered: {
    gap: 20,
    padding: 20,
    width: '100%',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: colors.gray[100],
  },
  buttonsWrapper: {
    gap: 10,
    width: '100%',
  },
  text: {
    ...typography.p,
  },
  bold: {
    fontWeight: 'bold',
  },
}));

export default Home;
