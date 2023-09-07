import { useEffect, useState } from "react";
import { View, FlatList } from "react-native";

import { styles } from "./styles";
import { CardVaccine } from "../../components/CardVaccine";
import { VaccinesPetProps } from "../../lib/props/VaccinesPet";
import { useRoute } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackNavigationProps } from "../../routers/stack";
import { getVaccinesPet } from "../../services/getVaccinesPet";
import { Loading } from "../../components/Loading";
import { CardEmptyList } from "../../components/CardEmptyList";

type PetVaccinesProps = NativeStackScreenProps<
  StackNavigationProps,
  "PetVaccines"
>;

export default function PetVaccines({ route }: PetVaccinesProps) {
  const [vaccines, setVaccines] = useState<VaccinesPetProps[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  async function getVaccines() {
    const response = await getVaccinesPet(route.params.id);
    setVaccines(response);
  }

  useEffect(() => {
    setIsLoading(true);
    getVaccines();
    setIsLoading(false);
  }, []);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {vaccines ? (
            <FlatList
              style={styles.cards}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.contentContainer}
              data={vaccines}
              keyExtractor={({ name }) => name}
              renderItem={({ item }) => {
                return (
                  <CardVaccine
                    title={item.name}
                    subtitle={`Doses: ${item.amount}`}
                  />
                );
              }}
              ListEmptyComponent={
                <CardEmptyList text="Não há vacinas registradas para o seu pet" />
              }
            />
          ) : (
            <CardEmptyList text="Algo de errado aconteceu ao buscar vacinas" />
          )}
        </>
      )}
    </View>
  );
}
