import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Text, View } from "react-native";
import { StackNavigationProps, StackRouterProps } from "../../routers/stack";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { PetProps } from "../../lib/props/PetProps";
import { ButtonTextIcon } from "../../components/ButtonTextIcon";
import { AvatarText } from "../../components/AvatarText";
import { Tabs } from "../../components/Tabs";
import { TasksPet } from "../../components/TasksPet";
import { TrackersPet } from "../../components/TrackersPet";

import { calculateAge } from "../../utils/ageByBirth";
import NeddleImg from "../../assets/needle.svg";
import MapImg from "../../assets/map-marker-path.svg";
import { APPTHEME } from "../../styles/theme";
import { styles } from "./styles";

type PetProfileProps = NativeStackScreenProps<
  StackNavigationProps,
  "PetProfile"
>;

function PetProfile({ route }: PetProfileProps) {
  const [pet, setPet] = useState<PetProps>(route.params.pet);
  const navigation = useNavigation<StackRouterProps>();

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setPet(route.params.pet);
    });

    return unsubscribe;
  }, [navigation, route]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <AvatarText
          label={pet.name[0]}
          size={120}
          borderWhite
          backgroundColor={APPTHEME.colors.background}
          color={APPTHEME.colors.primary}
        />
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.headerTitle}>{pet.name}</Text>
            <Text style={styles.headerSubtitle}>
              {pet.birth ? calculateAge(pet.birth) : "Não informado"}
            </Text>
          </View>
          <View style={styles.headerButtons}>
            <ButtonTextIcon
              label="Vacinas"
              icon={
                <NeddleImg
                  width={16}
                  height={16}
                  color={APPTHEME.colors.secondary}
                />
              }
              // onPress={() => {
              //   navigation.push("PetVaccines", { name: pet.name, id: pet.id });
              // }}
            />
            <ButtonTextIcon
              label="Histórico"
              icon={<MapImg width={16} height={16} />}
            />
          </View>
        </View>
      </View>
      <View style={styles.content}>
        <Tabs.root backgroundColor={APPTHEME.colors.primary}>
          <Tabs.screen label="Tarefas">
            <TasksPet pet={pet} />
          </Tabs.screen>
          <Tabs.screen label="Rastreador">
            <TrackersPet pet={pet} />
          </Tabs.screen>
        </Tabs.root>
      </View>
    </View>
  );
}

export default PetProfile;
