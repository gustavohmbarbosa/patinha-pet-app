import React from "react";
import { View } from "react-native";
import { Portal } from "react-native-paper";
import { MapContextProvider } from "../../context/MapContext";
import { FabGroup } from "../../components/FabGroup";
import { HeaderPets } from "../../components/HeaderPets";
import { Tabs } from "../../components/Tabs";
import { TaskOnTime } from "../../components/TaskOnTime";

import { styles } from "./styles";
import { CardAlert } from "../../components/CardAlert";

export default function Home() {
  return (
    <MapContextProvider>
      <Portal.Host>
        <View style={styles.container}>
          <HeaderPets />
          <FabGroup />
          <Tabs.root>
            <Tabs.screen label="Mapa">
              <View style={styles.cardAlert}>
                  <CardAlert text="Em desenvolvimento" />
              </View>
            </Tabs.screen>
            <Tabs.screen label="Tarefas" disabled>
              <TaskOnTime />
            </Tabs.screen>
          </Tabs.root>
        </View>
      </Portal.Host>
    </MapContextProvider>
  );
}
