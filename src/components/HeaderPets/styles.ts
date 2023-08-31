import { StyleSheet } from "react-native";
import { APPTHEME } from "../../styles/theme";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: APPTHEME.colors.neutrals.white,
    paddingVertical: 16,
  },
  content: {
    gap: 16,
    paddingHorizontal: 16,
  },
});
