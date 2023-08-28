import { useNavigation } from "@react-navigation/native";
import { FAB, Portal } from "react-native-paper";
import { styles } from "./styles";
import { APPTHEME } from "../../styles/theme";
import { useState } from "react";
import { StackRouterProps } from "../../routers/stack";

type stateProps = {
  open: boolean;
};

export function FabGroup() {
  const [state, setState] = useState({ open: false });

  const onStateChange = ({ open }: stateProps) => setState({ open });

  const navigation = useNavigation<StackRouterProps>();

  const { open } = state;
  return (
    <Portal>
      <FAB.Group
        open={open}
        visible
        style={styles.content}
        fabStyle={styles.fab}
        backdropColor={APPTHEME.colors.neutrals.black50}
        color={APPTHEME.colors.neutrals.white}
        icon={open ? "close" : "plus"}
        onStateChange={onStateChange}
        actions={[
          {
            icon: "needle",
            label: "Vacina",
            labelStyle: styles.subFabLabel,
            style: styles.subFab,
            color: APPTHEME.colors.primary,
            // ir para página de adicionar vacinação
            onPress: () => navigation.push("NewVaccineDose"),
          },
          {
            icon: "paw",
            label: "Pet",
            labelStyle: styles.subFabLabel,
            style: styles.subFab,
            color: APPTHEME.colors.primary,
            // ir para página de cadastro de pet
            onPress: () => navigation.push("NewPet"),
          },
        ]}
      />
    </Portal>
  );
}
