import { StyleSheet } from "react-native";
import { APPTHEME } from "../../styles/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: APPTHEME.colors.primary,
    alignItems: "center",
    gap: 24,
    paddingVertical: 24,
  },
  content: {
    flex: 1,
    width: "100%",
    justifyContent: "space-between",
  },
  header: {
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
  },
  avatar: {
    backgroundColor: APPTHEME.colors.background,
    color: APPTHEME.colors.primary,
  },
  headerText: {
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontFamily: APPTHEME.font.label.lg,
    fontSize: APPTHEME.fontsize.label.lg,
    letterSpacing: APPTHEME.letterSpacing.label.lg,
    lineHeight: APPTHEME.lineHeight.label.lg,
    color: APPTHEME.colors.text.background,
  },
  subtitle: {
    fontFamily: APPTHEME.font.label.lg,
    fontSize: APPTHEME.fontsize.label.lg,
    letterSpacing: APPTHEME.letterSpacing.label.lg,
    lineHeight: APPTHEME.lineHeight.label.lg,
    color: APPTHEME.colors.text.background,
    opacity: 0.5,
  },
  button: {
    padding: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  exitButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    paddingVertical: 10
  },
  buttonText: {
    fontFamily: APPTHEME.font.label.md,
    fontSize: APPTHEME.fontsize.label.md,
    letterSpacing: APPTHEME.letterSpacing.label.md,
    lineHeight: APPTHEME.lineHeight.label.md,
    color: APPTHEME.colors.text.background,
    opacity: 0.5,
  },
});
