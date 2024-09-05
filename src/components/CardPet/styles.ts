import { Dimensions, StyleSheet } from 'react-native';
import { APPTHEME } from '../../styles/theme';

const maxWidth = Dimensions.get("screen").width - 140;

export const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flexDirection: "row",
    padding: 16,
    borderRadius: 8,
    gap: 16,
  },
  content: {
    alignItems: "flex-start",
    justifyContent: "space-around",
    gap: 4,
  },
  title: {
    fontFamily: APPTHEME.font.body,
    fontSize: APPTHEME.fontsize.body.lg,
    letterSpacing: APPTHEME.letterSpacing.body.lg,
    lineHeight: APPTHEME.lineHeight.body.lg,
    fontWeight: "600",
    color: APPTHEME.colors.neutrals.black100,
    width: maxWidth,
  },
  infos: {
    flexDirection: "row",
    gap: 16
  },
  subtitle: {
    fontFamily: APPTHEME.font.body,
    fontSize: APPTHEME.fontsize.body.sm,
    letterSpacing: APPTHEME.letterSpacing.body.sm,
    lineHeight: APPTHEME.lineHeight.body.sm,
    color: APPTHEME.colors.primary,
  },
});