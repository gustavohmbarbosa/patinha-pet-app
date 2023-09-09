import { StyleSheet } from "react-native";
import { APPTHEME } from "../../styles/theme";

export const styles = StyleSheet.create({
  pin: { width: 50, height: 75, justifyContent: "flex-start" },
  pinImage: {
    position: "absolute",
    top: 2,
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
  avatar: {
    marginTop: 3,
  },
});
