import { StyleSheet } from "react-native";
import { APPTHEME } from "../../styles/theme";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  itemSelected: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    padding: 8,
    backgroundColor: APPTHEME.colors.primary,
    borderRadius: 8,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    padding: 8,
    // backgroundColor: "transparent",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: APPTHEME.colors.primary,
  },
  labelSelected: {
    color: APPTHEME.colors.text.white,
    fontFamily: APPTHEME.font.body,
    fontSize: APPTHEME.fontsize.body.lg,
    lineHeight: APPTHEME.lineHeight.body.lg,
    letterSpacing: APPTHEME.letterSpacing.body.lg,
  },
  label: {
    color: APPTHEME.colors.primary,
    fontFamily: APPTHEME.font.body,
    fontSize: APPTHEME.fontsize.body.lg,
    lineHeight: APPTHEME.lineHeight.body.lg,
    letterSpacing: APPTHEME.letterSpacing.body.lg,
  },
});
