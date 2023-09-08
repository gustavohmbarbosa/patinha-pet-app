import { TouchableOpacity, View, Text, FlatList } from "react-native";

import { styles } from "./styles";
import { useState } from "react";
import { CardVaccine } from "../CardVaccine";
import { FabIconBottom } from "../FabIconBottom";
import { useNavigation } from "@react-navigation/native";
import { StackRouterProps } from "../../routers/stack";

type TasksPetProps = {
  next: any[];
  expired: any[];
  applied: any[];
};

export function TasksPet({ next, expired, applied }: TasksPetProps) {
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

  const navigation = useNavigation<StackRouterProps>();
  return (
    <View style={styles.container}>
      <FabIconBottom
        icon="pencil"
        onPress={() => {
          navigation.navigate("NewVaccineDose");
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
    </View>
  );
}
