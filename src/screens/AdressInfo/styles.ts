import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 24,
    paddingHorizontal: 16,
    justifyContent: "space-between",
  },
  contentInputs: {
    gap: 16,
  },
  input: {
    gap: 4,
  },
  box: {
    height: 16,
  },
  ContentRow: {
    flexDirection: "row",
    gap: 8,
    alignItems: "flex-end",
  },
  large: {
    flexGrow: 1,
  },
  small: {
    width: 128,
  },
});
