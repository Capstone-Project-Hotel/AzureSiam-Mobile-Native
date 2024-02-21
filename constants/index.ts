import { Dimensions, Platform } from "react-native";

export const COLORS = {
  PRIMARY: "#2A4D69",
  SECONDARY: "#4B86B4",
  THIRD: "#1890FF",
  BACKGROUND_1: "#E7EFF6",
  WHITE: "#FFFFFF",
}

export const DEVICE = {
  WIDTH: Dimensions.get("window").width,
  PLATFORM: Platform.OS,
}