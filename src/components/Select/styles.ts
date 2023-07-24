import { StyleSheet } from "react-native";
import { APPTHEME } from "../../styles/theme";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 16,
  },
  content: {
    borderWidth: 1,
    borderColor: APPTHEME.colors.primary,
    borderRadius: 8,
  },
  select: {
    color: APPTHEME.colors.primary,
    fontFamily: APPTHEME.font.body,
    fontSize: APPTHEME.fontsize.body.lg,
    lineHeight: APPTHEME.lineHeight.body.lg,
    letterSpacing: APPTHEME.letterSpacing.body.lg,
  },
});
