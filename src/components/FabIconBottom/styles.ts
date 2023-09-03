import { StyleSheet } from "react-native";
import { APPTHEME } from "../../styles/theme";

export const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 16,
    right: 16,
    zIndex: 10,
    borderRadius: 99,
  },
  fab: {
    backgroundColor: APPTHEME.colors.secondary,
    borderRadius: 99,
  },
});
