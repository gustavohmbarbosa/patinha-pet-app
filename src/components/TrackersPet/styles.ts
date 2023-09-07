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
    paddingBottom: 24,
  },
});
