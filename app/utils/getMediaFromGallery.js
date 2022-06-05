import  * as ImagePicker from 'expo-image-picker';

export const getMediaFromGallery = async () => {
  try {
      const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if(!granted) alert("You need to enable the permision for he Camers Roll!!");

      const {cancelled, uri} = await ImagePicker.launchImageLibraryAsync();
    if(!cancelled) {
      return uri;
    }

  } catch (error) {
    console.log("Error reading an image", error)
  }
}