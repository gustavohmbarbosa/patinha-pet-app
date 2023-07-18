import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import { StackRouterProps } from "../../routers/stack";

import { styles } from "./styles";

export default function Home() {
  // para fazer a navegação
  const navigaton = useNavigation<StackRouterProps>();

  return (
    <View style={styles.container}>
      <Text>Página Home </Text>
      <Button
        title="ir para Login"
        onPress={() => {
          navigaton.navigate("Login");
        }}
      />
      <StatusBar style="auto" />
    </View>
  );
}
