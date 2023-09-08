import { View, Text, TouchableOpacity } from "react-native";
import { Card } from "react-native-paper";
import { FabIcon } from "../FabIcon";

import { styles } from "./styles";
import { APPTHEME } from "../../styles/theme";

type CardVaccineProps = {
  title: string;
  subtitle: string;
  onPress?: () => void;
  fabIcon?:
    | "neddle"
    | "hospital-box-outline"
    | "calendar-check"
    | "calendar-remove";
  fabIconColor?: string;
  fabBgColor?: string;
};

export function CardVaccine({
  title,
  subtitle,
  fabIcon = "neddle",
  fabBgColor = APPTHEME.colors.other.khaki,
  fabIconColor,
  onPress,
}: CardVaccineProps) {
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
      <Card mode="elevated">
        <Card.Content style={styles.container}>
          <FabIcon
            icon={fabIcon}
            bgColor={fabBgColor}
            iconColor={fabIconColor}
          />
          <View style={styles.content}>
            <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
              {title}
            </Text>
            <Text style={styles.subtitle}>{subtitle}</Text>
          </View>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
}
