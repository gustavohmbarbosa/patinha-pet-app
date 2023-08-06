import React from "react";

import { styles } from "./styles";
import { FAB, Portal } from "react-native-paper";
import { APPTHEME } from "../../styles/theme";

type stateProps = {
  open: boolean;
};

export function FabGroup() {
  const [state, setState] = React.useState({ open: false });

  const onStateChange = ({ open }: stateProps) => setState({ open });

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
            onPress: () => console.log("ir vacinação"),
          },
          {
            icon: "paw",
            label: "Pet",
            labelStyle: styles.subFabLabel,
            style: styles.subFab,
            color: APPTHEME.colors.primary,
            // ir para página de cadastro de pet
            onPress: () => console.log("ir pet"),
          },
        ]}
      />
    </Portal>
  );
}
