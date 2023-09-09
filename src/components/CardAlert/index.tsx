import React from "react";
import { Text } from "react-native";

import { styles } from "./styles";
import { Card } from "react-native-paper";

type CardAlertProps = {
  text: string;
};

export function CardAlert({ text }: CardAlertProps) {
  return (
    <Card mode="elevated">
      <Card.Content style={styles.content}>
        <Text style={styles.text}>{text}</Text>
      </Card.Content>
    </Card>
  );
}
