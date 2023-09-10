import { TouchableOpacity, View, Text, FlatList } from "react-native";

import { styles } from "./styles";
import { useEffect, useState } from "react";
import { CardVaccine } from "../CardVaccine";
import { FabIconBottom } from "../FabIconBottom";
import { useNavigation } from "@react-navigation/native";
import { StackRouterProps } from "../../routers/stack";
import { PetProps } from "../../lib/props/PetProps";
import { VaccineDoseWithVaccineProps } from "../../lib/props/VaccineDoseWithVaccineProps";
import { usePet } from "../../hooks/usePet";
import { Loading } from "../Loading";
import { APPTHEME } from "../../styles/theme";

type TasksPetProps = {
  pet: PetProps;
};

type optionProps = {
  title: string;
  value: "NEXT" | "EXPIRED" | "APPLIED";
  tasks: VaccineDoseWithVaccineProps[];
};

export function TasksPet({ pet }: TasksPetProps) {
  const navigation = useNavigation<StackRouterProps>();

  const { isVaccineDosesLoading, getPetVaccinesDoses } = usePet();

  const [options, setOptions] = useState<optionProps[]>([
    {
      title: "Próximas",
      value: "NEXT",
      tasks: [],
    },
    {
      title: "Vencidas",
      value: "EXPIRED",
      tasks: [],
    },
    {
      title: "Feitas",
      value: "APPLIED",
      tasks: [],
    },
  ]);

  const [optionSelected, setOptionSelected] = useState<optionProps>();

  async function getDoses() {
    const doses = await getPetVaccinesDoses(pet.id);

    var next: VaccineDoseWithVaccineProps[] = [];
    var expired: VaccineDoseWithVaccineProps[] = [];
    var applied: VaccineDoseWithVaccineProps[] = [];

    doses.forEach((item) => {
      if (item.vaccinatedDate) {
        applied.push(item);
      } else if (new Date() > new Date(item.scheduledDate)) {
        expired.push(item);
      } else {
        next.push(item);
      }
    });

    setOptions((prevOptions) => [
      {
        ...prevOptions[0],
        tasks: next,
      },
      {
        ...prevOptions[1],
        tasks: expired,
      },
      {
        ...prevOptions[2],
        tasks: applied,
      },
    ]);
    setOptionSelected(options[0]);
  }

  useEffect(() => {
    getDoses();
  }, []);

  useEffect(() => {
    setOptionSelected(options[0]);
  }, [options]);

  return (
    <View style={styles.container}>
      {isVaccineDosesLoading ? (
        <Loading />
      ) : (
        <>
          {optionSelected && (
            <>
              <FabIconBottom
                icon="plus"
                onPress={() => {
                  navigation.navigate("NewVaccineDose", { pet: pet });
                }}
              />
              <View style={styles.buttons}>
                {options.map((item, index) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      style={[
                        styles.button,
                        optionSelected.value === item.value
                          ? styles.buttonActive
                          : {},
                      ]}
                      activeOpacity={0.7}
                      onPress={() => {
                        setOptionSelected(item);
                      }}
                    >
                      <Text style={styles.buttonTitle}>{item.title}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>

              <FlatList
                style={styles.cards}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.contentContainer}
                data={optionSelected.tasks}
                keyExtractor={(item) => String(item.id)}
                renderItem={({ item }) => {
                  const icon =
                    optionSelected.value === "APPLIED"
                      ? "calendar-check"
                      : optionSelected.value === "EXPIRED"
                      ? "calendar-remove"
                      : undefined;
                  const bgIcon =
                    optionSelected.value === "APPLIED"
                      ? APPTHEME.colors.other.celadon
                      : optionSelected.value === "EXPIRED"
                      ? APPTHEME.colors.other.cherry
                      : undefined;
                  const iconColor =
                    optionSelected.value === "APPLIED"
                      ? APPTHEME.colors.other.seaGreen
                      : optionSelected.value === "EXPIRED"
                      ? APPTHEME.colors.other.red
                      : undefined;

                  return (
                    <CardVaccine
                      title={item.vaccine.name}
                      subtitle={new Date(item.scheduledDate).toLocaleDateString(
                        "pt-BR"
                      )}
                      fabIcon={icon}
                      fabBgColor={bgIcon}
                      fabIconColor={iconColor}
                    />
                  );
                }}
              />
            </>
          )}
        </>
      )}
    </View>
  );
}
