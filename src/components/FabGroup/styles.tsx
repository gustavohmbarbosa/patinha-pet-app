import { StyleSheet } from "react-native";
import { APPTHEME } from "../../styles/theme";

export const styles = StyleSheet.create({
  content: {},
  fab: {
    backgroundColor: APPTHEME.colors.secondary,
    borderRadius: 99,
  },
  subFab: {
    backgroundColor: APPTHEME.colors.background,
    borderRadius: 99,
    color: APPTHEME.colors.background,
  },
  subFabLabel: {
    color: APPTHEME.colors.neutrals.white,
    fontFamily: APPTHEME.font.body,
    fontSize: APPTHEME.fontsize.body.lg,
    lineHeight: APPTHEME.lineHeight.body.lg,
    letterSpacing: APPTHEME.letterSpacing.body.lg,
  },
});
