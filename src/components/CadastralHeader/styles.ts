import { StyleSheet } from "react-native";
import { APPTHEME } from "../../styles/theme";

export const styles = StyleSheet.create({
  header: {
    display: "flex",
    padding: 16,
    backgroundColor: APPTHEME.colors.primary,
    overflow: "hidden",
    height: "70%",
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
});
