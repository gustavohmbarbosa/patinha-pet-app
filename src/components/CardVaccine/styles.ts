import { StyleSheet } from "react-native";
import { APPTHEME } from "../../styles/theme";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#00618440",
    gap: 16,
  },
  content: {
    alignItems: "flex-start",
    justifyContent: "center",
    gap: 4,
  },
  title: {
    fontFamily: APPTHEME.font.body,
    fontSize: APPTHEME.fontsize.body.lg,
    letterSpacing: APPTHEME.letterSpacing.body.lg,
    lineHeight: APPTHEME.lineHeight.body.lg,
    color: APPTHEME.colors.primary,
  },
  subtitle: {
    fontFamily: APPTHEME.font.body,
    fontSize: APPTHEME.fontsize.body.sm,
    letterSpacing: APPTHEME.letterSpacing.body.sm,
    lineHeight: APPTHEME.lineHeight.body.sm,
    color: APPTHEME.colors.primary,
  },
});
