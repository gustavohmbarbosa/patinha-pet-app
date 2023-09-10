import { TouchableOpacity, View, Text, FlatList } from "react-native";

import { styles } from "./styles";
import { useState } from "react";
import { CardVaccine } from "../CardVaccine";
import { FabIconBottom } from "../FabIconBottom";
import { useNavigation } from "@react-navigation/native";
import { StackRouterProps } from "../../routers/stack";
import { PetProps } from "../../lib/props/PetProps";
import { VaccinesDosesPetProps } from "../../lib/props/VaccinesDosesProps";
import { usePet } from "../../hooks/usePet";
import { Loading } from "../Loading";

type TasksPetProps = {
  pet: PetProps;
};

export function TasksPet({ pet }: TasksPetProps) {
  const navigation = useNavigation<StackRouterProps>();

  const { isVaccineDosesLoading, getVaccinesDoses } = usePet();

  const [next, setNext] = useState<VaccinesDosesPetProps[]>([]);
  const [expired, setExpired] = useState<VaccinesDosesPetProps[]>([]);
  const [applied, setApplied] = useState<VaccinesDosesPetProps[]>([]);

  const options = [
    {
      title: "Próximas",
      value: "NEXT",
      tasks: ["1", "@", "2", "3", "4"],
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
  ];

  const [option, setOption] = useState(options[0]);

  async function getDoses() {
    const doses = await getVaccinesDoses(pet.id);

    doses.forEach((item) => {
      if (item.vaccinatedDate) {
        setApplied([...applied, item]);
      } else if (new Date() > new Date(item.scheduledDate)) {
        setExpired([...expired, item]);
      } else {
        setNext([...next, item]);
      }
    });
  }

  return (
    <View style={styles.container}>
      {isVaccineDosesLoading ? (
        <Loading />
      ) : (
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
                    option.value === item.value ? styles.buttonActive : {},
                  ]}
                  activeOpacity={0.7}
                  onPress={() => {
                    setOption(item);
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
            data={option.tasks}
            // keyExtractor={({item})=> item}
            renderItem={({ item }) => {
              return <CardVaccine title="sef" subtitle="sd" />;
            }}
          />
        </>
      )}
    </View>
  );
}
