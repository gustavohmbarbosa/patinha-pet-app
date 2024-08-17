import { Dimensions, StyleSheet } from "react-native";
import { APPTHEME } from "../../styles/theme";

const inputRowWidth = Dimensions.get("screen").width - 24;
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: APPTHEME.colors.background,
    overflow: "scroll"
  },
  header: {
    backgroundColor: APPTHEME.colors.primary,
    flexDirection: "row",
    gap: 24,
    paddingHorizontal: 16,
    alignItems: "center",
  },
  headerContent: { flex: 1, gap: 24 },
  headerTitle: {
    fontFamily: APPTHEME.font.headline,
    fontSize: APPTHEME.fontsize.headline,
    lineHeight: APPTHEME.lineHeight.headline,
    color: APPTHEME.colors.background,
  },
  headerSubtitle: {
    fontFamily: APPTHEME.font.label.lg,
    fontSize: APPTHEME.fontsize.label.lg,
    lineHeight: APPTHEME.lineHeight.label.lg,
    letterSpacing: APPTHEME.letterSpacing.label.lg,
    color: APPTHEME.colors.background,
  },
  headerButtons: { flexDirection: "row", justifyContent: "space-between" },
  content: {
    flex: 1,
    paddingTop: 24,
    backgroundColor: APPTHEME.colors.primary,
  },
  cardAlert: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: APPTHEME.colors.background,
  },
  cardInfo: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: APPTHEME.colors.background,
    gap: 8
  },
  info: {
    gap: 4,
  },
  row: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  rowItem: {
    width: inputRowWidth / 2
  },
  label: {
    fontFamily: APPTHEME.font.label.lg,
    fontSize: APPTHEME.fontsize.label.lg,
    lineHeight: APPTHEME.lineHeight.label.lg,
    color: APPTHEME.colors.primary
  },
  text: {
    fontFamily: APPTHEME.font.body,
    fontSize: APPTHEME.fontsize.body.md,
    lineHeight: APPTHEME.lineHeight.body.lg,
    fontWeight: "semibold",
    color: APPTHEME.colors.text.dark,
    
  }
});
