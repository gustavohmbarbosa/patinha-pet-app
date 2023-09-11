import { StyleSheet } from "react-native";
import { APPTHEME } from "../../styles/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: APPTHEME.colors.background,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  content: {
    paddingBottom: 24,
  },
});
