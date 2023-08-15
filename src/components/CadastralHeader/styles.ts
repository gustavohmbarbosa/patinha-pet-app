import { StyleSheet } from "react-native";
import { APPTHEME } from "../../styles/theme";

export const styles = StyleSheet.create({
  header: {
    padding: 16,
    backgroundColor: APPTHEME.colors.primary,
    overflow: "hidden",
    height: "100%",
    alignItems: "flex-start",
    justifyContent: "flex-end",
  },
  button: {
    zIndex: 10,
    flex: 1,
    marginTop: 25,
    alignSelf: "flex-start",
  },
  logo: {
    position: "absolute",
    opacity: 0.25,
    left: -110,
    top: -15,
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
