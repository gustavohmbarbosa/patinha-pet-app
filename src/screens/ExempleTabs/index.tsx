import React from "react";
import { View } from "react-native";

import { styles } from "./styles";
import { Tabs } from "../../components/Tabs";
import { Select } from "../../components/Select";

export function ExempleTabs() {
  // apenas para teste do select
  const raca = [
    "Poodle",
    "Pug",
    "ShihTzu",
    "Pinscher Miniatura",
    "Lulu da Pomerânia",
    "Mastife",
    "Maltês",
    "Golden Retriever",
    "Husky Siberiano",
    "Dogue Alemão",
    "Chihuahua",
    "Chow Chow",
    "Collie",
  ];

  return (
    <View style={styles.container}>
      {/* necessário usar no minimo 2 Tabs.screen, se não dará erro e tbm não é necessário. */}
      <Tabs.root>
        <Tabs.screen label="Mapa">
          <View style={{ flex: 1, paddingVertical: 16 }}>
            <Select opcoes={raca} placeholder="Qual a raça?" />
          </View>
        </Tabs.screen>
        <Tabs.screen label="Tarefas">
          <View style={{ backgroundColor: "#ccc", flex: 1 }}></View>
        </Tabs.screen>
      </Tabs.root>
    </View>
  );
}
