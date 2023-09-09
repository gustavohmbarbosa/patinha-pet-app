import { StyleSheet } from "react-native";
import { APPTHEME } from "../../styles/theme";

export const styles = StyleSheet.create({
  content: {
    backgroundColor: APPTHEME.colors.background,
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: APPTHEME.colors.neutrals.black25,
  },
  text: {
    fontFamily: APPTHEME.font.label.lg,
    fontSize: APPTHEME.fontsize.label.lg,
    letterSpacing: APPTHEME.letterSpacing.label.lg,
    lineHeight: APPTHEME.lineHeight.label.lg,
    color: APPTHEME.colors.neutrals.black25,
    textAlign: "center",
  },
});
