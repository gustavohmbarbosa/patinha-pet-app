import { StyleSheet } from "react-native";
import { APPTHEME } from "../../styles/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    display: "flex",
    padding: 16,
    backgroundColor: APPTHEME.colors.primary,
    overflow: "hidden",
    height: 324,
    alignItems: "flex-start",
    justifyContent: "flex-end",
  },
  logo: {
    position: "absolute",
    opacity: 0.25,
    left: -110,
    top: -30,
  },
  headerText: {
    gap: 10,
  },
  headerTitle: {
    fontFamily: APPTHEME.font.display,
    fontSize: APPTHEME.fontsize.display,
    lineHeight: APPTHEME.lineHeight.display,
    color: APPTHEME.colors.text.background,
  },
  headerSubtitle: {
    fontFamily: APPTHEME.font.label.lg,
    fontSize: APPTHEME.fontsize.label.lg,
    lineHeight: APPTHEME.lineHeight.label.lg,
    letterSpacing: APPTHEME.letterSpacing.label.lg,
    color: APPTHEME.colors.text.background,
  },
  content: {
    flex: 1,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
    gap: 32,
  },
  options: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 32,
  },
  divider: {
    flexDirection: "row",
    gap: 16,
    alignItems: "center",
    paddingHorizontal: 32,
  },
  dividerText: {
    fontFamily: APPTHEME.font.body,
    fontSize: APPTHEME.fontsize.body.sm,
    lineHeight: APPTHEME.lineHeight.body.sm,
    letterSpacing: APPTHEME.letterSpacing.body.sm,
    color: APPTHEME.colors.text.dark,
  },
  barra: {
    width: 83,
    height: 1,
    backgroundColor: APPTHEME.colors.neutrals.black5,
  },
  foot: {
    flexDirection: "row",
    gap: 4,
    alignItems: "center",
  },
  footTitle: {
    fontFamily: APPTHEME.font.label.md,
    fontSize: APPTHEME.fontsize.label.md,
    lineHeight: APPTHEME.lineHeight.label.md,
    letterSpacing: APPTHEME.letterSpacing.label.md,
    color: APPTHEME.colors.text.dark,
    textAlign: "center",
  },
  footButton: {
    alignItems: "center",
  },
  secondary: {
    fontFamily: APPTHEME.font.label.md,
    fontSize: APPTHEME.fontsize.label.md,
    lineHeight: APPTHEME.lineHeight.label.md,
    letterSpacing: APPTHEME.letterSpacing.label.md,
    color: APPTHEME.colors.secondary,
  },
});
