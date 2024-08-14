import { Dimensions, StyleSheet } from "react-native";
import { APPTHEME } from "../../styles/theme";

const inputRowWidth = Dimensions.get("screen").width - 56;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 24,
    paddingHorizontal: 16,
    justifyContent: "space-between",
    gap: 24,
  },
  contentInputs: {
    gap: 20,
  },
  contentRow: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 24,
  },
  inputRow: {
    width: inputRowWidth / 2,
  },
  input: {
    gap: 4,
  },
  inputRadio: {
    gap: 4,
    alignItems: "flex-start",
  },
  inputSwitch: {
    alignItems: "flex-start",
  },
  title: {
    fontFamily: APPTHEME.font.label.md,
    fontSize: APPTHEME.fontsize.label.md,
    lineHeight: APPTHEME.lineHeight.label.md,
    letterSpacing: APPTHEME.letterSpacing.label.md,
    color: APPTHEME.colors.text.black25,
  },
});
