import { StyleSheet } from "react-native";
import { APPTHEME } from "../../styles/theme";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 50,
  },

  content: {
    borderWidth: 1,
    borderRadius: 8,
    height: 50,
  },
  border: {
    borderColor: APPTHEME.colors.primary,
  },
  borderError: {
    borderColor: APPTHEME.colors.alert,
  },
  borderDisabled: {
    borderColor: APPTHEME.colors.neutrals.gray,
  },
  select: {
    color: APPTHEME.colors.text.dark,
    fontFamily: APPTHEME.font.body,
    fontSize: APPTHEME.fontsize.body.lg,
    lineHeight: APPTHEME.lineHeight.body.lg,
    letterSpacing: APPTHEME.letterSpacing.body.lg,
  },
  disabled: {
    color: APPTHEME.colors.neutrals.gray,
    fontFamily: APPTHEME.font.body,
    fontSize: APPTHEME.fontsize.body.lg,
    lineHeight: APPTHEME.lineHeight.body.lg,
    letterSpacing: APPTHEME.letterSpacing.body.lg,
  },
});
