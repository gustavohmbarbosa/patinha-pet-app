import { useEffect, useState } from "react";
import { View, FlatList } from "react-native";

import { styles } from "./styles";
import { CardVaccine } from "../../components/CardVaccine";
import { VaccinesPetProps } from "../../lib/props/VaccinesPetProps";
import { useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackNavigationProps, StackRouterProps } from "../../routers/stack";
import { getVaccinesPet } from "../../services/getVaccinesPet";
import { Loading } from "../../components/Loading";
import { CardAlert } from "../../components/CardAlert";

type PetVaccinesProps = NativeStackScreenProps<
  StackNavigationProps,
  "PetVaccines"
>;

export default function PetVaccines({ route }: PetVaccinesProps) {
  const navigation = useNavigation<StackRouterProps>();
  const [vaccines, setVaccines] = useState<VaccinesPetProps[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  async function getVaccines() {
    setIsLoading(true);
    const response = await getVaccinesPet(route.params.id);
    setVaccines(response);
    setIsLoading(false);
  }

  useEffect(() => {
    getVaccines();
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
                    onPress={() => {
                      navigation.push("VaccineDoses", {
                        name: item.name,
                        petId: route.params.id,
                        vaccineId: item.id,
                      });
                    }}
                  />
                );
              }}
              ListEmptyComponent={
                <CardAlert text="Não há vacinas registradas para o seu pet" />
              }
            />
          ) : (
            <CardAlert text="Algo de errado aconteceu ao buscar vacinas" />
          )}
        </>
      )}
    </View>
  );
}
