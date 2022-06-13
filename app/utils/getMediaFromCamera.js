import  * as ImagePicker from 'expo-image-picker';

export const getMediaFromCamera = async () => {
  try {
    // Ask the user for the permission to access the camera
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your camera!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync();
    if (!result.cancelled) {
      return result.uri;
    }

  } catch (error) {
    console.log("Error reading an image", error)
  }

}