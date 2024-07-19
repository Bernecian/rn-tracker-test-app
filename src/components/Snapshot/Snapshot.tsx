import { CameraView, useCameraPermissions } from 'expo-camera';
import { useRef, useState } from 'react';
import Button from '@/components/ui/Button';
import { Alert, Linking, Pressable, StyleSheet, Text, View } from 'react-native';
import { BottomSheet } from '@/components/BottomSheet/BottomSheet';

interface Props {
  onCapture?: ({ image, name }: { image: Blob; name: string }) => void;
}

const Snapshot = ({ onCapture }: Props) => {
  const ref = useRef<CameraView>(null);
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) {
    return <View />;
  }

  const handleCamera = async () => {
    if (!permission.granted) {
      if (permission.canAskAgain) {
        await requestPermission();
        return;
      }

      if (!permission.granted) {
        Alert.alert(
          'One Quick Thing...',
          'To continue, We needs your permission to access your camera to take a picture for reports.',
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
    }

    setBottomSheetVisible(true);
  };

  const handleTakePicture = async () => {
    ref.current?.takePictureAsync().then(async (result) => {
      if (!result) {
        return;
      }
      const uriComponents = result.uri.split('/');
      const fileName = uriComponents[uriComponents.length - 1];
      const blob = await fetch(result.uri).then((response) => response.blob());
      onCapture?.({ image: blob, name: fileName });
      setBottomSheetVisible(false);
    });
  };

  return (
    <View>
      <Button
        style={styles.action}
        color='#fff'
        textColor='#212121'
        onPress={handleCamera}
        title='Take photo'
      />
      <BottomSheet
        isVisible={bottomSheetVisible && permission.granted}
        onBackdropPress={() => setBottomSheetVisible(false)}
      >
        <View style={styles.container}>
          <CameraView ref={ref} style={styles.camera}>
            <View style={styles.buttonContainer}>
              <Pressable onPress={handleTakePicture}>
                <Text style={styles.text}>Take a picture</Text>
              </Pressable>
              <Pressable onPress={() => setBottomSheetVisible(false)}>
                <Text style={styles.text}>Cancel</Text>
              </Pressable>
            </View>
          </CameraView>
        </View>
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  action: { borderColor: '#212121', borderWidth: 1 },
  container: {
    width: '100%',
    height: '100%',
    paddingTop: 100,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    bottom: 80,
    width: '100%',
    flexDirection: 'row',
    position: 'absolute',
    justifyContent: 'space-around',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default Snapshot;
