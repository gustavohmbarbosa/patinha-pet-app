import { StyleSheet } from "react-native";
import { APPTHEME } from "../../styles/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
    gap: 32,
  },
  form: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    gap: 32,
  },
  input: {
    width: "100%",
    gap: 4,
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
