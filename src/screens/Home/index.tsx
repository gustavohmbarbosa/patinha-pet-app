import React from "react";
import { View } from "react-native";
import { Portal } from "react-native-paper";
import { FabGroup } from "../../components/FabGroup";
import { HeaderPets } from "../../components/HeaderPets";
import { Map } from "../../components/Map";

import { styles } from "./styles";
import { Tabs } from "../../components/Tabs";
import { MapContextProvider } from "../../context/MapContext";

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
              <View style={{ flex: 1, backgroundColor: "#f0f" }}></View>
            </Tabs.screen>
          </Tabs.root>
        </View>
      </Portal.Host>
    </MapContextProvider>
  );
}
