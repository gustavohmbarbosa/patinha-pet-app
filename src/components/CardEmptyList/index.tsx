import React from "react";
import { Text } from "react-native";

import { styles } from "./styles";
import { Card } from "react-native-paper";

type CardEmptyListProps = {
  text: string;
};

export function CardEmptyList({ text }: CardEmptyListProps) {
  return (
    <Card mode="elevated" style={styles.container}>
      <Card.Content style={styles.content}>
        <Text style={styles.text}>{text}</Text>
      </Card.Content>
    </Card>
  );
}
