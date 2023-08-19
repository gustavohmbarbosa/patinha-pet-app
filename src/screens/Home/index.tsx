import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import { StackRouterProps } from "../../routers/stack";

import { styles } from "./styles";
import { TextInput } from "../../components/TextInput";
import { Button } from "../../components/Button";
import { Loading } from "../../components/Loading";
import { AvatarText } from "../../components/AvatarText";
import { FabIcon } from "../../components/FabIcon";
import GoogleImg from "../../assets/google.svg";
import { APPTHEME } from "../../styles/theme";
import { ButtonOutline } from "../../components/ButtonOutline";
import { FabGroup } from "../../components/FabGroup";
import { Portal } from "react-native-paper";
import { Switch } from "../../components/Switch";
import { RadioPet, RadioTypePetProps } from "../../components/RadioPet";
import { useState } from "react";
import { DatePicker } from "../../components/DatePicker";

export default function Home() {
  // para fazer a navegação
  const navigaton = useNavigation<StackRouterProps>();
  const [switchOn, setSwitchOn] = useState(false);
  const [pet, setPet] = useState<RadioTypePetProps>("DOG");

  return (
    <Portal.Host>
      <View style={styles.container}>
        <FabGroup />
        <Text>Página Home </Text>

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
        <Switch value={switchOn} onValueChange={() => setSwitchOn(!switchOn)} />
        <RadioPet pet={pet} setPet={setPet} />
      </View>
    </Portal.Host>
  );
}
