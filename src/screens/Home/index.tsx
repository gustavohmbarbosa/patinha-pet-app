import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { ScrollView, Text, View } from "react-native";
import { StackRouterProps } from "../../routers/stack";

import { styles } from "./styles";
import { TextInput } from "../../components/TextInput";
import { Button } from "../../components/Button";
import { AvatarText } from "../../components/AvatarText";
import { FabIcon } from "../../components/FabIcon";
import GoogleImg from "../../assets/google.svg";
import { ButtonOutline } from "../../components/ButtonOutline";
import { FabGroup } from "../../components/FabGroup";
import { Portal } from "react-native-paper";
import { Switch } from "../../components/Switch";
import { RadioPet, RadioTypePetProps } from "../../components/RadioPet";
import { useState } from "react";
import { usePet } from "../../hooks/usePet";
import { HeaderPets } from "../../components/HeaderPets";

export default function Home() {
  // para fazer a navegação
  const navigaton = useNavigation<StackRouterProps>();
  const [switchOn, setSwitchOn] = useState(false);
  const [pet, setPet] = useState<RadioTypePetProps>("DOG");

  const { pets } = usePet();

  return (
    <Portal.Host>
      <ScrollView>
        <View style={styles.container}>
          <FabGroup />
          <HeaderPets />

          <View style={styles.content}>
            <Text>Página Home </Text>

            <Text>Pets do usuário: (só para confirmação)</Text>
            {pets.map((data, index) => {
              return (
                <View key={index}>
                  <Text>{data.name}</Text>
                </View>
              );
            })}

            <TextInput label={"Nome"} />

            <Button
              onPress={() => {
                navigaton.push("ExempleTabs");
              }}
            >
              ir para ExempleTabs
            </Button>
            {/* <Loading /> */}

            <AvatarText label="LN" title="Luan" />
            <FabIcon icon="hospital-box-outline" />
            <StatusBar style="auto" />
            <ButtonOutline icon={() => <GoogleImg />} onPress={() => {}}>
              Google
            </ButtonOutline>
            <Switch
              value={switchOn}
              onValueChange={() => setSwitchOn(!switchOn)}
            />
            <RadioPet pet={pet} setPet={setPet} />
          </View>
        </View>
      </ScrollView>
    </Portal.Host>
  );
}
