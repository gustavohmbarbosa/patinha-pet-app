import React from "react";
import { View } from "react-native";
import { Portal } from "react-native-paper";
import { MapContextProvider } from "../../context/MapContext";
import { FabGroup } from "../../components/FabGroup";
import { HeaderPets } from "../../components/HeaderPets";
import { Map } from "../../components/Map";
import { Tabs } from "../../components/Tabs";
import { TaskOnTime } from "../../components/TaskOnTime";

import { styles } from "./styles";

export default function Home() {
  return (
    <MapContextProvider>
      <Portal.Host>
        <View style={styles.container}>
          <HeaderPets />
          <FabGroup />
          <Tabs.root>
            <Tabs.screen label="Mapa">
              <View style={styles.tabScreen}>
                <Map />
              </View>
            </Tabs.screen>
            <Tabs.screen label="Tarefas">
              <TaskOnTime />
            </Tabs.screen>
          </Tabs.root>
        </View>
      </Portal.Host>
    </MapContextProvider>
  );
}
