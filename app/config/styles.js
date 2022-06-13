import { Platform } from "react-native";
import color from'./colors.js';

export default {
  text: {
    fontSize: Platform.OS === "android" ? 18 : 20,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
    color: color.text,
  }
}