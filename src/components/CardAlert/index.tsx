import React from "react";
import { Text } from "react-native";

import { styles } from "./styles";
import { Card } from "react-native-paper";

type CardAlertProps = {
  text: string;
  bgWhite?: boolean;
};

export function CardAlert({ text, bgWhite = false }: CardAlertProps) {
  return (
    <Card mode="elevated">
      <Card.Content
        style={[styles.content, bgWhite ? styles.bgWhite : styles.bg]}
      >
        <Text style={styles.text}>{text}</Text>
      </Card.Content>
    </Card>
  );
}
