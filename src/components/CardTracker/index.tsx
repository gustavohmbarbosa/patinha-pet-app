import { View, Text, TouchableOpacity } from "react-native";
import { Card } from "react-native-paper";
import { FabIcon } from "../FabIcon";

import { styles } from "./styles";
import { APPTHEME } from "../../styles/theme";

type CardTrackerProps = {
  model: string;
  code: string;
  onPress?: () => void;
};

export function CardTracker({ model, code, onPress }: CardTrackerProps) {
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
      <Card mode="elevated">
        <Card.Content style={styles.container}>
          {/* <FabIcon
            icon={fabIcon}
            bgColor={fabBgColor}
            iconColor={fabIconColor}
          /> */}
          <View style={styles.content}>
            <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
              {model} - {code}
            </Text>
            {/* <Text style={styles.subtitle}>{subtitle}</Text> */}
          </View>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
}
