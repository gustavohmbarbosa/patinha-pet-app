import React from "react";
import { View, FlatList, TouchableOpacity, Text } from "react-native";

import { styles } from "./styles";
import { usePet } from "../../hooks/usePet";
import { AvatarText } from "../AvatarText";
import { APPTHEME } from "../../styles/theme";
import { Loading } from "../Loading";
import { useNavigation } from "@react-navigation/native";
import { StackRouterProps } from "../../routers/stack";

export function HeaderPets() {
  const { pets, isPetLoading } = usePet();

  const navigation = useNavigation<StackRouterProps>();

  return (
    <View style={styles.container}>
      {isPetLoading ? (
        <Loading />
      ) : (
        <FlatList
          // style={styles.content}
          contentContainerStyle={styles.content}
          showsHorizontalScrollIndicator={false}
          horizontal
          data={pets}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  navigation.push("PetProfile", { pet: item });
                }}
              >
                <AvatarText
                  label={item.name[0]}
                  backgroundColor={APPTHEME.colors.primary}
                  title={item.name}
                />
              </TouchableOpacity>
            );
          }}
        />
      )}
    </View>
  );
}
