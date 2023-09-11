import React, { useEffect, useState } from "react";
import { FlatList, View } from "react-native";

import { styles } from "./styles";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackNavigationProps, StackRouterProps } from "../../routers/stack";
import { VaccineDoseProps } from "../../lib/props/VaccineDoseProps";
import { getVaccinesDoses } from "../../services/getVaccinesDoses";
import { CardAlert } from "../../components/CardAlert";
import { CardVaccine } from "../../components/CardVaccine";
import { Loading } from "../../components/Loading";
import { APPTHEME } from "../../styles/theme";
import { confirmDateVaccinated } from "../../utils/confirmDateVaccinated";
import { useNavigation } from "@react-navigation/native";

type VaccinesDosesProps = NativeStackScreenProps<
  StackNavigationProps,
  "VaccineDoses"
>;

export default function VaccineDoses({ route }: VaccinesDosesProps) {
  const navigation = useNavigation<StackRouterProps>();

  const [doses, setDoses] = useState<VaccineDoseProps[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  async function getDoses() {
    setIsLoading(true);
    const response = await getVaccinesDoses(
      route.params.petId,
      route.params.vaccineId
    );
    setDoses(response);
    setIsLoading(false);
  }

  useEffect(() => {
    getDoses();
  }, []);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {doses ? (
            <FlatList
              style={styles.cards}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.contentContainer}
              data={doses}
              keyExtractor={({ id }) => String(id)}
              renderItem={({ item }) => {
                const confirmVaccineted = confirmDateVaccinated(
                  item.scheduledDate,
                  item.vaccinatedDate
                );
                return (
                  <CardVaccine
                    onPress={() => {
                      navigation.push("VaccineDose", {
                        petId: route.params.petId,
                        vaccine: {
                          name: route.params.name,
                          id: route.params.vaccineId,
                        },
                        vaccineDose: item,
                      });
                    }}
                    title={
                      confirmVaccineted && item.vaccinatedDate
                        ? `Tomou - ${new Date(
                            item.vaccinatedDate
                          ).toLocaleDateString("pt-BR")}`
                        : "Tomar"
                    }
                    subtitle={`Marcado - ${new Date(
                      item.scheduledDate
                    ).toLocaleDateString("pt-BR")}`}
                    fabIcon={
                      confirmVaccineted ? "calendar-check" : "calendar-remove"
                    }
                    fabBgColor={
                      confirmVaccineted
                        ? APPTHEME.colors.other.celadon
                        : APPTHEME.colors.other.cherry
                    }
                    fabIconColor={
                      confirmVaccineted
                        ? APPTHEME.colors.other.seaGreen
                        : APPTHEME.colors.other.red
                    }
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
