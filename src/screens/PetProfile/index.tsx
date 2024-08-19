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

import { calculateAge } from "../../utils/ageByBirth";
import NeddleImg from "../../assets/needle.svg";
import { APPTHEME } from "../../styles/theme";
import { styles } from "./styles";
import { CardAlert } from "../../components/CardAlert";
import { Button } from "../../components/Button";

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
              Idade: {pet.birth ? calculateAge(pet.birth) : "Não informado"}
            </Text>
          </View>
          {/* <View style={styles.headerButtons}>
            <ButtonTextIcon
              disabled
              label="Vacinas"
              icon={
                <NeddleImg
                  width={16}
                  height={16}
                  color={APPTHEME.colors.secondary}
                />
              }
              onPress={() => {
                navigation.push("PetVaccines", { name: pet.name, id: pet.id });
              }}
            />
          </View> */}
        </View>
      </View>
      <View style={styles.content}>
        <Tabs.root backgroundColor={APPTHEME.colors.primary}>
          <Tabs.screen label="Informações">
            <View style={styles.cardInfo}>
              <View style={styles.info}>
                <Text style={styles.label}>Espécie</Text>
                <Text style={styles.text}>{pet.specie === 'cat' ? "Gato" : "Cachorro"}</Text>
              </View>
              <View style={styles.info}>
                <Text style={styles.label}>Raça</Text>
                <Text style={styles.text}>{pet.race}</Text>
              </View>
              <View style={styles.row}>
                <View style={styles.rowItem}>
                  <Text style={styles.label}>Altura</Text>
                  <Text style={styles.text}>{pet.height ? `${Number(pet.height).toFixed(2).replace(".", ",")} cm`: "Não informado"}</Text>
                </View>
                <View style={styles.rowItem}>
                  <Text style={styles.label}>Peso</Text>
                  <Text style={styles.text}>{pet.weight ? `${Number(pet.weight).toFixed(2).replace(".", ",")} kg` : "Não informado"}</Text>
                </View>
              </View>
              <View style={styles.row}>
                <View style={styles.rowItem}>
                  <Text style={styles.label}>Gênero</Text>
                  <Text style={styles.text}>{pet.gender === "female" ? "Femea" : "Macho"}</Text>
                </View>
                <View style={styles.rowItem}>
                  <Text style={styles.label}>Castrado</Text>
                  <Text style={styles.text}>{pet.castrated ? "Sim" : "Não"}</Text>
                </View>
              </View>
              <View style={styles.info}>
                <Text style={styles.label}>Data de nascimento</Text>
                <Text style={styles.text}>{pet.birth ? new Date(pet.birth).toLocaleDateString("pt-br") : "Não informado"}</Text>
              </View>              
            </View>
          </Tabs.screen>
          <Tabs.screen label="Tarefas">
            {/* <TasksPet pet={pet} /> */}
            <View style={styles.cardAlert}>
              <CardAlert text="Em desenvolvimento" />
            </View>
          </Tabs.screen>
        </Tabs.root>
      </View>
    </View>
  );
}

export default PetProfile;
