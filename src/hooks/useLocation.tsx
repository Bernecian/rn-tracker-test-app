import { useState, useEffect } from 'react';
import * as Device from 'expo-device';
import {
  getCurrentPositionAsync,
  LocationObject,
  requestForegroundPermissionsAsync,
} from 'expo-location';
import { PLATFORM } from '@/utils/device.utils';

const useLocation = () => {
  const [ready, setReady] = useState(false);
  const [location, setLocation] = useState<LocationObject>();
  const [errorMessage, setErrorMessage] = useState<string>();

  useEffect(() => {
    const getLocation = async () => {
      if (PLATFORM === 'android' && !Device.isDevice) {
        setErrorMessage(
          'Oops, this will not work on Snack in an Android Emulator. Try it on your device!'
        );
        setReady(true);
        return;
      }

      let { status } = await requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMessage('Permission to access location was denied');
        setReady(true);
        return;
      }

      try {
        let location = await getCurrentPositionAsync();
        setLocation(location);
      } catch (error) {
        setErrorMessage('Error getting location');
      } finally {
        setReady(true);
      }
    };

    getLocation();
  }, []);

  return { location, errorMessage, ready };
};

export default useLocation;
