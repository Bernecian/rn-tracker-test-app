import { Link, Stack } from 'expo-router';
import { StyleSheet, Text } from 'react-native';
import BaseLayout from '@/common/layouts/BaseLayout';

export default function NotFoundScreen() {
  return (
    <BaseLayout>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <Link href='/' style={styles.link}>
        <Text>Go to home screen!</Text>
      </Link>
    </BaseLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
