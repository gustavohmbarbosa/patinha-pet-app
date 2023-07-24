import React from "react";
import { View } from "react-native";

import { FAB, FABProps } from "react-native-paper";
import { APPTHEME } from "../../styles/theme";

type FabIconProps = FABProps & {
  bgColor?: string;
  icon: "neddle" | "hospital-box-outline";
};

export function FabIcon({
  icon,
  label = "",
  bgColor = APPTHEME.colors.other.cyan,
  ...props
}: FabIconProps) {
  return (
    <FAB
      {...props}
      mode="flat"
      icon={icon}
      label={label}
      color={APPTHEME.colors.neutrals.white}
      style={{ borderRadius: 8, backgroundColor: bgColor }}
    />
  );
}
