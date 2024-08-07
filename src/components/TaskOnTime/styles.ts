import { StyleSheet } from "react-native";
import { APPTHEME } from "../../styles/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: APPTHEME.colors.background,
    paddingHorizontal: 16,
  },
  list: {
    marginTop: 24,
  },
  contentContainer: {
    gap: 16,
    paddingBottom: 24,
  },
});
