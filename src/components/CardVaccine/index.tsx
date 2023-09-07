import { View, Text } from "react-native";
import { Card } from "react-native-paper";
import { FabIcon } from "../FabIcon";

import { styles } from "./styles";
import { APPTHEME } from "../../styles/theme";

export function CardVaccine() {
  return (
    <Card mode="elevated">
      <Card.Content style={styles.container}>
        <FabIcon icon="neddle" bgColor={APPTHEME.colors.other.khaki} />
        <View style={styles.content}>
          <Text style={styles.title}>Visita Vet</Text>
          <Text style={styles.subtitle}>Bobby</Text>
        </View>
      </Card.Content>
    </Card>
  );
}
