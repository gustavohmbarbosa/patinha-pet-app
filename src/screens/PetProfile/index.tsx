import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Button, Text, View } from "react-native";
import { StackNavigationProps, StackRouterProps } from "../../routers/stack";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { PetProps } from "../../lib/props/PetProps";

import { styles } from "./styles";

type PetProfileProps = NativeStackScreenProps<
  StackNavigationProps,
  "PetProfile"
>;

function PetProfile({ route }: PetProfileProps) {
  const [pet, setPet] = useState<PetProps>(route.params.pet);

  const navigaton = useNavigation<StackRouterProps>();

  return (
    <View style={styles.container}>
      <Text>{pet.name}</Text>
      <Button
        title="ir para Home"
        onPress={() => {
          navigaton.goBack();
        }}
      />
    </View>
  );
}

export default PetProfile;
