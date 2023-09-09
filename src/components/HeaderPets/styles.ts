import { StyleSheet } from "react-native";
import { APPTHEME } from "../../styles/theme";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: APPTHEME.colors.neutrals.white,
    paddingBottom: 16,
    paddingTop: 8,
  },
  content: {
    gap: 16,
    paddingHorizontal: 16,
  },
});
