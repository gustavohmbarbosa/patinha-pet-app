import { StyleSheet } from "react-native";
import { APPTHEME } from "../../../styles/theme";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 8,
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  title: {
    color: APPTHEME.colors.alert,
    fontFamily: APPTHEME.font.body,
    fontSize: APPTHEME.fontsize.body.sm,
    lineHeight: APPTHEME.lineHeight.body.sm,
    letterSpacing: APPTHEME.letterSpacing.body.sm,
  },
});
