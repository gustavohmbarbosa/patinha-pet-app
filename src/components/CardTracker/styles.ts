import { Dimensions, StyleSheet } from "react-native";
import { APPTHEME } from "../../styles/theme";

const maxWidth = Dimensions.get("screen").width - 140;

export const styles = StyleSheet.create({
  container: {
    backgroundColor: APPTHEME.colors.background,
    flexDirection: "row",
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#00618440",
    gap: 16,
  },
  content: {
    alignItems: "flex-start",
    justifyContent: "center",
    gap: 4,
  },
  title: {
    fontFamily: APPTHEME.font.label.lg,
    fontSize: APPTHEME.fontsize.label.lg,
    letterSpacing: APPTHEME.letterSpacing.label.lg,
    lineHeight: APPTHEME.lineHeight.label.lg,
    color: APPTHEME.colors.text.dark,
    width: maxWidth,
  },
});
