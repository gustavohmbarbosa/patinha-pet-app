import React, { useEffect, useState } from "react";
import { View, FlatList, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { CardAlert } from "../CardAlert";
import { FabIconBottom } from "../FabIconBottom";

import { styles } from "./styles";
import { StackRouterProps } from "../../routers/stack";
import { PetProps } from "../../lib/props/PetProps";
import { useAuth } from "../../hooks/useAuth";
import { CardTracker } from "../CardTracker";
import { usePet } from "../../hooks/usePet";
import { TrackerPetBondProps } from "../../lib/props/TrackerPetBondProps";
import { Loading } from "../Loading";

type TrackersPetProps = {
  pet: PetProps;
};

export function TrackersPet({ pet }: TrackersPetProps) {
  const { user } = useAuth();
  const { getPetTracker, isTrackerPetLoading } = usePet();
  const navigation = useNavigation<StackRouterProps>();

  const [tracker, setTracker] = useState<TrackerPetBondProps | null>(null);

  const decideRoute = () => {
    if (user.user.address.zipCode) {
      navigation.push("AddTrackerToPet", { pet });
    } else {
      Alert.alert(
        "Dados necessários",
        "Para cadastrar um rastreador, primeiro adicione seu endereço."
      );
      navigation.push("AdressInfo");
    }
  };

  async function getTracker() {
    const tracker = await getPetTracker(pet.id);
    setTracker(tracker);
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      await getTracker();
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <FabIconBottom icon={"plus"} onPress={decideRoute} />
      {isTrackerPetLoading ? (
        <Loading />
      ) : (
        <>
          {tracker ? (
            <CardTracker model="Teste" code="2386DS" />
          ) : (
            <CardAlert text="Você ainda não cadastrou nenhum rastreador para esse pet" />
          )}
        </>
      )}
    </View>
  );
}
