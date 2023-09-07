import { View, Text, TouchableOpacity } from "react-native";
import { Card } from "react-native-paper";
import { FabIcon } from "../FabIcon";

import { styles } from "./styles";
import { APPTHEME } from "../../styles/theme";

type CardVaccineProps = {
  title: string;
  subtitle: string;
  onPress?: () => void;
};

export function CardVaccine({ title, subtitle, onPress }: CardVaccineProps) {
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
      <Card mode="elevated">
        <Card.Content style={styles.container}>
          <FabIcon icon="neddle" bgColor={APPTHEME.colors.other.khaki} />
          <View style={styles.content}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subtitle}>{subtitle}</Text>
          </View>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
}
