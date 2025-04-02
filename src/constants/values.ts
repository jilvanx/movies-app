import { Dimensions, Platform } from "react-native";

const { width } = Dimensions.get("window");

export const values = {
  isIOS: Platform.OS === "ios",
  screenWidth: parseInt(width.toFixed(0)),
};
