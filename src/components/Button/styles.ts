import { StyleSheet } from "react-native";
import { APPTHEME } from "../../styles/theme";

export const styles = StyleSheet.create({
  container: {
    display: "flex",
    width: "100%",
  },
  content: {
    height: 44,
  },
  button: {
    borderRadius: 8,
    backgroundColor: APPTHEME.colors.secondary,
  },
  label: {
    fontFamily: APPTHEME.font.label.lg,
    fontSize: APPTHEME.fontsize.label.lg,
    letterSpacing: APPTHEME.letterSpacing.label.lg,
    color: APPTHEME.colors.text.background,
  },
});
