import React, { useEffect, useState } from "react";
import { FlatList, View } from "react-native";

import { styles } from "./styles";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackNavigationProps } from "../../routers/stack";
import { VaccineDoseProps } from "../../lib/props/VaccineDoseProps";
import { getVaccinesDoses } from "../../services/getVaccinesDoses";
import { CardEmptyList } from "../../components/CardEmptyList";
import { CardVaccine } from "../../components/CardVaccine";
import { Loading } from "../../components/Loading";
import { APPTHEME } from "../../styles/theme";
import { confirmDateVaccineted } from "../../utils/confirmDateVaccineted";

type VaccinesDosesProps = NativeStackScreenProps<
  StackNavigationProps,
  "VaccineDoses"
>;

export default function VaccineDoses({ route }: VaccinesDosesProps) {
  const [doses, setDoses] = useState<VaccineDoseProps[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  async function getDoses() {
    const response = await getVaccinesDoses(
      route.params.petId,
      route.params.vaccineId
    );
    setDoses(response);
  }

  useEffect(() => {
    setIsLoading(true);
    getDoses();
    setIsLoading(false);
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
                const confirmVaccineted = confirmDateVaccineted(
                  item.scheduledDate,
                  item.vaccinetedDate
                );
                return (
                  <CardVaccine
                    title={
                      confirmVaccineted && item.vaccinetedDate
                        ? `Tomou - ${new Date(
                            item.vaccinetedDate
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
