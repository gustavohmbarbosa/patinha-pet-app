import React, { useEffect, useState } from "react";
import { FlatList, View } from "react-native";

import { styles } from "./styles";
import { CardVaccine } from "../CardVaccine";
import { APPTHEME } from "../../styles/theme";
import { VaccineDoseWithPetAndVaccineProps } from "../../lib/props/VaccineDoseWithPetAndVaccineProps";
import { usePet } from "../../hooks/usePet";
import { CardAlert } from "../CardAlert";
import { Loading } from "../Loading";

export function TaskOnTime() {
  const { isVaccineDosesLoading, getAllVaccinesDosesOnTime } = usePet();

  const [doses, setDoses] = useState<VaccineDoseWithPetAndVaccineProps[]>([]);

  async function getAllDoses() {
    const response = await getAllVaccinesDosesOnTime();
    response.sort(
      (a, b) =>
        new Date(a.scheduledDate).getTime() -
        new Date(b.scheduledDate).getTime()
    );
    setDoses(response);
  }

  useEffect(() => {
    getAllDoses();
  }, []);

  return (
    <View style={styles.container}>
      {isVaccineDosesLoading ? (
        <Loading />
      ) : (
        <FlatList
          style={styles.list}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainer}
          data={doses}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => {
            const today = new Date();
            const scheduledDate = new Date(item.scheduledDate);

            const icon =
              scheduledDate >= today ? "calendar-check" : "calendar-remove";
            const bgIcon =
              scheduledDate >= today
                ? APPTHEME.colors.other.celadon
                : APPTHEME.colors.other.cherry;
            const iconColor =
              scheduledDate >= today
                ? APPTHEME.colors.other.seaGreen
                : APPTHEME.colors.other.red;

            return (
              <CardVaccine
                title={item.vaccine.name}
                subtitle={scheduledDate.toLocaleDateString("pt-BR")}
                fabIcon={icon}
                fabBgColor={bgIcon}
                fabIconColor={iconColor}
              />
            );
          }}
          ListEmptyComponent={<CardAlert text="Nenhuma tarefa pendente" />}
        />
      )}
    </View>
  );
}
