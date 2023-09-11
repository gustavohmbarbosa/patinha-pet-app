import { StyleSheet } from "react-native";
import { APPTHEME } from "../../styles/theme";

export const styles = StyleSheet.create({
  content: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 4,
    borderColor: APPTHEME.colors.primary,
    minWidth: 92,
    height: 24,
    paddingRight: 16,
    paddingLeft: 2,
    backgroundColor: APPTHEME.colors.secondary,
    borderRadius: 99,
  },
  icon: {
    backgroundColor: APPTHEME.colors.background,
    borderRadius: 99,
    width: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontFamily: APPTHEME.font.label.md,
    textAlign: "center",
    fontSize: APPTHEME.fontsize.label.md,
    lineHeight: APPTHEME.lineHeight.label.md,
    letterSpacing: APPTHEME.letterSpacing.label.md,
    color: APPTHEME.colors.text.background,
  },
});
