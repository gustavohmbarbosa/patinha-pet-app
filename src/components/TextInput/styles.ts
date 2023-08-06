import { StyleSheet } from "react-native";
import { APPTHEME } from "../../styles/theme";

export const styles = StyleSheet.create({
  container: {
    height: 56,
    width: "100%",
  },
  textInput: {
    color: APPTHEME.colors.text.dark,
  },
  outlined: {
    borderRadius: 8,
    borderColor: APPTHEME.colors.primary,
  },
  outlinedError: {
    borderRadius: 8,
    borderColor: APPTHEME.colors.alert,
  },
});
