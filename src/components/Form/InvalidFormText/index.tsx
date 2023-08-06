import React from "react";
import { View, Text } from "react-native";

import { styles } from "./styles";
import AletImg from "../../../assets/alert.svg";

type InvalidFormTextProps = {
  title: string;
};

export function InvalidFormText({ title }: InvalidFormTextProps) {
  return (
    <View style={styles.container}>
      <AletImg width={16} height={16} />
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}
