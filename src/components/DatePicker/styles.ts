import { StyleSheet } from "react-native";
import { APPTHEME } from "../../styles/theme";

export const styles = StyleSheet.create({
  container: { display: "flex", width: "100%" },
  content: {
    flexDirection: "row-reverse",
    width: "100%",
    height: 48,
    justifyContent: "space-between",
  },
  label: {
    fontFamily: APPTHEME.font.body,
    fontSize: APPTHEME.fontsize.body.lg,
    lineHeight: APPTHEME.lineHeight.body.lg,
    letterSpacing: APPTHEME.letterSpacing.body.lg,
    color: APPTHEME.colors.text.dark,
  },
  placeholder: {
    fontFamily: APPTHEME.font.body,
    fontSize: APPTHEME.fontsize.body.lg,
    lineHeight: APPTHEME.lineHeight.body.lg,
    letterSpacing: APPTHEME.letterSpacing.body.lg,
    color: APPTHEME.colors.text.black50,
  },
});
