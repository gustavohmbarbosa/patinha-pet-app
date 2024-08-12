import { StyleSheet } from "react-native";
import { APPTHEME } from "../../styles/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: APPTHEME.colors.background,
    paddingTop: 24,
    paddingHorizontal: 16,
  },
  content: {
    flex: 1,
    gap: 24,
  },
  buttons: {
    flexDirection: "row",
    gap: 16,
    width: "100%",
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: 99,
    alignItems: "center",
    justifyContent: "center",
    flexGrow: 1,
    opacity: 0.35,
  },
  buttonActive: {
    borderWidth: 1,
    borderColor: APPTHEME.colors.primary,
    opacity: 1,
  },
  buttonTitle: {
    fontFamily: APPTHEME.font.label.md,
    fontSize: APPTHEME.fontsize.label.md,
    letterSpacing: APPTHEME.letterSpacing.label.md,
    lineHeight: APPTHEME.lineHeight.label.md,
    color: APPTHEME.colors.primary,
  },
  contentContainer: {
    gap: 16,
    // paddingVertical: 24,
    paddingBottom: 24,
  },
});
