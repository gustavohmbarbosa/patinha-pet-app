import { FAB, FABProps } from "react-native-paper";

import NeddleImg from "../../assets/needle.svg";
import { APPTHEME } from "../../styles/theme";
import { Path, Svg } from "react-native-svg";
import { TouchableOpacity } from "react-native";
import { styles } from "./styles";

type FabIconBottomProps = FABProps & {
  icon: "pencil" | "plus";
  onPress: () => void;
};

export function FabIconBottom({ icon, onPress, ...props }: FabIconBottomProps) {
  return (
    <TouchableOpacity activeOpacity={0.7} style={styles.container}>
      <FAB
        {...props}
        mode="flat"
        icon={icon}
        size="medium"
        color={APPTHEME.colors.neutrals.white}
        style={styles.fab}
      />
    </TouchableOpacity>
  );
}
