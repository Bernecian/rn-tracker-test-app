import * as ImagePicker from 'expo-image-picker';
import { Alert, Linking } from 'react-native';

const useImagePicker = () => {
  const pickImage = async () => {
    try {
      const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permission.granted) {
        Alert.alert(
          'One Quick Thing...',
          'To continue, we need your permission to access your Photos.',
          [
            { text: 'Maybe Later', style: 'cancel' },
            {
              text: 'Go to settings',
              style: 'default',
              isPreferred: true,
              onPress: () => Linking.openSettings(),
            },
          ]
        );

        return;
      }

      return await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.1,
      });
    } catch (error) {
      Alert.alert('Something went wrong, please select another image.');
    }
  };

  return { pickImage };
};

export default useImagePicker;
