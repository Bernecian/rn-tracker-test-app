import { useState, useEffect } from 'react';
import DeviceInfo from 'react-native-device-info';

const useDevice = () => {
  const [deviceId, setDeviceId] = useState<string>();

  useEffect(() => {
    (async () => {
      const id = await DeviceInfo.getUniqueId();
      setDeviceId(id);
    })();
  }, []);

  return { deviceId };
};

export default useDevice;
