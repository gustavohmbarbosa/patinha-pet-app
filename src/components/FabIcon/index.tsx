import { FAB, FABProps } from "react-native-paper";

import NeddleImg from "../../assets/needle.svg";
import { APPTHEME } from "../../styles/theme";
import { Path, Svg } from "react-native-svg";

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
      icon={
        icon === "neddle"
          ? () => (
              <Svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <Path
                  d="M11.15 15.18L9.72996 13.77L11.15 12.35L12.56 13.77L13.97 12.35L12.56 10.94L13.97 9.53L15.39 10.94L16.8 9.53L13.97 6.7L6.89996 13.77L9.72996 16.6L11.15 15.18ZM3.07996 19L6.19996 15.89L4.07996 13.77L13.97 3.87L16.1 6L17.5 4.58L16.1 3.16L17.5 1.75L21.75 6L20.34 7.4L18.92 6L17.5 7.4L19.63 9.53L9.72996 19.42L7.60996 17.3L3.07996 21.84V19Z"
                  fill={APPTHEME.colors.background}
                />
              </Svg>
            )
          : icon
      }
      label={label}
      size="medium"
      color={APPTHEME.colors.neutrals.white}
      style={{
        borderRadius: 8,
        backgroundColor: bgColor,
        width: 58,
      }}
    />
  );
}
