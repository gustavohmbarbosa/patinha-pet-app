import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

import { styles } from "./styles";
import { Card } from "react-native-paper";
import { FabIcon } from "../FabIcon";
import { PetProps } from "../../lib/props/PetProps";
import { AvatarText } from "../AvatarText";
import { calculateAge } from "../../utils/date";
import { APPTHEME } from "../../styles/theme";
import { StackRouterProps } from "../../routers/stack";
import { useNavigation } from "@react-navigation/native";

type CardPetProps = {
  pet: PetProps;
};

export function CardPet({ pet }: CardPetProps) {
  const navigation = useNavigation<StackRouterProps>();

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => {
        navigation.push("PetProfile", { pet });
      }}
    >
      <Card mode="elevated">
        <Card.Content style={styles.container}>
          <AvatarText
            label={pet.name[0]}
            borderWhite
            backgroundColor={APPTHEME.colors.primary}
          />
          <View style={styles.content}>
            <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
              {pet.name}
            </Text>
            <View style={styles.infos}>
              <Text style={styles.subtitle}>
                {pet.birth ? calculateAge(pet.birth) : " - "}
              </Text>
              <Text style={styles.subtitle}>
                {pet.gender === "female" ? "Fêmea" : "Macho"}
              </Text>
              <Text style={styles.subtitle}>
                {pet.specie === "cat" ? "Gato" : "Cachorro"}
              </Text>
            </View>
          </View>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
}
