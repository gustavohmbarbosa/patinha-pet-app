import { Dimensions, StyleSheet } from "react-native";
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
});
